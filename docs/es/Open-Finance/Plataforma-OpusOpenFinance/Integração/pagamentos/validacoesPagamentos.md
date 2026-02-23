---
layout: default
title: "Validaciones de Pagos"
parent: "Pagos"
nav_order: 2
has_children: true
lang: "es"
alternate_lang: 
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/pagamentos/validacoesPagamentos/"
      lang: "en"
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/pagamentos/validacoesPagamentos/"
      lang: "pt-br"
---

## Validaciones Obligatorias para Pagos

Las siguientes validaciones deben ser implementadas en la ruta específica para la validación de datos del pago.

Para cada validación, el error listado en la respuesta de la integración debe presentar en el campo `code` el código correspondiente, según lo indicado.

## Validación del Valor Máximo del Pago

**ℹ️ Observaciones:**

- Validación realizada para pagos del tipo `PAYMENT_CONSENT` (valor del campo `requestBody.paymentType`).
- Todos los demás campos abajo están localizados dentro de `requestBody.data.payment`.

### Regla

El valor de la transacción (campo `amount`) debe estar por debajo:

- Del límite establecido por la Institución Titular (si existe).
- Del valor máximo absoluto, en reales, de `999999999.99` (esto es, hasta 9 dígitos antes del punto decimal y 2 después).
- El valor **no** puede ser igual al límite máximo.

**Código de error:** `VALOR_ACIMA_LIMITE`

## Validaciones de QR Code

**ℹ️ Observaciones:**

- Validaciones realizadas para pagos del tipo `PAYMENT_CONSENT` (valor del campo `requestBody.paymentType`).
- Todos los demás campos abajo están localizados dentro de `requestBody.data.payment`.

### Reglas Generales

1. El tipo de QR Code debe ser coherente con la forma de iniciación del pago (campo `details.localInstrument`):
    - Si la forma de iniciación es **QRES**, el QR Code debe ser **Estático**.
    - Si la forma de iniciación es **QRDN**, el QR Code debe ser **Dinámico**.
    - **Código de error:** `QRCODE_INVALIDO`

### Caso el QR Code sea **Estático**

1. El valor presente en el QR Code Estático debe ser el mismo informado en el payload del pago (campo `amount`).
    - **Código de error:** `VALOR_INVALIDO`

2. La llave Pix presente en el QR Code Estático debe ser idéntica a la llave Pix informada en el payload del pago (campo `details.proxy`).
    - **Código de error:** `QRCODE_INVALIDO`

### Caso el QR Code sea **Dinámico**

1. El estado del QR Code Dinámico debe ser válido para uso.
    - **Código de error:** `QRCODE_INVALIDO`
