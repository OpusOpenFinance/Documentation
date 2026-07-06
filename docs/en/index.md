---
layout: default
title: "Opus Open Finance Platform"
nav_order: 1
has_children: true
lang: "en"
alternate_lang: 
    - path: "/Documentation/pt-br/index/"
      lang: "pt-br"
    - path: "/Documentation/es/index/"
      lang: "es"
---

# Opus Open Finance Platform Documentation

Welcome to the **Opus Open Finance Platform** documentation!

Here you will find details about the ideal solution for your institution to become certified within the *Open Finance Brasil* ecosystem. The **Opus Software** product is responsible for ensuring the proper operation of your institution in line with the demands required by the regulator, as well as ensuring the update of new versions and the evolution of features defined by the regulatory standards.

The platform was designed to clarify all the regulatory complexity of *Open Finance Brasil* — the layer that does not bring a differentiator to your company. This way, you can focus on **your strategic objectives**.

While offering full coverage of the regulatory requirements for all participation profiles in *Open Finance Brasil*, the **Opus Open Finance Platform** also provides optional modules that allow you to go beyond the regulatory scope, establishing a foundation to implement strategies that maximize the return on investment of financial institutions and make it possible to extract the best possible value from their participation in the ecosystem.

---

## Introduction to the Opus Open Finance Platform

The **Opus Open Finance Platform** is a software solution designed to fully meet the regulatory requirements established by the Central Bank of Brazil. This document provides an overview of how our platform can help your financial institution to integrate and operate efficiently within Open Finance.

The platform acts as an essential *middleware* that allows your institution to operate within the four Open Finance profiles:

- **Account Holder**
- **Data Transmitter**
- **Payment Transaction Initiator**
- **Data Receiver**

---

## Structure of this Document

This document is organized to provide an overview of the concepts involved in Open Finance and of the technical details needed to adopt the **Opus Open Finance Platform**. The deployment aspects for each participant profile of *Open Finance Brasil* are also covered. For a technical breakdown, the documentation also includes sequence diagrams and the description of APIs in the *Open API Specification* standard.

---

## Reading Guide

This section was created to guide new clients who are evaluating or beginning the adoption of the **Opus Open Finance Platform** under the **Payment Transaction Initiator (ITP)** and **Data Receiver** profiles. For each profile, the links below are organized in the recommended reading order — from the regulatory understanding to the technical operating details.

---

### Payment Transaction Initiator (ITP)

The ITP is the profile that allows your institution to initiate payments on behalf of its customers. It is the central profile for use cases such as digital wallets, payment platforms and financial aggregators.

#### 1. Understanding the profile and the ecosystem

- [What the ITP profile is and how it fits into Open Finance](openFinance/openFinanceBrasil/perfisParticipacao/itp/index.html) — overview of the ITP's role, payment methods and regulatory roadmap.
- [The Open Finance Brasil ecosystem](openFinance/openFinanceBrasil/ecossistema/index.html) — how the ecosystem works and which are the participant profiles.
- [Consent Journey for Payments](openFinance/openFinanceBrasil/jornadaConsentimento/index.html) — how the user authorizes a payment and how this journey connects to the ITP's role.

#### 2. Regulatory requirements and certifications

- [Certifications and Certificates](openFinance/openFinanceBrasil/certificacoesECertificados.html) — the ITP requires the **OpenID RP certification** (*Relying Parties*) and the **Authentication Certificate**. The page details what each one requires, how to obtain them and which certificate authorities are accredited.

#### 3. Own license vs. shared license

A decisive point for new clients is the choice between using their own license or using a vendor's license.

If using their own license, the client must carry out the [ITP Onboarding](openFinance/openFinanceBrasil/perfisParticipacao/itp/onboardingITP.html), composed of:

- Authorization by the Central Bank;
- Pre-certification stage;
- Open Finance certification stage.

If the client uses a vendor's license, the process is simpler, requiring only the integration with the Opus Open Finance Platform.

#### 4. Supported payment types

- [Pix Payment Initiation](openFinance/opusOpenFinance/opusTPP/funcionamento/iniciacaoDePagamento.html) — immediate and scheduled payment. Details the consent and payment endpoints, the expected behavior in case of success and error, and the most common error codes.
- [Automatic Payment (Pix Automático)](openFinance/opusOpenFinance/opusTPP/funcionamento/pagamentoAutomatico.html) — recurring consents for periodic debits (subscriptions, monthly fees, installments). Supports versions v1 and v2 of the regulatory API.
- [Payment scenarios](openFinance/opusOpenFinance/integracaoDaPlataforma/pagamentos/cenariosPagamentos.html) — practical use cases and combinations of payment types.

