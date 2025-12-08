---
layout: default
title: "Pagos"
parent: "Integración de la Plataforma"
nav_order: 3
has_children: true
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/Pagamentos/CamadaIntegraçãoPagamentos/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/Pagamentos/CamadaIntegraçãoPagamentos/"
      lang: "en"
---

## Integración con Pagos

La integración de la **Plataforma Opus Open Finance** con el pilar de pagos del _Open Finance Brasil_ es necesaria para el perfil de _Detentor de Cuenta_. Esta integración permite que la plataforma dirija solicitudes de pago hacia los sistemas de backend necesarios para el flujo del pago.

Los pagos vía _Open Finance Brasil_ se realizan a partir de instituciones financieras actuando con el perfil de **iniciador de transacción de pago (ITP)**. En un escenario típico, este pago se realiza en dos etapas. En la primera, el _ITP_ envía al _Detentor de Cuenta_ una solicitud para la _creación de consentimiento de pago_. Es en esta etapa que el cliente de la institución financiera autoriza la realización del pago y el _consentimiento de pago_ es creado por el _Detentor de Cuenta_ y su identificación única es devuelta al _ITP_. En la segunda etapa, de _liquidación del pago_, el _ITP_ envía la solicitud de realización de pago haciendo referencia a la identificación única de aquel _consentimiento de pago_ creado, y el pago es efectivado.

Tanto para la etapa de _creación de consentimiento de pago_ como para la de _liquidación del pago_ son necesarias integraciones de la **Plataforma Opus Open Finance** con los sistemas de backend de la institución financiera donde el producto está siendo implementado. Tales integraciones se realizan a través de la construcción de la _capa de integración de pagos_. Esta capa debe implementar una _API REST_, descrita más adelante en este documento, para que la plataforma pueda activarla cuando procesa una solicitud de pago.

Aunque la regulación del _Open Finance Brasil_ prevé diversos medios de pago en el futuro, actualmente solo el **Pix** es soportado.

{:.importante}
La _creación de consentimiento de pago_ normalmente implica interacción con dos tipos de sistemas de la institución financiera: sistemas de backend, como cuenta corriente y el módulo de pagos _Pix_, y sistemas de canales digitales de atención, como _mobile banking_ e _internet banking_. La _capa de integración de pagos_ trata exclusivamente con los sistemas de backend. Los aspectos referentes a la integración con canales digitales de atención, típicamente para obtener la autorización del cliente a través de autenticación, están descritos en la sección de integración [_App y Web_][App-e-Web] de esta documentación.

### Capa de Integración de Pagos

La imagen a continuación esquematiza la interacción de la **Plataforma Opus Open Finance** con la _capa de integración de pagos_ a través de la _API REST_.

![Capa-Integración][Imagen-Capa-Integración]

La _capa de integración de pago_ debe implementar una _API REST_ que disponga de cinco diferentes operaciones, dos que serán llamadas durante la etapa de _creación del consentimiento de pago_ y tres que serán llamadas durante la etapa de _liquidación del pago_:

_Etapa de creación del consentimiento de pago:_

1. _Descubrimiento de cuenta_: Responsable de encontrar las cuentas asociadas al cuentahabiente que está solicitando una iniciación de pago.
2. _Validación de consentimiento_: Durante la creación del consentimiento, el regulador del _Open Finance Brasil_ exige que ciertas validaciones sean realizadas sobre los datos del pago, como se detalla más adelante en este documento. Esta validación es necesaria para evitar errores de pago tras la aprobación del consentimiento.

_Etapa de liquidación del pago:_

1. _Crear una iniciación de pago_: Solicitud para activar el pago vinculado al consentimiento previamente creado. Típicamente, es en este momento que se realiza la llamada al _Pix_.
2. _Devolver el estado de un pago_: Operación para devolver el estado de pago, de acuerdo con la [máquina de estados](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/347078805/M+quina+de+Estados+-+v4.0.0+-+SV+Pagamentos) del _Open Finance Brasil_.
3. _Cancelar un pago_: Para el caso de pagos programados, esta es la operación que permite cancelar la programación vía Open Finance.

