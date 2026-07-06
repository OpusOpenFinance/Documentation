---
layout: default
title: Redireccionamiento App-to-App y Web
parent: "Funcionamiento"
grand_parent: "Iniciación de Pagos y Recepción de Datos"
nav_order: 6
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/redirecionamento"
      lang: "pt-br"
    - path: "/Documentation/en/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/redirecionamento"
      lang: "en"
---

## Objetivo

Detallar el tratamiento del retorno del flujo del Módulo de Iniciación de Pagos tanto en el camino mobile (App-to-App vía Android App Links / iOS Universal Links) como en el camino web, incluyendo el endpoint `authorization-result`, los formatos de error estándar OAuth 2.0 y el soporte a múltiples aplicaciones.

> Según lo [definido por el Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/240650297/Redirecionamento+App-to-App), la comunicación entre la aplicación de la Receptora y la aplicación de la Transmisora debe ser **directa**, sin etapas intermedias (como páginas web para selección de aplicación).

## URLs que la aplicación debe interceptar

| Descripción | URL |
| :-------: | :-: |
| Consentimiento de datos | `https://<FQDN>/opus-open-finance/consents/redirect-uri` |
| Consentimiento de pagos | `https://<FQDN>/opus-open-finance/payments/redirect-uri` |
| Consentimiento de datos | `https://<FQDN>/opus-open-insurance/consents/redirect-uri` |

El `<FQDN>` es el FQDN configurado en la fila de la tabla `application` correspondiente.

## Archivos Asset Links y Apple App Site Association

Estos archivos permiten que el sistema operativo del dispositivo reconozca qué apps están autorizadas a interceptar cada URL. El Módulo de Iniciación de Pagos sirve estos archivos en las siguientes rutas:

| Plataforma | Ruta |
| :--------: | :--: |
| Android | `GET https://<FQDN>/.well-known/assetlinks.json` |
| iOS | `GET https://<FQDN>/.well-known/apple-app-site-association` |

La configuración del contenido de estos archivos se realiza a través de variables de entorno del deploy (`config.androidAssetLinksFile` y `config.appleAppSiteAssociationFile`).

## Endpoint `authorization-result`

Después de interceptar la URL de retorno, la app debe enviar el resultado OIDC al Módulo de Iniciación de Pagos a través de este endpoint:

| Verbo | URL | Payload |
| :---: | :-: | :-----: |
| POST | `https://<FQDN>/opus-open-finance/authorization-result` | `{ "data": "<query string ou fragment>" }` |
| POST | `https://<FQDN>/opus-open-insurance/authorization-result` | ídem |

La query string o fragment debe ser extraída **as-is** de la URL interceptada (todo lo que viene después de `?` o `#`).

**Retornos posibles:**

| Status | Significado | Cuerpo |
| :----: | :---------: | :---: |
| 204 No Content | Autorización exitosa | vacío |
| 422 Unprocessable Entity | Falla en la autorización | `{ "error": "...", "error_description": "..." }` |

> **Recomendación:** llame a `/authorization-result` **inmediatamente** después de interceptar la URL, incluso antes de exigir autenticación del usuario en la app. El *authorization code* devuelto por el flujo del Módulo de Iniciación de Pagos tiene un TTL muy corto (definido por la Transmisora — frecuentemente menos de 60 segundos).

## Camino mobile vs. camino web

El resultado de la autorización se entrega por caminos diferentes dependiendo de **dónde se inició el flujo**:

| Origen | Qué ocurre en el retorno | Camino técnico |
| :----: | :-----------------------: | :-------------: |
| **Aplicación mobile** | La app de la Receptora intercepta el redirect vía App Links / Universal Links | `POST /authorization-result` |
| **Browser** | El browser sigue el redirect de la Transmisora hasta el Módulo de Iniciación de Pagos | `/redirect-uri` → 302 hacia `callbackApplicationUri` |

