---
layout: default
title: Regulatory Certificates
parent: "Configuration"
grand_parent: "Payment Initiation and Data Receipt"
nav_order: 3
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/configuracao/certificadosRegulatorios"
      lang: "pt-br"
    - path: "/Documentation/es/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/configuracao/certificadosRegulatorios"
      lang: "es"
---

## Purpose

Detail the regulatory certificates required to operate in Open Finance Brasil and their purposes.

> **WARNING:** Never expose your private keys on internet services. The conversion must be performed exclusively in a controlled local environment.

## Required certificates

| Certificate | Purpose |
| :---------: | :--------: |
| **BRCAC** | mTLS connections — identification of the client application and encryption of the communication between the parties |
| **BRSEAL** | Signing of messages between the TPP application and the authentication server, and signing of JWS tokens |
| **MTLS** | Mutual authentication in TLS connections of private APIs: identification and validation of both the server and the client in the communication between institutions |
| **EV Server** | Enabling of the HTTPS channel in public APIs: protects the connection without requiring mutual authentication, issued by a recognized commercial Certificate Authority |

## References

- [TPP Guide — Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/240648607)
- [Central Directory Operation Guide — Open Finance](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/941817857/Guia+de+Opera+o+do+Diret+rio+Central.)