### API de integración

La descripción de la API que debe ser implementada por la _capa de integración de pago_, que es la API _Payment Initiation_, puede encontrarse [**aquí**.][API-pago].

Para descargar el archivo YAML/OAS que contiene la especificación de la API haga clic [**aquí**](../apis/payment-integration-0-1-0.yml){:download="../apis/payment-integration-0-1-0.yml"}.

### Escenarios de Pagos a Ser Cúbiertos por la Integración

En la implementación de la integración de pagos, es necesario cubrir la creación y la consulta de pagos en cada uno de los escenarios descritos a continuación.

Para pagos retenidos para análisis (estado "PDNG" del _Open Finance Brasil_) o programados, también es necesario contemplar la posibilidad de revocación del pago.

#### Escenarios por Tipo de Cliente Pagador

- **Persona Física (PF)**
- **Persona Jurídica (PJ)** _(cuando es soportado por el backend de la institución financiera)_

#### Escenarios por Fecha de Efectuación del Pago

- **Instantáneo**: Pagos a ser efectuados el mismo día de la solicitud.
- **Programado**: Pagos a ser efectuados en fecha futura.

#### Escenarios por Forma de Iniciación del Pago

- **MANU**: Iniciado por inserción manual de los datos bancarios.
- **INIC**: Iniciado por el receptor (_creditor_).
- **DICT**: Iniciado por uso de clave _Pix_.
- **QRES**: Iniciado por QR Code Estático.
- **QRDN**: Iniciado por QR Code Dinámico.

#### Escenarios por Tipo de Intento de Pago

El Arreglo _Pix_ posibilita reintentos para pagos específicos, como el _Pix Automático_.  
Al realizar un _Pix_ por Open Finance, la integración debe tratar adecuadamente los siguientes intentos de pago:

- **Solicitud Original:** El primer intento de ejecución del pago, que ocurre para todos los pagos.
- **Reintento Extra-día:** Solamente soportado para pagos específicos (e.j.: _Pix Automático_). Es un nuevo intento realizado en un día diferente del intento original.

{:.importante}
⚠️ El reintento intra-día (realizado el mismo día), cuando aplicable, debe ser identificado y tratado por el sistema de backend de la institución financiera.

---

### Cómo Identificar los Escenarios

A continuación, se presenta una visión más técnica de las reglas para identificar los escenarios de pagos descritos anteriormente.

El análisis de campos a continuación se hace para el payload de la solicitud de creación de pagos.

#### Cómo Identificar el Tipo de Usuario Cliente Pagador

| Campo `consent.businessDocumentType.document.identification` | Interpretación |
| :----------------------------------------------------------- | -------------  |
| Ausente                                                      | Usuario PF     |
| Rellenado                                                    | Usuario PJ     |

{:.nota}
ℹ️ Independientemente del tipo de usuario, su CPF estará disponible en el campo `consent.loggedUser.document.identification`.

#### Cómo Identificar la Fecha de Efectuación del Pago

El campo que define la fecha del pago varía según el tipo de pago (campo `paymentType`):

##### Caso `paymentType` sea `PAYMENT_CONSENT`

| Campo `consent.payment.schedule`          | Escenario     | Fecha de Pago                          |
| :---------------------------------------- | :------------ | :------------------------------------- |
| **Ausente**                               | Instantáneo   | Fecha actual                           |
| Posee subcampo `single`                   | Programado    | `consent.payment.schedule.single.date` |
| Posee subcampo **diferente** de `single`  | Programado    | `requestBody.data.date`                |

##### Caso `paymentType` sea `PAYMENT_RECURRING_CONSENT`

