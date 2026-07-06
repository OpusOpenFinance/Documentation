---
layout: default
title: Configuración
parent: "Iniciación de Pagos y Recepción de Datos"
nav_order: 2
has_children: true
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/configuracao/index"
      lang: "pt-br"
    - path: "/Documentation/en/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/configuracao/index"
      lang: "en"
---

## Etapas de Configuración

> **Importante:** En caso de que surja alguna duda acerca de algún término utilizado, consulte la página de [**Conceptos**](../conceitos.html).

### 1. Registrar la institución y la aplicación en el Directorio de Participantes - Responsabilidad de Opus

Son dos registros:

- **Organización** (identificada por el CNPJ) — representa la ITP;
- **Aplicación**, que genera un Software Statement ID y un client_id — representa cada marca/aplicación cliente.

Estos IDs son esenciales para el funcionamiento del producto.

> **Importante:** Para que Opus pueda realizar este registro de forma independiente, es necesario que la institución cliente nos proporcione todos los accesos necesarios al Directorio de Participantes.

### 2. Definir URLs de redireccionamiento - Responsabilidad de la Institución Cliente

Son utilizadas por las instituciones para redirigir a los usuarios después de consentimientos y autorizaciones.

Ejemplos comunes:

- `/opus-open-finance/consents/redirect-uri`
- `/opus-open-finance/payments/redirect-uri`

Estas URLs deben registrarse en el Software Statement de cada aplicación. Cuando la institución tiene más de una app, cada URL debe llevar un `redirect_identifier` único — ver [Redireccionamiento](../funcionamento/redirecionamento.html).

### 3. Poner a disposición los entornos de Homologación y Producción - Responsabilidad de Opus

Opus realizará la configuración de un entorno de Homologación (HML) y Producción (PRD).

### 4. Obtener certificados regulatorios - Opus + Institución Cliente

Son exigidos por el Open Finance Brasil:

- BRCAC;
- BRSEAL;
- MTLS;
- Servidor EV.

Para más detalles, acceda a [Certificados Regulatorios](./certificadosRegulatorios.html).

### 5. Proporcionar información al equipo técnico - Responsabilidad de la Institución Cliente

Los técnicos configurarán el Módulo de Iniciación de Pagos, pero necesitan recibir:

- Certificados y sus respectivas claves privadas (BRCAC, BRSEAL, ID_TOKEN_ENC cuando corresponda);
- Redirect URIs registradas en el Directorio;
- Software Statement ID y `client_id`;
- FQDN público elegido;
- En caso de que la instalación sea SaaS, no es necesario proporcionar ningún acceso. En caso de que el cliente quiera mantener el producto en su infraestructura, necesitamos datos de acceso con los permisos necesarios para la instalación.

---

## Conclusión

La configuración a alto nivel se resume en:

1. Realizar el registro en el Directorio de Participantes;
2. Elegir URLs y dominio;
3. Obtener certificados regulatorios;
4. Proporcionar datos al equipo técnico (en caso de que no sea SaaS).

> **Nota:** Todo lo demás pertenece a la descripción más técnica y al procedimiento operativo.
