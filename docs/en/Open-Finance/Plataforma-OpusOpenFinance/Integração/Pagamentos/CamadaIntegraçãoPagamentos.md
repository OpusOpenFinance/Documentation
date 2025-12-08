---
layout: default
title: "Payments"
parent: "Platform Integration"
nav_order: 3
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/Pagamentos/CamadaIntegraçãoPagamentos/"
      lang: "pt-br"
    - path: "/Documentation/es/Open-Finance/Plataforma-OpusOpenFinance/Integração/Pagamentos/CamadaIntegraçãoPagamentos/"
      lang: "es"
---

## Payment Integration

The integration of the **Opus Open Finance Platform** with the _Open Finance Brasil_ payments pillar is required for the _Account Holder_ profile. This integration allows the platform to route payment requests to the backend systems required for the payment flow.

Payments via _Open Finance Brasil_ are executed by financial institutions acting under the **payment transaction initiator (ITP)** profile. In a typical scenario, this payment occurs in two steps. In the first step, the _ITP_ sends the _Account Holder_ a request to _create a payment consent_. At this stage, the financial institution’s customer authorizes the payment, and the _payment consent_ is created by the _Account Holder_, with its unique identifier returned to the _ITP_. In the second step, the _payment settlement_ step, the _ITP_ sends a payment execution request referencing the unique consent ID previously created, and the payment is completed.

Both the _payment consent creation_ step and the _payment settlement_ step require integrations between the **Opus Open Finance Platform** and the financial institution’s backend systems. These integrations are implemented through the construction of the _payment integration layer_. This layer must implement a _REST API_, described later in this document, so that the platform can call it when handling a payment request.

Although _Open Finance Brasil_ regulation anticipates support for multiple payment methods in the future, currently only **Pix** is supported.

{:.important}
_Payment consent creation_ typically involves interaction with two types of financial institution systems: backend systems, such as checking accounts and the _Pix_ payment module, and digital channel systems, such as _mobile banking_ or _internet banking_. The _payment integration layer_ deals exclusively with backend systems. Aspects related to integration with digital channels—typically needed to obtain customer authorization through authentication—are described in the [_App and Web_][App-e-Web] integration section of this documentation.

### Payment Integration Layer

The diagram below illustrates the interaction between the **Opus Open Finance Platform** and the _payment integration layer_ through the _REST API_.

![Integration-Layer][Imagem-Camada-Integração]

The _payment integration layer_ must implement a _REST API_ that exposes five different operations: two that are invoked during the _payment consent creation_ step and three that are invoked during the _payment settlement_ step:

_Payment consent creation step:_

1. _Account discovery_: Responsible for finding accounts associated with the customer requesting a payment initiation.
2. _Consent validation_: During consent creation, _Open Finance Brasil_ regulation requires specific validations to be performed over the payment data, as described later in this document. This validation helps prevent payment errors after consent approval.

_Payment settlement step:_

1. _Create a payment initiation_: Request to trigger the payment associated with the previously created consent. Typically, this is when the call to _Pix_ is made.
2. _Retrieve payment status_: Operation to return the payment status, according to the _Open Finance Brasil_ [state machine](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/347078805/M+quina+de+Estados+-+v4.0.0+-+SV+Pagamentos).
3. _Cancel a payment_: For scheduled payments, this operation allows cancellation of a scheduled payment via Open Finance.

### Integration API

The description of the API that must be implemented by the _payment integration layer_, known as the _Payment Initiation API_, can be found [**here**][API-pagamento].

To download the YAML/OAS file containing the API specification, click [**here**](../apis/en-payment-integration-0-1-0.yml){:download="../apis/en-payment-integration-0-1-0.yml"}.

### Payment Scenarios to Be Covered by the Integration

When implementing the payment integration, it is necessary to cover the creation and consultation of payments in each of the scenarios described below.

For payments held for analysis (status “PDNG” in _Open Finance Brasil_) or scheduled payments, the possibility of payment revocation must also be supported.

#### Scenarios by Payer Customer Type

- **Individual (PF)**
- **Business (PJ)** _(when supported by the financial institution’s backend)_

