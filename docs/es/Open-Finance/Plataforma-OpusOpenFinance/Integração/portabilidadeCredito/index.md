---
layout: default
title: "Portabilidad de Crédito"
parent: "Integración de la Plataforma"
nav_order: 5
lang: "es"
alternate_lang:
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/portabilidadeCredito/index/"
      lang: "en"
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/portabilidadeCredito/index/"
      lang: "pt-br"
---

## API de Portabilidad de Crédito

API de la *capa de integración* que permite realizar una portabilidad de crédito para un cliente.

En líneas generales, existen *endpoints* para:

- Crear una solicitud de portabilidad de crédito para un contrato específico;
- Comunicar la cancelación de una solicitud de portabilidad de crédito;
- Verificar si un contrato es elegible para solicitar una portabilidad de crédito;
- Obtener los datos de la cuenta necesarios para realizar el pago de la operación vía TED.

### *Open API Specification* de la API

La documentación de la API de Portabilidad de Crédito a construir en la *capa de integración* se puede encontrar [**aquí**][API-Portabilidad].

Para descargar el archivo YAML/OAS que contiene la especificación de la API, haga clic [**aquí**](./anexos/yml/es-portability.yml){:download="es-portability.yml"}.

{: .destaque}
Algunos navegadores de internet, como *Chrome*, ocasionalmente señalan como *no segura* la operación de *descarga* de archivos YAML, exigiendo el desbloqueo manual por parte del usuario. Sin embargo, estos archivos son de tipo texto y no presentan riesgo por sí mismos.

[API-Portabilidad]: ../../../../../swagger-ui/index.html?api=es-portability