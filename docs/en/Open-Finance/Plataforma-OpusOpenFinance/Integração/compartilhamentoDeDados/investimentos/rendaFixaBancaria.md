---
layout: default
title: "Bank Fixed Income API"
parent: "Investments"
nav_order: 1
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/investimentos/rendaFixaBancaria/"
      lang: "pt-br"
    - path: "/Documentation/es/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/investimentos/rendaFixaBancaria/"
      lang: "es"
---

## Bank Fixed Income API

Integration layer API that returns data on bank fixed income held by the client at the Data Transmitting Institution.

In general, there are *endpoints* for:

- Retrieving records of operations of the bank fixed income securities held by the client;
- Retrieving the identification records of the bank fixed income securities;
- Retrieving the position records in the bank fixed income securities;
- Retrieving transaction history records for the last 12 months;
- Retrieving history records for the last seven days.

### *Open API Specification* of the API

The documentation for the bank fixed income API to be built in the integration layer can be found [**here**][API-Bank-Fixed-Income]

To download the YAML/OAS file containing the API specification, click [**here**](../anexos/yml/investimentos/en-bankFixedIncomes.yml){:download="en-bankFixedIncomes.ym"}.

{: .highlight}
Some internet browsers, such as *Chrome*, may occasionally flag the download operation of YAML files as *not secure*, requiring manual unlocking by the user. However, these files are text-based and do not pose any risk.

[API-Bank-Fixed-Income]: ../../../../../../swagger-ui/index.html?api=en-data-bank-fixed-incomes
