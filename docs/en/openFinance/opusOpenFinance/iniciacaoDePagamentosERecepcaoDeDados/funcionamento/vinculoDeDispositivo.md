---
layout: default
title: Device Binding
parent: "How It Works"
grand_parent: "Payment Initiation and Data Receipt"
nav_order: 4
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/vinculoDeDispositivo"
      lang: "pt-br"
    - path: "/Documentation/es/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/vinculoDeDispositivo"
      lang: "es"
---

## Purpose

Device Binding (Enrollment) is the foundation of the **Redirect-less Payment** flow of Open Finance Brasil. It allows the user to authorize future transactions (payments or smart transfers) using only their device's biometric authentication, without having to log in to the Holder again for each operation.

The Payment Initiation Module implements the binding with **FIDO2/WebAuthn** — the W3C standard for public/private credential authentication.

> For the possible values of each JSON key, see the [associated API][API-SemRedirect].

[API-SemRedirect]: ../../../../../swagger-ui/index.html?api=en-otpp-pagamentos_sem_redirecionamento

## Endpoints

| Type | Endpoint | Description | Success |
| :--: | :------: | :-------: | :-----: |
| POST | `/opus-open-finance/enrollments/v1/enrollments` | Create an account binding | 201 |
| GET | `/opus-open-finance/enrollments/v1/enrollments/{enrollmentId}` | Query a binding | 200 |
| PATCH | `/opus-open-finance/enrollments/v1/enrollments/{enrollmentId}` | Reject or revoke a binding | 204 |
| POST | `/opus-open-finance/enrollments/v1/enrollments/{enrollmentId}/risk-signals` | Send risk signals | 201 |
| POST | `/opus-open-finance/enrollments/v1/enrollments/{enrollmentId}/fido-sign-options` | Obtain parameters for FIDO2 authentication | 201 |
| POST | `/proxy/open-banking/enrollments/v2/enrollments/{enrollmentId}/fido-registration-options` | Obtain parameters for creating a FIDO2 credential | 201 |
| POST | `/proxy/open-banking/enrollments/v2/enrollments/{enrollmentId}/fido-registration` | Associate a FIDO2 credential with the binding | 201 |
| POST | `/proxy/open-banking/enrollments/v2/consents/{consentId}/authorise` | Authorize a payment consent via binding | 201 |
| POST | `/proxy/open-banking/enrollments/v2/recurring-consents/{recurringConsentId}/authorise` | Authorize an automatic payment consent via binding | 201 |

## State machine

| Status | How it is reached | Next step |
| :----: | :-----------: | :-----------: |
| `AWAITING_RISK_SIGNALS` | POST `/enrollments` returns 201 | Send `/risk-signals` within **15 minutes** |
| `AWAITING_ACCOUNT_HOLDER_VALIDATION` | After `/risk-signals` is accepted | Redirect the user to the Holder |
| `AWAITING_ENROLLMENT` | User approves at the Holder (OIDC OK) | Send `/fido-registration` |
| `AUTHORISED` | FIDO2 credential successfully registered | Binding ready to authorize payments |
| `REJECTED` | Rejected by the user or TTL expired | Terminated |

> Official state machine documentation: [v2.1.0 — SV Vínculo de Dispositivo](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/747503675/M+quina+de+estados+-+v2.1.0-+SV+V+nculo+de+dispositivo).

## Rejection vs Revocation

Both scenarios are executed via `PATCH /enrollments/{enrollmentId}`, but they refer to different states:

- **Rejection:** Cancels the binding in the states `AWAITING_RISK_SIGNALS`, `AWAITING_ACCOUNT_HOLDER_VALIDATION`, and `AWAITING_ENROLLMENT` (before the binding is closed);
- **Revocation:** Cancels the binding in the `AUTHORISED` state (after it is already ready for use).

It is up to the API client to distinguish the scenario and provide the appropriate reason in the `cancellation.reason.rejectionReason` field.

> **Important:** A single binding approves either payment consents **OR** smart transfers — not both. To support both types, **two distinct bindings** are required, with separate `permissions`.

## FIDO2 Registration (W3C WebAuthn)

After the user's authorization in the OIDC flow, the client app:

1. **Requests registration parameters:** `POST /fido-registration-options` providing `rp` (relying party — the app's domain) and `platform` (`ANDROID` or `IOS`). The response is a JWT containing `challenge`, `user`, `pubKeyCredParams`, `authenticatorSelection`, etc., compatible with the [W3C WebAuthn-2](https://www.w3.org/TR/webauthn-2/#dictionary-makecredentialoptions) definition;
2. **Presents the challenge to the user** (biometrics/PIN), generating the FIDO2 credential on the device;
3. **Sends the created credential:** `POST /fido-registration` with `clientDataJSON` + `attestationObject`.

## Consent authorization via FIDO2

With the binding in `AUTHORISED`, to authorize a payment consent:

1. `POST /fido-sign-options` providing `rp`, `platform`, and `consentId` (or `recurringConsentId`). Returns a JWT with a challenge for authentication;
2. The user performs FIDO2 authentication (biometrics) — the credential signs the challenge;
3. `POST /enrollments/v2/consents/{consentId}/authorise` (or `.../recurring-consents/{recurringConsentId}/authorise`) sending `enrollmentId`, `riskSignals`, and `fidoAssertion`.

> **Payments with multiple approval levels:** the consent transitions to `PARTIALLY_ACCEPTED` until **all approvers** confirm. Single-level payments transition directly to `AUTHORISED`.

## Critical business rules

- **Debit-account divergence:** If the `debtorAccount` provided by the initiator when creating the consent diverges from the bound account, the Holder returns HTTP 422 with the code **`CONTA_DEBITO_DIVERGENTE_CONSENTIMENTO_VINCULO`** and rejects the consent with the reason `CONTA_NAO_PERMITE_PAGAMENTO`;
- **Debit-account omission:** If the initiator **omits** `debtorAccount` when creating the consent, the Holder automatically fills the `data/debtorAccount` field with the bound account after authorization;
- **Binding limit validation:** Occurs **only at the moment of the payment's settlement** — not at authorization. This means that a consent can be authorized even if the subsequent payment exceeds the limit, and the rejection comes at the time of the debit.

## References

- [SV Vínculo de Dispositivo v2.2.0 — Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1436516353/v2.2.0+-+SV+V+nculo+de+dispositivo)
- [W3C WebAuthn-2 — makeCredentialOptions](https://www.w3.org/TR/webauthn-2/#dictionary-makecredentialoptions)
- OpenAPI specification: [`oas-pagamentos-sem-redirecionamento.yaml`](../anexos/yml/en-opusTPP-pagamentosSR.yml) (see also [associated API][API-SemRedirect])
