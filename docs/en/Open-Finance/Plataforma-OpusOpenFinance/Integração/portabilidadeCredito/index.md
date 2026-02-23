---
layout: default
title: "Credit Portability"
parent: "Platform Integration"
nav_order: 5
lang: "en"
alternate_lang:
    - path: "/Documentation/es/Open-Finance/Plataforma-OpusOpenFinance/Integração/portabilidadeCredito/index/"
      lang: "es"
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/portabilidadeCredito/index/"
      lang: "pt-br"
---

## Credit Portability API

API of the *integration layer* that enables the execution of a credit portability for a customer.

In general terms, there are *endpoints* for:

- Creating a credit portability request for a specific contract;
- Communicating the cancellation of a credit portability request;
- Verifying if a contract is eligible to request credit portability;
- Obtaining the account data necessary to perform the operation payment via TED.

### API *Open API Specification*

The documentation for the Credit Portability API to be built in the *integration layer* can be found [**here**][API-Portability].

To download the YAML/OAS file containing the API specification, click [**here**](./anexos/yml/en-portability.yml){:download="en-portability.yml"}.

{: .destaque}
Some internet browsers, such as *Chrome*, occasionally flag the YAML file *download* operation as *unsafe*, requiring manual unblocking by the user. These files, however, are text-based content and are not inherently risky.

[API-Portability]: ../../../../../swagger-ui/index.html?api=en-portability
