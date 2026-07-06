---
layout: default
title: Backoffice
parent: "How It Works"
grand_parent: "Payment Initiation and Data Receipt"
nav_order: 8
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/backoffice"
      lang: "pt-br"
    - path: "/Documentation/es/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/backoffice"
      lang: "es"
---

## Purpose

The Backoffice API exposes administrative **query** operations over the consent, binding, and payment data of the Payment Initiation Module. It is intended for support, operations, and backoffice teams, and **does not replace** the interfaces aimed at the end user or the client app.

> **Current version:** `1.0.0-beta.1`. For the possible values of each JSON key, see the [associated API][API-Backoffice].

## Endpoints

### 1. List consents

```
GET /backoffice/consents
```

Lists consents with filters, pagination, and ordering.

**Main filters:**

| Filter | Type | Description |
| :----: | :--: | :-------: |
| `cnpj`, `cpf` | string | Holder's document |
| `createdOnBegin`, `createdOnEnd` | date | Creation window |
| `expiresOn` | date | Expiration deadline |
| `searchKey`, `searchKeys` | string / list | Search by generic terms |
| `tppId` | UUID | TPP identifier (when the Payment Initiation Module serves multiple TPPs) |
| `consentId`, `consentIdList` | string / list | Direct filter by identifier |
| `consentStatus`, `consentStatusList` | string / list | Filter by status (e.g., `AUTHORISED`, `REVOKED`) |
| `page`, `pageSize`, `orderType` | int / string | Pagination and ordering |

**Required header:** `x-application-id`

### 2. List enrollments

```
GET /backoffice/enrollments
```

Lists device bindings with filters, pagination, and ordering.

**Main filters:**

| Filter | Type | Description |
| :----: | :--: | :-------: |
| `cnpj`, `cpf` | string | Holder's document |
| `createdOnBegin`, `createdOnEnd` | date | Creation window |
| `expiresOn` | date | Expiration deadline |
| `tppId` | UUID | TPP identifier |
| `enrollmentId`, `enrollmentIdList` | string / list | Direct filter by identifier |
| `enrollmentStatus`, `enrollmentStatusList` | string / list | Filter by status (e.g., `AUTHORISED`, `REJECTED`) |
| `page`, `pageSize`, `orderType` | int / string | Pagination and ordering |

**Required header:** `x-application-id`

### 3. List payments by consent

```
GET /backoffice/consents/{consentId}/payments
```

Lists all payments associated with a consent.

## Typical use cases

- **End-customer support:** check the status of a specific consent for a customer who called the support line complaining about the operation;
- **Internal audit:** extract all consents authorized within a period for reconciliation or compliance;
- **Incident investigation:** filter by `consentStatus=REJECTED` within a window for root-cause analysis;
- **Operational reports:** combine with `tppId` when the Payment Initiation Module serves multiple brands/institutions.

## References

- OpenAPI specification: [`backoffice.yml`](../anexos/yml/en-opusTPP-backoffice.yml) (see also [associated API][API-Backoffice])

[API-Backoffice]: ../../../../../swagger-ui/index.html?api=en-otpp-backoffice