> **Atención crítica:** Incluso cuando el flujo se inicia en una app, es **obligatorio** implementar **ambos** caminos. La interceptación mobile puede fallar (App Links mal configurados, el usuario elige abrir con otra app, etc.). Sin el tratamiento web como contingencia, el usuario se queda sin feedback del resultado.

### Camino 1 — Mobile

La app intercepta el redirect, extrae la query string o fragment, y llama a `POST /authorization-result`. El resultado llega en la respuesta HTTP de la llamada:

- **Éxito:** `204 No Content` (cuerpo vacío)
- **Error:** `422 Unprocessable Entity` con `error` y `error_description` en el cuerpo JSON

### Camino 2 — Web

Cuando el browser sigue el redirect de la Transmisora hasta la ruta `/redirect-uri` del Módulo de Iniciación de Pagos, el Módulo de Iniciación de Pagos realiza un **HTTP 302** hacia la `callbackApplicationUri` registrada en el consentimiento, agregando los siguientes parámetros de consulta:

**Éxito:**

```
<callbackApplicationUri>?result=success
```

**Error:**

```
<callbackApplicationUri>?result=error&error=<código>&error_description=<descrição>
```

| Parámetro | Quién lo define | Valores posibles |
| :-------: | :---------: | :---------------: |
| `result` | Módulo de Iniciación de Pagos | `success` o `error` |
| `error` | Transmisora (OAuth 2.0) | Código estándar [RFC 6749 §4.1.2.1](https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1). Ejemplos: `access_denied` (el usuario negó), `invalid_grant` (código de autorización inválido/expirado) |
| `error_description` | Transmisora (OAuth 2.0) | Texto libre, varía según la implementación de cada Transmisora |

### Sobre los parámetros de error

En ambos caminos, `error` y `error_description` son **estándar OAuth 2.0** (RFC 6749): son generados por la Transmisora y reenviados por el Módulo de Iniciación de Pagos. El parámetro `result` (presente solo en el camino vía `callbackApplicationUri`) es el único agregado por nuestra solución, para facilitar la detección del resultado sin necesidad de verificar la ausencia de `error`.

## Soporte a múltiples aplicaciones

Cuando la Receptora posee más de una aplicación vinculada al producto, es fundamental garantizar que el usuario **continúe en la misma aplicación** en la que inició el consentimiento tras el retorno de la Transmisora.

Para configurar esto, cada aplicación de la institución debe interceptar exclusivamente las URIs con el `FQDN` correspondiente al registrado en su fila de `application`, teniendo en cuenta el `redirect_identifier` asociado.

Ejemplo — dos apps, `id-app-a` e `id-app-b`, con FQDNs *ooc-appA.instituicao.com.br* y *ooc-appB.instituicao.com.br*:

| Producto | App | URI que la app debe interceptar |
| :-----: | :-: | :----------------------------: |
| OF Dados | id-app-a | `https://ooc-appA.instituicao.com.br/opus-open-finance/consents/redirect-uri/id-app-a` |
| OF Pagamento | id-app-a | `https://ooc-appA.instituicao.com.br/opus-open-finance/payments/redirect-uri/id-app-a` |
| OI Dados | id-app-a | `https://ooc-appA.instituicao.com.br/opus-open-insurance/consents/redirect-uri/id-app-a` |
| OF Dados | id-app-b | `https://ooc-appB.instituicao.com.br/opus-open-finance/consents/redirect-uri/id-app-b` |
| OF Pagamento | id-app-b | `https://ooc-appB.instituicao.com.br/opus-open-finance/payments/redirect-uri/id-app-b` |
| OI Dados | id-app-b | `https://ooc-appB.instituicao.com.br/opus-open-insurance/consents/redirect-uri/id-app-b` |

> **Importante:** Todas las URIs de redireccionamiento utilizadas por la institución deben estar registradas en el Software Statement del Directorio de Participantes (ver [Configuración](../configuracao/)).

## Referencias

- [Redireccionamiento App-to-App — Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17378415/Redirecionamento+App-to-App)
- [RFC 6749 — OAuth 2.0 §4.1.2.1](https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1)
