---
layout: default
title: Webhooks de Pagos
parent: "Funcionamiento"
grand_parent: "Iniciación de Pagos y Recepción de Datos"
nav_order: 7
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/webhooks"
      lang: "pt-br"
    - path: "/Documentation/en/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/webhooks"
      lang: "en"
---

## Objetivo

La API de Webhooks de Pagos es el canal por el cual la Institución Titular **notifica** al Módulo de Iniciación de Pagos de cambios de estado en pagos, consentimientos y vínculos. El Módulo de Iniciación de Pagos recibe la notificación, la valida y la reenvía a la URL interna del cliente, permitiendo que la ITP reaccione en tiempo casi real a los cambios de estado.

> Para los posibles valores de cada clave JSON consulte la [API asociada][API-Webhook].

[API-Webhook]: ../../../../../swagger-ui/index.html?api=es-otpp-webhooks

## Cómo funciona

1. La Institución Titular notifica al Módulo de Iniciación de Pagos vía POST en los endpoints públicos `/open-banking/webhook/...`;
2. El Módulo de Iniciación de Pagos recibe, valida y responde **202 Accepted** a la Institución Titular;
3. La notificación válida se publica en un tópico Dapr (`opustpp-webhook-topic`) para procesamiento asíncrono;
4. El Módulo de Iniciación de Pagos reenvía el POST recibido a la **URL de webhook del cliente**, previamente registrada vía API interna.

> **Atención:** los endpoints a continuación solo funcionan después de que un pago o consentimiento haya sido creado por el usuario en el sistema. Las notificaciones sin correspondencia se reciben, obtienen respuesta de éxito (para no causar retry innecesario en la Institución Titular), y son **ignoradas con log informativo**.

## Endpoints expuestos por el Módulo de Iniciación de Pagos

| Tipo | Endpoint | Descripción | Éxito |
| :--: | :------: | :-------: | :-----: |
| POST | `/open-banking/webhook/v1/payments/{versionApi}/consents/{paymentId}` | Actualización del consentimiento del pago Pix | 202 |
| POST | `/open-banking/webhook/v1/payments/{versionApi}/pix/payments/{paymentId}` | Actualización del pago Pix | 202 |
| POST | `/open-banking/webhook/v1/automatic-payments/{versionApi}/recurring-consents/{recurringPaymentId}` | Actualización del consentimiento del pago automático Pix | 202 |
| POST | `/open-banking/webhook/v1/automatic-payments/{versionApi}/pix/recurring-payments/{recurringPaymentId}` | Actualización del pago automático Pix | 202 |
| POST | `/open-banking/webhook/v1/enrollments/{versionApi}/enrollments/{enrollmentId}` | Actualización del vínculo de cuenta (estados `REJECTED` y `REVOKED`) | 202 |

## Payload de las notificaciones de la Institución Titular

> **Importante:** las notificaciones traen **únicamente la fecha de la actualización** — ninguna informa el nuevo estado. Para descubrir el estado actualizado, es necesario hacer un GET en el recurso correspondiente.

Para descubrir el estado actualizado:

- `GET /proxy/open-banking/payments/v5/pix/payments/{paymentId}` — Para pagos Pix;
- `GET /opus-open-finance/payments/v1/consents/{consentId}` — Para consentimientos de pago;
- `GET /opus-open-finance/enrollments/v1/enrollments/{enrollmentId}` — Para vínculos.

## Registro de la URL de webhook del cliente

Para que el Módulo de Iniciación de Pagos sepa a dónde reenviar las notificaciones, cada aplicación cliente necesita tener su URL de webhook registrada vía API interna:

| Método | Endpoint | Descripción |
| :----: | :------: | :-------: |
| PATCH | `/opus-open-finance/application/v1/application/{applicationId}/webhook-url` | Creación o actualización de la URL de webhook |

> **Atención:** esta URL **no** debe ser la misma registrada en el Directorio de Participantes como Redirect URI. Se trata de una URL interna del cliente (generalmente en red privada), que recibirá las notificaciones reenviadas por el Módulo de Iniciación de Pagos vía POST.

Detalles de la API interna en [APIs Internas](apisInternas.html).

## Referencias

- [Documentación oficial — Webhook Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/105021457/Webhook)
- Especificación OpenAPI: [`oas-webhook.yml`](../anexos/yml/es-opusTPP-webhook.yml) (ver también [API asociada][API-Webhook])
