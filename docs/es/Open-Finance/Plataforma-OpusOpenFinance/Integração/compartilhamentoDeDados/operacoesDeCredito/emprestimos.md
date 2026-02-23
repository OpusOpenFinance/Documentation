---
layout: default
title: "API de Préstamos"
parent: "Operaciones de Crédito"
nav_order: 1
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/operacoesDeCredito/emprestimos/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/operacoesDeCredito/emprestimos/"
      lang: "en"
---

## Préstamos

API de la *capa de integración* que devuelve información de operaciones de crédito del tipo *préstamo*, mantenidas en las instituciones transmisoras por sus clientes, incluyendo datos como denominación, modalidad, número del contrato, tarifas, plazo, cuotas, pagos (al menos de los últimos 12 meses), amortizaciones, garantías, cargos y tasas de intereses remuneratorios.

Esta API no hace separación entre persona natural y persona jurídica.

Antes de que cualquier *endpoint* de la *capa de integración* sea accionado, la plataforma ya ha verificado la autenticidad del origen de la llamada y la validez, fecha de expiración, permisos y ámbito del consentimiento enviado por el receptor, garantizando que se trata de una solicitud autorizada.

Existen *endpoints* para:

- Obtener el conjunto de información de contratos de préstamo mantenidos por el cliente en la institución transmisora;
- Obtener los datos de un contrato de préstamo;
- Obtener los datos del cronograma de cuotas de un contrato de préstamo;
- Obtener la lista de garantías vinculadas a un contrato de préstamo;
- Obtener los datos de pago de un contrato de préstamo.

### *Open API Specification* de la API

La documentación de la API de Préstamos a ser construida en la *capa de integración* puede encontrarse [**aquí**][API-Préstamo].

Para descargar el archivo YAML/OAS que contiene la especificación de la API haga clic [**aquí**](../anexos/yml/operacoesDeCredito/es-loans-2-4-0.yml){:download="es-loans-2-4-0.yml"}.

{: .destaque}
Algunos navegadores de internet, como *Chrome*, ocasionalmente señalan como *no segura* la operación de *descarga* de archivos YAML, exigiendo el desbloqueo manual por el usuario. Estos archivos, sin embargo, tienen contenido del tipo texto y no presentan riesgo por sí solos.

[API-Préstamo]: ../../../../../../swagger-ui/index.html?api=es-emprestimos
