---
layout: default
title: "ITP Automático"
parent: "ITP"
nav_order: 2
lang: "pt-br"
alternate_lang: 
    - path: "/Documentation/en/openFinance/openFinanceBrasil/perfisParticipacao/itp/itpAutomatico/"
      lang: "en"
    - path: "/Documentation/es/openFinance/openFinanceBrasil/perfisParticipacao/itp/itpAutomatico/"
      lang: "es"
---

## Iniciação de Transação de Pagamento Automático

A **Iniciação de Transação de Pagamento (ITP) Automático** é uma funcionalidade do Open Finance Brasil que viabiliza a realização de pagamentos agendados e recorrentes, como assinaturas e cobranças periódicas, de forma automatizada e segura.

### Modelo de Negócio

Este serviço estabelece um modelo de delegação de autorização onde:

- **Pagador (Consumidor):** Titular da conta que autoriza débitos automáticos
- **[Iniciador de Pagamento:](./index.html)** Pessoa jurídica (ex.: plataforma de serviços, loja virtual) que solicita os débitos
- **[Detentora de Conta:](../detentorDeContas.html)** Instituição financeira que custodia a conta do pagador e executa os pagamentos

### Fluxo de Funcionamento

O processo é estruturado em duas etapas complementares:

| Etapa | Descrição | Responsável |
| ----- | --------- | ----------- |
| **1. Consentimento** | O pagador autoriza, no ambiente digital da Detentora de Conta, que o Iniciador realize débitos automáticos em sua conta, estabelecendo limites de valor, periodicidade e vigência. | Pagador e Detentora de Conta |
| **2. Iniciação do Pagamento** | O Iniciador requisita a criação de um pagamento específico à Detentora de Conta, utilizando o consentimento previamente autorizado como base legal para o débito. | Iniciador de Pagamento |

---

## Endpoints por Funcionalidade

### 1. Criação de Pagamento Automático

**Objetivo:** Solicitar a realização de um pagamento recorrente ou agendado com base em um consentimento já aprovado.

**Endpoints:**

| Versão | Método | Endpoint |
| :----: | :----: | :------: |
| v1 | POST | `/proxy/open-banking/automatic-payments/v1/pix/recurring-payments` |
| v2 | POST | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments` |

**Comportamento esperado:**

| Cenário | Código HTTP | Status do Consentimento | Descrição |
| :-----: | :---------: | :---------------------: | :-------: |
| Sucesso | 201 Created | CONSUMED | Pagamento criado. O consentimento é consumido ao atingir os limites autorizados (valor total ou número de transações). |
| Falha | 422 Unprocessable Entity | REJECTED | Pagamento rejeitado. O consentimento é invalidado. |

**Exemplo de falha por divergência de valor:**

*Request* com valor de R$ 100,00 enquanto o consentimento autoriza apenas R$ 10,00:

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

*Response* de erro (formato JWT):

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

> **Importante:** A criação do pagamento não garante sua liquidação imediata. Recomenda-se a adoção de mecanismo de *polling* (consulta periódica) ao endpoint de consulta para acompanhamento efetivo da execução.

---

### 2. Consulta de Pagamentos por Consentimento

**Objetivo:** Obter a relação de todos os pagamentos associados a um consentimento, com seus respectivos status.

**Endpoints:**

| Versão | Método | Endpoint |
| :----: | :----: | :------: |
| v1 | GET | `/proxy/open-banking/automatic-payments/v1/pix/recurring-payments` |
| v2 | GET | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments` |

A [documentação oficial](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/896368699/M+quina+de+Estados+-+v2.0.0+-+SV+Pagamentos+Autom+ticos) detalha a máquina de estados completa dos pagamentos.

---

### 3. Consulta de Pagamento Específico

**Objetivo:** Obter o status detalhado e as informações de um pagamento automático específico.

**Endpoints:**

| Versão | Método | Endpoint |
| :----: | :----: | :------: |
| v1 | GET | `/proxy/open-banking/automatic-payments/v1/pix/recurring-payments/{recurringPaymentId}` |
| v2 | GET | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments/{recurringPaymentId}` |

---

### 4. Revogação de Pagamento

**Objetivo:** Cancelar um pagamento que já foi iniciado, mas ainda não foi liquidado.

**Endpoints:**

| Versão | Método | Endpoint |
| :----: | :----: | :------: |
| v1 | PATCH | `/proxy/open-banking/automatic-payments/v1/pix/recurring-payments/{recurringPaymentId}` |
| v2 | PATCH | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments/{recurringPaymentId}` |

**Condições para revogação:**

| Status do Pagamento | Permite Revogação |
| :-----------------: | :---------------: |
| SCHD (Agendado com sucesso) | ✓ Sim |
| PDNG (Retido para análise) | ✓ Sim |
| Outros status | ✗ Não |

**Comportamento esperado:**

| Cenário | Código HTTP | Descrição |
| :-----: | :---------: | :-------: |
| Sucesso | 200 OK | Revogação efetivada. Resposta inclui dados do pagamento e da revogação. |
| Falha | 422 Unprocessable Entity | Revogação não permitida. Retorno do erro específico. |

**Exemplo de request:**

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

---

### 5. Consulta de Status do Consentimento

**Objetivo:** Verificar a situação atual de um consentimento de pagamento automático.

**Endpoint:** `GET /opus-open-finance/automatic-payments/v1/recurring-consents/{recurringConsentId}`

A [documentação oficial](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/345178187/M+quina+de+Estados+-+v1.0.0+-+SV+Pagamentos+Autom+ticos) detalha a máquina de estados completa dos consentimentos.

---

### 6. Revogação de Consentimento

**Objetivo:** Cancelar um consentimento ativo, impedindo a criação de novos pagamentos associados a ele.

**Endpoint:** `PATCH /opus-open-finance/automatic-payments/v1/recurring-consents/{recurringConsentId}`

**Condições para revogação:**

| Status do Consentimento | Permite Revogação |
| :---------------------: | :---------------: |
| AUTHORIZED | ✓ Sim |
| Outros status | ✗ Não |

**Comportamento esperado:**

| Cenário | Código HTTP | Descrição |
| :-----: | :---------: | :-------: |
| Sucesso | 200 OK | Consentimento revogado com sucesso. |
| Falha | 422 Unprocessable Entity | Erro na revogação. Retorno do código específico. |

**Exemplo de request:**

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

---

## Tratamento de Erros

Em cenários de erro, as respostas são retornadas no formato JWT (JSON Web Token) com a seguinte estrutura padrão:

```json
{
  "errors": [
    {
      "code": "CODIGO_DO_ERRO",
      "title": "Título descritivo",
      "detail": "Detalhamento específico do erro"
    }
  ],
  "meta": {
    "requestDateTime": "2021-05-21T08:30:00Z"
  },
  "aud": "...",
  "iss": "...",
  "jti": "...",
  "iat": 1689103922
}
```

Para consultar a lista completa de códigos de erro, acesse [este link][ITP-Autom].

[ITP-Autom]: ../../../../../swagger-ui/index.html?api=oas-itp-pagamentos-automaticos
