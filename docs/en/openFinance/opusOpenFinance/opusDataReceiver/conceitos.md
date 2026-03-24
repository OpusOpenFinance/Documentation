---
layout: default
title: Concepts
parent: "Opus Data Receiver"
nav_order: 1
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/conceitos/"
      lang: "pt-br"
    - path: "/Documentation/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/conceitos/"
      lang: "es"
---

## Product and Subproduct Structure

The Opus Data Receiver (ODR) organizes Open Finance Brazil data in a tree-like structure. In this tree:

- Main entities, which represent broad categories of information, are called **Products**;
- Derived entities, which detail or complement a Product, are called **Subproducts**.

A Product is always the root of the tree, and a Subproduct only exists if its corresponding Product also exists.

Currently, ODR works with 18 main Products:

| Friendly Name | Open Finance Product |
| ------------- | ------------------------------------------------------- |
| Checking Account | Account |
| Credit Card Accounts | CreditcardAccount |
| Foreign Exchange | Exchanges |
| Individual Customer - Identification | CustomerPersonalIdentifications |
| Individual Customer - Qualification | CustomerPersonalQualifications |
| Individual Customer - Relationship | CustomerPersonalFinancialRelations |
| Business Customer - Identification | CustomerBusinessIdentifications |
| Business Customer - Qualification | CustomerBusinessQualifications |
| Business Customer - Relationship | CustomerBusinessFinancialRelations |
| Loans | CreditLoansContracts |
| Unarranged Overdraft | CreditUnarrangedAccountsOverdraftContracts |
| Financing | CreditFinancingContracts |
| Invoice Financing | CreditInvoiceFinancingContracts |
| Bank Fixed Income | InvestmentsBankFixedIncome |
| Investment Funds | InvestmentsFunds |
| Credit Fixed Income | InvestmentsCreditFixedIncome |
| Treasury Direct Titles | InvestmentsTreasureTitles |
| Variable Income Operations | InvestmentsVariableIncome |

A Product may have specific Subproducts (for example, Checking Account has Subproducts such as Balances, Transactions, Limits, and Details), while other Products have no Subproducts, such as Individual and Business Customer Data.

## Relationship between Products and Subproducts

Updating a Subproduct always depends on the existence and validity of its Product.

The ODR periodically validates the status of each Product directly with the Data Transmitting Institution. This validation determines if the resource still exists and if the consent authorizes its collection. If a Product becomes invalid, the ODR:

- Keeps the data already collected;
- Stops new updates for the Product and all its Subproducts;
- Returns only the previously stored information when requested by the client.

Example:

If credit card number 1234 from Bank B is canceled and the Data Transmitter informs the ODR that the resource no longer exists, only the Subproducts linked to the Product "Credit Card - account 1234" stop being updated. Details, limits, transactions, and statements are no longer collected and exist only as previously stored data (cold query).

## Identifiers in Open Finance

To access Subproducts, it is necessary to provide identifiers such as:

- accountId;
- creditCardAccountId;
- contractId;
- investmentsId.

They are always obtained by querying the Product, ensuring security, traceability, and data consistency.

## Broker Notes (brokerNoteId)

Within the context of Investment Products, specifically for variable income operations, there is a special relationship associated with stock exchange trading notes, identified by the *brokerNoteId*. This is the only case within ODR where a Subproduct depends on data that may or may not be present in the Transmitter's response.

When the client queries variable income transactions, each buy or sell movement may be accompanied by a brokerNoteId. This identifier represents the trading note issued for that operation. When present, it must be used as a mandatory parameter to access the "Trading Note" Subproduct.

The brokerNoteId must be a unique and immutable identifier provided by the Transmitter, corresponding to each natural trading note number, as per the [Open Finance Brazil specification](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1394901381/Informa+es+T+cnicas+-+DC+Renda+Vari+vel+-+v1.3.0). Only when this identifier is provided in the transaction is it possible to query the detailed data of the trading note related to that operation.

## Core and Scheduler

The ODR is structured into two components that work in an integrated manner to ensure the collection, updating, and provision of Open Finance data: the Core and the Scheduler. Each has distinct and complementary responsibilities, ensuring performance, consistency, and compliance at all stages of the process.

### Core

The central component of the ODR, responsible for executing data processing and operating as the system's engine. It is the Core that performs queries to Transmitters, orchestrates the collection flow, applies internal consistency rules, and makes data available for query via API. It also manages access to the ODR's internal database, ensuring performance, integrity, and traceability of the shared information.

### Scheduler

The module that manages update policies and permissions and coordinates when each Product and Subproduct will be collected. The Scheduler interprets permissions, intervals, and consent statuses, operating within the configured window for executing update routines. It ensures that collections occur efficiently, respecting the rules of each Institution.
