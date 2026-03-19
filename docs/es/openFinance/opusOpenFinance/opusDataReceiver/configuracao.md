---
layout: default
title: Configuración
parent: "Opus Data Receiver"
nav_order: 2
lang: "es"
alternate_lang:
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/configuracao/"
      lang: "en"
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/configuracao/"
      lang: "pt-br"
---

## Introducción a la Búsqueda Periódica Automática

La búsqueda periódica automática es el mecanismo que permite al cliente definir qué datos serán actualizados y con qué frecuencia cada Entidad (Producto y/o Subproducto) será recolectada.

Cada Entidad recibe un intervalo de actualización, en horas. Este intervalo determina cuánto tiempo debe pasar entre dos intentos consecutivos de actualización. La lógica garantiza:

- Cumplimiento de los límites regulatorios del Open Finance (una vez mantenidos los intervalos configurados por defecto);
- Control de carga sobre las Transmisoras;
- Predictibilidad en el ciclo de sincronización;
- Uso eficiente de las fichas de consulta.

El intervalo de cada Entidad es configurado inicialmente por el ODR de acuerdo con las limitaciones operacionales en el Open Finance Brasil. El cliente puede alterar estos valores según su necesidad, sin embargo, el producto no valida el cumplimiento de los límites operacionales, **responsabilidad que queda a cargo de quien altera esta configuración**.

El ODR garantiza que ninguna Entidad será actualizada antes del intervalo mínimo definido. **Ejemplo:** La Entidad Exchanges posee un intervalo de 24 horas. Esto significa que, después de una recolección exitosa, el ODR solo realizará un nuevo intento después de 24 horas.

## Referencia de Intervalos por Subproducto

A continuación se presentan los Subproductos organizados por categoría y sus intervalos por defecto.

Estos valores reflejan el máximo permitido por las reglas operacionales del [Open Finance](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17957025/Refer+ncia) al 01/12/2025.

### Datos de cuenta

| Nombre natural                 | Entidad Open Finance       | Intervalo de actualización (en horas) |
| ------------------------------ | -------------------------- | ------------------------------------- |
| Cuentas                        | Account                    | 90                                    |
| Detalles de la Cuenta          | AccountDetails             | 90                                    |
| Saldos de la Cuenta            | AccountBalance             | 2                                     |
| Transacciones                  | AccountTransactions        | 90                                    |
| Transacciones Recientes        | AccountTransactionsCurrent | 3                                     |
| Limites de Sobregiro           | AccountOverdraftLimits     | 2                                     |

### Tarjeta de crédito

| Nombre natural                     | Entidad Open Finance          | Intervalo de actualización (en horas) |
| ---------------------------------- | ----------------------------- | --------------------------------------|
| Lista de tarjetas de crédito       | CreditcardAccount             | 90                                    |
| Detalles de la Tarjeta             | CreditcardAccountDetails      | 6                                     |
| Facturas                           | CreditcardBills               | 24                                    |
| Transacciones de la Factura        | CreditcardBillsTransactions   | 24                                    |
| Limites de la Tarjeta              | CreditcardLimits              | 4                                     |
| Transacciones                      | CreditcardTransactions        | 180                                   |
| Transacciones Recientes            | CreditcardTransactionsCurrent | 3                                     |

### Datos personales

| Nombre natural                     | Entidad Open Finance               | Intervalo de actalización (en horas) |
| ---------------------------------- | ---------------------------------- | ------------------------------------ |
| Persona física -  Identificación   | CustomerPersonalIdentifications    | 90                                   |
| Persona física -  Califición       | CustomerPersonalQualifications     | 90                                   |
| Persona física -  Relación         | CustomerPersonalFinancialRelations | 90                                   |
| Persona jurídica - Identificación  | CustomerBusinessIdentifications    | 90                                   |
| Persona jurídica - Calificación    | CustomerBusinessQualifications     | 90                                   |
| Persona jurídica - Relación        | CustomerBusinessFinancialRelations | 90                                   |

### Préstamos

| Nombre natural          | Entidad Open Finance                    | Intervalo de actualización (en horas) |
| ----------------------- | --------------------------------------- | ------------------------------------- |
| Préstamos               | CreditLoansContracts                    | 24                                    |
| Detalles del Préstamo   | CreditLoansContractDetails              | 24                                    |
| Cuotas del Préstamo     | CreditLoansContractScheduledInstalments | 24                                    |
| Garantías del Préstamo  | CreditLoansContractWarranties           | 90                                    |
| Pagos del Préstamo      | CreditLoansContractPayments             | 6                                     |

### Financiamientos

| Nombre natural               | Entidad Open Finance                        | Intervalo de actualización (en horas) |
| ---------------------------- | ------------------------------------------- | ------------------------------------- |
| Financiamientos              | CreditFinancingContracts                    | 24                                    |
| Detalles del Financiamiento  | CreditFinancingContractDetails              | 90                                    |
| Garantías del Financiamiento | CreditFinancingContractWarranties           | 90                                    |
| Cuotas del Financiamiento    | CreditFinancingContractScheduledInstalments | 24                                    |
| Pagos del Financiamiento     | CreditFinancingContractPayments             | 24                                    |

### Sobregiro / Cheque especial

