---
layout: default
title: "API de Títulos del Tesoro Directo"
parent: "Inversiones"
nav_order: 5
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/dados-investimentos/dados-tesouro/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/dados-investimentos/dados-tesouro/"
      lang: "en"
---

## API de Títulos del Tesoro Directo

API de la *capa de integración* que devuelve datos de títulos del tesoro directo mantenidos por el cliente en la institución Transmisora de Datos.

En términos generales, existen *endpoints* para:

- Obtener los registros de operaciones de los títulos del tesoro directo mantenidos por el cliente;
- Obtener los registros de identificación de los títulos del tesoro directo;
- Obtener los registros de posición en los títulos del tesoro directo;
- Obtener los registros de historial de transacciones de los últimos 12 meses;
- Obtener los registros de historial de los últimos siete días.

### *Open API Specification* de la API

La documentación de la API de títulos del tesoro directo a ser construida en la *capa de integración* puede encontrarse [**aquí**][API-Tesoro-Directo].

Para descargar el archivo YAML/OAS que contiene la especificación de la API haga clic [**aquí**](../../apis/dados-investimento/oas-treasury-bonds.yml){:download="oas-treasury-bonds.yml"}.

{: .destaque}
Algunos navegadores de internet, como *Chrome*, ocasionalmente señalan como *no segura* la operación de *descarga* de archivos YAML, exigiendo el desbloqueo manual por el usuario. Estos archivos, sin embargo, tienen contenido del tipo texto y no presentan riesgo por sí solos.

[API-Tesoro-Directo]: ../../../../../swagger-ui/index.html?api=data-treasury-bonds
