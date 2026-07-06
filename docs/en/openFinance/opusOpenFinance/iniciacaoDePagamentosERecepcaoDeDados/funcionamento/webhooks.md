---
layout: default
title: Payment Webhooks
parent: "How It Works"
grand_parent: "Payment Initiation and Data Receipt"
nav_order: 7
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/webhooks"
      lang: "pt-br"
    - path: "/Documentation/es/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/webhooks"
      lang: "es"
---

## Purpose

The Payment Webhooks API is the channel through which the Holding Institution **notifies** the Payment Initiation Module of status changes in payments, consents, and bindings. The Payment Initiation Module receives the notification, validates it, and forwards it to the client's internal URL, allowing the ITP to react to state changes in near real time.

> For the possible values of each JSON key, see the [associated API][API-Webhook].

[API-Webhook]: ../../../../../swagger-ui/index.html?api=en-otpp-webhooks

## How it works

1. The Holder notifies the Payment Initiation Module via POST to the public endpoints `/open-banking/webhook/...`;
2. The Payment Initiation Module receives, validates, and responds **202 Accepted** to the Holder;
3. The valid notification is published to a Dapr topic (`opustpp-webhook-topic`) for asynchronous processing;
4. The Payment Initiation Module forwards the received POST to the **client's webhook URL**, previously registered via the internal API.

> **Attention:** the endpoints below only work after a payment or consent has been created by the user in the system. Notifications with no match are received, given a success response (so as not to cause an unnecessary retry on the Holder), and **ignored with an informative log**.

## Endpoints exposed by the Payment Initiation Module

| Type | Endpoint | Description | Success |
| :--: | :------: | :-------: | :-----: |
| POST | `/open-banking/webhook/v1/payments/{versionApi}/consents/{paymentId}` | Update of the PIX payment consent | 202 |
| POST | `/open-banking/webhook/v1/payments/{versionApi}/pix/payments/{paymentId}` | Update of the PIX payment | 202 |
| POST | `/open-banking/webhook/v1/automatic-payments/{versionApi}/recurring-consents/{recurringPaymentId}` | Update of the automatic PIX payment consent | 202 |
| POST | `/open-banking/webhook/v1/automatic-payments/{versionApi}/pix/recurring-payments/{recurringPaymentId}` | Update of the automatic PIX payment | 202 |
| POST | `/open-banking/webhook/v1/enrollments/{versionApi}/enrollments/{enrollmentId}` | Update of the account binding (states `REJECTED` and `REVOKED`) | 202 |

## Payload of the Holder's notifications

> **Important:** the notifications carry **only the date of the update** — none of them report the new status. To find out the updated status, it is necessary to make a GET on the corresponding resource.

To find out the updated status:

- `GET /proxy/open-banking/payments/v5/pix/payments/{paymentId}` — For PIX payments;
- `GET /opus-open-finance/payments/v1/consents/{consentId}` — For payment consents;
- `GET /opus-open-finance/enrollments/v1/enrollments/{enrollmentId}` — For bindings.

## Registering the client's webhook URL

So that the Payment Initiation Module knows where to forward the notifications, each client application must have its webhook URL registered via the internal API:

| Method | Endpoint | Description |
| :----: | :------: | :-------: |
| PATCH | `/opus-open-finance/application/v1/application/{applicationId}/webhook-url` | Creation or update of the webhook URL |

> **Attention:** this URL **must not** be the same one registered in the Participant Directory as the Redirect URI. It is an internal URL of the client (usually on a private network), which will receive the notifications forwarded by the Payment Initiation Module via POST.

Details of the internal API in [Internal APIs](apisInternas.html).

## References

- [Official documentation — Webhook Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/105021457/Webhook)
- OpenAPI specification: [`oas-webhook.yml`](../anexos/yml/en-opusTPP-webhook.yml) (see also [associated API][API-Webhook])