| Nombre natural                          | Entidad Open Finance                                          | Intervalo de actualización (en horas) |
| --------------------------------------- | ------------------------------------------------------------- | ------------------------------------- |
| Sobregiro                               | CreditUnarrangedAccountsOverdraftContracts                    | 24                                    |
| Detalles del Sobregiro                  | CreditUnarrangedAccountsOverdraftContractDetails              | 90                                    |
| Garantías del Sobregiro                 | CreditUnarrangedAccountsOverdraftContractWarranties           | 90                                    |
| Cuotas (cuando aplicable)               | CreditUnarrangedAccountsOverdraftContractScheduledInstalments | 24                                    |
| Pagos del sobregiro                     | CreditUnarrangedAccountsOverdraftContractPayments             | 24                                    |
| Contratos de Anticipación de Recibibles | CreditInvoiceFinancingContracts                               | 24                                    |
| Detalles de la Anticipación             | CreditInvoiceFinancingContractDetails                         | 90                                    |
| Garantías de la Anticipación            | CreditInvoiceFinancingContractWarranties                      | 90                                    |
| Cuotas de la Anticipación               | CreditInvoiceFinancingContractScheduledInstalments            | 24                                    |
| Pagos de Anticipación                   | CreditInvoiceFinancingContractPayments                        | 24                                    |

### Inversiones

| Nombre natural                         | Entidad Open Finance                            | Intervalo de actualización (en horas) |
| -------------------------------------- | ----------------------------------------------- | ------------------------------------- |
| Renta Fija Bancaria                    | InvestmentsBankFixedIncome                      | 24                                    |
| Detalles de Renta Fija Bancaria        | InvestmentsBankFixedIncomeDetails               | 90                                    |
| Saldos de Renta Fija Bancaria          | InvestmentsBankFixedIncomeBalances              | 6                                     |
| Transacciones de Renta Fija Bancaria   | InvestmentsBankFixedIncomeTransactions          | 90                                    |
| Transacciones Recientes                | InvestmentsBankFixedIncomeTransactionsCurrent   | 6                                     |
| Renta Fija de Crédito                  | InvestmentsCreditFixedIncome                    | 24                                    |
| Detalles de Renta Fija de Crédito      | InvestmentsCreditFixedIncomeDetails             | 90                                    |
| Saldos de Renta Fija de Crédito        | InvestmentsCreditFixedIncomeBalances            | 6                                     |
| Transacciones de Renta Fija de Crédito | InvestmentsCreditFixedIncomeTransactions        | 90                                    |
| Transacciones Recientes                | InvestmentsCreditFixedIncomeTransactionsCurrent | 6                                     |
| Renta Variable                         | InvestmentsVariableIncome                       | 24                                    |
| Detalles de Renta Variable             | InvestmentsVariableIncomeDetails                | 90                                    |
| Saldos de Renta Variable               | InvestmentsVariableIncomeBalances               | 24                                    |
| Transacciones de Renta Variable        | InvestmentsVariableIncomeTransactions           | 90                                    |
| Transacciones Recientes                | InvestmentsVariableIncomeTransactionsCurrent    | 24                                    |
| Notas de Corretaje                     | InvestmentsVariableIncomesBrokerNotes           | 24                                    |
| Títulos del Tesoro                     | InvestmentsTreasureTitles                       | 24                                    |
| Detalles de Títulos del Tesoro         | InvestmentsTreasureTitlesDetails                | 90                                    |
| Saldos de Títulos del Tesoro           | InvestmentsTreasureTitlesBalances               | 6                                     |
| Transacciones de Títulos del Tesoro    | InvestmentsTreasureTitlesTransactions           | 90                                    |
| Transacciones Recientes                | InvestmentsTreasureTitlesTransactionsCurrent    | 6                                     |
| Fondos de Inversión                    | InvestmentsFunds                                | 24                                    |
| Detalles de Fondos de Inversión        | InvestmentsFundsDetails                         | 90                                    |
| Saldos de Fondos de Inversión          | InvestmentsFundsBalances                        | 6                                     |
| Transacciones de Fondos de Inversión   | InvestmentsFundsTransactions                    | 90                                    |
| Transacciones Recientes                | InvestmentsFundsTransactionsCurrent             | 6                                     |

### Divisas (Cambio)

| Nombre natural      | Entidad Open Finance                    | Intervalo de actualización (en horas) |
| ------------------- | --------------------------------------- | ------------------------------------- |
| Divisas             | Exchanges                               | 24                                    |
| Detalles de Divisas | ExchangesDetails                        | 90                                    |
| Eventos de Divisas  | ExchangesEvents                         | 24                                    |

Considerando los valores de las tablas y tomando el recurso de Divisas como ejemplo: Su intervalo de actualización es de 24 horas. Después de la ejecución de una llamada a la Entidad Exchanges, el ODR solo intentará una nueva actualización después de 24 horas.

## Límites Operacionales

Cada Entidad del Open Finance posee límites regulatorios de cantidad de llamadas permitidas en un período específico. Estos límites son regulados con base en la tupla **Institución Transmisora x Producto x Cliente final**.

Por ejemplo, el recurso **Cuentas** (Account) solo puede ser consultado hasta 8 veces por mes para un mismo cliente, entre una misma Receptora y Transmisora. Así, un individuo con cuentas en los bancos A, B y C puede consultar:

- 8 veces sus cuentas del Banco A desde el Banco B;
- 8 veces sus cuentas del Banco A desde el Banco C;
- 8 veces sus cuentas del Banco B desde el Banco C.
- ...

Si el límite es alcanzado, la Transmisora retorna un error operacional.

Cuando esto sucede:

- El ODR suspende automáticamente nuevas actualizaciones del recurso;
- Continúa retornando datos guardados anteriormente (*consulta en frío*);
- Espera la renovación del período para retomar las recolecciones.

Esto garantiza estabilidad incluso cuando se alcanzan los límites del Open Finance.
