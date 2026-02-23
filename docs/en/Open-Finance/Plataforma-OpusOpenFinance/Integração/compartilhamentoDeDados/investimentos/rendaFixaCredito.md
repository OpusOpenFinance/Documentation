---
layout: default
title: "Credit Fixed Income API"
parent: "Investments"
nav_order: 2
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/investimentos/rendaFixaCredito/"
      lang: "pt-br"
    - path: "/Documentation/es/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/investimentos/rendaFixaCredito/"
      lang: "es"
---

## Credit Fixed Income API

Integration layer API that returns data on credit fixed income held by the client at the Data Transmitting Institution.

In general, there are *endpoints* for:

- Retrieving records of operations of the credit fixed income securities held by the client;
- Retrieving the identification records of the credit fixed income securities;
- Retrieving the position records in the credit fixed income securities;
- Retrieving transaction history records for the last 12 months;
- Retrieving history records for the last seven days.

### *Open API Specification* of the API

The documentation for the credit fixed income API to be built in the integration layer can be found [**here**][API-Credit-Fixed-Income]

To download the YAML/OAS file containing the API specification, click [**here**](../anexos/yml/investimentos/en-creditFixedIncomes.yml){:download="en-creditFixedIncomes.yml"}.

{: .highlight}
Some internet browsers, such as *Chrome*, may occasionally flag the download operation of YAML files as *not secure*, requiring manual unlocking by the user. However, these files are text-based and do not pose any risk.

[API-Credit-Fixed-Income]: ../../../../../../swagger-ui/index.html?api=en-data-credit-fixed-incomes
