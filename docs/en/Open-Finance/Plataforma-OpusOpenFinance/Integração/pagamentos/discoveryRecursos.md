---
layout: default
title: "Resource Discovery"
parent: "Payments"
nav_order: 1
has_children: true
lang: "en"
alternate_lang: 
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/pagamentos/discoveryRecursos/"
      lang: "pt-br"
    - path: "/Documentation/es/Open-Finance/Plataforma-OpusOpenFinance/Integração/pagamentos/discoveryRecursos/"
      lang: "es"
---

## Consent API

- [Consent API](#consent-api)
  - [Resource Discovery in Opus Open Banking](#resource-discovery-in-opus-open-banking)
    - [Discovery Moments](#discovery-moments)
      - [Selectable Products](#selectable-products)
      - [Non-selectable Products](#non-selectable-products)
    - [Consent and Products](#consent-and-products)
    - [Handling Identifiers](#handling-identifiers)
    - [Discovery Connectors](#discovery-connectors)
      - [Selectable Product Connector](#selectable-product-connector)
      - [Non-selectable Product Connector](#non-selectable-product-connector)
    - [Payment Data Validation Connector](#payment-data-validation-connector)
    - [Risk Signals Validation Connector](#risk-signals-validation-connector)
    - [Additional Treatments](#additional-treatments)
      - [Account Filtering](#account-filtering)
    - [Multiple Authorisations](#multiple-authorisations)
      - [Handling PENDING_AUTHORISATION](#handling-pending_authorisation)
  - [Permission Groups in Consent Creation](#permission-groups-in-consent-creation)
  - [Approval of Payment Consent Creation](#approval-of-payment-consent-creation)
    - [Temporary Solution for approvePaymentConsentCreation Route](#temporary-solution-for-approvepaymentconsentcreation-route)
  - [Auxiliary Services](#auxiliary-services)

## Resource Discovery in Opus Open Banking

Resource discovery in Opus Open Banking is one of the integration points between
Opus Open Banking and the institution’s legacy systems, and it is the integration
responsible for discovering the products linked to a consent.  
Resource discovery occurs during two different moments in Open Banking.

### Discovery Moments

#### Selectable Products

The discovery moment occurs during the consent acceptance phase by the customer's
institution.  
Data-sharing consents involving the **account** and **credit card** products, as well as
payment consents, must display the available product instances during the authentication
and consent acceptance flow so they can be actively selected by the customer.  
We refer to these products as **selectable products**.

The table below lists all selectable products handled by Opus Open Banking and their types:

| Consent Type             | Product             | Product Type | Camel Route Name                             |
| ------------------------ | ------------------- | ------------ | --------------------------------------------- |
| Data Sharing             | ACCOUNT             | Selectable   | ```direct:discoverAccounts```                 |
| Data Sharing             | CREDIT_CARD_ACCOUNT | Selectable   | ```direct:discoverCreditCardAccounts```       |
| Payment                  | PAYMENT[^1]         | Selectable   | ```direct:discoverPayments_v2```              |

[^1]: The **PAYMENT** product allows selecting the source of funds for a payment independent of the ACCOUNT product, enabling payments via credit card or other sources the institution may support.

If the institution provides any data-sharing products, a Camel route must be created as referenced in the table, following the [request and response formats required for the product type](#discovery-connectors).  
If the institution does *not* provide these products (i.e., it does not implement the Camel routes), the default discovery response is null and no routes need to be created.

#### Non-selectable Products

This discovery moment occurs during the usage phase of a data-sharing consent, when the *TPP* calls the regulatory API  
[`GET /resources/v1/resources`](https://openbankingbrasil.atlassian.net/wiki/spaces/OB/pages/33849604/Informa+es+T+cnicas+-+Resources+-+v1.0.2) or  
[`GET /resources/v2/resources`](https://openbankingbrasil.atlassian.net/wiki/spaces/OB/pages/57409630/Informa+es+T+cnicas+-+Resources+-+v2.0.0).  

This API must return **all resources available in the consent**, meaning those actively selected by the customer during acceptance and all other products authorized in the consent.  
These non-actively selected products are referred to as **non-selectable products**.

The table below lists all non-selectable products handled by Opus Open Banking:

| Consent Type             | Product                      | Product Type    | Camel Route Name                                |
| ------------------------ | ---------------------------- | --------------- | ----------------------------------------------- |
| Data Sharing             | INVOICE_FINANCING            | Non-selectable  | ```direct:discoverInvoiceFinancings```          |
| Data Sharing             | FINANCING                    | Non-selectable  | ```direct:discoverFinancings```                 |
| Data Sharing             | LOAN                         | Non-selectable  | ```direct:discoverLoans```                      |
| Data Sharing             | UNARRANGED_ACCOUNT_OVERDRAFT | Non-selectable  | ```direct:discoverUnarrangedAccountOverdrafts```|
| Data Sharing             | BANK_FIXED_INCOMES_READ      | Non-selectable  | ```direct:discoverBankFixedIncomes```           |
| Data Sharing             | CREDIT_FIXED_INCOMES_READ    | Non-selectable  | ```direct:discoverCreditFixedIncomes```         |
| Data Sharing             | FUNDS_READ                   | Non-selectable  | ```direct:discoverFunds```                      |
| Data Sharing             | VARIABLE_INCOMES_READ        | Non-selectable  | ```direct:discoverVariableIncomes```            |
| Data Sharing             | TREASURE_TITLES_READ         | Non-selectable  | ```direct:discoverTreasureTitles```             |
| Data Sharing             | EXCHANGES_READ               | Non-selectable  | ```direct:discoverExchanges```                  |

If the institution provides a product of this type, it must create the Camel route as referenced, using the defined request/response schema.  
If the product is not provided, the default discovery response is null and no routes must be implemented.

Possible statuses for non-selectable resources:

| Status                   | Description                                                                                   | Transition Rules                                                          |
| ------------------------ | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| PENDING_AUTHORISATION    | Resource requires additional approval (multiple authorisations)                               | May transition to any status                                               |
| TEMPORARILY_UNAVAILABLE  | Resource temporarily blocked or unavailable in digital channels                                | May transition to AVAILABLE or UNAVAILABLE                                 |
| AVAILABLE                | Resource fully available and usable in digital channels                                        | May transition to TEMPORARILY_UNAVAILABLE or UNAVAILABLE                   |
| UNAVAILABLE              | Closed, migrated, cancelled, or charged-off resources                                         | Cannot transition to any other status                                      |

### Consent and Products

As described above, discovery moments are tied to products and their permissions.  
Another important aspect is the relationship between consent-permissions and products.  
This relationship determines which discovery operations will occur for a given consent.

| Consent Type             | Permissions                                                                                                                                                                               | Product                      |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Data Sharing             | ACCOUNTS_READ, ACCOUNTS_BALANCES_READ, ACCOUNTS_TRANSACTIONS_READ, ACCOUNTS_OVERDRAFT_LIMITS_READ                                                                                        | ACCOUNT                      |
| Data Sharing             | CREDIT_CARDS_ACCOUNTS_READ, CREDIT_CARDS_ACCOUNTS_BILLS_READ, CREDIT_CARDS_ACCOUNTS_BILLS_TRANSACTIONS_READ, CREDIT_CARDS_ACCOUNTS_LIMITS_READ, CREDIT_CARDS_ACCOUNTS_TRANSACTIONS_READ  | CREDIT_CARD_ACCOUNT          |
| Data Sharing             | INVOICE_FINANCINGS_READ, INVOICE_FINANCINGS_SCHEDULED_INSTALMENTS_READ, INVOICE_FINANCINGS_PAYMENTS_READ, INVOICE_FINANCINGS_WARRANTIES_READ                                             | INVOICE_FINANCING            |
| Data Sharing             | FINANCINGS_READ, FINANCINGS_SCHEDULED_INSTALMENTS_READ, FINANCINGS_PAYMENTS_READ, FINANCINGS_WARRANTIES_READ                                                                             | FINANCING                    |
| Data Sharing             | LOANS_READ, LOANS_SCHEDULED_INSTALMENTS_READ, LOANS_PAYMENTS_READ, LOANS_WARRANTIES_READ                                                                                                 | LOAN                         |
| Data Sharing             | UNARRANGED_ACCOUNTS_OVERDRAFT_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_SCHEDULED_INSTALMENTS_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_PAYMENTS_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_WARRANTIES_READ | UNARRANGED_ACCOUNT_OVERDRAFT |
| Payment                  | N/A                                                                                                                                                                                       | PAYMENT                      |

A data-sharing consent with all permissions will perform:

- Discovery of ACCOUNT and CREDIT_CARD products during consent confirmation.
- Discovery of INVOICE_FINANCING, FINANCING, LOAN, and UNARRANGED_ACCOUNT_OVERDRAFT products during `GET /resources`.

Discovery is always executed in parallel to reduce API response times.

### Handling Identifiers

A key concept in Open Banking is  
[ID formation and stability](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17377493/Forma+o+e+Estabilidade+do+ID),  
which requires identifiers exchanged in the ecosystem to be **meaningless and non-semantic**.

Opus Open Banking ensures anonymization and uniqueness of identifiers by converting
legacy system identifiers into Open Banking identifiers.

Legacy systems may use various identification schemes, including composite keys.  
Opus Open Banking interfaces always use an array of key/value pairs for representing
legacy identifiers.  
It is from this structure that the Open Banking identifier is generated.

### Discovery Connectors

Discovery connectors are implemented in Apache Camel like all other integration connectors between Opus Open Banking and the institution’s legacy systems.

Connectors must follow one of two models: **selectable** or **non-selectable**.

#### Selectable Product Connector

Selectable products must follow these schemas:

| Type    | JSON Schema                                                                                                         |
| ------- | ------------------------------------------------------------------------------------------------------------------- |
| Request | [discoveryResourceRequest.json](./anexos/json/discoveryRecursos/discoveryDataSharing/en-discoveryResourceRequest.json)        |
| Response| [discoverySelectableResourceResponse.json](./anexos/json/discoveryRecursos/discoveryDataSharing/en-discoverySelectableResourceResponse.json) |

Example response:

```json
{
  "resources":[
    {
      "resourceName":[
        { "key":"Agency", "value":"1234" },
        { "key":"Checking Account", "value":"12345-6" }
      ],
      "resourceLegacyId":[
        { "key":"pkAgency", "value":"1234" },
        { "key":"pkCheckingAccount", "value":"123456" }
      ],
      "resourceBalanceCurrency":"BRL",
      "resourceBalanceAmount":239.12,
      "authorizers":[
        { "cpf":"06672639004", "name":"João da Silva" },
        { "cpf":"05473670075", "name":"Maria da Silva" }
      ],
      "defaultSelected":true
    }
  ]
}
```

#### Non-selectable Product Connector

Non-selectable products must follow:

| Type     | JSON Schema                                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| Request  | [discoveryResourceRequest.json](./anexos/json/discoveryRecursos/discoveryDataSharing/en-discoveryResourceRequest.json)                               |
| Response | [discovery-nonselectable-resource-response.json](../schemas/v2/consent/discoveryDataSharing/discovery-nonselectable-resource-response.json) |

Example:

```json
{
  "resources":[
    {
      "resourceLegacyId":[ { "key":"pkLoan", "value":"ABC12010" } ],
      "validUntil":"2022-06-07"
    },
    {
      "resourceLegacyId":[ { "key":"pkLoan", "value":"DEF51242" } ],
      "status": "TEMPORARILY_UNAVAILABLE",
      "validUntil":"2022-06-07"
    }
  ]
}
```

**IMPORTANT:** The legacy system is responsible for resource status control and validity (validUntil).

### Payment Data Validation Connector

The payment validation connector is implemented in Apache Camel and is responsible for performing certain payment validations, such as:

- DICT (Pix directory) validation
- QR Code validation (QRND/QRES)
- Account data validation

The Camel route listens on `direct:validatePaymentData` and an example from [request](./anexos/json/discoveryRecursos/validatePaymentData/en-requestExample.json).

**Important:** From Consent version 4 onward, if multiple errors are detected, the highest-priority error must be returned.
Priority table: see *Technical Information* in the
[Payments API](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17375943/SV+API+-+Pagamentos).

### Account Holder Discovery Connector

Due to regulatory requirements, the PCM (Metrics Collection Platform) must send information indicating whether the person requesting consent is an account holder at the institution.

A connector was created to validate whether a CPF/CNPJ belongs to an account holder.

Return must be:

- Positive (belongs to an account holder);
- Negative (does not belong).

Connector route:

| Consent Type | Camel Route Name                            |
| --------------------- | --------------------------------------------- |
| All                 | ```direct:checkAccountHolderStatus```         |

Definitions:

- [request-schema](./anexos/json/discoveryRecursos/checkAccountHolderStatus/en-requestSchema.json)
- [response-schema](./anexos/json/discoveryRecursos/checkAccountHolderStatus/en-responseSchema.json)

Examples:

- [request-example](./anexos/json/discoveryRecursos/checkAccountHolderStatus/en-requestExample.json)
- [response-example](./anexos/json/discoveryRecursos/checkAccountHolderStatus/en-responseExample.json)

**Observation:**

The implemented standard connector should call the account holder connector,
if it does not exist, then the account discovery connector will be called,
and if this does not work, the new connector must be implemented.

### Risk Signals Validation Connector

During two moments of the non-redirect journey (JSR), users must send information about their device (geolocation, OS version, language, etc.).

If the institution wants to validate these data, it must implement the route `direct:validateRiskSignals`.

**Important:** Implementing the route is not mandatory, but it is recommended.

Definitions:

- [request-schema](./anexos/json/discoveryRecursos/validateRiskSignals/en-requestSchema.json)
- [response-schema](./anexos/json/discoveryRecursos/validateRiskSignals/en-responseSchema.json)

Scenarios in which implementation would be recommended:

- Risk analysis if the customer is in an area considered high-risk, which could temporarily reduce the limit, or adding some validation to make the payment;
- If the device has been "rooted", risk analysis validations of the operation could be added, as there would be a possibility that the device is compromised.

### Additional Treatments

#### Account Filtering

In some situations, the account used for a financial transaction is defined by the customer before selecting accounts in the payment initiating application. In these scenarios, the `debtorAccount` object will be populated in the consent, and the returned list must be filtered to return only the pre-selected account or an empty list if this is not a selectable option for the customer. This handling must be done in the connector or remote account listing service.

### Multiple Authorisations

#### Handling PENDING_AUTHORISATION

The data sharing discovery connectors must handle the `PENDING_AUTHORISATION` status. It will be the institution's responsibility to handle the status of the products (and registration data if the institution requires multi-level authorization). The product will store the status of each resource in the data transmission and will validate the status in product calls, preventing calls from occurring in case of pending issues (error 403 as per the documentation for all resource types in the Open Finance Brazil documentation).

The handling of the return from the discovery connectors must accept the `PENDING_AUTHORISATION` status when the consent is multi-level, listing the resource in the `GET /resources` API appropriately and preventing the instance call when it is named.

Future calls to the discovery connectors may return the `AVAILABLE` status, causing the OOB to change the status of this resource to `AVAILABLE` and start accepting specific calls to a given product instance. It's important to remember that account and card discovery, the so-called selectable products,
happens exclusively at the moment of consent creation, so the transition
in this case must happen through the product category listing API,
which is then a second form of status transition. The product listing connectors
must then accept the status (to be removed from the final response) of the item. This status will sensitize the resources in the OOB in the same way as the product discovery connector, eventually changing the status of a resource from `PENDING_AUTHORISATION` to `AVAILABLE`. Product instances that return as `PENDING_AUTHORISATION` in the product listing are removed from the regulatory API result until they are updated to the `AVAILABLE` state.

Any attempt to change the status from `AVAILABLE` to `PENDING_AUTHORISATION`
will be prevented by the product to ensure the possible state diagram of registration data defined by Open Finance Brazil.

## Permission Groups in Consent Creation

When creating consent, all permissions for the data groups for which consent is desired must be sent. This set of necessary permissions, called permission groups, are designated as per the table below ([link](https://openbanking-brasil.github.io/openapi/swagger-apis/consents/1.0.3.yml)
for official documentation):

| Data Category | Grouping | Permissions |

| -------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| Registration | Individual Registration Data | CUSTOMERS_PERSONAL_IDENTIFICATIONS_READ, RESOURCES_READ |

| Registration | Additional Information for Individuals | CUSTOMERS_PERSONAL_ADDITIONALINFO_READ, RESOURCES_READ |

| Registration | Corporate Registration Data | CUSTOMERS_BUSINESS_IDENTIFICATIONS_READ, RESOURCES_READ |
| Registration | Additional information PJ | CUSTOMERS_BUSINESS_ADITTIONALINFO_READ, RESOURCES_READ |
| Accounts | Balances | ACCOUNTS_READ, ACCOUNTS_BALANCES_READ, RESOURCES_READ |
| Accounts | Limits | ACCOUNTS_READ, ACCOUNTS_OVERDRAFT_LIMITS_READ, RESOURCES_READ |
| Accounts | Extracts | ACCOUNTS_READ, ACCOUNTS_TRANSACTIONS_READ, RESOURCES_READ |
| Credit Card | Limits | CREDIT_CARDS_ACCOUNTS_READ, CREDIT_CARDS_ACCOUNTS_LIMITS_READ, RESOURCES_READ |
| Credit Card | Transactions | CREDIT_CARDS_ACCOUNTS_READ, CREDIT_CARDS_ACCOUNTS_TRANSACTIONS_READ, RESOURCES_READ |
| Credit Card | Invoices | CREDIT_CARDS_ACCOUNTS_READ, CREDIT_CARDS_ACCOUNTS_BILLS_READ, CREDIT_CARDS_ACCOUNTS_BILLS_TRANSACTIONS_READ, RESOURCES_READ |
| Credit Operations | Contract Data | LOANS_READ, LOANS_WARRANTIES_READ, LOANS_SCHEDULED_INSTALMENTS_READ, LOANS_PAYMENTS_READ, FINANCINGS_READ, FINANCINGS_WARRANTIES_READ, FINANCINGS_SCHEDULED_INSTALMENTS_READ, FINANCINGS_PAYMENTS_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_WARRANTIES_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_SCHEDULED_INSTALMENTS_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_PAYMENTS_READ, INVOICE_FINANCINGS_READ, INVOICE_FINANCINGS_WARRANTIES_READ, INVOICE_FINANCINGS_SCHEDULED_INSTALMENTS_READ, INVOICE_FINANCINGS_PAYMENTS_READ, RESOURCES_READ |

| Credit Operations | Receivables Financing | INVOICE_FINANCINGS_READ, INVOICE_FINANCINGS_WARRANTIES_READ, INVOICE_FINANCINGS_SCHEDULED_INSTALMENTS_READ, INVOICE_FINANCINGS_PAYMENTS_READ, RESOURCES_READ |

| Credit Operations | Financing | FINANCINGS_READ, FINANCINGS_WARRANTIES_READ, FINANCINGS_SCHEDULED_INSTALMENTS_READ, FINANCINGS_PAYMENTS_READ, RESOURCES_READ |

| Credit Operations | Loans | LOANS_READ, LOANS_WARRANTIES_READ, LOANS_SCHEDULED_INSTALMENTS_READ, LOANS_PAYMENTS_READ, RESOURCES_READ|
| Credit Operations | Advances to depositors | UNARRANGED_ACCOUNTS_OVERDRAFT_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_WARRANTIES_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_SCHEDULED_INSTALMENTS_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_PAYMENTS_READ, RESOURCES_READ |
| Credit Operations | Investments | BANK_FIXED_INCOMES_READ,CREDIT_FIXED_INCOMES_READ,FUNDS_READ,VARIABLE_INCOMES_READ,TREASURE_TITLES_READ,RESOURCES_READ |
| Credit Operations | Exchange | EXCHANGES_READ,RESOURCES_READ |

## Approval of Payment Consent Creation

When the consent creation API is called by a *TPP*, the OOB platform must evaluate whether the consent can be created or not. Technical validations (message format, call limits) and security validations (credential validity, access permissions) are handled within the platform itself. Business validations, however, are delegated to a backend system of the account-holding institution through a connector.

Among the validations that may be performed by the institution are:

- Verifying whether the user logged into the TPP is a known and active customer;
- Verifying whether the operation type is accepted by the institution;
- Verifying whether the selected amounts comply with the limits defined by the institution;
- Verifying whether the operation aligns with antifraud policies;
- Verifying whether the consent creation characteristics comply with the institution’s rules for **TED** and **TEF** payments — weekday, holidays, schedule, maximum transfer value, etc.

The table below lists the integration points used to approve the creation of a consent:

| Consent Type  | Camel Route Name                              |
| ------------- | --------------------------------------------- |
| Payment       | ```direct:approvePaymentConsentCreation_v3``` |

The return values for these integration points must be:

- A success message (usually an empty object) when the consent can be created;
- A business error message, described in the integration schema with an enum value in the *code* field, defining the reason why the consent was denied. This message may also include the optional field *restrictionType*, informing the type of restriction that failed the validation;
- A generic error message, defined by the schema  
  [response-error-schema.json](./anexos/json/discoveryRecursos/approvePaymentConsentCreation_v3/en-responseErrorSchema.json),  
  when a technical error prevents the request from being evaluated, such as a network failure or an unavailable system.

The following table corresponds to the Request and Response schemas for the connector:

| Type     | JSON Schema                                                                                                        |
| -------- | ------------------------------------------------------------------------------------------------------------------ |
| Request  | [approvePaymentConsent-request.json](./anexos/json/discoveryRecursos/approvePaymentConsentCreation_v3/en-requestSchema.json)   |
| Response | [approvePaymentConsent-response.json](./anexos/json/discoveryRecursos/approvePaymentConsentCreation_v3/en-responseSchema.json) |

Example Request:

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

More examples of request and response for the “approvePaymentConsentCreation" route can be found [here](./anexos/json/discoveryRecursos/approvePaymentConsentCreation_v3).

Example of a Dockerfile command used to add the route files
`approvePaymentConsentCreation`, `approvePaymentConsentCreation_v2` and
`approvePaymentConsentCreation_v3`:

```dockerfile
ARG approvePaymentRoute=file:/specs/custom-approvePaymentConsentCreation-routes.xml
ENV camel.main.routes-include-pattern=$approvePaymentRoute
```

### Temporary Solution for approvePaymentConsentCreation Route

To facilitate the development of partner systems, Opus Software provides an XML file
(approvePaymentConsentCreation-routes.xml) containing a **temporary solution** for the
"approvePaymentConsentCreation" route.
It approves any consent, without applying any validation rules, and should be used
**only** for development purposes and while the legacy approval services have not yet been adapted
to support TED and TEF payment types.

Example of a Dockerfile command used to enable the temporary solution for the routes
`approvePaymentConsentCreation`, `approvePaymentConsentCreation_v2` and
`approvePaymentConsentCreation_v3`:

```dockerfile
ARG approvePaymentRoute=file:/specs/approvePaymentConsentCreation-routes.xml
ENV camel.main.routes-include-pattern=$approvePaymentRoute
```

## Auxiliary Services

Auxiliary services were created in Java to facilitate the implementation of connectors.

The services and their functionalities are:

| Service Name                     | Description                                                                                  | Call Command in .xml File                                                                                     |
| -------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| getDayOfTheWeek                  | Returns the current weekday in English, format `EEE` (e.g., "Fri")                           | `${bean:camelUtils.getDayOfTheWeek}`                                                                          |
| concatenateStrings               | Returns a string that is the concatenation of two input strings                              | `${bean:camelUtils.concatenateStrings("ab", "cd")}`                                                           |
| hmacCalculator                   | Returns the hash of a given data string using a specific algorithm and a provided secret key | `${bean:camelUtils.hmacCalculator("HmacSHA256", "abcd", "bc19bec7-339f-452f-8548-3daa889e6f79)}`              |
| makePostCall                     | Used for POST calls with mTLS                                                                | `${bean:camelUtils.makePostCall(${authorization}, ${transactionHash}, ${contentType}, ${endpoint}, ${body})}` |
| makeGetCall                      | Used for GET calls with mTLS                                                                 | `${bean:camelUtils.makeGetCall(${authorization}, ${transactionHash}, ${contentType}, ${endpoint})}`           |
| generateUrlEncodedOrDecodedValue | Used to encode or decode a string to/from URL format                                         | `${bean:camelUtils.generateUrlEncodedOrDecodedValue("testl!encode*sf13", "ENCODE")}`                          |

**Example of calling the getDayOfTheWeek service:**

```xml
<setProperty name="currentWeekday">
  <simple>${bean:camelUtils.getDayOfTheWeek}</simple>
</setProperty>
```

**Example of calling the concatenateStrings service:**

```xml
<setProperty name="concatenatedString">
    <simple>${bean:camelHelper.concatenateStrings("ab", "cd")}</simple>
</setProperty>
```

The result of this call would be: abcd

**Example of calling the hmacCalculator service:**

```xml
<setProperty name="hmacCalculatated">
    <simple>${bean:camelHelper.hmacCalculator("HmacSHA256", "abcd", "bc19bec7-339f-452f-8548-3daa889e6f79)}</simple>
</setProperty>
```

Supported algorithms:

```text
HmacMD5
HmacSHA1
HmacSHA224
HmacSHA256
HmacSHA384
HmacSHA512
```

**Example of calling the generateUrlEncodedOrDecodedValue service:**

```xml
<setProperty name="encodedString">
  <simple>${bean:camelUtils.generateUrlEncodedOrDecodedValue("testl!encode*sf1", "ENCODE")}</simple>
</setProperty>
```
