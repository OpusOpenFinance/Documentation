---
layout: default
title: Conceptos
parent: "Opus Data Receiver"
nav_order: 1
lang: "es"
alternate_lang:
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/conceitos/"
      lang: "en"
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/conceitos/"
      lang: "pt-br"
---

## Estructura de Productos y Subproductos

El Opus Data Receiver (ODR) organiza los datos del Open Finance Brasil en una estructura similar a un árbol. En este árbol:

- Las Entidades principales, que representan categorías amplias de información, se denominan **Productos**;
- Las Entidades derivadas, que detallan o complementan un Producto, se denominan **Subproductos**.

Un Producto siempre es la raíz del árbol y un Subproducto solo existe si el Producto correspondiente también existe.

Actualmente, el ODR trabaja con 18 Productos principales:

| Nombre natural                    | Producto Open Finance                      |
| --------------------------------- |------------------------------------------- |
| Cuenta Corriente                  | Account                                    |
| Cuentas de crédito                | CreditcardAccount                          |
| Divisas                           | Exchanges                                  |
| Persona física - Identificación   | CustomerPersonalIdentifications            |
| Persona física - Calificación     | CustomerPersonalQualifications             |
| Persona física - Relación         | CustomerPersonalFinancialRelations         |
| Persona jurídica - Identificación | CustomerBusinessIdentifications            |
| Persona jurídica - Calificación   | CustomerBusinessQualifications             |
| Persona jurídica - Relación       | CustomerBusinessFinancialRelations         |
| Préstamos                         | CreditLoansContracts                       |
| Adelantos a depositantes          | CreditUnarrangedAccountsOverdraftContracts |
| Financiamientos                   | CreditFinancingContracts                   |
| Anticipación de recibibles        | CreditInvoiceFinancingContracts            |
| Renta Fija Bancaria               | InvestmentsBankFixedIncome                 |
| Fondos de Inversión               | InvestmentsFunds                           |
| Renta Fija de Crédito             | InvestmentsCreditFixedIncome               |
| Títulos del Tesoro Directo        | InvestmentsTreasureTitles                  |
| Operaciones de Renta Variable     | InvestmentsVariableIncome                  |

Un Producto puede poseer Subproductos específicos (Cuenta Corriente, por ejemplo, posee Subproductos como Saldos, Transacciones, Límites y Detalles) mientras que otros Productos no poseen Subproductos, como es el caso de los Datos de Persona Física y Jurídica.

## Relación entre Productos y Subproductos

La actualización de un Subproducto siempre depende de la existencia y validez de su Producto.

El ODR valida periódicamente la situación de cada Producto directamente en la Institución Transmisora de los datos. Esta validación determina si el recurso aún existe y si el consentimiento autoriza su recolección. En caso de que un Producto deje de ser válido, el ODR:

- Mantiene los datos ya recolectados;
- Interrumpe nuevas actualizaciones del Producto y de todos sus Subproductos;
- Retorna únicamente la información ya almacenada, cuando es solicitada por el cliente.

Ejemplo:

Si una tarjeta de crédito número 1234 del Banco B es cancelada y la Transmisora de datos informa al ODR que el recurso ya no existe, solo los Subproductos vinculados al Producto “Tarjeta de Crédito – cuenta 1234” dejan de actualizarse. Detalles, límites, transacciones y extractos dejan de recolectarse y pasan a existir solo en forma de los datos previamente almacenados (consulta en frío).

## Identificadores en el Open Finance

Para acceder a Subproductos, es necesario informar identificadores como, por ejemplo:

- accountId;
- creditCardAccountId;
- contractId;
- investmentsId.

Ellos siempre se obtienen a partir de la consulta al Producto, garantizando seguridad, rastreabilidad y coherencia entre los datos.

## Broker Notes (brokerNoteId)

En el contexto de los Productos de Inversiones, específicamente para operaciones de renta variable, existe una relación especial asociada a las notas de negociación de bolsa, identificadas por el *brokerNoteId*. Este es el único caso dentro del ODR en que un Subproducto depende de un dato que puede o no estar presente en la respuesta de la Transmisora.

Cuando el cliente consulta las transacciones de renta variable, cada movimiento de compra o venta puede venir acompañado de un brokerNoteId. Este identificador representa la nota de negociación emitida para esa operación. Cuando está presente, debe utilizarse como parámetro obligatorio para acceder al Subproducto “Nota de Negociación”.

El brokerNoteId debe ser un identificador exclusivo e inmutable por parte de la Transmisora, correspondiente a cada número natural de nota de negociación, conforme a la [especificación del Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1394901381/Informa+es+T+cnicas+-+DC+Renda+Vari+vel+-+v1.3.0). Solo cuando este identificador es proporcionado en la transacción es posible consultar los datos detallados de la nota de negociación relacionada con esa operación.

## Core y Scheduler

El ODR está estructurado en dos componentes que trabajan de forma integrada para garantizar la recolección, actualización y disponibilización de los datos del Open Finance: el Core y el Scheduler. Cada uno posee responsabilidades distintas y complementarias, asegurando desempeño, consistencia y conformidad en todas las etapas del proceso.

### Core

Componente central del ODR, responsable de ejecutar el procesamiento de datos y operar como el motor del sistema. Es el Core el que realiza las búsquedas en las Transmisoras, orquesta el flujo de recolección, aplica reglas internas de consistencia y disponibiliza los datos para consulta vía API. También gestiona el acceso a la base interna del ODR, garantizando desempeño, integridad y rastreabilidad de la información compartida.

### Scheduler

Módulo que administra las políticas y permisos de actualización y coordina cuándo cada Producto y Subproducto será recolectado. El Scheduler interpreta permisos, intervalos y estados de los consentimientos, actuando en la ventana configurada para la ejecución de las rutinas de actualización. Asegura que las recolecciones ocurran de forma eficiente, respetando las reglas de cada Institución.
