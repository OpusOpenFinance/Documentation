---
layout: default
title: "ITP"
parent: "Participation Profiles"
nav_order: 5
has_children: true
lang: "en"
alternate_lang: 
    - path: "/Documentation/pt-br/openFinance/openFinanceBrasil/perfisParticipacao/itp/index/"
      lang: "pt-br"
    - path: "/Documentation/es/openFinance/openFinanceBrasil/perfisParticipacao/itp/index/"
      lang: "es"
---

## Payment Transaction Initiator

The **Payment Transaction Initiator (ITP)** is the Open Finance Brasil profile authorized to initiate payments within the ecosystem. The ITP conducts consent journeys — for carrying out payments — together with Open Finance participant institutions that are Account Holders. This profile enables a range of new use cases, since the ITP acts as a bridge between the Institution and the Customer, without ever needing to take custody of the funds at any point in the transaction and without being the holder of the checking account that will settle the payment.

### Open Finance Ecosystem - ITP

The ITP profile concerns financial institutions authorized by the Central Bank to initiate payments in *Open Finance Brasil* on behalf of their customers. To do so, the ITP obtains the consent of the paying user and, based on that consent, instructs the Account Holder institution to process the transaction.

> The regulatory standard establishes certification and homologation requirements that must be met before an institution can operate as an ITP in production with its own license. The complete process is described on the [ITP onboarding][OnboardingITP] page.

### Consent Journey

The authorization process for making payments is carried out by the customer through a **complete consent journey**. More details can be found [here][Jornada-Consentimento].

> The [sequence diagram][Diagrama-Sequência] illustrates the consent flow according to each payment modality.

### Regulatory Roadmap

#### Features already available

- **Immediate Pix payment**;
- **Scheduled Pix payment**;
- **Pix payment by proximity** (contactless);
- **Recurrence of scheduled payments**;
- **Automatic transfers between accounts of the same ownership** (a feature also known as *smart transfers* or *sweeping accounts*);
- **Payments without redirection** (absence of the redirection to the Account Holder from the user's perspective).

#### Planned features

- **Batch payments (1:n)**;
- **Recurring payments** (Variable Recurring Payment - VRP - implemented through *Pix Automático*).

The [developer portal][Portal-Dev] offers a calendar with the upcoming deliveries.

### Regulatory APIs

#### Current APIs

| **Description** | **Link to the Developer Portal** |
| :-------------: | :------------------------------: |
| **Payment Initiation** | [Access here](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17375943/SV+API+-+Pagamentos) |
| **Automatic Payments Initiation** | [Access here](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/198410569/SV+API+-+Pagamentos+Autom+ticos) |
| **Payment Initiation without Redirection** | [Access here](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/141557761/SV+API+-+Pagamentos+sem+Redirecionamento) |

### Opus Open Finance Platform

To use the **Opus Open Finance Platform** under the ITP profile, the following steps must be completed:

1. Complete the [setup][Setup] process.
2. Have completed the entire Account Holder profile homologation. (we recommend evaluating this criterion with your institution's compliance team)
3. Build the user experience so that the consent journey is possible for customers. The [Open Finance Brasil User Experience Guide][GuiaUX] provides a detailed description of this journey.
4. Complete the entire [ITP onboarding][OnboardingITP] process.

[GuiaUX]: https://guia-de-ux-open-finance-brasil.scroll.site/guia-de-experi-ncia-open-finance-brasil/v.22.00.01
[Portal-Dev]: https://openfinancebrasil.atlassian.net/wiki/spaces/DraftOF/calendars
[OnboardingITP]: ./onboardingITP.html
[Setup]: ../../../opusOpenFinance/implantacaoDaPlataforma/index.html
[Jornada-Consentimento]: ../../jornadaConsentimento/index.html
[Diagrama-Sequência]: ../anexos/imagens/itp-consentSequence.png
