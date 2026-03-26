---
layout: default
title: "Iniciação de Transação de Pagamento Automático"
parent: "ITP"
nav_order: 1
lang: "pt-br"
alternate_lang: 
    - path: "/Documentation/en/openFinance/openFinanceBrasil/perfisParticipacao/itp/itpAutomatico/"
      lang: "en"
    - path: "/Documentation/es/openFinance/openFinanceBrasil/perfisParticipacao/itp/itpAutomatico/"
      lang: "es"
---

<!-- Adicionar um contexto do que é o ITP automático -->

## Endpoints disponíveis

- **Versão 1**: `POST /proxy/open-banking/automatic-payments/v1/pix/recurring-payments`
  - [documentação oficial](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/345178113/v1.0.0+SV+Pagamentos+Autom+ticos)

- **Versão 2**: `POST /proxy/open-banking/automatic-payments/v2/pix/recurring-payments`
  - [documentação oficial](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/896368641/v2.0.0+SV+Pagamentos+Autom+ticos)

Após a aprovação do consentimento, é necessário requisitar o início da transação do pagamento junto à Detentora de Conta.

Nos casos de sucesso, a resposta terá código HTTP 201 Created e conterá as informações do pagamento iniciado. O consentimento associado terá seu status **CONSUMED** após atingir algum dos limites globais de transações.

> É necessário consultar o status do pagamento iniciado (ex.: através de *polling* no endpoint descrito abaixo) para verificar quando/se ele foi de fato realizado. <!--Explicar o que é "polling"-->

Já para os casos de falha na criação do pagamento, a Detentora retornará HTTP 422 Unprocessable Entity com o código referente ao erro ocorrido, e o status de seu consentimento se tornará **REJECTED**. Para mais informações sobre os códigos de erro durante a criação do pagamento PIX, consultar a documentação oficial (seção *"Informações Técnicas - Pagamentos Automáticos"*, schema `422ResponseErrorCreatePixRecurringPayment`).

Exemplo de request com amount (100.00) diferente do definido no consentimento (10.00):

Request Body:

```json
{
    "data": {
      "localInstrument": "MANU",
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
      "cnpjInitiator": "00000000000191"
    }
  }
```

Response Error no formato JSON - resposta é retornada no formato JWT:

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

### Consulta de pagamentos associados a um consentimento

Endpoints disponíveis:

- **Versão 1**: `GET /proxy/open-banking/automatic-payments/v1/pix/recurring-payments`
  - [documentação oficial](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/345178187/M+quina+de+Estados+-+v1.0.0+-+SV+Pagamentos+Autom+ticos)

- **Versão 2**: `GET /proxy/open-banking/automatic-payments/v2/pix/recurring-payments`
  - [documentação oficial](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/896368699/M+quina+de+Estados+-+v2.0.0+-+SV+Pagamentos+Autom+ticos)

Permite a consulta do status e as informações de pagamento associados a um consentimento.

Uma explicação detalhada da máquina de estados do status do pagamento pode ser encontrada na documentação oficial do Open Finance Brasil.

### Consulta de status do pagamento automático

Endpoints disponíveis:

- **Versão 1**: `GET /proxy/open-banking/automatic-payments/v1/pix/recurring-payments/{recurringPaymentId}`
  - [documentação oficial](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/345178187/M+quina+de+Estados+-+v1.0.0+-+SV+Pagamentos+Autom+ticos)

- **Versão 2**: `GET /proxy/open-banking/automatic-payments/v2/pix/recurring-payments/{recurringPaymentId}`
  - [documentação oficial](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/896368699/M+quina+de+Estados+-+v2.0.0+-+SV+Pagamentos+Autom+ticos)

Permite a consulta do status e as informações de um pagamento automático.

Uma explicação detalhada da máquina de estados do status do pagamento pode ser encontrada na documentação oficial do Open Finance Brasil. <!--Adicionar o link que redireciona pra máquina de estados-->

### Revogação do pagamento

Endpoints disponíveis:

- **Versão 1**: `PATCH /proxy/open-banking/automatic-payments/v1/pix/recurring-payments/{recurringPaymentId}`
  - [documentação oficial](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/345178113/v1.0.0+SV+Pagamentos+Autom+ticos)