#### 5. Technical flows and redirection

- [General operation of payment initiation and data receipt](openFinance/opusOpenFinance/opusTPP/funcionamento/index.html) — view of the business flows: listing of participants, consent creation, redirection and status query.
- [App-to-App and Web Redirection](openFinance/opusOpenFinance/opusTPP/funcionamento/redirecionamento.html) — how the user is sent to the Account Holder to authorize the payment and returns to the ITP environment.
- [Payment webhooks](openFinance/opusOpenFinance/opusTPP/funcionamento/webhooks.html) — how to receive asynchronous notifications about payment status changes.

---

### Data Receiver

The Data Receiver is the profile that allows your institution to request and obtain financial data of customers from other institutions (Data Transmitters), with the consent of the customer themselves. Typical use cases include financial aggregators, credit platforms and wealth management.

#### 1. Understanding the profile and the available data

- [What the Data Receiver profile is](openFinance/openFinanceBrasil/perfisParticipacao/receptorDeDados.html) — overview of the Receiver's role, the data that can be shared (registration, checking account, card, credit, foreign exchange and investments) and the prerequisites for use.
- [The Open Finance Brasil ecosystem](openFinance/openFinanceBrasil/ecossistema/index.html) — how Receiver and Transmitter complement each other within the ecosystem.
- [Consent Journey for Data Sharing](openFinance/openFinanceBrasil/jornadaConsentimento/index.html) — how the user authorizes the sharing and the differences compared to the payment journey (consent term, scopes, renewal).

#### 2. Regulatory requirements and certifications

- [Certifications and Certificates](openFinance/openFinanceBrasil/certificacoesECertificados.html) — just like the ITP, the Receiver requires the **OpenID RP certification** (*Relying Parties*) and the **Authentication Certificate**. The table of certificate requirements by profile helps identify exactly what to contract.

#### 3. Data available for reception

- [Data Reception — operation and endpoints](openFinance/opusOpenFinance/opusTPP/funcionamento/recepcaoDeDados.html) — consent endpoints (creation, query, revocation, renewal) and the approximately 78 regulatory proxies organized by family: customers, accounts, credit card, credit operations, foreign exchange and investments.
- [Data Sharing — integration view](openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/index.html) — how the received data is organized, by financial product.
- [Shared Consent — Data Reception](openFinance/opusOpenFinance/consentimentoCompartilhado/recepcaoDeDados.html) — management of the life cycle of data consents from the product perspective.

#### 4. Technical flows and redirection

- [General operation of payment initiation and data receipt](openFinance/opusOpenFinance/opusTPP/funcionamento/index.html) — the data consent flows follow the same general logic as the ITP (listing of participants → creation → redirection → query), with differences in the scopes and in the validity.
- [App-to-App and Web Redirection](openFinance/opusOpenFinance/opusTPP/funcionamento/redirecionamento.html) — how the user is sent to the Transmitter to authorize the sharing and returns to the Receiver environment.

---

## About Opus Software

Opus Software is a software development company that has been operating in the market for 38 years. Throughout its history, the company has always been involved in projects of high added value, large transactional volume and demanding requirements in terms of performance, quality and aggressive deadlines. The company's main area of operation is the financial market, serving banks, payment institutions, payment-method companies and insurers. The company also works with retail companies, especially serving the demands of their financial and customer service areas.

Throughout its trajectory, Opus Software has also developed its own solutions. In its origins, the company developed communication protocols and basic software, later building a banking automation offering that ran for several years in various financial institutions in the national market. In 2020, the company created a business unit focused on Open Finance, building the Opus Open Finance solution, which is currently used by several prominent financial institutions in the Brazilian scenario.

Combining its vocation in providing custom software development services with its team's capacity to build distributed systems of high performance, reliability and resilience, the offering of the **Opus Open Finance Platform** combines the standardization demanded by the regulatory rules of *Open Finance Brasil* with the capacity to adapt to the specific needs of financial institutions.

---

## Support and Assistance

We know that the deployment of a new software platform can bring unique challenges. That is why our support team is ready to assist you at every stage of the process.

If you have questions or need technical assistance, **do not hesitate to contact the Opus Software *Delivery Manager* assigned to your institution**. We are here to ensure that your experience with the **Opus Open Finance Platform** is smooth and successful.