| Campo `requestBody.data.date` | Escenario     | Fecha de Pago         |
| :---------------------------- | :------------ | :-------------------- |
| Es fecha **actual**           | Instantáneo   | Fecha actual          |
| Es fecha **futura**           | Programado    | `requestBody.data.date` |

#### Cómo Identificar la Forma de Iniciación y el Receptor (creditor)

La **forma de iniciación** del pago está determinada por el valor del campo `requestBody.data.localInstrument`.  
La forma de identificación del **receptor (creditor)** varía según el tipo de iniciación informado.

La tabla a continuación resume los campos para la identificación de cada escenario:

| Forma de Iniciación | Campos utilizados para identificar el receptor                    |
| :-----------------  | :---------------------------------------------------------------- |
|        MANU         | `creditorAccount` (objeto con información bancaria)               |
|        INIC         | `proxy` (Clave _Pix_)                                               |
|        DICT         | `proxy` + `creditorAccount`                                       |
|        QRES         | `proxy` + `creditorAccount` + `qrCode` (String con el QR Code leído) |
|        QRDN         | `proxy` + `creditorAccount` + `qrCode`                            |

{:.importante}
⚠️ Cuando haya más de una forma de identificación, debe validarse la coherencia entre ellas.
Ejemplo: la clave _Pix_ debe referirse a la misma cuenta indicada en el campo creditorAccount.

{:.nota}
ℹ️ Todos los campos mencionados en la tabla anterior están ubicados dentro de `requestBody.data`.

#### Cómo Identificar el Intento de Pago

| Campo `requestBody.data.originalRecurringPaymentId` | Interpretación         |
| :-------------------------------------------------- | :-------------------   |
| Ausente                                             | Intento Original       |
| Rellenado con el ID del pago original               | Reintento Extra-día    |

### Validaciones Obligatorias para Pagos

Las validaciones a continuación deben ser implementadas en la ruta específica para la validación de datos del pago.

Para cada validación, el error listado en la respuesta de la integración debe presentar en el campo `code` el código correspondiente, según indicado.

#### Validación del Valor Máximo del Pago

**ℹ️ Observaciones:**

- Validación realizada para pagos del tipo `PAYMENT_CONSENT` (valor del campo `requestBody.paymentType`).
- Todos los demás campos abajo están ubicados dentro de `requestBody.data.payment`.

##### Regla

El valor de la transacción (campo `amount`) debe estar por debajo:

- Del límite establecido por la Institución Detentora (si existe).
- Del valor máximo absoluto, en reales, de `999999999,99` (es decir, hasta 9 dígitos antes del punto decimal y 2 después).
- El valor **no** puede ser igual al límite máximo.

**Código de error:** `VALOR_ABAIXO_LIMITE`

### Validaciones del QR Code

**ℹ️ Observaciones:**

- Validaciones realizadas para pagos del tipo `PAYMENT_CONSENT` (valor del campo `requestBody.paymentType`).
- Todos los demás campos abajo están ubicados dentro de `requestBody.data.payment`.

#### Reglas Generales

1. El tipo del QR Code debe ser coherente con la forma de iniciación del pago (campo `details.localInstrument`):
    - Si la forma de iniciación es **QRES**, el QR Code debe ser **Estático**.
    - Si la forma de iniciación es **QRDN**, el QR Code debe ser **Dinámico**.
    - **Código de error:** `QRCODE_INVALIDO`

##### Caso el QR Code sea **Estático**

1. El valor presente en el QR Code Estático debe ser el mismo indicado en el payload del pago (campo `amount`).
    - **Código de error:** `VALOR_INVALIDO`

2. La clave _Pix_ presente en el QR Code Estático debe ser idéntica a la clave _Pix_ informada en el payload del pago (campo `details.proxy`).
    - **Código de error:** `QRCODE_INVALIDO`

##### Caso el QR Code sea **Dinámico**

1. El estado del QR Code Dinámico debe ser válido para uso.
    - **Código de error:** `QRCODE_INVALIDO`

