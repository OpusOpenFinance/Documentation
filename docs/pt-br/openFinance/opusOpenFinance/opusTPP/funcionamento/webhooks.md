---
layout: default
title: Webhooks de Pagamentos
parent: "Funcionamento"
grand_parent: "OpusTPP"
nav_order: 7
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/opusTPP/funcionamento/webhooks"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/opusTPP/funcionamento/webhooks"
      lang: "es"
---

## Objetivo

A API de Webhooks de Pagamentos é o canal pelo qual a Instituição Detentora **notifica** o OpusTPP de mudanças de status em pagamentos, consentimentos e vínculos. O OpusTPP recebe a notificação, a valida e a encaminha para a URL interna do cliente, permitindo que a ITP reaja em tempo quase real às mudanças de estado.

> Para os possíveis valores de cada chave JSON consulte a [API associada][API-Webhook].

[API-Webhook]: ../../../../../swagger-ui/index.html?api=otpp-webhooks

## Como funciona

1. A Detentora notifica o OpusTPP via POST nos endpoints públicos `/open-banking/webhook/...`.
2. O OpusTPP recebe, valida e responde **202 Accepted** à Detentora.
3. A notificação válida é publicada em um tópico Dapr (`opustpp-webhook-topic`) para processamento assíncrono.
4. O OpusTPP repassa o POST recebido para a **URL de webhook do cliente**, previamente cadastrada via API interna.

> **Atenção:** os endpoints abaixo só funcionam após um pagamento ou consentimento ter sido criado pelo usuário no sistema. Notificações sem correspondência são recebidas, ganham resposta de sucesso (para não causar retry desnecessário na Detentora), e são **ignoradas com log informativo**.

## Endpoints expostos pelo OpusTPP

| Tipo | Endpoint | Descrição | Sucesso |
| :--: | :------: | :-------: | :-----: |
| POST | `/open-banking/webhook/v1/payments/{versionApi}/consents/{paymentId}` | Atualização do consentimento do pagamento PIX | 202 |
| POST | `/open-banking/webhook/v1/payments/{versionApi}/pix/payments/{paymentId}` | Atualização do pagamento PIX | 202 |
| POST | `/open-banking/webhook/v1/automatic-payments/{versionApi}/recurring-consents/{recurringPaymentId}` | Atualização do consentimento do pagamento automático PIX | 202 |
| POST | `/open-banking/webhook/v1/automatic-payments/{versionApi}/pix/recurring-payments/{recurringPaymentId}` | Atualização do pagamento automático PIX | 202 |
| POST | `/open-banking/webhook/v1/enrollments/{versionApi}/enrollments/{enrollmentId}` | Atualização do vínculo de conta (estados `REJECTED` e `REVOKED`) | 202 |

## Payload das notificações da Detentora

> **Importante:** as notificações trazem **apenas a data da atualização** — nenhuma informa o novo status. Para descobrir o status atualizado, é necessário fazer um GET no recurso correspondente.

```json
{
  "data": {
    "timestamp": "2024-09-02T08:30:00Z"
  }
}
```

Para descobrir o status atualizado:

- `GET /proxy/open-banking/payments/v5/pix/payments/{paymentId}` — para pagamentos PIX
- `GET /opus-open-finance/payments/v1/consents/{consentId}` — para consentimentos de pagamento
- `GET /opus-open-finance/enrollments/v1/enrollments/{enrollmentId}` — para vínculos

## Cadastro da URL de webhook do cliente

Para que o OpusTPP saiba para onde reencaminhar as notificações, cada aplicação cliente precisa ter sua URL de webhook cadastrada via API interna:

| Método | Endpoint | Descrição |
| :----: | :------: | :-------: |
| PATCH | `/opus-open-finance/application/v1/application/{applicationId}/webhook-url` | Criação ou atualização da URL de webhook |

> **Atenção:** esta URL **não** deve ser a mesma cadastrada no Diretório de Participantes como Redirect URI. Trata-se de uma URL interna do cliente (geralmente em rede privada), que receberá as notificações encaminhadas pelo OpusTPP via POST.

Detalhes da API interna em [APIs Internas](apisInternas.html).

## Payload encaminhado ao cliente

Quando o OpusTPP recebe uma notificação válida da Detentora, ele faz um POST para a URL cadastrada com o seguinte formato (encapsulando o request original):

```json
{
  "requestBody": {
    "data": {
      "timestamp": "2024-09-02T08:30:00Z"
    }
  },
  "requestHeaders": {
    "x-webhook-interaction-id": "webhook-interaction-id",
    "content-type": "application/json",
    "accept": "*/*",
    "connection": "keep-alive",
    "x-fapi-interaction-id": "af113686-b4fd-413e-86a1-dc7eb1b4cc1a"
  },
  "requestMethod": "POST"
}
```

- `x-webhook-interaction-id`: identificador da notificação. Pode ser usado para idempotência no lado do cliente.
- `x-fapi-interaction-id`: identificador do fluxo regulatório, útil para rastreabilidade.

## Configuração do processamento assíncrono (Dapr)

O fluxo de processamento das notificações é **assíncrono**. O cliente é responsável por configurar TTL, retry e demais parâmetros do componente Dapr de pub/sub. Independente do ferramental escolhido como state store/message broker, devem ser usados os seguintes nomes-padrão:

| Parâmetro | Valor obrigatório |
| :-------: | :---------------: |
| Pubsub Id | `webhook-event-pub-sub` |
| Pubsub Topic | `opustpp-webhook-topic` |

> **Sem esses nomes exatos, o OpusTPP não consegue publicar/consumir as notificações no canal interno.**

## Cache de webhook

O OpusTPP suporta cache opcional para os dados da funcionalidade de webhook. Por padrão, o cache do webhook vem **desabilitado**.

## Orientações importantes

- Todas as datas seguem **RFC3339** com formato *zulu*.
- Não há separação funcional entre pessoa natural e pessoa jurídica.
- Se a URL de webhook do cliente não estiver cadastrada, o OpusTPP retorna sucesso para a Transmissora e apenas registra no log que a notificação foi ignorada.

## Referências

- [Documentação oficial — Webhook Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/105021457/Webhook)
- Especificação OpenAPI: [`oas-webhook.yml`](../anexos/yml/opusTPP-webhook.yml) (ver também [API associada][API-Webhook])
