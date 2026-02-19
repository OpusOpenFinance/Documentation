---
layout: default
title: "Escenarios de Pagos"
parent: "Pagos"
nav_order: 3
has_children: true
lang: "es"
alternate_lang: 
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/pagamentos/cenariosPagamentos/"
      lang: "en"
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/pagamentos/cenariosPagamentos/"
      lang: "pt-br"
---

## Escenarios de Pagos a Seren Cobertos por la Integración

En la implementación de la integración de pagos, es necesario cubrir la creación y la consulta de pagos en cada uno de los siguientes escenarios.

Para pagos retenidos para análisis (estado "PDNG" en Open Finance) o programados, también es necesario contemplar la posibilidad de revocación del pago.

## Escenarios por Tipo de Usuario Conectado

- **Persona Física (PF)**
- **Persona Jurídica (PJ)** *(cuando sea soportado por el back-office de la institución financiera)*

## Escenarios por Fecha de Efectivación del Pago

- **Instantáneo**: Pagos a efectivarse el mismo día de la solicitud.
- **Programado**: Pagos a efectivarse en fecha futura.

## Escenarios por Forma de Iniciación del Pago

- **MANU**: Iniciado por inserción manual de los datos bancarios.
- **INIC**: Iniciado por el recibidor (*creditor*).
- **DICT**: Iniciado por uso de llave Pix.
- **QRES**: Iniciado por QR Code Estático.
- **QRDN**: Iniciado por QR Code Dinámico.

## Escenarios por Tipo de Intento de Pago

El Arreglo Pix posibilita reintentos para pagos específicos, como el Pix automático.  
Al realizar un Pix por Open Finance, la integración debe tratar adecuadamente los siguientes intentos de pago:

- **Solicitud Original:** El primer intento de ejecución del pago, que ocurre para todos los pagos.
- **Reintento Extradía:** Solo soportado para pagos específicos (ej.: Pix automático). Es un nuevo intento realizado en un día diferente al intento original.

**⚠️ Importante:** El reintento intradía (realizado el mismo día), cuando sea aplicable, debe ser identificado y tratado por el sistema de back-office de la institución financiera.

---

## Cómo Identificar los Escenarios

A continuación, se presenta una visión más técnica de las reglas de identificación de los escenarios de pagos descritos anteriormente.

El análisis de campos abajo se realiza sobre el payload de la solicitud de creación de pagos.

### Cómo Identificar el Tipo de Usuario Conectado

| Campo `consent.businessDocumentType.document.identification` | Interpretación |
| ------------------------------------------------------------ | -------------- |
| Ausente                                                      | Usuario PF     |
| Cumplimentado                                                | Usuario PJ     |

**ℹ️ Observación:** Independientemente del tipo de usuario, el CPF del mismo estará disponible en el campo `consent.loggedUser.document.identification`.

### Cómo Identificar la Fecha de Efectivación del Pago

El campo que define la fecha del pago varía según el tipo de pago (campo `paymentType`):

- Caso `paymentType` sea `PAYMENT_CONSENT`

| Campo `consent.payment.schedule`          | Escenario     | Fecha de Pago                          |
| ----------------------------------------- | ------------- | -------------------------------------- |
| **Ausente**                               | Instantáneo   | Fecha actual                           |
| Posee subcampo `single`                   | Programado    | `consent.payment.schedule.single.date` |
| Posee subcampo **diferente** de `single`  | Programado    | `requestBody.data.date`                |

- Caso `paymentType` sea `PAYMENT_RECURRING_CONSENT`

| Campo `requestBody.data.date` | Escenario     | Fecha de Pago           |
| ----------------------------- | ------------- | ----------------------- |
| Es fecha **actual**           | Instantáneo   | Fecha actual            |
| Es fecha **futura**           | Programado    | `requestBody.data.date` |

### Cómo Identificar la Forma de Iniciación y el Recibidor (creditor)

La **forma de iniciación** del pago es determinada por el valor del campo `requestBody.data.localInstrument`.  
La forma de identificación del **recibidor (creditor)** varía según el tipo de iniciación informado.

La tabla abajo resume los campos para la identificación de cada escenario:

| Forma de Iniciación | Campos utilizados para identificar al recibidor                      |
| :-----------------: | -------------------------------------------------------------------- |
|        MANU         | `creditorAccount` (Objeto con informaciones bancarias)               |
|        INIC         | `creditorAccount` + `proxy` (Llave Pix)                              |
|        DICT         | `creditorAccount` + `proxy`                                          |
|        QRES         | `creditorAccount` + `proxy` + `qrCode` (String con el QR Code leído) |
|        QRDN         | `creditorAccount` + `proxy` + `qrCode`                               |

**⚠️ Importante:** Cuando haya más de una forma de identificación, se debe validar la consistencia entre ellas.
Ejemplo: la llave Pix debe referirse a la misma cuenta indicada en el campo creditorAccount.

**ℹ️ Observación:** Todos los campos mencionados en la tabla arriba están localizados dentro de `requestBody.data`.

### Cómo Identificar el Intento de Pago

| Campo `requestBody.data.originalRecurringPaymentId` | Interpretación        |
| --------------------------------------------------- | --------------------  |
| Ausente                                             | Intento Original      |
| Cumplimentado con el ID del pago original           | Reintento Extradía    |