### Integración - Preguntas Frecuentes - FAQ

#### Sobre Descubrimiento de Recursos

Preguntas referentes al [descubrimiento de recursos en Opus Open Finance](/es/integração-plugin/consent/readme.md#Discovery-de-recursos-no-Opus-Open-Banking).

**¿Qué es un "recurso"?**

En Open Finance, "recursos" son componentes de datos o servicio que puede ser consumido por APIs, respetando los criterios de seguridad y consentimiento.
En la práctica, un "recurso" puede ser una cuenta transaccional, una tarjeta, una inversión, entre otros.

**¿Qué debo devolver en los campos `key` de `resourceLegacyId` y `resourceName`?**

Los campos `resourceLegacyId` y `resourceName` funcionan como identificadores internos en el backend de la institución financiera y deben ser definidos para uso en esta capa. Ambos están estructurados como listas de pares _key-value_ para ofrecer soporte a identificadores compuestos.

Para el `resourceLegacyId`, si el ID es simple, es suficiente devolver algo como:

```json
"resourceLegacyId": [
    { "key": "id", "value": "<valor del id>" }
]
```

Para el `resourceName`, es importante devolver valores que ayuden al usuario final a reconocer el recurso. Por ejemplo, en el caso de una cuenta bancaria, puede devolver algo como:

```json
"resourceName": [
    { "key": "agencia", "value": "<número de la agencia>" },
    { "key": "cuenta", "value": "<número de la cuenta>" }
]
```

**El usuario no tiene cuentas para devolver. ¿Debo devolver error o lista vacía?**

Si el usuario no posee cuentas, el retorno debe ser éxito (HTTP 200) con una lista vacía de recursos (`{ "data": { "resources": [] } }`).

**En el descubrimiento de cuentas del flujo de pagos, ¿qué cuenta debe venir como "seleccionada por defecto"?**

Si el campo `debtorAccount` del consentimiento está rellenado con una cuenta válida para pagos, esa cuenta debe ser marcada como "seleccionada por defecto" (`"defaultSelected": true`). Independientemente, todas las cuentas disponibles para pago deben ser devueltas.

#### Sobre Validación de los Datos de Pago

**¿Qué debe validarse en la ruta específica para la validación de datos del pago?**

Verificar las [validaciones obligatorias para pagos](/es/integração-plugin/recomendacoes/validacoes-pagamentos/readme.md).

#### Sobre Solicitudes de Creación de Pagos

**¿Cómo identificar la cuenta elegida por el portador para realizar el débito?**

Tras la aprobación del consentimiento de pago, la lista `consent.resources` enviada en el payload de la solicitud de pago siempre contendrá un único recurso, representando la cuenta seleccionada.
El campo `consent.debtorAccount` también estará siempre rellenado con la información de la cuenta elegida.

**¿Dónde encontrar la fecha del pago para cada escenario o tipo de pago?**

Verificar [cómo identificar la fecha del pago](/es/integração-plugin/recomendacoes/cenarios-pagamentos/readme.md#Como-Identificar-a-Data-de-Efetivação-do-Pagamento).

**¿El backend de la institución financiera necesita soportar Programaciones Recurrentes?**

No. La **Plataforma Opus Open Finance** realizará una solicitud separada para cada fecha de recurrencia.

Por ejemplo, al recibir una solicitud de programación recurrente por 5 meses, un débito por mes, la plataforma solicitará al backend de la institución financiera 5 programaciones independientes.
La fecha de cada programación debe determinarse como se describe en [cómo identificar la fecha del pago](/es/integração-plugin/recomendacoes/cenarios-pagamentos/readme.md#Como-Identificar-a-Data-de-Efetivação-do-Pagamento).

[App-e-Web]: ./App-e-Web.html
[Imagen-Capa-Integración]: ./images/Integração-Pagamento.png
[API-pago]: ../../../../swagger-ui/index.html?api=payment-integration
