---
layout: default
title: Configuration
parent: "Opus Data Receiver"
nav_order: 2
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/configuracao/"
      lang: "pt-br"
    - path: "/Documentation/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/configuracao/"
      lang: "es"
---

## Introduction to Automatic Periodic Search

Automatic periodic search is the mechanism that allows the client to define which data will be updated and how frequently each Entity (Product and/or Subproduct) will be collected.

Each Entity receives an update interval, in hours. This interval determines how much time should pass between two consecutive update attempts. The logic ensures:

- Cumprimento dos limites regulatórios do Open Finance (uma vez mantidos os intervalos configurados por padrão);
- Load control over Transmitters;
- Predictability in the synchronization cycle;
- Efficient use of query credits.

The interval for each Entity is initially configured by the ODR according to operational limitations in Open Finance Brazil. The client can change these values according to their needs, but the product does not validate compliance with operational limits, **responsibility that falls to whoever changes this configuration**.

The ODR ensures that no Entity will be updated before the defined minimum interval. **Example:** The Exchanges Entity has a 24-hour interval. This means that after a successful collection, the ODR will only make a new attempt after 24 hours.

## Subproduct Interval Reference

Below are the Subproducts organized by category and their default intervals.

These values reflect the maximum allowed by [Open Finance](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17957025/Refer+ncia) operational rules as of 12/01/2025.

### Account Data

| Friendly Name       | Open Finance Entity        | Update Interval (in hours) |
| ------------------- | -------------------------- | -------------------------- |
| Accounts            | Account                    | 90                         |
| Account Details     | AccountDetails             | 90                         |
| Account Balances    | AccountBalance             | 2                          |
| Transactions        | AccountTransactions        | 90                         |
| Recent Transactions | AccountTransactionsCurrent | 3                          |
| Overdraft Limits    | AccountOverdraftLimits     | 2                          |

### Credit Card

| Friendly Name       | Open Finance Entity           | Update Interval (in hours) |
| ------------------- | ----------------------------- |--------------------------- |
| Credit Card List    | CreditcardAccount             | 90                         |
| Card Details        | CreditcardAccountDetails      | 6                          |
| Bills               | CreditcardBills               | 24                         |
| Bill Transactions   | CreditcardBillsTransactions   | 24                         |
| Card Limits         | CreditcardLimits              | 4                          |
| Transactions        | CreditcardTransactions        | 180                        |
| Recent Transactions | CreditcardTransactionsCurrent | 3                          |

### Personal Data

| Friendly Name               | Open Finance Entity                | Update Interval (in hours) |
| --------------------------- | ---------------------------------- | -------------------------- |
| Individual - Identification | CustomerPersonalIdentifications    | 90                         |
| Individual - Qualification  | CustomerPersonalQualifications     | 90                         |
| Individual - Relationship   | CustomerPersonalFinancialRelations | 90                         |
| Business - Identification   | CustomerBusinessIdentifications    | 90                         |
| Business - Qualification    | CustomerBusinessQualifications     | 90                         |
| Business - Relationship     | CustomerBusinessFinancialRelations | 90                         |

### Loans

| Friendly Name     | Open Finance Entity                     | Update Interval (in hours) |
| ----------------- | --------------------------------------- | -------------------------- |
| Loans             | CreditLoansContracts                    | 24                         |
| Loan Details      | CreditLoansContractDetails              | 24                         |
| Loan Installments | CreditLoansContractScheduledInstalments | 24                         |
| Loan Collateral   | CreditLoansContractWarranties           | 90                         |
| Loan Payments     | CreditLoansContractPayments             | 6                          |

### Financing

| Friendly Name          | Open Finance Entity                         | Update Interval (in hours) |
| ---------------------- | ------------------------------------------- | -------------------------- |
| Financing              | CreditFinancingContracts                    | 24                         |
| Financing Details      | CreditFinancingContractDetails              | 90                         |
| Financing Collateral   | CreditFinancingContractWarranties           | 90                         |
| Financing Installments | CreditFinancingContractScheduledInstalments | 24                         |
| Financing Payments     | CreditFinancingContractPayments             | 24                         |

### Overdraft

