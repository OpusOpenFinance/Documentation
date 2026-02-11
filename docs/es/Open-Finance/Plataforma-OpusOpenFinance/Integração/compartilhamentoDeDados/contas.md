---
layout: default
title: "API de Cuentas"
parent: "Compartición de Datos"
nav_order: 3
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/Contas/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/apis/Contas/"
      lang: "en"
---

## API de Cuentas

API de la *capa de integración* que devuelve información de cuentas de depósito a la vista, cuentas de ahorro y cuentas de pago prepagas mantenidas en las instituciones transmisoras por sus clientes, incluyendo datos de identificación de la cuenta, saldos, límites y transacciones.

Esta API no hace separación entre persona natural y persona jurídica.

Antes de que cualquier *endpoint* sea accionado, la plataforma ya ha verificado la autenticidad del origen de la llamada y la validez, fecha de expiración, permisos y ámbito del consentimiento enviado por el receptor, garantizando que se trata de una solicitud autorizada.

Existen *endpoints* para:

- Obtener la lista de cuentas de depósito a la vista, ahorro y pago prepagas mantenidas por el cliente en la institución;
- Obtener datos de identificación de una cuenta;
- Obtener saldos de una cuenta;
- Obtener la lista de transacciones de una cuenta;
- Obtener la lista de transacciones recientes (últimos 7 días) de una cuenta;
- Obtener los límites de una cuenta.

Además, es necesario implementar otra API regulatoria para la verificación de cuenta de un cliente PF o PJ en determinada institución. Esta API se denomina *common* y verifica si un cliente abandonó el flujo de consentimiento por no tener cuenta en la institución.

### *Open API Specification* de las APIs

La documentación de las APIs a ser construida en la *capa de integración* puede encontrarse en la tabla a continuación:

|API            |Enlace                |YAML/OAS                                |
|:-------------:|:---------------------:|:--------------------------------------:|
|    Cuentas    |[**Enlace**][API-Cuentas] |[**Descargar**](./anexos/yml/es-accounts-2-4-1.yml){:download="es-accounts-2-4-1.yml"}      |
|    Common     |[**Enlace**][API-Common] |[**Descargar**](./anexos/yml/es-opusCommons-1-0-0.yml){:download="es-opusCommons-1-0-0.yml"}  |

{: .destaque}
Algunos navegadores de internet, como *Chrome*, ocasionalmente señalan como *no segura* la operación de *descarga* de archivos YAML, exigiendo el desbloqueo manual por el usuario. Estos archivos, sin embargo, tienen contenido del tipo texto y no presentan riesgo por sí solos.

[API-Cuentas]: ../../../../../swagger-ui/index.html?api=es-contas
[API-Common]: ../../../../../swagger-ui/index.html?api=es-opus-commons
