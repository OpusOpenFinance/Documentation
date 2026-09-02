---
layout: default
title: "Consent Management APIs"
parent: "Opus Open Finance Brazil"
nav_order: 2
lang: "en"
alternate_lang: 
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/apisGestaoDeConsentimentos/index/"
      lang: "pt-br"
    - path: "/Documentation/es/openFinance/opusOpenFinance/apisGestaoDeConsentimentos/index/"
      lang: "es"
---
 
## Consent Management APIs

Consents (both for data sharing and for payments) play a central role throughout the operating model of *Open Finance Brasil*, ensuring that all transactions and operations within the ecosystem are carried out with the proper explicit permission of the end customer.

The **Opus Open Finance Platform** performs the full management of consents and stores them securely in its internal database, also ensuring that any sensitive personal data associated with these consents is always encrypted.

Consents can only be created (and revoked) through direct action by the end customer, whether when they authorize a payment or when they grant a data-sharing consent to a duly authorized participant of *Open Finance Brasil*.

At the same time, the creation or revocation of a consent is the result of a secure interaction between ecosystem participants and is regulated by security protocols. Any request received by the platform can only be carried out if there is an active consent that holds the appropriate permissions to perform the operation.

Thus, the entire creation and management of the lifetime and revocation of consents is the exclusive responsibility of the platform.

The Consent Management API allows the financial institution's applications to extract information about consents (active or not) related to the payments made and the data sharing granted by their customers, as well as to perform back-office operations such as revocation, extension, editing, and the association of metadata and search keys to these consents.

### *Open API Specification*

The API definitions in Open API Specification format can be found [**here**][API-backoffice].

## Consents

