---
layout: default
title: "Payment Validations"
parent: "Payments"
nav_order: 2
has_children: true
lang: "en"
alternate_lang: 
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/pagamentos/validacoesPagamentos/"
      lang: "pt-br"
    - path: "/Documentation/es/Open-Finance/Plataforma-OpusOpenFinance/Integração/pagamentos/validacoesPagamentos/"
      lang: "es"
---

## Mandatory Payment Validations

The validations below must be implemented in the specific route for payment data validation.

For each validation, the error returned by the integration must include in the `code` field the corresponding error code, as indicated.

## Maximum Payment Amount Validation

**ℹ️ Notes:**

- This validation applies to payments of type `PAYMENT_CONSENT` (value of `requestBody.paymentType`).
- All fields mentioned below are located inside `requestBody.data.payment`.

### Rule

The transaction amount (`amount`) must be below:

- The limit established by the Account Holder Institution (if applicable).
- The absolute maximum value of `999999999.99` BRL (i.e., up to 9 digits before the decimal point and 2 digits after).
- The amount **must not** be equal to the maximum limit.

**Error code:** `VALOR_ACIMA_LIMITE`

## QR Code Validations

**ℹ️ Notes:**

- These validations apply to payments of type `PAYMENT_CONSENT` (value of `requestBody.paymentType`).
- All fields below are located within `requestBody.data.payment`.

### General Rules

1. The QR Code type must match the payment initiation method (`details.localInstrument`):
    - If the initiation method is **QRES**, the QR Code must be **Static**.
    - If the initiation method is **QRDN**, the QR Code must be **Dynamic**.
    - **Error code:** `QRCODE_INVALIDO`

### If the QR Code is **Static**

1. The amount contained in the Static QR Code must match the amount informed in the payment payload (`amount`).
    - **Error code:** `VALOR_INVALIDO`

2. The Pix key present in the Static QR Code must be identical to the Pix key informed in the payment payload (`details.proxy`).
    - **Error code:** `QRCODE_INVALIDO`

### If the QR Code is **Dynamic**

1. The Dynamic QR Code status must be valid for use.
    - **Error code:** `QRCODE_INVALIDO`
