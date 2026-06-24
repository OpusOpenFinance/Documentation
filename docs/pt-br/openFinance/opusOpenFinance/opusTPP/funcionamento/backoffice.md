---
layout: default
title: Backoffice
parent: "Funcionamento"
grand_parent: "OpusTPP"
nav_order: 8
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/opusTPP/funcionamento/backoffice"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/opusTPP/funcionamento/backoffice"
      lang: "es"
---

## Objetivo

A API de Backoffice expõe operações administrativas de **consulta** sobre os dados de consentimentos, vínculos e pagamentos do OpusTPP. É destinada a equipes de suporte, operações e backoffice, **não substituindo** as interfaces voltadas ao usuário final ou ao app cliente.

> **Versão atual:** `1.0.0-beta.1`. Para os possíveis valores de cada chave JSON consulte a [API associada][API-Backoffice].

## Endpoints

### 1. Listar consentimentos

```
GET /backoffice/consents
```

Lista consentimentos com filtros, paginação e ordenação.

**Filtros principais:**

| Filtro | Tipo | Descrição |
| :----: | :--: | :-------: |
| `cnpj`, `cpf` | string | Documento do titular |
| `createdOnBegin`, `createdOnEnd` | date | Janela de criação |
| `expiresOn` | date | Data limite de expiração |
| `searchKey`, `searchKeys` | string / list | Busca por termos genéricos |
| `tppId` | UUID | Identificador da TPP (quando o OpusTPP atende múltiplas TPPs) |
| `consentId`, `consentIdList` | string / list | Filtro direto por identificador |
| `consentStatus`, `consentStatusList` | string / list | Filtro por status (ex.: `AUTHORISED`, `REVOKED`) |
| `page`, `pageSize`, `orderType` | int / string | Paginação e ordenação |

**Header obrigatório:** `x-application-id`

### 2. Listar enrollments

```
GET /backoffice/enrollments
```

Lista vínculos de dispositivo com filtros, paginação e ordenação.

**Filtros principais:**

| Filtro | Tipo | Descrição |
| :----: | :--: | :-------: |
| `cnpj`, `cpf` | string | Documento do titular |
| `createdOnBegin`, `createdOnEnd` | date | Janela de criação |
| `expiresOn` | date | Data limite de expiração |
| `tppId` | UUID | Identificador da TPP |
| `enrollmentId`, `enrollmentIdList` | string / list | Filtro direto por identificador |
| `enrollmentStatus`, `enrollmentStatusList` | string / list | Filtro por status (ex.: `AUTHORISED`, `REJECTED`) |
| `page`, `pageSize`, `orderType` | int / string | Paginação e ordenação |

**Header obrigatório:** `x-application-id`

### 3. Listar pagamentos por consentimento

```
GET /backoffice/consents/{consentId}/payments
```

Lista todos os pagamentos associados a um consentimento.

## Cenários de uso típico

- **Suporte ao cliente final:** consultar o status de um consentimento específico para um cliente que ligou no SAC reclamando da operação.
- **Auditoria interna:** extrair todos os consentimentos autorizados em um período para reconciliação ou conformidade.
- **Investigação de incidentes:** filtrar por `consentStatus=REJECTED` em uma janela para análise de causa raiz.
- **Relatórios operacionais:** combinar com `tppId` quando o OpusTPP atende múltiplas marcas/instituições.

## Referências

- Especificação OpenAPI: [`backoffice.yml`](../anexos/yml/opusTPP-backoffice.yml) (ver também [API associada][API-Backoffice])

[API-Backoffice]: ../../../../../swagger-ui/index.html?api=otpp-backoffice
