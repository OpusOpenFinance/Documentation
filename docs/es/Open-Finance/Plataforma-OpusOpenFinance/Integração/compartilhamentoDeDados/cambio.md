---
layout: default
title: "API de Cambio"
parent: "Compartición de Datos"
nav_order: 6
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/cambio/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/cambio/"
      lang: "en"
---

## API de Operaciones de Cambio

API de la *capa de integración* que devuelve información sobre operaciones de Cambio realizadas en las instituciones transmisoras por sus clientes, incluyendo datos como información de la operación contratada, valor de la operación en moneda nacional y moneda extranjera, clasificación de la operación, forma de entrega, VET y, cuando sea aplicable, valor a liquidar. También se compartirán los eventos de alteración de la operación, si existen, con la información modificada.

Son ámbitos de compartición las operaciones negociadas en el mercado primario, contado (inclusive en especie, tarjeta prepago, tarjeta de débito) y futuro (inclusive ACC, ACE o cobertura cambiaria).

Deben compartirse las operaciones contratadas y disponibles en los canales electrónicos de la institución, incluso en situaciones en las que la operación aún no haya sido registrada ante el Banco Central. Si el evento de contratación es anulado en el Sistema de Cambio, lo que significa que la operación fue anulada, entonces esta operación deja de ser ámbito de exposición. Si el registro ocurre, la operación debe complementarse con el número de operación registrado y los eventos ocurridos.

Eventos de vinculación de operaciones no son ámbitos de exposición.

La exposición se dará por cada operación de cambio contratada por el cliente.

Esta API no hace separación entre persona natural y persona jurídica.

Antes de que cualquier *endpoint* sea accionado, la plataforma ya ha verificado la autenticidad del origen de la llamada y la validez, fecha de expiración, permisos y ámbito del consentimiento enviado por el receptor, garantizando que se trata de una solicitud autorizada.

Existen *endpoints* para:

- Obtener la lista de operaciones de cambio mantenidas por el cliente en la institución transmisora;
- Obtener datos de una operación de cambio;
- Obtener datos de eventos de una operación de cambio.

### *Open API Specification* de la API

La documentación de la API de Cambio a ser construida en la *capa de integración* puede encontrarse [**aquí**][API-Cambio].

Para descargar el archivo YAML/OAS que contiene la especificación de la API haga clic [**aquí**](./anexos/yml/es-exchange-1-0-0.yml){:download="es-exchange-1-0-0.yml"}.

{: .destaque}
Algunos navegadores de internet, como *Chrome*, ocasionalmente señalan como *no segura* la operación de *descarga* de archivos YAML, exigiendo el desbloqueo manual por el usuario. Estos archivos, sin embargo, tienen contenido del tipo texto y no presentan riesgo por sí solos.

[API-Cambio]: ../../../../../swagger-ui/index.html?api=es-cambio