| Friendly Name                   | Open Finance Entity                                           | Update Interval (in hours) |
| ------------------------------- | ------------------------------------------------------------- | -------------------------- |
| Unarranged Overdraft            | CreditUnarrangedAccountsOverdraftContracts                    | 24                         |
| Unarranged Overdraft Details    | CreditUnarrangedAccountsOverdraftContractDetails              | 90                         |
| Unarranged Overdraft Collateral | CreditUnarrangedAccountsOverdraftContractWarranties           | 90                         |
| Installments (when applicable)  | CreditUnarrangedAccountsOverdraftContractScheduledInstalments | 24                         |
| Unarranged Overdraft Paymentsl  | CreditUnarrangedAccountsOverdraftContractPayments             | 24                         |
| Invoice Financing Contracts     | CreditInvoiceFinancingContracts                               | 24                         |
| Invoice Financing Details       | CreditInvoiceFinancingContractDetails                         | 90                         |
| Invoice Financing Collateral    | CreditInvoiceFinancingContractWarranties                      | 90                         |
| Invoice Financing Installments  | CreditInvoiceFinancingContractScheduledInstalments            | 24                         |
| Invoice Financing Payments      | CreditInvoiceFinancingContractPayments                        | 24                         |

### Investments

| Friendly Name                    | Open Finance Entity                             | Update Interval (in hours) |
| -------------------------------- | ----------------------------------------------- | -------------------------- |
| Bank Fixed Income                | InvestmentsBankFixedIncome                      | 24                         |
| Bank Fixed Income Details        | InvestmentsBankFixedIncomeDetails               | 90                         |
| Bank Fixed Income Balances       | InvestmentsBankFixedIncomeBalances              | 6                          |
| Bank Fixed Income Transactions   | InvestmentsBankFixedIncomeTransactions          | 90                         |
| Recent Transactions              | InvestmentsBankFixedIncomeTransactionsCurrent   | 6                          |
| Credit Fixed Income              | InvestmentsCreditFixedIncome                    | 24                         |
| Credit Fixed Income Details      | InvestmentsCreditFixedIncomeDetails             | 90                         |
| Credit Fixed Income Balances     | InvestmentsCreditFixedIncomeBalances            | 6                          |
| Credit Fixed Income Transactions | InvestmentsCreditFixedIncomeTransactions        | 90                         |
| Recent Transactions              | InvestmentsCreditFixedIncomeTransactionsCurrent | 6                          |
| Variable Income                  | InvestmentsVariableIncome                       | 24                         |
| Variable Income Details          | InvestmentsVariableIncomeDetails                | 90                         |
| Variable Income Balances         | InvestmentsVariableIncomeBalances               | 24                         |
| Variable Income Transactions     | InvestmentsVariableIncomeTransactions           | 90                         |
| Recent Transactions              | InvestmentsVariableIncomeTransactionsCurrent    | 24                         |
| Broker Notes                     | InvestmentsVariableIncomesBrokerNotes           | 24                         |
| Treasury Titles                  | InvestmentsTreasureTitles                       | 24                         |
| Treasury Titles Details          | InvestmentsTreasureTitlesDetails                | 90                         |
| Treasury Titles Balances         | InvestmentsTreasureTitlesBalances               | 6                          |
| Treasury Titles Transactions     | InvestmentsTreasureTitlesTransactions           | 90                         |
| Recent Transactions              | InvestmentsTreasureTitlesTransactionsCurrent    | 6                          |
| Investment Funds                 | InvestmentsFunds                                | 24                         |
| Investment Funds Details         | InvestmentsFundsDetails                         | 90                         |
| Investment Funds Balances        | InvestmentsFundsBalances                        | 6                          |
| Investment Funds Transactions    | InvestmentsFundsTransactions                    | 90                         |
| Recent Transactions              | InvestmentsFundsTransactionsCurrent             | 6                          |

### Foreign Exchange

| Friendly Name            | Open Finance Entity | Update Interval (in hours) |
| ------------------------ | ------------------- | -------------------------- |
| Foreign Exchange         | Exchanges           | 24                         |
| Foreign Exchange Details | ExchangesDetails    | 90                         |
| Foreign Exchange Events  | ExchangesEvents     | 24                         |

Considerando os valores das tabelas e tomando o recurso de Câmbio como exemplo: Seu intervalo de atualização é de 24 horas. Após a execução de uma chamada à Entidade Exchanges, o ODR somente tentará nova atualização após 24 horas.

## Operational Limits

Each Open Finance Entity has regulatory limits on the number of calls allowed in a specific period. These limits are regulated based on the **Transmitting Institution x Product x End Customer** tuple.

For example, the **Accounts** (Account) resource can only be queried up to 8 times per month for the same customer, between the same Receiver and Transmitter. Thus, an individual with accounts in banks A, B, and C can query:

- 8 times their accounts from Bank A via Bank B;
- 8 times their accounts from Bank A via Bank C;
- 8 times their accounts from Bank B via Bank C.
- ...

If the limit is reached, the Transmitter returns an operational error.

When this happens:

- The ODR automatically suspends new updates for the resource;
- Continues to return previously saved data (*cold query*);
- Waits for the renewal of the period to resume collections.

This ensures stability even when Open Finance limits are reached.