Endpoints for querying, revoking, extending, editing, and associating metadata/search-keys to consents (payment, data-sharing, and enrollment/*enrollment*), defined in the [`oasOOFDados.yml`][API-backoffice] specification.

### Listing consents

        GET /open-banking/oob-consents/v1/consents

Returns the paginated list of consents (payment, data-sharing, or enrollment/*enrollment*) registered on the platform. The consent owner can be identified in one of the following ways:

- `cpf` / `cnpj`: Identifies the individual or legal entity responsible for creating the consent. Must contain only digits. **Example**: *99999999999*.
- `consentOwner`: Set of information defined by the Institution to identify the consent owner, such as branch, account, CPF, CNPJ, etc. It is represented by a *key/value* dictionary in *JSON URL Encoded* format. **Example**: For an identifier composed of branch and account:

```json
[{"key": "conta", "value": "12345"}, {"key": "agencia", "value": "12345"}]
```

In addition, the following information can be used to filter the result:

- `createdOnBegin` / `createdOnEnd`: Indicate, respectively, the minimum and maximum creation date (both inclusive) for the consent query. Must be provided with date and time in the format specified in [RFC-3339](https://datatracker.ietf.org/doc/html/rfc3339). **Example**: 2022-12-19T16:39:57Z.
- `consentTermPeriod`: Total consent term in months. If indefinite, the value *-1* must be used. Cannot be used together with the `createdOnBegin` and/or `createdOnEnd` filters.
- `type` / `typeList`: Limits the query to consents of a specific type (`DATA_SHARING`, `PAYMENT`, or `ENROLLMENT`) or to a comma-separated list of types. The two filters cannot be used together.
- `status` / `statusList`: Limits the query to consents in a specific status or in a comma-separated list of statuses, among the following: `AUTHORISED`, `AWAITING_AUTHORISATION`, `REJECTED`, `REVOKED`, `EXPIRED`, `CONSUMED`, `TIMEOUT_AUTHORISATION`, `TIMEOUT_PAYMENT`, `AWAITING_RISK_SIGNALS`, `AWAITING_ACCOUNT_HOLDER_VALIDATION`, `AWAITING_ENROLLMENT`, and `PARTIALLY_ACCEPTED`. The two filters cannot be used together.
- `orderType`: Defines the ordering of the returned consent list. Supports the values *ASC* (ascending creation-date order), *DESC* (descending creation-date order), and *OPF* (ordering according to the Open Finance standard: active, pending, expired, and closed).
- `searchKey` / `searchKeys`: Filters consents by a specific *search key* or by a comma-separated list of *search keys* previously associated with them.
- `orgName`: Filters consents by the name of the associated Open Finance organization/participant; at least 3 characters must be provided.
- `page` / `page-size`: Result pagination parameters.
- `modalityType` (payment only) / `modalityTypeList` **Notes**: Limits the query to payment consents of a specific modality (*IMMEDIATE*, *SCHEDULED*, or *SWEEPING*) or to a comma-separated list of modalities (which may also include *VRP* and *AUTOMATIC*, as in the specification example). The two filters cannot be used together.
- `paymentType` (payment only): Limits the query to payment consents of a specific type. Supports the types: *PIX*, *TED*, or *TEF*.

### Consent detail

        GET /open-banking/oob-consents/v1/consents/{consentId}

Responsible for retrieving all the information of a consent, including its resources and a history of the status changes made. The query is performed through the internal identifier in UUID format.

### Data-sharing consent revocation

        PATCH /open-banking/oob-consents/consents/v1/consents/{consentId}

Responsible for revoking the data-sharing consent related to the given *consentId*.

### Listing active data-sharing consents

        GET /open-banking/oob-consents/consents/v2/active

Responsible for listing authorized consents. It has the following optional parameters:

- `startDate`: If provided, selects all active consents that were created after this date.
- `endDate`: If provided, selects all consents whose expiration is before the provided date. Indefinite consents will not be returned when this parameter is provided.
- `page`: Desired page number.
- `page-size`: Page size.

### Listing payments related to a consent

        GET /open-banking/oob-consents/consents/v1/consents/{consentId}/payments

Displays the paginated list (`page` / `page-size`) of all payments related to the consent identified by the given *consentId*, ordered by payment date in descending order.

### Payment consent revocation

        PATCH /open-banking/oob-consents/payments/v1/consents/{consentId}

Responsible for revoking the automatic payment consent identified by the given *consentId*.

### Recurring (automatic) payment consent revocation

        PATCH /open-banking/oob-consents/automatic-payments/v1/recurring-consents/{recurringConsentId}

Responsible for revoking the automatic (recurring) payment consent identified by the given *recurringConsentId*. Requires the `X-Brand-ID` header.

### Listing Payment Ids generated by ITP

        GET /open-banking/oob-consents/v1/tpps/payment-legacy-ids

Lists the payment ids generated by ITPs within a time range defined by the parameters:

- `startDate`: Indicates the minimum creation date (inclusive) of the payment id. Must be provided with date only. **Example**: 2022-12-19.
- `endDate`: Indicates the maximum creation date (inclusive) of the payment id. Must be provided with date only. **Example**: 2022-12-25.

### Payment status change notification

        POST /open-banking/oob-consents/v1/payment-status-notification

Responsible for notifying the OOF of a change in the status of a payment.

### Consent extension detail

        GET /open-banking/oob-consents/v1/consents/{consentId}/extends

Responsible for listing, in paginated form (`page` / `page-size`), all extensions of a consent. The query is performed through the internal identifier in UUID format.

### Full authorization of a multiple-authorization payment consent

        POST /open-banking/oob-consents/v1/payments/consents/{consentId}/authorisation

Responsible for fully authorizing a multiple-authorization payment consent, signaling the approval of the consent's multiple authorizers. Requires the `X-Brand-ID` header.

### Post search key

        POST /open-banking/oob-consents/consents/v1/consents/{consentId}/search-key/{searchKey}

Responsible for adding a search-key related to a consent, allowing consents to be listed based on this search-key later on.

### Delete search key

        DELETE /open-banking/oob-consents/consents/v1/consents/{consentId}/search-key/{searchKey}

Responsible for deleting a search-key related to a consent.

### Post multiple search keys

        POST /open-banking/oob-consents/consents/v1/consents/{consentId}/search-keys

Responsible for adding multiple search-keys related to a consent in a single request. Requires the `X-Brand-ID` header.

### Query multiple search keys

        GET /open-banking/oob-consents/consents/v1/consents/{consentId}/search-keys

Responsible for checking the existence of multiple search-keys in a consent, provided through the `searchKeys` parameter. Requires the `X-Brand-ID` header.

### Delete multiple search keys

        DELETE /open-banking/oob-consents/consents/v1/consents/{consentId}/search-keys

Responsible for deleting multiple search-keys related to a consent in a single request, provided through the `searchKeys` parameter. Requires the `X-Brand-ID` header.

### Put consent metadata

        PUT /open-banking/oob-consents/consents/v1/consents/{consentId}/meta-data

Responsible for adding a metadata json linked to a consent, replacing any value previously held in this metadata field. It can be used to add extra information to the consent, for example to add information relevant to the application's screens.

### Get consent metadata

        GET /open-banking/oob-consents/consents/v1/consents/{consentId}/meta-data

Responsible for retrieving the metadata information json previously sent.

### Patch consent metadata

        PATCH /open-banking/oob-consents/consents/v1/consents/{consentId}/meta-data

Responsible for updating the metadata json linked to a consent, adding information to the already existing metadata.

### Delete consent metadata

        DELETE /open-banking/oob-consents/consents/v1/consents/{consentId}/meta-data

Responsible for deleting the metadata information related to a consent.

### Enrollment revocation

        PATCH /open-banking/oob-consents/enrollments/v1/enrollments/{enrollmentId}

Responsible for revoking an enrollment (*enrollment*), returning its details and the history of the status changes made. The revocation is performed through the enrollment's internal identifier in UUID format.

### Enrollment editing

        PATCH /open-banking/oob-consents/enrollments/v1/enrollments/{enrollmentId}/edit

Responsible for editing information of an already existing enrollment (*enrollment*), such as expiration date, daily limit, and per-transaction limit. Requires the `X-Brand-ID` header.

### Resource change notification

        POST /open-banking/oob-consents/v1/resources-notification

Responsible for notifying the OOF of a change in non-selectable resources (such as loan, financing, overdraft, among others) by CPF, CNPJ, or search key.

### Enable/Disable webhook sending

        PATCH /open-banking/oob-consents/v1/webhook/toggle/{consentId}

Endpoint used to enable or disable the sending of optional webhooks to the back office, tied to the consent. Requires the `X-Brand-ID` header.

### Get webhook sending status

        GET /open-banking/oob-consents/v1/webhook/status/{consentId}

Endpoint used to fetch the status of optional webhook sending to the back office, tied to the consent. Requires the `X-Brand-ID` header.

## Payments

Endpoint for the payment cancellation operation, defined in the [`oasOOFDados.yml`][API-backoffice] specification.

### Payment revocation

        PATCH /open-banking/oob-payments/v2/pix/payments/{paymentId}

This endpoint must be used to cancel, at the request of the paying customer, transactions that are in one of the following situations: successfully scheduled (`SCHD`), held for analysis (`PDNG`), or awaiting multiple-authorization approval (`PATC`).

- If the request is successful, the transaction moves to the `CANC` status.
- If the payment status is different from `SCHD`/`PDNG`/`PATC`, or some other business rule prevents cancellation, the request returns HTTP Status 422 with the code `PAGAMENTO_NAO_PERMITE_CANCELAMENTO`.
- If a 422 is received, the initiator must make a GET request on the payment to check its current situation, as well as the associated details.
Payment cancellation must be sent by 23:59 (Brasília time) on the day before the payment's settlement date.

[API-backoffice]: ../../../../swagger-ui/index.html?api=en-oas-back-dados
