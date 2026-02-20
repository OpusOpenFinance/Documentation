---
layout: default
title: "API de Renta Fija Bancaria"
parent: "Inversiones"
nav_order: 1
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/investimentos/rendaFixaBancaria/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/investimentos/rendaFixaBancaria/"
      lang: "en"
---

## API de Renta Fija Bancaria

API de la *capa de integración* que devuelve datos de renta fija bancaria mantenidos por el cliente en la institución Transmisora de Datos.

En términos generales, existen *endpoints* para:

- Obtener los registros de operaciones de los títulos de renta fija bancaria mantenidos por el cliente;
- Obtener los registros de identificación de los títulos de renta fija bancaria;
- Obtener los registros de posición en los títulos de renta fija bancaria;
- Obtener los registros de historial de transacciones de los últimos 12 meses;
- Obtener los registros de historial de los últimos siete días.

### *Open API Specification* de la API

La documentación de la API de renta fija bancaria a ser construida en la *capa de integración* puede encontrarse [**aquí**][API-Renta-Fija-Bancaria].

Para descargar el archivo YAML/OAS que contiene la especificación de la API haga clic [**aquí**](../anexos/yml/investimentos/es-bankFixedIncomes.yml){:download="es-bankFixedIncomes.yml"}.

{: .destaque}
Algunos navegadores de internet, como *Chrome*, ocasionalmente señalan como *no segura* la operación de *descarga* de archivos YAML, exigiendo el desbloqueo manual por el usuario. Estos archivos, sin embargo, tienen contenido del tipo texto y no presentan riesgo por sí solos.

[API-Renta-Fija-Bancaria]: ../../../../../../swagger-ui/index.html?api=es-data-bank-fixed-incomes