- **Versão 2**: `PATCH /proxy/open-banking/automatic-payments/v2/pix/recurring-payments/{recurringPaymentId}`
  - [documentação oficial](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/896368641/v2.0.0+SV+Pagamentos+Autom+ticos)

Permite a revogação de um pagamento.

É permitido realizar a revogação de um pagamento após a iniciação do pagamento e se o pagamento estiver nas seguintes situações: Agendada com sucesso (SCHD) ou retida para análise (PDNG).

Nos casos de sucesso, a resposta terá código `HTTP 200` e conterá as informações da revogação juntamente com as informações do pagamento iniciado.

Já para os casos de falha na revogação do pagamento, a Detentora retornará `HTTP 422 Unprocessable Entity` com o código referente ao erro ocorrido. Para mais informações sobre os códigos de erro durante a revogação do pagamento PIX, consultar a documentação oficial (seção *"Informações Técnicas - Pagamentos Automáticos"*, schema `422ResponseErrorCreateRecurringPaymentsPaymentId`).

Exemplo de request:

Request Body:

```json
{
  "data": {
    "status": "REJECTED",
    "cancellation": {
      "cancelledBy": {
        "document": {
          "identification": "11111111111",
          "rel": "CPF"
        }
      }
    }
  }
}
```

Response Error no formato JSON - resposta é retornada no formato JWT:

```json
{
  "errors": [
    {
      "code": "PAGAMENTO_NAO_PERMITE_CANCELAMENTO",
      "title": "Pagamento não permite cancelamento",
      "detail": "Pagamento não permite cancelamento"
    }
  ],
  "meta": {
    "requestDateTime": "2021-05-21T08:30:00Z"
  },
  "aud": "27aea8f6-2119-55f8-9553-5ad4b08eeb17",
  "iss": "27aea8f6-2119-55f8-9553-5ad4b08eeb17",
  "jti": "3f47c50e-3a19-4d16-905c-8eb61102b0da",
  "iat": 1689103922
}
```

### Consulta de status do consentimento - GET /opus-open-finance/automatic-payments/v1/recurring-consents/{recurringConsentId}

Permite a consulta do status e as informações de um consentimento de pagamento automático.

Uma explicação detalhada da máquina de estados do status do consentimento pode ser encontrada na [documentação oficial](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/345178187/M+quina+de+Estados+-+v1.0.0+-+SV+Pagamentos+Autom+ticos) do Open Finance Brasil.

### Revogação de consentimento - PATCH /opus-open-finance/automatic-payments/v1/recurring-consents/{recurringConsentId}

Permite a revogação de um consentimento.

É permitido realizar a revogação de um consentimento após a criação do consentimento e se o consentimento estiver com status **AUTHORIZED**.

Nos casos de sucesso, a resposta terá código `HTTP 200` e conterá as informações da revogação juntamente com as informações do consentimento.

Já para os casos de falha na revogação do pagamento, a Detentora retornará `HTTP 422 Unprocessable Entity` com o código referente ao erro ocorrido. Para mais informações sobre os códigos de erro durante a revogação do pagamento PIX, consultar a [documentação oficial](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/345178113/v1.0.0+SV+Pagamentos+Autom+ticos) (seção *"Informações Técnicas - Pagamentos Automáticos"*, schema `422ResponseErrorRecurringConsents`).

Exemplo de request:

Request Body:

```json
{
  "data": {
    "status": "REVOKED",
    "revocation": {
      "revokedBy": "INICIADORA",
      "revokedFrom": "DETENTORA",
      "reason": {
        "code": "REVOGADO_RECEBEDOR",
        "detail": "string"
      }
    }
  }
}
```

Response Error no formato JSON - resposta é retornada no formato JWT:

```json
{
  "errors": [
    {
      "code": "PAGAMENTO_NAO_PERMITE_CANCELAMENTO",
      "title": "Pagamento não permite cancelamento",
      "detail": "Pagamento não permite cancelamento"
    }
  ],
  "meta": {
    "requestDateTime": "2021-05-21T08:30:00Z"
  },
  "aud": "27aea8f6-2119-55f8-9553-5ad4b08eeb17",
  "iss": "27aea8f6-2119-55f8-9553-5ad4b08eeb17",
  "jti": "3f47c50e-3a19-4d16-905c-8eb61102b0da",
  "iat": 1689103922
}
```
