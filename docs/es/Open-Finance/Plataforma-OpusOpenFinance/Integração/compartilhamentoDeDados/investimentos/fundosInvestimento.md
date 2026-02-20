---
layout: default
title: "API de Fondos de Inversión"
parent: "Inversiones"
nav_order: 4
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/investimentos/fundosInvestimento/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/investimentos/fundosInvestimento/"
      lang: "en"
---

## API de Fondos de Inversión

API de la *capa de integración* que devuelve datos de fondos de inversión mantenidos por el cliente en la institución Transmisora de Datos.

En términos generales, existen *endpoints* para:

- Obtener los registros de operaciones de los fondos de inversión mantenidos por el cliente;
- Obtener los registros de identificación de los fondos de inversión;
- Obtener los registros de posición en los fondos de inversión;
- Obtener los registros de historial de transacciones de los últimos 12 meses;
- Obtener los registros de historial de los últimos siete días.

### *Open API Specification* de la API

La documentación de la API de fondos de inversión a ser construida en la *capa de integración* puede encontrarse [**aquí**][API-Fondos-de-Inversión].

Para descargar el archivo YAML/OAS que contiene la especificación de la API haga clic [**aquí**](../anexos/yml/investimentos/es-funds.yml){:download="es-funds.yml"}.

{: .destaque}
Algunos navegadores de internet, como *Chrome*, ocasionalmente señalan como *no segura* la operación de *descarga* de archivos YAML, exigiendo el desbloqueo manual por el usuario. Estos archivos, sin embargo, tienen contenido del tipo texto y no presentan riesgo por sí solos.

[API-Fondos-de-Inversión]: ../../../../../../swagger-ui/index.html?api=es-data-funds
