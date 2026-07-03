---
layout: default
title: Vínculo de Dispositivo
parent: "Funcionamento"
grand_parent: "Iniciação de Pagamentos e Recepção de Dados"
nav_order: 4
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/opusTPP/funcionamento/vinculoDeDispositivo"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/opusTPP/funcionamento/vinculoDeDispositivo"
      lang: "es"
---

## Objetivo

O Vínculo de Dispositivo (Enrollment) é a base do fluxo de **Pagamento sem Redirecionamento** do Open Finance Brasil. Ele permite que o usuário autorize transações futuras (pagamentos ou transferências inteligentes) usando apenas a autenticação biométrica do seu dispositivo, sem precisar refazer login na Detentora a cada operação.

O Módulo de Iniciação de Pagamentos implementa o vínculo com **FIDO2/WebAuthn** — o padrão W3C de autenticação por credencial pública/privada.

> Para os possíveis valores de cada chave JSON consulte a [API associada][API-SemRedirect].

[API-SemRedirect]: ../../../../../swagger-ui/index.html?api=otpp-pagamentos_sem_redirecionamento

## Endpoints

| Tipo | Endpoint | Descrição | Sucesso |
| :--: | :------: | :-------: | :-----: |
| POST | `/opus-open-finance/enrollments/v1/enrollments` | Criar vínculo de conta | 201 |
| GET | `/opus-open-finance/enrollments/v1/enrollments/{enrollmentId}` | Consultar vínculo | 200 |
| PATCH | `/opus-open-finance/enrollments/v1/enrollments/{enrollmentId}` | Rejeitar ou revogar vínculo | 204 |
| POST | `/opus-open-finance/enrollments/v1/enrollments/{enrollmentId}/risk-signals` | Enviar sinais de risco | 201 |
| POST | `/opus-open-finance/enrollments/v1/enrollments/{enrollmentId}/fido-sign-options` | Obter parâmetros para autenticação FIDO2 | 201 |
| POST | `/proxy/open-banking/enrollments/v2/enrollments/{enrollmentId}/fido-registration-options` | Obter parâmetros para criação de credencial FIDO2 | 201 |
| POST | `/proxy/open-banking/enrollments/v2/enrollments/{enrollmentId}/fido-registration` | Associar credencial FIDO2 ao vínculo | 201 |
| POST | `/proxy/open-banking/enrollments/v2/consents/{consentId}/authorise` | Autorizar consentimento de pagamento via vínculo | 201 |
| POST | `/proxy/open-banking/enrollments/v2/recurring-consents/{recurringConsentId}/authorise` | Autorizar consentimento de pagamento automático via vínculo | 201 |

## Máquina de estados

| Status | Como se chega | Próximo passo |
| :----: | :-----------: | :-----------: |
| `AWAITING_RISK_SIGNALS` | POST `/enrollments` retorna 201 | Enviar `/risk-signals` em até **15 minutos** |
| `AWAITING_ACCOUNT_HOLDER_VALIDATION` | Após `/risk-signals` ser aceito | Redirect do usuário para a Detentora |
| `AWAITING_ENROLLMENT` | Usuário aprova na Detentora (OIDC OK) | Enviar `/fido-registration` |
| `AUTHORISED` | Credencial FIDO2 registrada com sucesso | Vínculo apto para autorizar pagamentos |
| `REJECTED` | Rejeição pelo usuário ou TTL expirado | Encerrado |

> Documentação oficial da máquina de estados: [v2.1.0 — SV Vínculo de Dispositivo](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/747503675/M+quina+de+estados+-+v2.1.0-+SV+V+nculo+de+dispositivo).

## Rejeição vs Revogação

Ambos os cenários são executados via `PATCH /enrollments/{enrollmentId}`, mas referem-se a estados diferentes:

- **Rejeição:** Cancela o vínculo nos estados `AWAITING_RISK_SIGNALS`, `AWAITING_ACCOUNT_HOLDER_VALIDATION` e `AWAITING_ENROLLMENT` (antes de o vínculo ser fechado);
- **Revogação:** Cancela o vínculo no estado `AUTHORISED` (depois de já estar pronto para uso).

Cabe ao cliente da API distinguir o cenário e informar o motivo adequado no campo `cancellation.reason.rejectionReason`.

> **Importante:** Um único vínculo aprova consentimentos de pagamentos **OU** de transferências inteligentes — não os dois. Para suportar ambos os tipos, são necessários **dois vínculos distintos**, com `permissions` separadas.

## Registro FIDO2 (W3C WebAuthn)

Após a autorização do usuário no fluxo OIDC, o app cliente:

1. **Solicita parâmetros de registro:** `POST /fido-registration-options` informando `rp` (relying party — o domínio do app) e `platform` (`ANDROID` ou `IOS`). A resposta é um JWT que contém `challenge`, `user`, `pubKeyCredParams`, `authenticatorSelection`, etc., compatível com a definição [W3C WebAuthn-2](https://www.w3.org/TR/webauthn-2/#dictionary-makecredentialoptions);
2. **Apresenta o desafio ao usuário** (biometria/PIN), gerando a credencial FIDO2 no dispositivo;
3. **Envia a credencial criada:** `POST /fido-registration` com `clientDataJSON` + `attestationObject`.

## Autorização do consentimento via FIDO2

Com o vínculo em `AUTHORISED`, para autorizar um consentimento de pagamento:

1. `POST /fido-sign-options` informando `rp`, `platform` e `consentId` (ou `recurringConsentId`). Retorna JWT com challenge para autenticação;
2. O usuário realiza autenticação FIDO2 (biometria) — a credencial assina o challenge;
3. `POST /enrollments/v2/consents/{consentId}/authorise` (ou `.../recurring-consents/{recurringConsentId}/authorise`) enviando `enrollmentId`, `riskSignals` e `fidoAssertion`.

> **Pagamentos com múltiplas alçadas:** o consentimento transita para `PARTIALLY_ACCEPTED` até que **todos os aprovadores** confirmem. Pagamentos de alçada única transitam direto para `AUTHORISED`.

## Regras de negócio críticas

- **Divergência de conta de débito:** Se o `debtorAccount` informado pelo iniciador na criação do consentimento divergir da conta vinculada, a Detentora retorna HTTP 422 com o código **`CONTA_DEBITO_DIVERGENTE_CONSENTIMENTO_VINCULO`** e rejeita o consentimento com motivo `CONTA_NAO_PERMITE_PAGAMENTO`;
- **Omissão de conta de débito:** Se o iniciador **omitir** `debtorAccount` na criação do consentimento, a Detentora preenche automaticamente o campo `data/debtorAccount` com a conta vinculada após a autorização;
- **Validação de limites do vínculo:** Ocorre **apenas no momento da liquidação** do pagamento — não na autorização. Isso significa que um consentimento pode ser autorizado mesmo que o pagamento subsequente ultrapasse o limite, e a rejeição vem na hora do débito.

## Referências

- [SV Vínculo de Dispositivo v2.2.0 — Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1436516353/v2.2.0+-+SV+V+nculo+de+dispositivo)
- [W3C WebAuthn-2 — makeCredentialOptions](https://www.w3.org/TR/webauthn-2/#dictionary-makecredentialoptions)
- Especificação OpenAPI: [`oas-pagamentos-sem-redirecionamento.yaml`](../anexos/yml/opusTPP-pagamentosSR.yml) (ver também [API associada][API-SemRedirect])
