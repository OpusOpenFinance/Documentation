---
layout: default
title: Vinculación de Dispositivo
parent: "Funcionamiento"
grand_parent: "Iniciación de Pagos y Recepción de Datos"
nav_order: 4
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/vinculoDeDispositivo"
      lang: "pt-br"
    - path: "/Documentation/en/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/vinculoDeDispositivo"
      lang: "en"
---

## Objetivo

La vinculación de dispositivo (Enrollment) es la base del flujo de **Pago sin Redireccionamiento** del Open Finance Brasil. Permite que el usuario autorice transacciones futuras (pagos o transferencias inteligentes) usando únicamente la autenticación biométrica de su dispositivo, sin necesidad de rehacer el login en la Institución Titular en cada operación.

El Módulo de Iniciación de Pagos implementa la vinculación con **FIDO2/WebAuthn** — el estándar W3C de autenticación por credencial pública/privada.

> Para los posibles valores de cada clave JSON consulte la [API asociada][API-SemRedirect].

[API-SemRedirect]: ../../../../../swagger-ui/index.html?api=es-otpp-pagamentos_sem_redirecionamento

## Endpoints

| Tipo | Endpoint | Descripción | Éxito |
| :--: | :------: | :-------: | :-----: |
| POST | `/opus-open-finance/enrollments/v1/enrollments` | Crear vínculo de cuenta | 201 |
| GET | `/opus-open-finance/enrollments/v1/enrollments/{enrollmentId}` | Consultar vínculo | 200 |
| PATCH | `/opus-open-finance/enrollments/v1/enrollments/{enrollmentId}` | Rechazar o revocar vínculo | 204 |
| POST | `/opus-open-finance/enrollments/v1/enrollments/{enrollmentId}/risk-signals` | Enviar señales de riesgo | 201 |
| POST | `/opus-open-finance/enrollments/v1/enrollments/{enrollmentId}/fido-sign-options` | Obtener parámetros para autenticación FIDO2 | 201 |
| POST | `/proxy/open-banking/enrollments/v2/enrollments/{enrollmentId}/fido-registration-options` | Obtener parámetros para creación de credencial FIDO2 | 201 |
| POST | `/proxy/open-banking/enrollments/v2/enrollments/{enrollmentId}/fido-registration` | Asociar credencial FIDO2 al vínculo | 201 |
| POST | `/proxy/open-banking/enrollments/v2/consents/{consentId}/authorise` | Autorizar consentimiento de pago vía vínculo | 201 |
| POST | `/proxy/open-banking/enrollments/v2/recurring-consents/{recurringConsentId}/authorise` | Autorizar consentimiento de pago automático vía vínculo | 201 |

## Máquina de estados

| Status | Cómo se llega | Próximo paso |
| :----: | :-----------: | :-----------: |
| `AWAITING_RISK_SIGNALS` | POST `/enrollments` devuelve 201 | Enviar `/risk-signals` en hasta **15 minutos** |
| `AWAITING_ACCOUNT_HOLDER_VALIDATION` | Después de que `/risk-signals` sea aceptado | Redirect del usuario a la Institución Titular |
| `AWAITING_ENROLLMENT` | El usuario aprueba en la Institución Titular (OIDC OK) | Enviar `/fido-registration` |
| `AUTHORISED` | Credencial FIDO2 registrada con éxito | Vínculo apto para autorizar pagos |
| `REJECTED` | Rechazo por el usuario o TTL expirado | Finalizado |

> Documentación oficial de la máquina de estados: [v2.1.0 — SV Vínculo de Dispositivo](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/747503675/M+quina+de+estados+-+v2.1.0-+SV+V+nculo+de+dispositivo).

## Rechazo vs Revocación

Ambos escenarios se ejecutan vía `PATCH /enrollments/{enrollmentId}`, pero se refieren a estados diferentes:

- **Rechazo:** Cancela el vínculo en los estados `AWAITING_RISK_SIGNALS`, `AWAITING_ACCOUNT_HOLDER_VALIDATION` y `AWAITING_ENROLLMENT` (antes de que el vínculo sea cerrado);
- **Revocación:** Cancela el vínculo en el estado `AUTHORISED` (después de que ya esté listo para su uso).

Corresponde al cliente de la API distinguir el escenario e informar el motivo adecuado en el campo `cancellation.reason.rejectionReason`.

> **Importante:** Un único vínculo aprueba consentimientos de pagos **O** de transferencias inteligentes — no ambos. Para soportar los dos tipos, se necesitan **dos vínculos distintos**, con `permissions` separadas.

## Registro FIDO2 (W3C WebAuthn)

Después de la autorización del usuario en el flujo OIDC, la app cliente:

1. **Solicita parámetros de registro:** `POST /fido-registration-options` informando `rp` (relying party — el dominio de la app) y `platform` (`ANDROID` o `IOS`). La respuesta es un JWT que contiene `challenge`, `user`, `pubKeyCredParams`, `authenticatorSelection`, etc., compatible con la definición [W3C WebAuthn-2](https://www.w3.org/TR/webauthn-2/#dictionary-makecredentialoptions);
2. **Presenta el desafío al usuario** (biometría/PIN), generando la credencial FIDO2 en el dispositivo;
3. **Envía la credencial creada:** `POST /fido-registration` con `clientDataJSON` + `attestationObject`.

## Autorización del consentimiento vía FIDO2

Con el vínculo en `AUTHORISED`, para autorizar un consentimiento de pago:

1. `POST /fido-sign-options` informando `rp`, `platform` y `consentId` (o `recurringConsentId`). Devuelve un JWT con challenge para autenticación;
2. El usuario realiza la autenticación FIDO2 (biometría) — la credencial firma el challenge;
3. `POST /enrollments/v2/consents/{consentId}/authorise` (o `.../recurring-consents/{recurringConsentId}/authorise`) enviando `enrollmentId`, `riskSignals` y `fidoAssertion`.

> **Pagos con múltiples niveles de aprobación:** el consentimiento transita a `PARTIALLY_ACCEPTED` hasta que **todos los aprobadores** confirmen. Los pagos de aprobación única transitan directamente a `AUTHORISED`.

## Reglas de negocio críticas

- **Divergencia de cuenta de débito:** Si el `debtorAccount` informado por el iniciador en la creación del consentimiento diverge de la cuenta vinculada, la Institución Titular devuelve HTTP 422 con el código **`CONTA_DEBITO_DIVERGENTE_CONSENTIMENTO_VINCULO`** y rechaza el consentimiento con motivo `CONTA_NAO_PERMITE_PAGAMENTO`;
- **Omisión de cuenta de débito:** Si el iniciador **omite** `debtorAccount` en la creación del consentimiento, la Institución Titular completa automáticamente el campo `data/debtorAccount` con la cuenta vinculada tras la autorización;
- **Validación de límites del vínculo:** Ocurre **únicamente en el momento de la liquidación** del pago — no en la autorización. Esto significa que un consentimiento puede ser autorizado incluso si el pago posterior supera el límite, y el rechazo llega en el momento del débito.

## Referencias

- [SV Vínculo de Dispositivo v2.2.0 — Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1436516353/v2.2.0+-+SV+V+nculo+de+dispositivo)
- [W3C WebAuthn-2 — makeCredentialOptions](https://www.w3.org/TR/webauthn-2/#dictionary-makecredentialoptions)
- Especificación OpenAPI: [`oas-pagamentos-sem-redirecionamento.yaml`](../anexos/yml/es-opusTPP-pagamentosSR.yml) (ver también [API asociada][API-SemRedirect])
