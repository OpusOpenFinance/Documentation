---
layout: default
title: Automatic Payment
parent: "How It Works"
grand_parent: "Payment Initiation and Data Receipt"
nav_order: 3
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/pagamentoAutomatico"
      lang: "pt-br"
    - path: "/Documentation/es/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/pagamentoAutomatico"
      lang: "es"
---

## Purpose

The Automatic Payment API allows the creation of **recurring consents** that authorize periodic debits from an account for purposes such as subscriptions, monthly fees, installments, and recurring charges in general.

> For the possible values of each JSON key, see the [associated API][API-Auto].

[API-Auto]: ../../../../../swagger-ui/index.html?api=en-otpp-pagamentos_automaticos

## Recurring consent

| Type | Endpoint | Description | Success |
| :--: | :------: | :-------: | :-----: |
| POST | `/opus-open-finance/automatic-payments/v1/recurring-consents` | Creation of an automatic payment consent | 201 |
| GET | `/opus-open-finance/automatic-payments/v1/recurring-consents/{recurringConsentId}` | Consent query | 200 |
| PATCH | `/opus-open-finance/automatic-payments/v1/recurring-consents/{recurringConsentId}` | Consent revocation | 200 |
| POST | `/opus-open-finance/automatic-payments/v1/recurring-consents/{recurringConsentId}/authorisation-retry` | New authorization attempt | 200 |

## Recurring payments

| Method | Endpoint v2 | Description | Success |
| :----: | :---------: | :-------: | :-----: |
| POST   | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments` | Creation of an automatic payment | 201 |
| GET    | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments` | Query of all payments of the consent | 200 |
| GET    | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments/{recurringPaymentId}` | Query of an individual payment | 200 |
| PATCH  | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments/{recurringPaymentId}` | Payment revocation | 200 |

References:

- **v2:** [SV Pagamentos Automáticos 2.1.0](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/931037185/v2.1.0+SV+Pagamentos+Autom+ticos)

## Expected behavior

- **Success:** The consent remains in `AUTHORIZED` until it reaches the global transaction limits set in the payload (total quantity, total value, deadline, etc.). When these limits are reached, the status transitions to `CONSUMED`;
- **Business error (HTTP 422):** The status of the individual payment enters `REJECTED`. The consent remains active (unless a global rule has been violated). Error schemas: `422ResponseErrorCreatePixRecurringPayment` and `422ResponseErrorCreateRecurringPaymentsPaymentId`;
- **Individual payment revocation:** Allowed when the payment is in `SCHEDULED` (SCHD) or `PDNG`;
- **Consent revocation:** Allowed when the consent is in `AUTHORIZED`. Error schema: `422ResponseErrorRecurringConsents`.

## References

- [State Machine v2.0.0 — Automatic Payments](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/931037243/M+quina+de+Estados+-+v2.1.0+-+SV+Pagamentos+Autom+ticos)
- OpenAPI specification: [`oas-pagamentos-automaticos.yml`](../anexos/yml/en-opusTPP-pagamentosAutomaticos.yml) (see also [associated API][API-Auto])
