---
layout: default
title: Operation
parent: "Opus Data Receiver"
nav_order: 3
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/funcionamento/"
      lang: "pt-br"
    - path: "/Documentation/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/funcionamento/"
      lang: "es"
---

## Overview

The Opus Data Receiver operates through a cycle containing three main components:

- Registration and consent creation;
- Collection and updating of Entities (Products and Subproducts);
- Provision of data through searches and queries.

## Registration Flow

For the ODR to access an individual's or company's data in Open Finance, a valid consent must exist. The registration flow is precisely the process of initiating this consent and registering all necessary information for the ODR to operate.

The flow works as follows:

1. **The client starts the registration:** The client informs the ODR who the data subject is (individual or business) and which information they wish to access (permissions). This process follows the Open Finance Brazil standard;
2. **The ODR creates the consent:** After receiving the request, the ODR sends the consent request to the Data Transmitting Institution where the data is stored;
3. **The consent enters the *Awaiting Authorization* state:** At this point, the registration is not yet active. The status only indicates that the request was successfully created but still depends on the end user's action;
4. **The user authorizes the consent directly at the financial institution:** The data subject (individual or business) accesses the Data Transmitting Institution's environment and authorizes the sharing;
5. **The ODR automatically detects the authorization:** As soon as the consent is approved, the ODR updates the status to *Authorized*;
6. **First automatic data update:** With the consent authorized, the ODR performs the first complete data search for all permitted products.

Each Entity then begins to follow the update schedule defined in the automatic periodic search configuration.

### SetupID

When registration is completed, the ODR generates an identifier called SetupID, which represents all necessary information for accessing the data of that consent.

The SetupID must be sent in all subsequent calls, as it identifies:

- The client;
- The consent;
- The Data Transmitting Institution;
- The set of authorized permissions.

## Product Retrieval Flow

With the consent authorized, the client can query the available Products (Accounts, Foreign Exchange, Investments, Credit Operations, etc.).

For this, simply provide the SetupID, without needing to repeat the subject's information or additional authorizations.

If the consent does not include some necessary permission, the Data Transmitting Institution will inform that access is not permitted. In this case, the data cannot be obtained until a new consent is created with the appropriate permissions.

The ODR's response includes:

- The list of available Products;
- The identifiers of each Product;
- General information such as pagination and update date.

These identifiers are important for the next steps.

## Subproduct Retrieval Flow

Some Open Finance resources require the client to first query the corresponding Product to discover the necessary IDs.

For example:

- To access an account balance, it is necessary to first consult the list of accounts.
- To query contract payments, it is necessary to first obtain the contract IDs.

The process follows this logic:

1. The client queries the Product (such as Accounts);
2. The ODR returns a set of records, each with its own identifier;
3. The client chooses which record they wish to detail;
4. The client makes the specific query (such as Account Balance), providing the selected item's ID and the SetupID.

This mechanism ensures security and organization, while avoiding unnecessary queries.

## Searches

Whenever the ODR needs to collect or return data, it performs a search. Searches serve three purposes:

- Updating the database;
- Responding to REST requests from the client;
- Fulfilling the schedule of automatic periodic searches.

The ODR operates two types of search: **Cold** and **Hot**.

### Cold Search

Cold Search means searching only in the data already stored in the ODR. It exists for scenarios where the client only wants to retrieve the most recent data already saved, without needing to update anything. It is the product's default search model.

Advantages:

- Does not consume regulatory credits;
- Does not trigger Data Transmitting Institutions;
- Does not trigger operational limits;
- Is used when there is **no** need for new data (beyond what is already contained in the database);
- Is extremely fast and secure, as it consumes only local data and is not subject to other institutions' response times.

Cold Search is ideal when:

- Data was recently updated;
- The Transmitter has reached operational limits;
- The resource has become invalid (e.g., closed account);
- The client wants to reduce traffic and costs.

Despite being simple, the cold search is fundamental for keeping the ODR efficient, reducing operational costs, and preserving monthly limits.

### Hot Search

Hot Search queries Data Transmitting Institutions in real time. This search is synchronous, meaning the ODR queries the Transmitter at the time of the request, processes the results, and then returns the response.

