---
layout: default
title: Recepción de Datos — Open Finance
parent: "Funcionamiento"
grand_parent: "Iniciación de Pagos y Recepción de Datos"
nav_order: 1
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/recepcaoDeDados"
      lang: "pt-br"
    - path: "/Documentation/en/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/recepcaoDeDados"
      lang: "en"
---

## Objetivo

Módulo para la Recepción de Datos de Registro y Transaccionales expone los endpoints que permiten a la ITP **gestionar consentimientos** (crear, consultar, revocar y renovar) y **obtener los datos consentidos** a través de una capa de proxy adherente al estándar regulatorio del Open Finance Brasil.

> **Requisito previo:** Los endpoints de utilización solo pueden invocarse después del flujo de autorización descrito en [Funcionamiento](./). Para los posibles valores de cada clave JSON consulte la [API asociada][API-OF-Dados].

[API-OF-Dados]: ../../../../../swagger-ui/index.html?api=es-otpp-recepcao_dados_of

## Endpoints de consentimiento

| Tipo | Endpoint | Descripción | Éxito |
| :--: | :------: | :-------: | :-----: |
| POST | `/opus-open-finance/consents/v1/consents` | Creación del consentimiento de compartición | 201 |
| GET | `/opus-open-finance/consents/v1/consents/{consentId}` | Consulta de estado y datos del consentimiento | 200 |
| DELETE | `/opus-open-finance/consents/v1/consents/{consentId}` | Revocación del consentimiento | 204 |
| POST | `/opus-open-finance/consents/v1/consents/{consentId}/authorisation-retry` | Nuevo intento de autorización | 200 |
| POST | `/opus-open-finance/consents/v1/consents/{consentId}/extends` | Renovación del consentimiento | 201 |
| GET | `/opus-open-finance/consents/v1/consents/{consentId}/extends` | Consulta de los datos de renovación | 200 |
| GET | `/opus-open-finance/dcm` | Obtención de los datos de DCM de los *brand clients* | 200 |
| PUT | `/opus-open-finance/dcm` | Actualización de los datos de DCM de los *brand clients* | 200 |

### Cuándo usar cada endpoint

- **POST `/consents`**: Siempre que inicie una nueva solicitud de acceso a datos de un cliente. Devuelve `consentId` y `redirectUrl` para redireccionar al usuario a la Institución Titular;
- **GET `/consents/{consentId}`**: Para acompañar cambios de estado (`AWAITING_AUTHORISATION` → `AUTHORISED` o `REJECTED`);
- **DELETE `/consents/{consentId}`**: Para revocar un consentimiento activo. Puede ser realizado por el Usuario, por la Iniciadora (ITP) o por la Transmisora;
- **POST `/authorisation-retry`**: Cuando el flujo de redireccionamiento falle y aún haya ventana (60 minutos para datos);
- **POST `/extends`**: Renovación de consentimiento sin necesidad de rehacer el flujo de autorización completo (cuando lo soporta la Institución Titular).

## Proxies para obtención de datos

Después de que el consentimiento esté en `AUTHORISED`, la ITP puede llamar a los **proxies regulatorios** expuestos por el Módulo de Recepción de Datos. Son aproximadamente **78 rutas** organizadas por las siguientes familias:

| Familia | Recursos |
| :-----: | :------: |
| **Resources** | Listado de recursos vinculados al consentimiento y estado |
| **Customers** | Datos registrales PF (`/personal/*`) y PJ (`/business/*`) |
| **Accounts** | Cuentas, saldos, saldos reservados, transacciones, límites |
| **Credit Card Accounts** | Cuentas pospago, facturas, transacciones, límites |
| **Loans** | Contratos de préstamos (con cuotas, pagos, garantías) |
| **Financings** | Contratos de financiaciones |
| **Unarranged Accounts Overdraft** | Contratos de adelanto a depositantes |
| **Invoice Financings** | Contratos de derechos crediticios descontados |
| **Bank Fixed Incomes** | Renta fija bancaria |
| **Credit Fixed Incomes** | Renta fija crédito |
| **Variable Incomes** | Renta variable |
| **Treasure Titles** | Tesouro Direto |
| **Funds** | Fondos de inversión |
| **Exchanges** | Operaciones de cambio de divisas |

La especificación completa, incluyendo schemas de respuesta de cada ruta, está en [`oas-dados-of.yml`](../anexos/yml/es-opusTPP-recepcaoDadosOf.yml). Para los posibles valores de cada clave JSON consulte la [API asociada][API-OF-Dados].

## Header de versión regulatoria

En rutas **no-proxy** (como `/consents`), el cliente puede elegir la versión de los endpoints de la Transmisora a través del header:

| Header | Dirección | Comportamiento |
| :----: | :-----: | :-----------: |
| `x-regulatory-v` | Request | Acepta versión completa (`"4.0.0"`) o solo major (`"4"`). Si no se envía, usa la versión más actual. Si se envía con una versión inexistente, usa la más reciente de la misma major. |
| `x-selected-regulatory-v` | Response | Indica qué versión fue efectivamente utilizada en la llamada a la Transmisora |

> **Importante:** El header `x-regulatory-v` **no es aceptado** en rutas proxy. En esas, la versión es siempre la major indicada en la propia ruta (ej.: `/proxy/open-banking/payments/v5/...`).

## Validación de permisos (reglas de negocio)

La Institución Titular aplica esta lógica al recibir el `POST /consents`:

| Escenario | Respuesta |
| :-----: | :------: |
| Permisos válidos, adherentes al agrupamiento | HTTP 201 Created |
| Permisos divergentes del agrupamiento | HTTP 400 Bad Request |
| Algunos permisos eliminados (producto no soportado por la Transmisora) | HTTP 201 Created con subconjunto devuelto |
| Ningún permiso funcional restante | HTTP 422 Unprocessable Entity |

> **Implicación práctica:** Siempre inspeccione el `permissions` de la **respuesta** — puede estar más reducido que lo solicitado.

## Referencias

- [Documentación oficial — API Consentimiento][API-Consents]
- Especificación OpenAPI: [`oas-dados-of.yml`](../anexos/yml/es-opusTPP-recepcaoDadosOf.yml) (ver también [API asociada][API-OF-Dados])

[API-Consents]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17369335/API+-+Consentimento