#### Scenarios by Payment Settlement Date

- **Instant**: Payments that must be settled on the same day as the request.
- **Scheduled**: Payments that must be settled on a future date.

#### Scenarios by Payment Initiation Method

- **MANU**: Manually entered banking data.
- **INIC**: Initiated by the payee (_creditor_).
- **DICT**: Initiated via _Pix_ key.
- **QRES**: Initiated via Static QR Code.
- **QRDN**: Initiated via Dynamic QR Code.

#### Scenarios by Payment Attempt Type

The _Pix_ scheme supports retries for specific types of payments, such as _Automatic Pix_.  
When executing a _Pix_ via Open Finance, the integration must properly handle the following payment attempts:

- **Original Request:** The first attempt to execute the payment, which occurs for all payments.
- **Extra-day Retry:** Supported only for specific payment types (e.g., _Automatic Pix_). It is a retry performed on a **different day** from the original attempt.

{:.important}
⚠️ _Same-day retries_, when applicable, must be identified and handled by the financial institution’s backend system.

---

### How to Identify Scenarios

Below is a more technical overview of the rules for identifying the payment scenarios described earlier.

The field analysis below is performed on the payload of the payment creation request.

#### How to Identify the Payer Customer Type

| Field `consent.businessDocumentType.document.identification` | Interpretation |
| :----------------------------------------------------------- | ------------- |
| Absent                                                       | Individual (PF) |
| Present                                                      | Business (PJ) |

{:.note}
ℹ️ Regardless of user type, the CPF will always be available in `consent.loggedUser.document.identification`.

#### How to Identify the Payment Settlement Date

The field defining the payment date varies according to the payment type (`paymentType` field):

##### If `paymentType` is `PAYMENT_CONSENT`

| Field `consent.payment.schedule`     | Scenario    | Payment Date                            |
| :----------------------------------- | :---------- | :-------------------------------------- |
| **Absent**                           | Instant     | Current date                            |
| Has `single` subfield                | Scheduled   | `consent.payment.schedule.single.date`  |
| Has a subfield **other than** `single` | Scheduled | `requestBody.data.date`                 |

##### If `paymentType` is `PAYMENT_RECURRING_CONSENT`

| Field `requestBody.data.date` | Scenario    | Payment Date             |
| :---------------------------- | :---------- | :----------------------- |
| Is **current** date           | Instant     | Current date             |
| Is **future** date            | Scheduled   | `requestBody.data.date`  |

#### How to Identify Initiation Method and Creditor

The **payment initiation method** is determined by the value of `requestBody.data.localInstrument`.  
The method for identifying the **creditor** varies according to the initiation type.

The table below summarizes the fields used to identify each scenario:

| Initiation Method | Fields Used to Identify the Creditor                                  |
| :---------------- | :--------------------------------------------------------------------- |
| MANU              | `creditorAccount` (banking information object)                         |
| INIC              | `proxy` (_Pix_ key)                                                    |
| DICT              | `proxy` + `creditorAccount`                                            |
| QRES              | `proxy` + `creditorAccount` + `qrCode` (string with QR code contents)  |
| QRDN              | `proxy` + `creditorAccount` + `qrCode`                                 |

{:.important}
⚠️ When more than one identification method is provided, consistency between them must be validated.  
Example: the _Pix_ key must refer to the same account indicated in the `creditorAccount` field.

{:.note}
ℹ️ All fields listed above are located inside `requestBody.data`.

#### How to Identify the Payment Attempt

| Field `requestBody.data.originalRecurringPaymentId` | Interpretation          |
| :-------------------------------------------------- | :---------------------- |
| Absent                                              | Original Attempt        |
| Filled with original payment ID                     | Extra-day Retry         |

### Required Payment Validations

The following validations must be implemented in the specific route for payment data validation.

For each validation, the error returned by the integration must include the corresponding `code` value.

#### Maximum Payment Amount Validation

**ℹ️ Notes:**

- Validation applies to payments of type `PAYMENT_CONSENT` (`requestBody.paymentType`).
- All fields below are located within `requestBody.data.payment`.