The hot search is powerful because it guarantees that the returned data is as up-to-date as possible. However, it carries significant risks.

#### Risks of Hot Search

Each hot query consumes credits, which are limited per Resource, Transmitter, End Customer, and Receiver.

Excessive hot searches can result in:

- Depletion of credits;
- Blocking of updates;
- Return of only cold data;
- Incorrect perception of consent error;
- Worsening of the end user experience.

Therefore, it is important to calibrate the intervals of automatic periodic searches well and reserve credits for critical operations, leaving a margin for hot calls triggered by client systems.

### How to Avoid Excessive Credit Consumption

The ODR recommends:

- Increasing automatic update intervals when continuous synchronization is not necessary;
- Reserving monthly credits for hot searches, especially for business-critical resources;
- Using cold searches whenever recently updated data is already in the database;
- Configuring different intervals per Entity, prioritizing only time-sensitive data.

With this balance, the client ensures regular updates, capacity for emergency calls, and full compliance with Open Finance operational rules.

### Search APIs

Both search modes (hot and cold) are performed through REST calls to the ODR. The differentiation between them occurs exclusively via a header sent by the client in the request.

The header used to indicate the search type is *x-update-data*, where:

- *True*: Triggers a **Hot Search**;
- *False*: Triggers a **Cold Search**.

Default Behavior: If the header is not sent, the search is treated as cold by default, ensuring security and avoiding accidental credit consumption at the Transmitter.

The following APIs allow searches for resource groups:

- [Setup][API-Setup]
- [Checking Account][API-Checking-Account]
- [Credit Card][API-Credit-Card]
- [Registration Data][API-Registration-Data]
- Credit operations:
  - [Financing][API-Financing]
  - [Loans][API-Loans]
  - [Unarranged Overdraft][API-Unarranged-Overdraft]
  - [Invoice Financing][API-Invoice-Financing]
- Investments:
  - [Bank Fixed Income][API-Bank-Fixed-Income]
  - [Credit Fixed Income][API-Credit-Fixed-Income]
  - [Variable Income][API-Variable-Income]
  - [Treasury Direct][API-Treasury-Direct]
  - [Investment Funds][API-Investment-Funds]
  - [Foreign Exchange][API-Foreign-Exchange]

## Complete Operational Flow Overview

1. The client creates a consent through the ODR;
2. The end user authorizes sharing at the Transmitting Institution;
3. The ODR identifies the authorization and collects the first data;
4. The client queries Products and Subproducts using the SetupID;
5. The ODR automatically updates data according to the interval configuration;
6. Cold and hot searches operate as needed, respecting regulatory limits.

[API-Setup]: ../../../../swagger-ui/index.html?api=en-odr-setup
[API-Checking-Account]: ../../../../swagger-ui/index.html?api=en-odr-accounts
[API-Credit-Card]: ../../../../swagger-ui/index.html?api=en-odr-creditcard
[API-Registration-Data]: ../../../../swagger-ui/index.html?api=en-odr-customer
[API-Financing]: ../../../../swagger-ui/index.html?api=en-odr-credit_financing
[API-Loans]: ../../../../swagger-ui/index.html?api=en-odr-credit_loans
[API-Unarranged-Overdraft]: ../../../../swagger-ui/index.html?api=en-odr-credit-invoice-financing
[API-Invoice-Financing]: ../../../../swagger-ui/index.html?api=en-odr-credit-unarranged-accounts
[API-Bank-Fixed-Income]: ../../../../swagger-ui/index.html?api=en-odr-investments_bank_fixed_income
[API-Credit-Fixed-Income]: ../../../../swagger-ui/index.html?api=en-odr-investments_credit_fixed_income
[API-Variable-Income]: ../../../../swagger-ui/index.html?api=odr-investments_variable_incomes
[API-Treasury-Direct]: ../../../../swagger-ui/index.html?api=en-odr-investments_treasure_titles
[API-Investment-Funds]: ../../../../swagger-ui/index.html?api=en-odr-investments_funds
[API-Foreign-Exchange]: ../../../../swagger-ui/index.html?api=en-odr-exchanges
