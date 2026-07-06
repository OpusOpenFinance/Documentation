---
layout: default
title: Payment Initiation
parent: "How It Works"
grand_parent: "Payment Initiation and Data Receipt"
nav_order: 2
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/iniciacaoDePagamento"
      lang: "pt-br"
    - path: "/Documentation/es/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/iniciacaoDePagamento"
      lang: "es"
---

## Purpose

The PIX Payment Transaction Initiation API exposes the endpoints for creating, querying, and revoking payment consents, and for initiating and managing PIX payments themselves.

The Payment Initiation Module supports **both regulatory versions v4 and v5** of the payment APIs simultaneously, allowing the TPP to choose which version to call according to what each Holder accepts during the coexistence period.

> **Prerequisite:** all initiation endpoints only work after the payment consent has been created and is in `AUTHORISED` state (see [How It Works](./)). For the possible values of each JSON key, see the [associated API][API-Pagamentos].

[API-Pagamentos]: ../../../../../swagger-ui/index.html?api=en-otpp-iniciacao_pagamentos

## Payment consent endpoints

| Type | Endpoint | Description | Success |
| :--: | :------: | :-------: | :-----: |
| POST | `/opus-open-finance/payments/v1/consents` | Creation of a payment consent | 201 |
| GET | `/opus-open-finance/payments/v1/consents/{consentId}` | Query of status and data | 200 |
| POST | `/opus-open-finance/payments/v1/consents/{consentId}/authorisation-retry` | New authorization attempt (5-min window) | 200 |

## PIX payment initiation endpoints

The TPP chooses the version by calling the corresponding endpoint:

| Method | Endpoint v4 | Endpoint v5 | Description | Success |
| :----: | :---------: | :---------: | :-------: | :-----: |
| POST | `/proxy/open-banking/payments/v4/pix/payments` | `/proxy/open-banking/payments/v5/pix/payments` | Creation of the PIX payment | 201 |
| GET | `/proxy/open-banking/payments/v4/pix/payments/{paymentId}` | `/proxy/open-banking/payments/v5/pix/payments/{paymentId}` | Query of the status of a payment | 200 |
| PATCH | `/proxy/open-banking/payments/v4/pix/payments/{paymentId}` | `/proxy/open-banking/payments/v5/pix/payments/{paymentId}` | Revocation of an individual payment | 200 |
| GET | — | `/proxy/open-banking/payments/v5/consents/{consentId}/pix/payments` | Query of all payments of the same consent | 200 |
| PATCH | `/proxy/open-banking/payments/v4/pix/payments/consents/{consentId}` | `/proxy/open-banking/payments/v5/consents/{consentId}/pix/payments` | Revocation of all payments of the same consent | 200 |

Official references:

- **v4:** [SV Pagamentos 4.0.0][SV-Pagamentos-v4]
- **v5:** [SV Pagamentos 5.0.0-rc.1][SV-Pagamentos-v5]

[SV-Pagamentos-v4]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/347078657/v4.0.0+-+SV+Pagamentos
[SV-Pagamentos-v5]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1600030254/v5.0.0-rc.1+-+SV+Pagamentos

## Expected behavior

- **Success (201 Created):** The associated consent transitions to `CONSUMED`. The payment enters its own state machine (defined by the Holder) — it is necessary to **poll** the GET to track the actual settlement.
- **Business error (422 Unprocessable Entity):** The consent transitions to `REJECTED`. The returned body is a **JWT** (not plain JSON) containing the standard Open Finance Brasil error object.
- **Revocation:** Only allowed when the payment is in `SCHEDULED` (SCHD) or held for analysis (`PDNG`).

## Most common error codes

| Code | Typical scenario |
| :----: | :------------: |
| `PAGAMENTO_DIVERGENTE_DO_CONSENTIMENTO` | Some payment field (e.g., `amount`, `creditorAccount`) diverges from the approved consent |
| `PAGAMENTO_NAO_PERMITE_CANCELAMENTO` | Revocation attempt outside the eligible states (SCHD/PDNG) |

The complete list of codes is in the `422ResponseErrorCreatePixPayment` schema of the official documentation.

## Important guidelines

- All dates follow **RFC3339** in *zulu* format;
- The complete payment state machine is documented in the official v4 and v5 references;
- For the complete payload specification and response schemas, see [`oas-pagamentos.yml`](../anexos/yml/en-opusTPP-iniciacaoPagamentos.yml) or the [associated API][API-Pagamentos].

## References

- [SV Pagamentos v4.0.0 — Open Finance Brasil][SV-Pagamentos-v4]
- [SV Pagamentos v5.0.0-rc.1 — Open Finance Brasil][SV-Pagamentos-v5]
- [Automatic Payment (Pix Automático)](pagamentoAutomatico.html) — for recurring payments
