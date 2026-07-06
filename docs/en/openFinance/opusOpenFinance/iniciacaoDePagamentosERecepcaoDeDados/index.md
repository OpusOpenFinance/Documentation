---
layout: default
title: Payment Initiation and Data Receipt
parent: "Opus Open Finance Brazil"
nav_order: 6
has_children: true
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/index"
      lang: "pt-br"
    - path: "/Documentation/es/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/index"
      lang: "es"
---

## How to navigate this documentation

The documentation for the Payment Initiation Module is organized into three major blocks. Use the links below as an entry point for each topic:

### [Concepts](conceitos.html)

Fundamentals of the Open Finance ecosystem and of how the Payment Initiation Module works. Recommended for those who are just getting started.

- [Glossary and Fundamental Concepts](conceitos.html): Consent, device binding, journeys, regulatory profiles

### [How It Works](funcionamento/)

How to write applications that perform Payment Initiation and Data Reception

- [Overview of the flows](funcionamento/): Consent, payment, binding, optimized journey
- [Data Reception — Open Finance](funcionamento/recepcaoDeDados.html)
- [PIX Payment Initiation](funcionamento/iniciacaoDePagamento.html)
- [Automatic Payments](funcionamento/pagamentoAutomatico.html)
- [Device Binding (FIDO2)](funcionamento/vinculoDeDispositivo.html)
- [App-to-App and Web Redirection](funcionamento/redirecionamento.html)
- [Payment Webhooks](funcionamento/webhooks.html)
- [Backoffice API](funcionamento/backoffice.html)
- [Internal APIs](funcionamento/apisInternas.html)

### [Configuration](configuracao/)

Configuration steps and which digital certificates are required to operate in the Open Finance Brasil ecosystem.

- [Configuration Overview](configuracao/): High-level steps;
- [Regulatory Certificates](configuracao/certificadosRegulatorios.html): BRCAC, BRSEAL, ID_TOKEN_ENC and conversion to JWK.

### Attachments

- [OpenAPI Specifications (OAS)](anexos/yml/): Official contracts of each API exposed by the Payment Initiation Module

## Payment Initiation Module

The Payment Initiation Module is a specialized middleware that fully abstracts the regulatory complexities of **Open Finance Brasil**. It allows institutions to act as Payment Initiators (ITP) and Data Receivers without dealing directly with security standards, technical requirements, or regulatory flows.

Its goal is simple: to allow developers to integrate Open Finance Brasil APIs with the same ease as integrating ordinary REST APIs.

> While your application makes simple calls in REST format (HTTP, JSON, access token), our solution takes care of the entire regulatory and security layer required by Open Finance, such as mTLS, FAPI-BR, JWS, and consents. In other words: you communicate with the Payment Initiation Module as you would with any traditional API — and it translates those calls into the Open Finance Brasil regulatory standard, automatically handling all the complex and technical work behind the integrations.

## The problem the Payment Initiation Module solves

Open Finance offers an ecosystem rich in data and services, but it presents significant technical and regulatory challenges:

- Implementation of strict security standards, such as FAPI-BR and the use of specific certificates;
- Mandatory integration with the Participant Directory;
- Management of multiple tokens, scopes, and authentication cycles;
- Execution of the complete flows for requesting, approving, and consuming consents;
- Continuous maintenance of compliance with regulatory changes;
- Operational differences between each Transmitting/Holding Institution;
- High complexity to meet the requirements of ITP and Data Receiver;
- High costs and the constant need for a specialized team.

## What the Payment Initiation Module does

The Payment Initiation Module works as a regulatory client proxy between your application and the Open Finance Brasil ecosystem. It:

- Ensures full compliance with the required technical and security standards;
- Manages tokens, authentications, and renewals transparently;
- Enables the execution of the entire flow for requesting, approving, and consuming consents;
- Exposes simple REST APIs, regardless of the Destination Institution;
- Orchestrates regulatory calls in a standardized and reliable way;
- Implements the security, monitoring, and validation layers required by the regulator;
- Drastically simplifies the life of development teams.

The product is made up of modules that can be acquired separately:

- **Data Receiver**
  - Allows requesting and obtaining customer data, including registration data, transactions, cards, and credit products.

- **Payment Transaction Initiator**
  - Supports the initiation, execution, and tracking of payments, including the entire consent journey.

## What the Payment Initiation Module does not do

To avoid incorrect expectations, it is important to clarify what the Payment Initiation Module does not propose to do:

- It does not act as a regulated institution — regulatory responsibility remains with the Client Institution;
- It does not replace internal systems, banking cores, insurer platforms, or business logic;
- It does not create end-user experiences for consent;
- It does not guarantee the institution's certification in the regulatory environments;
- It does not perform analysis of, interpret, or transform financial or insurance data;
- It does not perform reconciliation, financial settlement, or its own transaction processing.

The focus of the Payment Initiation Module is to ensure compliance, security, and standardization — not to replace the decisions or responsibilities of the Client Institution.

## The core proposition

In essence, the Payment Initiation Module transforms complex regulatory APIs into simple, stable, and scalable integrations.

It allows your institution to participate in Open Finance without having to deal with:

- Advanced security requirements;
- Token and certificate management;
- Heterogeneous calls between institutions.

The Payment Initiation Module takes on all this complexity so that your team can focus on the product, the user experience, and the business strategy — not on the underlying regulatory infrastructure.
