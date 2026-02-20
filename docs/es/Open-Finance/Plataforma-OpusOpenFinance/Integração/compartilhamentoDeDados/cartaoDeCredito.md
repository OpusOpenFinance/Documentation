---
layout: default
title: "API de Tarjeta de Crédito"
parent: "Compartición de Datos"
nav_order: 2
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/cartaoDeCredito/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/cartaoDeCredito/"
      lang: "en"
---

## API de Tarjeta de Crédito

API de la *capa de integración* que devuelve información de cuentas de pago postpago mantenidas en las instituciones transmisoras por sus clientes, incluyendo datos como denominación, producto, marca, límites de crédito, información sobre transacciones de pago realizadas y facturas.

Esta API no hace separación entre persona natural y persona jurídica.

Antes de que cualquier *endpoint* sea accionado, la plataforma ya ha verificado la autenticidad del origen de la llamada y la validez, fecha de expiración, permisos y ámbito del consentimiento enviado por el receptor, garantizando que se trata de una solicitud autorizada.

Existen *endpoints* para:

- Obtener la lista de cuentas postpago mantenidas por el cliente en la institución transmisora;
- Obtener datos de identificación de una tarjeta;
- Obtener lista de facturas de una tarjeta;
- Obtener la lista de transacciones de una tarjeta;
- Obtener los límites de una tarjeta;
- Obtener la lista de transacciones recientes (últimos 7 días) de una tarjeta.

### *Open API Specification* de la API

La documentación de la API de tarjeta de crédito a ser construida en la *capa de integración* puede encontrarse [**aquí**][API-Tarjeta-de-crédito].

Para descargar el archivo YAML/OAS que contiene la especificación de la API haga clic [**aquí**](./anexos/yml/es-creditCards-2-3-1.yml){:download="es-creditCards-2-3-1.yml"}.

{: .destaque}
Algunos navegadores de internet, como *Chrome*, ocasionalmente señalan como *no segura* la operación de *descarga* de archivos YAML, exigiendo el desbloqueo manual por el usuario. Estos archivos, sin embargo, tienen contenido del tipo texto y no presentan riesgo por sí solos.

[API-Tarjeta-de-crédito]: ../../../../../swagger-ui/index.html?api=es-cartao-de-credito
