---
layout: default
title: Data Reception — Open Finance
parent: "How It Works"
grand_parent: "Payment Initiation and Data Receipt"
nav_order: 1
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/recepcaoDeDados"
      lang: "pt-br"
    - path: "/Documentation/es/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/recepcaoDeDados"
      lang: "es"
---

## Purpose

The Registration and Transactional Data Reception Module exposes the endpoints that allow the ITP to **manage consents** (create, query, revoke, and renew) and to **obtain the consented data** through a proxy layer compliant with the Open Finance Brasil regulatory standard.

> **Prerequisite:** The usage endpoints can only be invoked after the authorization flow described in [How It Works](./). For the possible values of each JSON key, see the [associated API][API-OF-Dados].

[API-OF-Dados]: ../../../../../swagger-ui/index.html?api=en-otpp-recepcao_dados_of

## Consent endpoints

| Type | Endpoint | Description | Success |
| :--: | :------: | :-------: | :-----: |
| POST | `/opus-open-finance/consents/v1/consents` | Creation of the data-sharing consent | 201 |
| GET | `/opus-open-finance/consents/v1/consents/{consentId}` | Query of the consent's status and data | 200 |
| DELETE | `/opus-open-finance/consents/v1/consents/{consentId}` | Consent revocation | 204 |
| POST | `/opus-open-finance/consents/v1/consents/{consentId}/authorisation-retry` | New authorization attempt | 200 |
| POST | `/opus-open-finance/consents/v1/consents/{consentId}/extends` | Consent renewal | 201 |
| GET | `/opus-open-finance/consents/v1/consents/{consentId}/extends` | Query of the renewal data | 200 |
| GET | `/opus-open-finance/dcm` | Obtaining the DCM data of the *brand clients* | 200 |
| PUT | `/opus-open-finance/dcm` | Updating the DCM data of the *brand clients* | 200 |

### When to use each endpoint

- **POST `/consents`**: Whenever starting a new request for access to a customer's data. Returns `consentId` and `redirectUrl` to redirect the user to the Holder;
- **GET `/consents/{consentId}`**: To track status changes (`AWAITING_AUTHORISATION` → `AUTHORISED` or `REJECTED`);
- **DELETE `/consents/{consentId}`**: To revoke an active consent. It can be done by the User, by the Initiator (ITP), or by the Transmitter;
- **POST `/authorisation-retry`**: When the redirection flow fails and there is still a window available (60 minutes for data);
- **POST `/extends`**: Renewal of a consent without having to redo the full authorization flow (when supported by the Holder).

## Proxies for obtaining data

Once the consent is in `AUTHORISED`, the ITP can call the **regulatory proxies** exposed by the Data Reception Module. There are approximately **78 routes** organized by the following families:

| Family | Resources |
| :-----: | :------: |
| **Resources** | Listing of resources linked to the consent and their status |
| **Customers** | Individual registration data (`/personal/*`) and business registration data (`/business/*`) |
| **Accounts** | Accounts, balances, reserved balances, transactions, limits |
| **Credit Card Accounts** | Postpaid accounts, bills, transactions, limits |
| **Loans** | Loan contracts (with installments, payments, guarantees) |
| **Financings** | Financing contracts |
| **Unarranged Accounts Overdraft** | Overdraft advance contracts |
| **Invoice Financings** | Discounted receivables contracts |
| **Bank Fixed Incomes** | Bank fixed income |
| **Credit Fixed Incomes** | Credit fixed income |
| **Variable Incomes** | Variable income |
| **Treasure Titles** | Tesouro Direto |
| **Funds** | Investment funds |
| **Exchanges** | Foreign exchange operations |

The complete specification, including the response schemas of each route, is in [`oas-dados-of.yml`](../anexos/yml/opusTPP-recepcaoDadosOf.yml). For the possible values of each JSON key, see the [associated API][API-OF-Dados].

## Regulatory version header

In **non-proxy** routes (such as `/consents`), the client can choose the version of the Transmitter's endpoints through the header:

| Header | Direction | Behavior |
| :----: | :-----: | :-----------: |
| `x-regulatory-v` | Request | Accepts a full version (`"4.0.0"`) or only the major (`"4"`). If not sent, uses the most recent version. If sent with a nonexistent version, uses the most recent of the same major. |
| `x-selected-regulatory-v` | Response | Indicates which version was actually used in the call to the Transmitter |

> **Important:** The `x-regulatory-v` header **is not accepted** in proxy routes. In those, the version is always the major indicated in the route itself (e.g., `/proxy/open-banking/payments/v5/...`).

## Permission validation (business rules)

The Holder applies this logic upon receiving the `POST /consents`:

| Scenario | Response |
| :-----: | :------: |
| Valid permissions, adhering to the grouping | HTTP 201 Created |
| Permissions diverging from the grouping | HTTP 400 Bad Request |
| Some permissions removed (product not supported by the Transmitter) | HTTP 201 Created with the returned subset |
| No functional permission remaining | HTTP 422 Unprocessable Entity |

> **Practical implication:** Always inspect the `permissions` of the **response** — it may be smaller than requested.

## References

- [Official documentation — Consent API][API-Consents]
- OpenAPI specification: [`oas-dados-of.yml`](../anexos/yml/en-opusTPP-recepcaoDadosOf.yml) (see also [associated API][API-OF-Dados])

[API-Consents]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17369335/API+-+Consentimento
