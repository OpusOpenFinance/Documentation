---
layout: default
title: Pagamento Automático
parent: "Funcionamento"
grand_parent: "OpusTPP"
nav_order: 3
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/opusTPP/funcionamento/pagamentoAutomatico"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/opusTPP/funcionamento/pagamentoAutomatico"
      lang: "es"
---

## Objetivo

A API de Pagamento Automático (Pix Automático / Recurring Payments) permite a criação de **consentimentos recorrentes** que autorizam o débito periódico em conta para finalidades como assinaturas, mensalidades, parcelas e cobranças recorrentes em geral.

O OpusTPP expõe simultaneamente as versões regulatórias **v1** e **v2** do Pix Automático.

> Para os possíveis valores de cada chave JSON consulte a [API associada][API-Auto].

[API-Auto]: ../../../../../swagger-ui/index.html?api=otpp-pagamentos_automaticos

## Consentimento recorrente

| Tipo | Endpoint | Descrição | Sucesso |
| :--: | :------: | :-------: | :-----: |
| POST | `/opus-open-finance/automatic-payments/v1/recurring-consents` | Criação de consentimento de pagamento automático | 201 |
| GET | `/opus-open-finance/automatic-payments/v1/recurring-consents/{recurringConsentId}` | Consulta de consentimento | 200 |
| PATCH | `/opus-open-finance/automatic-payments/v1/recurring-consents/{recurringConsentId}` | Revogação de consentimento | 200 |
| POST | `/opus-open-finance/automatic-payments/v1/recurring-consents/{recurringConsentId}/authorisation-retry` | Nova tentativa de autorização | 200 |

## Pagamentos recorrentes — versões v1 e v2

| Método | Endpoint v1 | Endpoint v2 | Descrição | Sucesso |
| :----: | :---------: | :---------: | :-------: | :-----: |
| POST | `/proxy/open-banking/automatic-payments/v1/pix/recurring-payments` | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments` | Criação de pagamento automático | 201 |
| GET | `/proxy/open-banking/automatic-payments/v1/pix/recurring-payments` | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments` | Consulta de todos pagamentos do consentimento | 200 |
| GET | `/proxy/open-banking/automatic-payments/v1/pix/recurring-payments/{recurringPaymentId}` | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments/{recurringPaymentId}` | Consulta de pagamento individual | 200 |
| PATCH | `/proxy/open-banking/automatic-payments/v1/pix/recurring-payments/{recurringPaymentId}` | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments/{recurringPaymentId}` | Revogação de pagamento | 200 |

Referências:

- **v1:** [SV Pagamentos Automáticos 1.0.0](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/345178113/v1.0.0+SV+Pagamentos+Autom+ticos)
- **v2:** [SV Pagamentos Automáticos 2.0.0](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/896368641/v2.0.0+SV+Pagamentos+Autom+ticos)

## Comportamento esperado

- **Sucesso:** o consentimento permanece em `AUTHORIZED` até atingir os limites globais de transações estabelecidos no payload (quantidade total, valor total, data limite, etc.). Quando esses limites são alcançados, o status transita para `CONSUMED`.
- **Erro de negócio (HTTP 422):** o status do pagamento individual entra em `REJECTED`. O consentimento permanece ativo (a menos que tenha sido violada uma regra global). Schemas de erro: `422ResponseErrorCreatePixRecurringPayment` e `422ResponseErrorCreateRecurringPaymentsPaymentId`.
- **Revogação de pagamento individual:** permitida quando o pagamento está em `SCHEDULED` (SCHD) ou `PDNG`.
- **Revogação de consentimento:** permitida quando o consentimento está em `AUTHORIZED`. Schema de erro: `422ResponseErrorRecurringConsents`.

## Referências

- [Máquina de Estados v1.0.0 — Pagamentos Automáticos](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/345178187/M+quina+de+Estados+-+v1.0.0+-+SV+Pagamentos+Autom+ticos)
- [Máquina de Estados v2.0.0 — Pagamentos Automáticos](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/896368699/M+quina+de+Estados+-+v2.0.0+-+SV+Pagamentos+Autom+ticos)
- Especificação OpenAPI: [`oas-pagamentos-automaticos.yml`](../anexos/yml/opusTPP-pagamentosAutomaticos.yml) (ver também [API associada][API-Auto])
