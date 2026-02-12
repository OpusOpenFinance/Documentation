---
layout: default
title: "Discovery de Recursos"
parent: "Pagos"
nav_order: 1
has_children: true
lang: "es"
alternate_lang: 
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/Pagamentos/integracao-plugin/consent/Discovery-Recursos/"
      lang: "en"
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/Pagamentos/integracao-plugin/consent/Discovery-Recursos/"
      lang: "pt-br"
---

## API Consent

- [API Consent](#api-consent)
  - [Discovery de recursos en Opus Open Banking](#discovery-de-recursos-en-opus-open-banking)
    - [Momentos de discovery](#momentos-de-discovery)
      - [Productos seleccionables](#productos-seleccionables)
      - [Productos no seleccionables](#productos-no-seleccionables)
    - [Consentimiento y los productos](#consentimiento-y-los-productos)
    - [Tratamiento de los identificadores](#tratamiento-de-los-identificadores)
    - [Conectores de discovery](#conectores-de-discovery)
      - [Conector de producto seleccionable](#conector-de-producto-seleccionable)
      - [Conector de producto no seleccionable](#conector-de-producto-no-seleccionable)
    - [Conector de validación de datos de pago](#conector-de-validación-de-datos-de-pago)
    - [Conector de descubrimiento de cuentahabiente](#conector-de-descubrimiento-de-cuentahabiente)
    - [Conector de validación de Risk Signals](#conector-de-validación-de-risk-signals)
    - [Tratamientos adicionales](#tratamientos-adicionales)
      - [Filtro de cuentas](#filtro-de-cuentas)
    - [Múltiples niveles de aprobación](#múltiples-niveles-de-aprobación)
      - [Tratamiento del estado PENDING_AUTHORISATION](#tratamiento-del-estado-pending_authorisation)
  - [Grupos de permisos en la creación del consentimiento](#grupos-de-permisos-en-la-creación-del-consentimiento)
  - [Aprobación de creación de consentimiento de pago](#aprobación-de-creación-de-consentimiento-de-pago)
    - [Solución provisional para ruta approvePaymentConsentCreation](#solución-provisional-para-ruta-approvepaymentconsentcreation)
  - [Servicios auxiliares](#servicios-auxiliares)

## Discovery de recursos en Opus Open Banking

El discovery de recursos en Opus Open Banking es uno de los puntos de integración entre Opus Open Banking y los sistemas legados de la institución, y es la integración responsable del descubrimiento de los productos vinculados a un consentimiento. El discovery de recursos ocurre en dos momentos distintos dentro de Open Banking.

### Momentos de discovery

#### Productos seleccionables

El momento de discovery ocurre durante la fase de aceptación del consentimiento por el cliente de la institución. Los consentimientos de compartición de datos que involucran los productos **cuenta** y **tarjeta de crédito** y los consentimientos de pago necesitan mostrar las instancias de los productos durante la etapa de autenticación y aceptación del consentimiento para ser elegidos activamente por el cliente. Llamamos a estos productos **productos seleccionables**.

La siguiente tabla compila todos los productos seleccionables tratados por Opus Open Banking y sus tipos:

| Tipo de consentimiento | Producto                     | Tipo de producto  | Nombre de la ruta Camel                          |
| ---------------------- | ---------------------------- | ----------------- | ------------------------------------------------ |
| Compartición de datos  | ACCOUNT                      | Seleccionable     | ```direct:discoverAccounts```                    |
| Compartición de datos  | CREDIT_CARD_ACCOUNT          | Seleccionable     | ```direct:discoverCreditCardAccounts```          |
| Pago                   | PAYMENT[^1]                  | Seleccionable     | ```direct:discoverPayments_v2```                 |

[^1]: El producto **PAYMENT** es una forma de permitir que la selección del origen de recursos para un pago sea independiente del producto ACCOUNT, permitiendo pagos mediante tarjeta de crédito u otro origen distinto que la institución eventualmente posea.

Si la institución proporciona algún producto del tipo de compartición de datos, será necesario crear la ruta camel como se referencia en la tabla, respetando el [formato de request y response indicado por el tipo de producto](#conectores-de-discovery).
Si no se dispone de estos productos (creación de la ruta camel), el retorno
por defecto del discovery es nulo y la institución no necesita poner tales rutas.

#### Productos no seleccionables

El momento de discovery ocurre durante la utilización del consentimiento de
compartición de datos, cuando el *TPP* llama a la API regulatoria
[```GET /resources/v1/resources```](https://openbankingbrasil.atlassian.net/wiki/spaces/OB/pages/33849604/Informa+es+T+cnicas+-+Resources+-+v1.0.2) o [```GET /resources/v2/resources```](https://openbankingbrasil.atlassian.net/wiki/spaces/OB/pages/57409630/Informa+es+T+cnicas+-+Resources+-+v2.0.0).
Esta API necesita devolver todos los recursos accesibles en el consentimiento, es decir, los productos seleccionados activamente por el cliente durante la aceptación del consentimiento y los demás productos del consentimiento. Llamamos a estos últimos productos **productos no seleccionables**.

La siguiente tabla compila todos los productos no seleccionables tratados por Opus Open Banking y sus tipos:

| Tipo de consentimiento | Producto                     | Tipo de producto | Nombre de la ruta Camel                          |
| ---------------------- | ---------------------------- | ---------------- | ------------------------------------------------ |
| Compartición de datos  | INVOICE_FINANCING            | No seleccionable | ```direct:discoverInvoiceFinancings```           |
| Compartición de datos  | FINANCING                    | No seleccionable | ```direct:discoverFinancings```                  |
| Compartición de datos  | LOAN                         | No seleccionable | ```direct:discoverLoans```                       |
| Compartición de datos  | UNARRANGED_ACCOUNT_OVERDRAFT | No seleccionable | ```direct:discoverUnarrangedAccountOverdrafts``` |
| Compartición de datos  | BANK_FIXED_INCOMES_READ      | No seleccionable | ```direct:discoverBankFixedIncomes```            |
| Compartición de datos  | CREDIT_FIXED_INCOMES_READ    | No seleccionable | ```direct:discoverCreditFixedIncomes```          |
| Compartición de datos  | FUNDS_READ                   | No seleccionable | ```direct:discoverFunds```                       |
| Compartición de datos  | VARIABLE_INCOMES_READ        | No seleccionable | ```direct:discoverVariableIncomes```             |
| Compartición de datos  | TREASURE_TITLES_READ         | No seleccionable | ```direct:discoverTreasureTitles```              |
| Compartición de datos  | EXCHANGES_READ               | No seleccionable | ```direct:discoverExchanges```                   |

Si la institución proporciona algún producto del tipo de compartición de datos,
será necesario crear la ruta camel como se referencia en la tabla, respetando el [formato
de request y response indicado por el tipo de producto](#conectores-de-discovery).
Si no se dispone de estos productos (creación de la ruta camel), el retorno
por defecto del discovery es nulo y la institución no necesita poner tales rutas.

Los posibles estados de los recursos no seleccionables están en la siguiente tabla:

| Estado                  | Descripción                  | Transición                        |
| ----------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------|
| PENDING_AUTHORISATION   | Cuando los recursos aún requieren aprobación de múltiples niveles | Puede transicionar a todos los estados |
| TEMPORARILY_UNAVAILABLE | Recursos en bloqueos temporales y no disponibles en los canales de atención electrónica para los usuarios finales | Puede transicionar a AVAILABLE o UNAVAILABLE |
| AVAILABLE               | Recursos en pleno uso y disponibles en los canales de atención electrónica para los usuarios finales | Puede transicionar a TEMPORARILY_UNAVAILABLE o UNAVAILABLE |
| UNAVAILABLE             | Recursos cerrados, migrados, cancelados o que pasaron a pérdidas y que no están disponibles en los canales de atención electrónica para los usuarios finales | No puede transicionar a ningún estado |

### Consentimiento y los productos

Vimos en el tema anterior los momentos posibles de discovery y la relación entre los
momentos y los productos. Otro punto importante es la relación entre los permisos
solicitados en el consentimiento y los productos. Es esta relación la que indica qué
discoveries ocurrirán para un determinado consentimiento.

| Tipo de consentimiento     | Permisos                                                                                                                                                                               | Producto                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Compartición de datos | ACCOUNTS_READ, ACCOUNTS_BALANCES_READ, ACCOUNTS_TRANSACTIONS_READ, ACCOUNTS_OVERDRAFT_LIMITS_READ                                                                                        | ACCOUNT                      |
| Compartición de datos | CREDIT_CARDS_ACCOUNTS_READ, CREDIT_CARDS_ACCOUNTS_BILLS_READ, CREDIT_CARDS_ACCOUNTS_BILLS_TRANSACTIONS_READ, CREDIT_CARDS_ACCOUNTS_LIMITS_READ, CREDIT_CARDS_ACCOUNTS_TRANSACTIONS_READ  | CREDIT_CARD_ACCOUNT          |
| Compartición de datos | INVOICE_FINANCINGS_READ, INVOICE_FINANCINGS_SCHEDULED_INSTALMENTS_READ, INVOICE_FINANCINGS_PAYMENTS_READ, INVOICE_FINANCINGS_WARRANTIES_READ                                             | INVOICE_FINANCING            |
| Compartición de datos | FINANCINGS_READ, FINANCINGS_SCHEDULED_INSTALMENTS_READ, FINANCINGS_PAYMENTS_READ, FINANCINGS_WARRANTIES_READ                                                                             | FINANCING                    |
| Compartición de datos | LOANS_READ, LOANS_SCHEDULED_INSTALMENTS_READ, LOANS_PAYMENTS_READ, LOANS_WARRANTIES_READ                                                                                                 | LOAN                         |
| Compartición de datos | UNARRANGED_ACCOUNTS_OVERDRAFT_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_SCHEDULED_INSTALMENTS_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_PAYMENTS_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_WARRANTIES_READ | UNARRANGED_ACCOUNT_OVERDRAFT |
| Pago                 | N/D                                                                                                                                                                                      | PAYMENT                      |

Un consentimiento de compartición con todos los permisos realizará el discovery de los productos ACCOUNT y CREDIT_CARD durante la etapa de confirmación del consentimiento y de los productos INVOICE_FINANCING, FINANCING, LOAN e UNARRANGED_ACCOUNT_OVERDRAFT cuando ocurra una llamada al ```GET /resources/v1/resources```. El discovery siempre se realiza de forma paralela para minimizar el tiempo de respuesta de las APIs.

### Tratamiento de los identificadores

Un punto importante en Open Banking es la [formación y estabilidad del ID](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17377493/Forma+o+e+Estabilidade+do+ID) que exige que los identificadores traficados en el ecosistema de Open Banking estén desvinculados de significado.

La solución de Opus Open Banking garantiza la anonimización y unicidad de los identificadores en Open Banking realizando la conversión entre los identificadores en los sistemas de origen y los identificadores Open Banking.

Las identificaciones de los productos en los diversos sistemas de origen pueden ser variadas, a veces utilizando incluso claves compuestas. Las interfaces de Opus Open Banking utilizan una estructura de array de claves (key) y valores (value) cuando referencian un identificador de legado. Es sobre esta estructura que se genera el identificador Open Banking.

### Conectores de discovery

Los conectores de discovery en sí se implementan en Apache Camel igual que los demás conectores de integración entre Opus Open Banking y los sistemas legados del banco.

La interfaz del conector debe respetar uno de los dos modelos de productos: seleccionable y no seleccionable.

#### Conector de producto seleccionable

Los productos seleccionables deben tener sus conectores respetando los siguientes esquemas:

| Tipo     | JSON Schema                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Request  | [discovery-resource-request.json](./anexos/json/discoveryRecursos/discoveryDataSharing/es-discoveryResourceRequest.json)                         |
| Response | [discovery-selectable-resource-response.json](./anexos/json/discoveryRecursos/discoveryDataSharing/es-discoverySelectableResourceResponse.json) |

Ejemplo de response para un producto seleccionable:

```json
{
  "resources":[
    {
      "resourceName":[
        {
          "key":"Agencia",
          "value":"1234"
        },
        {
          "key":"Cuenta Corriente",
          "value":"12345-6",
        }
      ],
      "resourceLegacyId":[
        {
          "key":"pkAgencia",
          "value":"1234"
        },
        {
          "key":"pkCuentaCorriente",
          "value":"123456"
        }
      ],
      "resourceBalanceCurrency":"BRL",
      "resourceBalanceAmount":239.12,
      "authorizers":[
        {
          "cpf":"06672639004",
          "name":"João da Silva"
        },
        {
          "cpf":"05473670075",
          "name":"Maria da Silva"
        }
      ],
      "defaultSelected":true
    }
  ]
}
```

#### Conector de producto no seleccionable

Los productos no seleccionables deben tener sus conectores respetando los siguientes
esquemas:

| Tipo     | JSON Schema                                                                                                                                 |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Request  | [discovery-resource-request.json](./anexos/json/discoveryRecursos/discoveryDataSharing/es-discoveryResourceRequest.json)                               |
| Response | [discovery-nonselectable-resource-response.json](../schemas/v2/consent/discoveryDataSharing/discovery-nonselectable-resource-response.json) |

*[BORRADOR: El esquema del consentimiento dentro del request
está en revisión]*

Ejemplo de response para un producto no seleccionable:

```json
{
  "resources":[
    {
      "resourceLegacyId":[
        {
          "key":"pkPrestamo",
          "value":"ABC12010"
        }
      ],
      "validUntil":"2022-06-07"
    },
    {
      "resourceLegacyId":[
        {
          "key":"pkPrestamo",
          "value":"DEF51242"
        }
      ],
      "status": "TEMPORARILY_UNAVAILABLE",
      "validUntil":"2022-06-07"
    }
  ]
}
```

**IMPORTANTE**: El sistema legado del banco debe ser responsable del control del
estado del recurso y de la validez del recurso (validUntil).

### Conector de validación de datos de pago

El conector de validación de pago se implementa en Apache Camel igual que los
demás conectores de integración y tiene la función de realizar algunas validaciones en los datos
de pago, como por ejemplo:

- Validar datos del DICT
- Validar QRCODE (QRND/QRES)
- Validar datos de cuenta

La ruta camel escucha llamadas realizadas en `direct:validatePaymentData` y un ejemplo
de [request](./anexos/json/discoveryRecursos/validatePaymentData/es-requestExample.json).

**Importante**: A partir de la versión 4 del consentimiento, si se identifican múltiples errores
durante la validación, se debe devolver el error de mayor prioridad.
La tabla de prioridad se puede encontrar en las *Informaciones Técnicas* de la
[API de Pagos](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17375943/SV+API+-+Pagamentos).

### Conector de descubrimiento de cuentahabiente

Debido a una resolución regulatoria, el PCM (Plataforma de Recolección de Métricas)
debe enviar la información de si la persona (PF/PJ) que solicitó consentimiento es cuentahabiente
en la institución o no.

Para ello se creó un conector de cuentahabientes con la siguiente funcionalidad:
recibir un CPF/CNPJ y validar con la institución si el mismo pertenece a un cuentahabiente.

La respuesta debe ser:

- Positiva (CPF/CNPJ pertenece a un cuentahabiente);
- Negativa (CPF/CNPJ no pertenece a un cuentahabiente).

La siguiente tabla lista los puntos de integración para la verificación de cuentahabiente:

| Tipo de consentimiento | Nombre de la ruta Camel                       |
| ---------------------- | --------------------------------------------- |
| Todos                  | ```direct:checkAccountHolderStatus```         |

Definiciones:

- [request-schema](./anexos/json/discoveryRecursos/checkAccountHolderStatus/es-requestSchema.json)
- [response-schema](./anexos/json/discoveryRecursos/checkAccountHolderStatus/es-responseSchema.json)

Ejemplos:

- [request-example](./anexos/json/discoveryRecursos/checkAccountHolderStatus/es-requestExample.json)
- [response-example](./anexos/json/discoveryRecursos/checkAccountHolderStatus/es-responseExample.json)

**Observación:**

El conector estándar implementado deberá llamar al conector de cuentahabiente;
si este no existe, entonces se llamará al conector discovery de cuentas
y si este no cumple, se deberá implementar el nuevo conector.

### Conector de validación de Risk Signals

Durante dos momentos del recorrido sin redireccionamiento (JSR), el usuario deberá
enviar diversas informaciones relacionadas con su dispositivo, como por ejemplo,
geolocalización, versión del sistema operativo, idioma, etc.

Si la institución desea realizar validaciones en estos datos, deberá implementar
la ruta `direct:validateRiskSignals`.

**Importante**: La implementación de la ruta no es obligatoria, pero es recomendada.

Definiciones:

- [request-schema](./anexos/json/discoveryRecursos/validateRiskSignals/es-requestSchema.json)
- [response-schema](./anexos/json/discoveryRecursos/validateRiskSignals/es-responseSchema.json)

Escenarios en los que la implementación sería recomendada:

- análisis de riesgo si el cliente está en un área considerada de riesgo, pudiendo disminuir temporalmente el límite, o añadiendo alguna validación para realizar el pago;
- si el dispositivo ha sido "roteado", se pueden añadir validaciones de análisis de riesgo de la operación, ya que habría posibilidad de que el dispositivo esté comprometido.

### Tratamientos adicionales

#### Filtro de cuentas

En algunas situaciones, la cuenta utilizada para una operación financiera es definida por el cliente antes de la selección de cuentas, en la aplicación iniciadora del pago. En estos escenarios, el objeto debtorAccount estará cumplimentado en el consentimiento y la lista devuelta debe ser filtrada para devolver solo la cuenta preseleccionada o una lista vacía si esta no es una opción seleccionable para el cliente. Este tratamiento debe hacerse en el conector o servicio remoto de listado de cuentas.

### Múltiples niveles de aprobación

#### Tratamiento del estado PENDING_AUTHORISATION

Los conectores de discovery de compartición de datos deben tratar el estado `PENDING_AUTHORISATION`. Será responsabilidad de la institución tratar el estado de los productos (y datos registrales si la institución exige tratamiento de múltiples niveles de aprobación para ello). El producto almacenará la situación de cada recurso de la transmisión de datos y hará la validación de la situación en las llamadas de los productos, impidiendo que las llamadas ocurran en caso de pendencia (error 403 según la documentación de todos los tipos de recurso en la documentación de Open Finance Brasil).

El tratamiento del retorno de los conectores de discovery debe aceptar el estado `PENDING_AUTHORISATION` cuando el consentimiento sea de múltiples niveles de aprobación, listando el recurso en la API `GET /resources` adecuadamente e impidiendo la llamada a la instancia cuando esta sea nominada.

Las futuras llamadas de los conectores de discovery podrán devolver el estado `AVAILABLE`, haciendo que OOB cambie el estado de ese recurso a `AVAILABLE` y comience a aceptar las llamadas específicas a determinada instancia de producto.

Es importante recordar que el discovery de cuentas y tarjeta, los llamados productos seleccionables, ocurre exclusivamente en el momento de la creación del consentimiento, por lo que la transición en este caso deberá ocurrir a través de API de listado de la categoría del producto, que es entonces una segunda forma de transición de estado. Los conectores de listado de productos deben entonces aceptar el estado (a ser removido de la respuesta final) del ítem. Este estado sensibilizará los recursos en OOB de la misma forma que el conector de discovery de productos, cambiando eventualmente la situación de un recurso de `PENDING_AUTHORISATION` a `AVAILABLE`. Las instancias de productos que devuelven como `PENDING_AUTHORISATION` en el listado de productos se eliminan del resultado de la API regulatoria hasta que sean actualizadas al estado `AVAILABLE`.

Cualquier intento de cambio del estado de `AVAILABLE` a `PENDING_AUTHORISATION` será impedido por el producto para garantizar el diagrama de estado posible de datos registrales definido por Open Finance Brasil.

## Grupos de permisos en la creación del consentimiento

En el momento de la creación del consentimiento, se deben enviar todos los permisos de los agrupamientos de datos a los que se desea dar consentimiento. Este conjunto de permisos necesarios, llamado grupos de permisos, se designan según la tabla a continuación ([enlace](https://openbanking-brasil.github.io/openapi/swagger-apis/consents/1.0.3.yml) a la documentación oficial):

| Categoría de Datos   | Agrupamiento                   |  Permisos                                                                                                                                                                                              |
| -------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Registro             | Datos registrales PF           | CUSTOMERS_PERSONAL_IDENTIFICATIONS_READ, RESOURCES_READ                                                                                                                                                  |
| Registro             | Informaciones complementarias PF | CUSTOMERS_PERSONAL_ADITTIONALINFO_READ, RESOURCES_READ                                                                                                                                                   |
| Registro             | Datos registrales PJ           | CUSTOMERS_BUSINESS_IDENTIFICATIONS_READ, RESOURCES_READ                                                                                                                                                  |
| Registro             | Informaciones complementarias PJ | CUSTOMERS_BUSINESS_ADITTIONALINFO_READ, RESOURCES_READ                                                                                                                                                   |
| Cuentas               | Saldos                        | ACCOUNTS_READ, ACCOUNTS_BALANCES_READ, RESOURCES_READ                                                                                                                                                    |
| Cuentas               | Límites                       | ACCOUNTS_READ, ACCOUNTS_OVERDRAFT_LIMITS_READ, RESOURCES_READ                                                                                                                                            |
| Cuentas               | Extractos                      | ACCOUNTS_READ, ACCOUNTS_TRANSACTIONS_READ, RESOURCES_READ                                                                                                                                                |
| Tarjeta de Crédito    | Límites                       | CREDIT_CARDS_ACCOUNTS_READ, CREDIT_CARDS_ACCOUNTS_LIMITS_READ, RESOURCES_READ                                                                                                                            |
| Tarjeta de Crédito    | Transacciones                    | CREDIT_CARDS_ACCOUNTS_READ, CREDIT_CARDS_ACCOUNTS_TRANSACTIONS_READ, RESOURCES_READ                                                                                                                      |
| Tarjeta de Crédito    | Facturas                       | CREDIT_CARDS_ACCOUNTS_READ, CREDIT_CARDS_ACCOUNTS_BILLS_READ, CREDIT_CARDS_ACCOUNTS_BILLS_TRANSACTIONS_READ, RESOURCES_READ                                                                              |
| Operaciones de Crédito | Datos del Contrato             | LOANS_READ, LOANS_WARRANTIES_READ, LOANS_SCHEDULED_INSTALMENTS_READ, LOANS_PAYMENTS_READ, FINANCINGS_READ, FINANCINGS_WARRANTIES_READ, FINANCINGS_SCHEDULED_INSTALMENTS_READ, FINANCINGS_PAYMENTS_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_WARRANTIES_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_SCHEDULED_INSTALMENTS_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_PAYMENTS_READ, INVOICE_FINANCINGS_READ, INVOICE_FINANCINGS_WARRANTIES_READ, INVOICE_FINANCINGS_SCHEDULED_INSTALMENTS_READ, INVOICE_FINANCINGS_PAYMENTS_READ, RESOURCES_READ                                                                                                                                                                   |
| Operaciones de Crédito | Anticipación de recibibles     | INVOICE_FINANCINGS_READ, INVOICE_FINANCINGS_WARRANTIES_READ, INVOICE_FINANCINGS_SCHEDULED_INSTALMENTS_READ, INVOICE_FINANCINGS_PAYMENTS_READ, RESOURCES_READ                                             |
| Operaciones de Crédito | Financiamientos                | FINANCINGS_READ, FINANCINGS_WARRANTIES_READ, FINANCINGS_SCHEDULED_INSTALMENTS_READ, FINANCINGS_PAYMENTS_READ, RESOURCES_READ                                                                             |
| Operaciones de Crédito | Préstamos                   | LOANS_READ, LOANS_WARRANTIES_READ, LOANS_SCHEDULED_INSTALMENTS_READ, LOANS_PAYMENTS_READ, RESOURCES_READ                                                                                                 |
| Operaciones de Crédito | Adelanto a depositantes   | UNARRANGED_ACCOUNTS_OVERDRAFT_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_WARRANTIES_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_SCHEDULED_INSTALMENTS_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_PAYMENTS_READ, RESOURCES_READ |
| Operaciones de Crédito | Inversiones                 | BANK_FIXED_INCOMES_READ,CREDIT_FIXED_INCOMES_READ,FUNDS_READ,VARIABLE_INCOMES_READ,TREASURE_TITLES_READ,RESOURCES_READ                                                                                   |
| Operaciones de Crédito | Cambio                        | EXCHANGES_READ,RESOURCES_READ                                                                                                                                                                            |

## Aprobación de creación de consentimiento de pago

Cuando la API de creación de un consentimiento es llamada por un *TPP*, la plataforma
OOB debe evaluar si este consentimiento puede o no ser creado. Las validaciones técnicas
(formato de mensaje, límites de llamadas) y de seguridad (validez de las credenciales,
permisos de acceso) se realizan dentro de la propia plataforma. Las validaciones de
negocio, sin embargo, se delegan a un sistema de back-office de la institución
titular de la cuenta a través de un conector.

Entre las validaciones que puede realizar la institución están:

- Verificar si el usuario conectado en el TPP es un cliente conocido y activo;
- Verificar si el tipo de operación es aceptado por la institución;
- Verificar si los valores seleccionados están de acuerdo con los límites definidos por la institución;
- Verificar si la operación está de acuerdo con las políticas antifraude.
- Verificar si las características de la creación del consentimiento están de acuerdo con sus reglas para los pagos de tipo **TED** y **TEF** - día de la semana, festivo, horario, monto máximo de transferencia, etc.

La siguiente tabla lista los puntos de integración para la aceptación de la creación de
un consentimiento:

| Tipo de consentimiento | Nombre de la ruta Camel                       |
| ---------------------- | --------------------------------------------- |
| Pago                   | ```direct:approvePaymentConsentCreation_v3``` |

El retorno de estos puntos de integración debe ser:

- Un mensaje de éxito (generalmente un objeto vacío) cuando el consentimiento pueda ser creado;
- Un mensaje de error de negocio, descrito en el esquema de integración con un enum específico en el campo *code*, definiendo el motivo por el cual el consentimiento fue denegado. Este mensaje posee también el campo opcional *restrictionType* informando el tipo de restricción que reprobó el consentimiento;
- Un mensaje de error genérico, definido por el esquema [response-error-schema.json](./anexos/json/discoveryRecursos/approvePaymentConsentCreation_v3/es-responseErrorSchema.json) cuando un error técnico impida que la solicitud pueda ser evaluada, como un error de red o un sistema inoperante.

La siguiente tabla corresponde a los esquemas del Request y del Response del conector:

| Tipo     | JSON Schema                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------ |
| Request  | [approvePaymentConsent-request.json](./anexos/json/discoveryRecursos/approvePaymentConsentCreation_v3/es-requestSchema.json)   |
| Response | [approvePaymentConsent-response.json](./anexos/json/discoveryRecursos/approvePaymentConsentCreation_v3/es-responseSchema.json) |

Ejemplo de Request:

```json
{
    "requestBody": {
        "data": {
            "tpp": {
                "name": "GuiaBolsa"
            },
            "loggedUser": {
                "document": {
                    "identification": "11111111111",
                    "rel": "CPF"
                }
            },
            "creditor": {
                "personType": "PESSOA_NATURAL",
                "cpfCnpj": "11111111111",
                "name": "Marco Antonio de Brito"
            },
            "payment": {
                "type": "PIX",
                "date": "2021-01-01",
                "currency": "BRL",
                "amount": "100000.04",
                "details": {
                    "localInstrument": "DICT",
                    "proxy": "12345678901",
                    "creditorAccount": {
                        "ispb": "12345678",
                        "number": "1234567890",
                        "accountType": "CACC",
                        "issuer": "1774"
                    }
                },
                "ibgeTownCode": "5300108"
            },
            "debtorAccount": {
                "ispb": "87654321",
                "number": "0987654321",
                "accountType": "CACC",
                "issuer": "1774"
            }
        }
    },
    "requestMeta": {
        "correlationId": "700dd46b-b2a6-2e28-41ef-f5c597640af3",
        "brandId": "cbanco"
    }
}
```

Más ejemplos de request y de response para la ruta "approvePaymentConsentCreation" se pueden encontrar [aquí](./anexos/json/discoveryRecursos/approvePaymentConsentCreation_v3).

Ejemplo de comando utilizado en el `Dockerfile` para añadir el archivo de las rutas `approvePaymentConsentCreation`, `approvePaymentConsentCreation_v2` y `approvePaymentConsentCreation_v3`:

```dockerfile
ARG approvePaymentRoute=file:/specs/custom-approvePaymentConsentCreation-routes.xml
ENV camel.main.routes-include-pattern=$approvePaymentRoute
```

### Solución provisional para ruta approvePaymentConsentCreation

A fin de facilitar el desarrollo de la solución de las entidades socias, Opus Software proporciona un archivo .xml (approvePaymentConsentCreation-routes.xml) con una **solución temporal** de la ruta "approvePaymentConsentCreation".
Esta aprueba cualquier consentimiento, sin aplicar ninguna regla de verificación, y debe ser utilizada **solamente** para desarrollo y mientras los servicios de aprobación de los consentimientos de pagos del sistema legado no estén adaptados para los pagos de tipo TED y TEF.

Ejemplo de comando utilizado en el `Dockerfile` para utilizar la solución temporal para la ruta `approvePaymentConsentCreation`, `approvePaymentConsentCreation_v2` y `approvePaymentConsentCreation_v3`:

```dockerfile
ARG approvePaymentRoute=file:/specs/approvePaymentConsentCreation-routes.xml
ENV camel.main.routes-include-pattern=$approvePaymentRoute
```

## Servicios auxiliares

Se crearon servicios auxiliares en Java con el fin de facilitar la implementación de los
conectores.

Los servicios y sus respectivas funcionalidades son:

| Nombre del servicio              | Descripción                                                                                            | Comando de llamada en el archivo .xml                                                                         |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| getDayOfTheWeek                  | Obtener el día de la semana actual en inglés en el formato `EEE` (ej: "Fri" - viernes)                      | `${bean:camelUtils.getDayOfTheWeek}`                                                                           |
| concatenateStrings               | Obtener una cadena que es la concatenación de las dos cadenas pasadas como parámetros                      | `${bean:camelUtils.concatenateStrings("ab", "cd")}`                                                            |
| hmacCalculator                   | Obtener el cálculo de hash de un dato basado en un algoritmo específico con una clave secreta proporcionada | `${bean:camelUtils.hmacCalculator("HmacSHA256", "abcd", "bc19bec7-339f-452f-8548-3daa889e6f79)}`               |
| makePostCall                     | Utilizado para llamadas post con mtls                                                                | `${bean:camelUtils.makePostCall(${authorization}, ${transactionHash}, ${contentType},  ${endpoint}, ${body})}` |
| makeGetCall                      | Utilizado para llamadas get con mtls                                                                 | `${bean:camelUtils.makeGetCall(${authorization}, ${transactionHash}, ${contentType}, ${endpoint})}`            |
| generateUrlEncodedOrDecodedValue | Utilizado para codificar/decodificar una cadena de/al formato URL                                | `${bean:camelUtils.generateUrlEncodedOrDecodedValue("testl!encode*sf13", "ENCODE")}`                            |

**Ejemplo de llamada del servicio getDayOfTheWeek:**

```xml
<setProperty name="currentWeekday">
  <simple>${bean:camelUtils.getDayOfTheWeek}</simple>
</setProperty>
```

**Ejemplo de llamada del servicio concatenateStrings:**

```xml
<setProperty name="concatenatedString">
    <simple>${bean:camelHelper.concatenateStrings("ab", "cd")}</simple>
</setProperty>
```

El resultado de esta llamada sería: abcd

**Exemplo de llamada del servicio hmacCalculator:**

```xml
<setProperty name="hmacCalculatated">
    <simple>${bean:camelHelper.hmacCalculator("HmacSHA256", "abcd", "bc19bec7-339f-452f-8548-3daa889e6f79)}</simple>
</setProperty>
```

Algoritmos soportados:

```text
HmacMD5
HmacSHA1
HmacSHA224
HmacSHA256
HmacSHA384
HmacSHA512
```

**Exemplo de llamada del servicio generateUrlEncodedOrDecodedValue:**

```xml
<setProperty name="encodedString">
  <simple>${bean:camelUtils.generateUrlEncodedOrDecodedValue("testl!encode*sf1", "ENCODE")}</simple>
</setProperty>
```
