---
layout: default
title: "Credit Card API"
parent: "Data Sharing"
nav_order: 2
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/cartaoDeCredito/"
      lang: "pt-br"
    - path: "/Documentation/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/cartaoDeCredito/"
      lang: "es"
---

## Credit Card API

*Integration layer* API that returns information on post-paid payment accounts held at transmitting institutions by their customers, including data such as denomination, product, brand, credit limits, information on payment transactions made, and invoices.

This API does not differentiate between individuals and legal entities.

Before any *endpoint* is triggered, the platform has already verified the authenticity of the call source and the validity, expiration date, permissions, and scope of the consent sent by the receiver, ensuring it is an authorized request.

There are *endpoints* for:

- Obtaining the list of post-paid accounts held by the customer at the transmitting institution;
- Obtaining identification data for a card;
- Obtaining the list of invoices for a card;
- Obtaining the list of transactions for a card;
- Obtaining the limits of a card;
- Obtaining the list of recent transactions (last 7 days) for a card.

### API *Open API Specification*

The documentation for the credit card API to be built in the integration layer can be found on [**this link**][Credit-Card-API].

To download the YAML/OAS file containing the API specification, click on [**this link**](./anexos/yml/en-creditCards-2-3-1.yml){:download="en-creditCards-2-3-1.yml"}.

{: .note}
Some internet browsers, such as Chrome, occasionally flag YAML file download operations as unsafe, requiring manual unblocking by the user. These files, however, contain text-type content and pose no risk by themselves.

[Credit-Card-API]: ../../../../../swagger-ui/index.html?api=en-cartao-de-credito
