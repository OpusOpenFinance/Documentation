---
layout: default
title: APIs Internas
parent: "Funcionamento"
grand_parent: "OpusTPP"
nav_order: 9
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/opusTPP/funcionamento/apisInternas"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/opusTPP/funcionamento/apisInternas"
      lang: "es"
---

## Objetivo

As APIs Internas do OpusTPP permitem o gerenciamento de **metadados das aplicações** armazenados no banco do `oofc-core`. Servem para dois propósitos principais:

1. **Mapear um identificador alternativo ao `applicationId`** (o chamado `externalClientId`), útil quando a TPP precisa referenciar a aplicação por uma chave diferente da UUID interna do OOC.
2. **Configurar a URL de webhook** para onde o OpusTPP encaminha as notificações recebidas das Detentoras.

> Para os possíveis valores de cada chave JSON consulte a [API associada][API-Interno].

## Quando usar

- A integração não dispõe do `applicationId` (UUID interno) — somente de um identificador próprio (e.g., um *client_id* do sistema do cliente);
- Após o cadastro inicial da aplicação, é preciso registrar/atualizar a URL para onde o OpusTPP deve encaminhar as notificações de [Webhooks](webhooks.html).

## Endpoints

| Método | Endpoint | Descrição | Sucesso |
| :----: | :------: | :-------: | :-----: |
| GET | `/opus-open-finance/application/v1/external-client/{id}` | Consulta do `applicationId` a partir do `externalClientId` | 200 |
| PATCH | `/opus-open-finance/application/v1/application/{applicationId}/external-client/{id}` | Cria ou atualiza o `externalClientId` de uma aplicação | 204 |
| PATCH | `/opus-open-finance/application/v1/application/{applicationId}/webhook-url` | Cria ou atualiza a URL de webhook de uma aplicação | 204 |

## Regras

- **Criação de `externalClientId`:** a aplicação **não** pode ter um `externalClientId` cadastrado anteriormente. Se já existir, a chamada PATCH faz a atualização.
- **Atualização de `externalClientId`:** só é possível se o `externalClientId` já existir para a aplicação.
- **Webhook URL:** essa URL **não deve** ser a mesma cadastrada no Diretório de Participantes como Redirect URI. É uma URL interna do cliente que receberá o repasse de notificações.

## Referências

- Especificação OpenAPI: [`oas-interno.yml`](../anexos/yml/opusTPP-apisInternas.yml) (ver também [API associada][API-Interno])
- [Webhooks](webhooks.html) — onde a URL configurada aqui é usada

[API-Interno]: ../../../../../swagger-ui/index.html?api=otpp-apis_internas
