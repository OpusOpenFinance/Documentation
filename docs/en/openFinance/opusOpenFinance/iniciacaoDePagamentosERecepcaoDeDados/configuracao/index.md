---
layout: default
title: Configuration
parent: "Payment Initiation and Data Receipt"
nav_order: 2
has_children: true
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/configuracao/index"
      lang: "pt-br"
    - path: "/Documentation/es/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/configuracao/index"
      lang: "es"
---

## Configuration Steps

> **Important:** Should any question arise regarding a term used here, refer to the [**Concepts**](../conceitos.html) page.

### 1. Register the institution and the application in the Participant Directory - Opus Responsibility

There are two registrations:

- **Organization** (identified by CNPJ) — represents the ITP;
- **Application**, which generates a Software Statement ID and a client_id — represents each client brand/application.

These IDs are essential for the product to work.

> **Important:** In order for Opus to perform this registration independently, the client institution must provide us with all the necessary access to the Participant Directory.

### 2. Define redirect URLs - Client Institution Responsibility

They are used by the institutions to redirect users after consents and authorizations.

Common examples:

- `/opus-open-finance/consents/redirect-uri`
- `/opus-open-finance/payments/redirect-uri`

These URLs must be registered in the Software Statement of each application. When the institution has more than one app, each URL must carry a unique `redirect_identifier` — see [Redirection](../funcionamento/redirecionamento.html).

### 3. Provide the Homologation and Production environments - Opus Responsibility

Opus will set up a Homologation (HML) and a Production (PRD) environment.

### 4. Obtain regulatory certificates - Opus + Client Institution

They are required by Open Finance Brasil:

- BRCAC;
- BRSEAL;
- MTLS;
- EV Server.

For more details, see [Regulatory Certificates](./certificadosRegulatorios.html).

### 5. Provide information to the technical team - Client Institution Responsibility

The technicians will configure the Payment Initiation Module, but they need to receive:

- Certificates and their respective private keys (BRCAC, BRSEAL, ID_TOKEN_ENC when applicable);
- Redirect URIs registered in the Directory;
- Software Statement ID and `client_id`;
- Chosen public FQDN;
- If the installation is SaaS, there is no need to provide any access. If the client wants to keep the product in its own infrastructure, we need access data with the permissions required for the installation.

---

## Conclusion

High-level configuration comes down to:

1. Registering in the Participant Directory;
2. Choosing URLs and domain;
3. Obtaining regulatory certificates;
4. Providing data to the technical team (when not SaaS).

> **Note:** Everything else belongs to the more technical description and to the operational procedure.
