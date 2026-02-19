---
layout: default
title: "Payment Scenarios"
parent: "Payments"
nav_order: 3
has_children: true
lang: "en"
alternate_lang: 
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/pagamentos/cenariosPagamentos/"
      lang: "pt-br"
    - path: "/Documentation/es/Open-Finance/Plataforma-OpusOpenFinance/Integração/pagamentos/cenariosPagamentos/"
      lang: "es"
---

## Payment Scenarios to Be Covered by the Integration

When implementing the payment integration, it is necessary to cover the creation and consultation of payments for each of the scenarios below.

For payments held for analysis (status “PDNG” in Open Finance) or scheduled payments, the possibility of payment revocation must also be supported.

## Scenarios by Logged User Type

- **Individual (PF)**
- **Business (PJ)** *(when supported by the financial institution’s backend)*

## Scenarios by Payment Settlement Date

- **Instant**: Payments that must be settled on the same day they are requested.
- **Scheduled**: Payments that must be settled on a future date.

## Scenarios by Payment Initiation Method

- **MANU**: Initiated by manually entering banking data.
- **INIC**: Initiated by the payee (*creditor*).
- **DICT**: Initiated using a Pix key.
- **QRES**: Initiated via Static QR Code.
- **QRDN**: Initiated via Dynamic QR Code.

## Scenarios by Type of Payment Attempt

The Pix Scheme allows retries for specific payments, such as Automatic Pix.  
When performing a Pix via Open Finance, the integration must properly handle the following payment attempts:

- **Original Request:** The first execution attempt, which occurs for all payments.
- **Extra-day Retry:** Supported only for specific payment types (e.g., Automatic Pix). This is a new attempt performed on a different day from the original attempt.

**⚠️ Important:** The same-day retry (intra-day), when applicable, must be identified and handled by the financial institution’s backend system.

---

## How to Identify the Scenarios

Below is a more technical view of the rules for identifying the payment scenarios described above.

The field analysis below applies to the payload of the payment creation request.

### How to Identify the Logged User Type

| Field `consent.businessDocumentType.document.identification` | Interpretation |
| ------------------------------------------------------------ | -------------- |
| Absent                                                       | Individual PF  |
| Present                                                      | Business PJ    |

**ℹ️ Note:** Regardless of the user type, their CPF will be available in `consent.loggedUser.document.identification`.

### How to Identify the Payment Settlement Date

The field that defines the payment date varies according to the payment type (`paymentType` field):

- If `paymentType` is `PAYMENT_CONSENT`

| Field `consent.payment.schedule`          | Scenario   | Payment Date                           |
| ----------------------------------------- | ---------- | -------------------------------------- |
| **Absent**                                | Instant    | Current date                           |
| Has subfield `single`                     | Scheduled  | `consent.payment.schedule.single.date` |
| Has subfield **different** from `single`  | Scheduled  | `requestBody.data.date`                |

- If `paymentType` is `PAYMENT_RECURRING_CONSENT`

| Field `requestBody.data.date` | Scenario   | Payment Date            |
| ----------------------------- | ---------- | ----------------------- |
| Is the **current** date       | Instant    | Current date            |
| Is a **future** date          | Scheduled  | `requestBody.data.date` |

### How to Identify the Initiation Method and the Creditor

The **payment initiation method** is determined by the value of `requestBody.data.localInstrument`.  
The way the **creditor** is identified varies according to the initiation type.

The table below summarizes the fields used to identify each scenario:

| Initiation Method  | Fields Used to Identify the Creditor                         |
| :----------------: | ------------------------------------------------------------ |
|        MANU        | `creditorAccount` (Object containing banking information)    |
|        INIC        | `creditorAccount` + `proxy` (Pix Key)                        |
|        DICT        | `creditorAccount` + `proxy`                                  |
|        QRES        | `creditorAccount` + `proxy` + `qrCode` (String with QR Code) |
|        QRDN        | `creditorAccount` + `proxy` + `qrCode`                       |

**⚠️ Important:** When more than one identification field is provided, consistency among them must be validated.  
Example: the Pix key must correspond to the same account indicated in `creditorAccount`.

**ℹ️ Note:** All fields mentioned in the table above are located inside `requestBody.data`.

### How to Identify the Payment Attempt

| Field `requestBody.data.originalRecurringPaymentId` | Interpretation       |
| --------------------------------------------------- | -------------------- |
| Absent                                              | Original Attempt     |
| Filled with the original payment ID                 | Extra-day Retry      |
