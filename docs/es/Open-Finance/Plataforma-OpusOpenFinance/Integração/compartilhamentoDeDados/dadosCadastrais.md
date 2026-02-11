---
layout: default
title: "API de Datos Cadastrales"
parent: "Compartición de Datos"
nav_order: 1
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/Dados-Cadastrais/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/apis/Dados-Cadastrais/"
      lang: "en"
---

## API de Datos Catastrales

API de la *capa de integración* que devuelve datos catastrales de clientes y sus representantes, incluyendo datos de identificación, de calificación financiera, información sobre representantes registrados y sobre la relación financiera del cliente con la institución financiera transmisora de datos.

Esta API separa persona natural de persona jurídica, estableciendo *endpoints* distintos para cada tipo.

Antes de que cualquier *endpoint* sea accionado, la plataforma ya ha verificado la autenticidad del origen de la llamada y la validez, fecha de expiración, permisos y ámbito del consentimiento enviado por el receptor, garantizando que se trata de una solicitud autorizada.

En términos generales, existen *endpoints* para:

- Obtener los registros de identificación de persona natural;
- Obtener los registros de calificación de persona natural;
- Obtener los registros de relación con la institución financiera y de representantes de la persona natural;
- Obtener los registros de identificación de persona jurídica;
- Obtener los registros de calificación de persona jurídica;
- Obtener los registros de relación con la institución financiera y de representantes de la persona jurídica.

### *Open API Specification* de la API

La documentación de la API de Datos Catastrales a ser construida en la *capa de integración* puede encontrarse [**aquí**][API-Datos-catastrales]

Para descargar el archivo YAML/OAS que contiene la especificación de la API haga clic [**aquí**](./anexos/yml/es-customers-2-2-0.yml){:download="es-customers-2-2-0.yml"}.

{: .destaque}
Algunos navegadores de internet, como *Chrome*, ocasionalmente señalan como *no segura* la operación de *descarga* de archivos YAML, exigiendo el desbloqueo manual por el usuario. Estos archivos, sin embargo, tienen contenido del tipo texto y no presentan riesgo por sí solos.

[API-Datos-catastrales]: ../../../../../swagger-ui/index.html?api=es-dados-cadastrais
