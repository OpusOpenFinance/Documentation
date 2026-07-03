---
layout: default
title: Recepção de Dados
parent: "Funcionamento"
grand_parent: "Iniciação de Pagamentos e Recepção de Dados"
nav_order: 1
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/opusTPP/funcionamento/recepcaoDeDados"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/opusTPP/funcionamento/recepcaoDeDados"
      lang: "es"
---

## Objetivo

O Módulo de Recepção de Dados Cadastrais e Transacionais expõe os endpoints que permitem à ITP **gerenciar consentimentos** (criar, consultar, revogar e renovar) e **obter os dados consentidos** através de uma camada de proxy aderente ao padrão regulatório do Open Finance Brasil.

> **Pré-requisito:** Os endpoints de utilização só podem ser invocados após o fluxo de autorização descrito no [Funcionamento](./). Para os possíveis valores de cada chave JSON consulte a [API associada][API-OF-Dados].

[API-OF-Dados]: ../../../../../swagger-ui/index.html?api=otpp-recepcao_dados_of

## Endpoints de consentimento

| Tipo | Endpoint | Descrição | Sucesso |
| :--: | :------: | :-------: | :-----: |
| POST | `/opus-open-finance/consents/v1/consents` | Criação do consentimento de compartilhamento | 201 |
| GET | `/opus-open-finance/consents/v1/consents/{consentId}` | Consulta de status e dados do consentimento | 200 |
| DELETE | `/opus-open-finance/consents/v1/consents/{consentId}` | Revogação do consentimento | 204 |
| POST | `/opus-open-finance/consents/v1/consents/{consentId}/authorisation-retry` | Nova tentativa de autorização | 200 |
| POST | `/opus-open-finance/consents/v1/consents/{consentId}/extends` | Renovação do consentimento | 201 |
| GET | `/opus-open-finance/consents/v1/consents/{consentId}/extends` | Consulta dos dados de renovação | 200 |
| GET | `/opus-open-finance/dcm` | Obtenção dos dados de DCM dos *brand clients* | 200 |
| PUT | `/opus-open-finance/dcm` | Atualização dos dados de DCM dos *brand clients* | 200 |

### Quando usar cada endpoint

- **POST `/consents`**: Sempre que iniciar um novo pedido de acesso a dados de um cliente. Retorna `consentId` e `redirectUrl` para redirecionar o usuário à Detentora;
- **GET `/consents/{consentId}`**: Para acompanhar mudanças de status (`AWAITING_AUTHORISATION` → `AUTHORISED` ou `REJECTED`);
- **DELETE `/consents/{consentId}`**: Para revogar um consentimento ativo. Pode ser feito pelo Usuário, pela Iniciadora (ITP) ou pela Transmissora;
- **POST `/authorisation-retry`**: Quando o fluxo de redirecionamento falhar e ainda houver janela (60 minutos para dados);
- **POST `/extends`**: Renovação de consentimento sem precisar refazer o fluxo de autorização completo (quando suportado pela Detentora).

## Proxies para obtenção de dados

Após o consentimento estar em `AUTHORISED`, a ITP pode chamar os **proxies regulatórios** expostos pelo Módulo de Recepção de Dados. São aproximadamente **78 rotas** organizadas pelas seguintes famílias:

| Família | Recursos |
| :-----: | :------: |
| **Resources** | Listagem de recursos vinculados ao consentimento e status |
| **Customers** | Dados cadastrais PF (`/personal/*`) e PJ (`/business/*`) |
| **Accounts** | Contas, saldos, saldos reservados, transações, limites |
| **Credit Card Accounts** | Contas pós-pagas, faturas, transações, limites |
| **Loans** | Contratos de empréstimos (com prestações, pagamentos, garantias) |
| **Financings** | Contratos de financiamentos |
| **Unarranged Accounts Overdraft** | Contratos de adiantamento a depositantes |
| **Invoice Financings** | Contratos de direitos creditórios descontados |
| **Bank Fixed Incomes** | Renda fixa bancária |
| **Credit Fixed Incomes** | Renda fixa crédito |
| **Variable Incomes** | Renda variável |
| **Treasure Titles** | Tesouro Direto |
| **Funds** | Fundos de investimento |
| **Exchanges** | Operações de câmbio |

A especificação completa, incluindo schemas de resposta de cada rota, está em [`oas-dados-of.yml`](../anexos/yml/opusTPP-recepcaoDadosOf.yml). Para os possíveis valores de cada chave JSON consulte a [API associada][API-OF-Dados].

## Header de versão regulatória

Em rotas **não-proxy** (como `/consents`), o cliente pode escolher a versão dos endpoints da Transmissora através do header:

| Header | Direção | Comportamento |
| :----: | :-----: | :-----------: |
| `x-regulatory-v` | Request | Aceita versão completa (`"4.0.0"`) ou apenas major (`"4"`). Se não enviado, usa a versão mais atual. Se enviado com versão inexistente, usa a mais recente da mesma major. |
| `x-selected-regulatory-v` | Response | Indica qual versão foi efetivamente utilizada na chamada à Transmissora |

> **Importante:** O header `x-regulatory-v` **não é aceito** em rotas proxy. Nessas, a versão é sempre a major indicada na própria rota (ex.: `/proxy/open-banking/payments/v5/...`).

## Validação de permissões (regras de negócio)

A Detentora aplica esta lógica ao receber o `POST /consents`:

| Cenário | Resposta |
| :-----: | :------: |
| Permissões válidas, aderentes ao agrupamento | HTTP 201 Created |
| Permissões divergentes do agrupamento | HTTP 400 Bad Request |
| Algumas permissões removidas (produto não suportado pela Transmissora) | HTTP 201 Created com subconjunto retornado |
| Nenhuma permissão funcional restante | HTTP 422 Unprocessable Entity |

> **Implicação prática:** Sempre inspecione o `permissions` da **resposta** — pode estar menor que o solicitado.

## Referências

- [Documentação oficial — API Consentimento][API-Consents]
- Especificação OpenAPI: [`oas-dados-of.yml`](../anexos/yml/opusTPP-recepcaoDadosOf.yml) (ver também [API associada][API-OF-Dados])

[API-Consents]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17369335/API+-+Consentimento
