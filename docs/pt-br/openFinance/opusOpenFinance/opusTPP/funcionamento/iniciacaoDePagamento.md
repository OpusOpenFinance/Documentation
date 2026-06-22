---
layout: default
title: Iniciação de Pagamento
parent: "Funcionamento"
grand_parent: "OpusTPP"
nav_order: 2
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/opusTPP/funcionamento/iniciacaoDePagamento"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/opusTPP/funcionamento/iniciacaoDePagamento"
      lang: "es"
---

## Objetivo

A API de Iniciação de Transação de Pagamento PIX expõe os endpoints para criar, consultar e revogar consentimentos de pagamento, e para iniciar e gerenciar pagamentos PIX propriamente ditos.

O OpusTPP suporta **simultaneamente as versões regulatórias v4 e v5** das APIs de pagamento, permitindo que a TPP escolha qual versão chamar conforme o que cada Detentora aceita.

> **Pré-requisito:** todos os endpoints de iniciação só funcionam após o consentimento de pagamento ter sido criado e estar em `AUTHORISED` (ver [Funcionamento](./)). Para os possíveis valores de cada chave JSON consulte a [API associada][API-Pagamentos].

[API-Pagamentos]: ../../../../../swagger-ui/index.html?api=otpp-iniciacao_pagamentos

## Endpoints de consentimento de pagamento

| Tipo | Endpoint | Descrição | Sucesso |
| :--: | :------: | :-------: | :-----: |
| POST | `/opus-open-finance/payments/v1/consents` | Criação de consentimento de pagamento | 201 |
| GET | `/opus-open-finance/payments/v1/consents/{consentId}` | Consulta de status e dados | 200 |
| POST | `/opus-open-finance/payments/v1/consents/{consentId}/authorisation-retry` | Nova tentativa de autorização (janela de 5 min) | 200 |

## Endpoints de iniciação de pagamento PIX

A TPP escolhe a versão chamando o endpoint correspondente:

| Método | Endpoint v4 | Endpoint v5 | Descrição | Sucesso |
| :----: | :---------: | :---------: | :-------: | :-----: |
| POST | `/proxy/open-banking/payments/v4/pix/payments` | `/proxy/open-banking/payments/v5/pix/payments` | Criação do pagamento PIX | 201 |
| GET | `/proxy/open-banking/payments/v4/pix/payments/{paymentId}` | `/proxy/open-banking/payments/v5/pix/payments/{paymentId}` | Consulta de status de um pagamento | 200 |
| PATCH | `/proxy/open-banking/payments/v4/pix/payments/{paymentId}` | `/proxy/open-banking/payments/v5/pix/payments/{paymentId}` | Revogação de um pagamento individual | 200 |
| GET | — | `/proxy/open-banking/payments/v5/consents/{consentId}/pix/payments` | Consulta de todos os pagamentos do mesmo consentimento | 200 |
| PATCH | `/proxy/open-banking/payments/v4/pix/payments/consents/{consentId}` | `/proxy/open-banking/payments/v5/consents/{consentId}/pix/payments` | Revogação de todos os pagamentos do mesmo consentimento | 200 |

Referências oficiais:

- **v4:** [SV Pagamentos 4.0.0][SV-Pagamentos-v4]
- **v5:** [SV Pagamentos 5.0.0-rc.1][SV-Pagamentos-v5]

[SV-Pagamentos-v4]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/347078657/v4.0.0+-+SV+Pagamentos
[SV-Pagamentos-v5]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1600030254/v5.0.0-rc.1+-+SV+Pagamentos

## Comportamento esperado

- **Sucesso (201 Created):** o consentimento associado transita para `CONSUMED`. O pagamento entra em uma máquina de estados própria (definida pela Detentora) — é necessário fazer **polling** no GET para acompanhar a liquidação efetiva.
- **Erro de negócio (422 Unprocessable Entity):** o consentimento transita para `REJECTED`. O corpo retornado é um **JWT** (não JSON puro) contendo o objeto de erro padrão do Open Finance Brasil.
- **Revogação:** só é permitida quando o pagamento está em `SCHEDULED` (SCHD) ou retido para análise (`PDNG`).

## Códigos de erro mais comuns

| Código | Cenário típico |
| :----: | :------------: |
| `PAGAMENTO_DIVERGENTE_DO_CONSENTIMENTO` | Algum campo do pagamento (ex.: `amount`, `creditorAccount`) diverge do consentimento aprovado |
| `PAGAMENTO_NAO_PERMITE_CANCELAMENTO` | Tentativa de revogação fora dos estados elegíveis (SCHD/PDNG) |

A lista completa de códigos está no schema `422ResponseErrorCreatePixPayment` da documentação oficial.

## Exemplo — Criação de pagamento PIX

```json
{
  "data": [
    {
      "endToEndId": "E9040088820210128000800123873170",
      "localInstrument": "DICT",
      "payment": {
        "amount": "100.00",
        "currency": "BRL"
      },
      "creditorAccount": {
        "ispb": "12345678",
        "issuer": "1774",
        "number": "1234567890",
        "accountType": "CACC"
      },
      "remittanceInformation": "Pagamento da nota XPTO035-002.",
      "qrCode": "00020104141234567890...",
      "proxy": "12345678901",
      "cnpjInitiator": "50685362000135",
      "transactionIdentification": "E00038166201907261559y6j6",
      "ibgeTownCode": "5300108",
      "authorisationFlow": "HYBRID_FLOW",
      "consentId": "urn:bancoex:C1DD33123"
    }
  ]
}
```

## Exemplo — Revogação individual

```json
{
  "data": {
    "status": "CANC",
    "cancellation": {
      "cancelledBy": {
        "document": {
          "identification": "12312312387",
          "rel": "CPF"
        }
      }
    }
  }
}
```

## Exemplo — Resposta de erro em JWT

Quando a Detentora rejeita um pagamento por divergência, a resposta vem em JWT. Após decodificar, o payload é:

```json
{
  "errors": [
    {
      "code": "PAGAMENTO_DIVERGENTE_DO_CONSENTIMENTO",
      "title": "divergência entre pagamento e consentimento",
      "detail": "Dados do pagamento divergentes dos dados do consentimento"
    }
  ],
  "meta": {
    "requestDateTime": "2021-05-21T08:30:00Z"
  },
  "aud": "27aea8f6-2119-55f8-9553-5ad4b08eeb17",
  "iss": "27aea8f6-2119-55f8-9553-5ad4b08eeb17",
  "jti": "db068223-50bd-4342-b462-01434a9df172",
  "iat": 1656965998
}
```

> **Dica:** o `aud` e `iss` no JWT correspondem ao `softwareStatementId` da TPP. Use isso para auditoria e correlação interna.

## Orientações importantes

- Todas as datas seguem **RFC3339** com formato *zulu*.
- A máquina de estados completa do pagamento está documentada nas referências oficiais v4 e v5.
- Para a especificação completa de payload e schemas de resposta, consulte [`oas-pagamentos.yml`](../anexos/yml/opusTPP-iniciacaoPagamentos.yml) ou a [API associada][API-Pagamentos].

## Referências

- [SV Pagamentos v4.0.0 — Open Finance Brasil][SV-Pagamentos-v4]
- [SV Pagamentos v5.0.0-rc.1 — Open Finance Brasil][SV-Pagamentos-v5]
- [Pagamento Automático (Pix Automático)](pagamentoAutomatico.html) — para pagamentos recorrentes