##### Rule

The transaction amount (`amount`) must be below:

- The limit established by the Account Holder Institution (if any).
- The absolute maximum value of `999999999.99` BRL (i.e., up to 9 digits before and 2 digits after the decimal point).
- The amount **cannot** be equal to the maximum limit.

**Error code:** `VALOR_ACIMA_LIMITE`

### QR Code Validations

**ℹ️ Notes:**

- Validations apply to payments of type `PAYMENT_CONSENT` (`requestBody.paymentType`).
- All fields below are located inside `requestBody.data.payment`.

#### General Rules

1. The QR Code type must match the initiation method (`details.localInstrument`):
   - If initiation is **QRES**, the QR Code must be **Static**.
   - If initiation is **QRDN**, the QR Code must be **Dynamic**.
   - **Error code:** `QRCODE_INVALIDO`

##### If the QR Code is **Static**

1. The value in the Static QR Code must match the payment payload `amount`.
   - **Error code:** `VALOR_INVALIDO`

2. The _Pix_ key in the Static QR Code must match the _Pix_ key in the payment payload (`details.proxy`).
   - **Error code:** `QRCODE_INVALIDO`

##### If the QR Code is **Dynamic**

1. The Dynamic QR Code status must be valid for use.
   - **Error code:** `QRCODE_INVALIDO`

### Integration – Frequently Asked Questions (FAQ)

#### About Resource Discovery

Questions related to [resource discovery in Opus Open Finance][Discovery-Recursos].

**What is a “resource”?**

In Open Finance, “resources” are data or service components that can be consumed via APIs, according to security and consent requirements.  
In practice, a resource may be a transactional account, card, investment, etc.

**What should I return in the `key` fields of `resourceLegacyId` and `resourceName`?**

`resourceLegacyId` and `resourceName` act as internal identifiers in the financial institution’s backend and must be defined for use in this layer. Both are structured as lists of key-value pairs to support composite identifiers.

Example for a simple ID:

```json
"resourceLegacyId": [
    { "key": "id", "value": "<id value>" }
]
```

For `resourceName`, values should help users recognize the resource. For example, for a bank account:

```json
"resourceName": [
    { "key": "branch", "value": "<branch number>" },
    { "key": "account", "value": "<account number>" }
]
```

**If the user has no accounts to return, should I return an error or an empty list?**

Return success (HTTP 200) with an empty list (`{ "data": { "resources": [] } }`).

**In payment flow account discovery, which account should be “selected by default”?**

If the consent's `debtorAccount` field is filled with a valid payment account, that account must be marked `"defaultSelected": true`. Regardless, all accounts available for payment must be returned.

#### About Payment Data Validation

**What must be validated in the payment data validation route?**

See [mandatory payment validations][Validacoes-Pagamentos].

#### About Payment Creation Requests

**How to identify the account chosen by the user for the debit?**

After payment consent approval, the `consent.resources` list in the payment request payload will contain exactly one resource: the selected account.
The `consent.debtorAccount` field will also always be populated with the chosen account.

**Where to find the payment date for each scenario or payment type?**

See [how to identify the payment date][Cenarios-Pagamentos].

**Does the financial institution backend need to support Recurring Scheduling?**

No. The **Opus Open Finance Platform** will send a separate request for each recurrence date.

For example, for a recurring schedule of 5 months (one debit per month), the platform will send 5 separate scheduling requests to the backend.
The date of each schedule must follow the rules described in [how to identify the payment date][Cenarios-Pagamentos].

[App-e-Web]: ./App-e-Web.html
[Imagem-Camada-Integração]: ../images/CamadaIntegração.png
[API-pagamento]: ../../../../swagger-ui/index.html?api=en-payment-integration
[Cenarios-Pagamentos]: ./integracao-plugin/cenarios-pagamentos/Cenarios-Pagamentos.html
[Validacoes-Pagamentos]: ./integracao-plugin/validacoes-pagamentos/Validacoes-Pagamentos.html
[Discovery-Recursos]: ./integracao-plugin/consent/Discovery-Recursos.html
