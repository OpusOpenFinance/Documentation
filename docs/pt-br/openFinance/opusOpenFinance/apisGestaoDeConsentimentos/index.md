---
layout: default
title: "APIs de Gestão de Consentimentos"
parent: "Opus Open Finance"
nav_order: 2
lang: "pt-br"
alternate_lang: 
    - path: "/Documentation/en/openFinance/opusOpenFinance/apisGestaoDeConsentimentos/index/"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/apisGestaoDeConsentimentos/index/"
      lang: "es"
---
 
## APIs de Gestão de Consentimento

Os consentimentos (tanto de compartilhamento de dados quanto de pagamentos) exercem um papel central em todo o modelo de funcionamento do *Open Finance Brasil*,  garantindo que todas as transações e operações dentro do ecossistema sejam realizadas com a devida permissão explícita do cliente final.

A **Plataforma Opus Open Finance** realiza a gestão completa dos consentimentos e os armazena de forma segura em sua base de dados interna, inclusive garantindo que eventuais dados pessoais sensíveis associados a esses consentimentos sejam sempre encriptados.

Os consentimentos só podem ser criados (e revogados) mediante ação direta do cliente final, seja quando ele autoriza a realização de um pagamento ou quando fornece um consentimento de compartilhamento de dados com um participante devidamente autorizado do *Open Finance Brasil*.

Ao mesmo tempo, a criação ou revogação de um consentimento é resultado da interação segura entre participantes do ecossistema e regulada por protocolos de segurança. Toda e qualquer requisição recebida pela plataforma só pode ser realizada se houver um consentimento ativo e que possua as permissões adequadas para a realização da operação.

Dessa forma, toda a criação e gestão do tempo de vida e revogação de consentimentos é de responsabilidade exclusiva da plataforma.

A API de Gestão de Consentimentos permite às aplicações da instituição financeira extrair informações sobre os consentimentos (ativos ou não) referentes aos pagamentos realizados e aos compartilhamentos de dados cedidos por seus clientes, além de realizar operações de retaguarda como revogação, prorrogação, edição e associação de metadados e chaves de busca a esses consentimentos.

### *Open API Specification*

As definições da API em formato Open API Specification podem ser encontradas [**aqui**][API-backoffice].

## Consentimentos

Endpoints referentes à consulta, revogação, prorrogação, edição e associação de metadados/search-keys aos consentimentos (de pagamento, de compartilhamento de dados e de vínculo/*enrollment*), definidos na especificação [`oasOOFDados.yml`][API-backoffice].

### Listagem de consentimentos

        GET /open-banking/oob-consents/v1/consents

Retorna a listagem paginada de consentimentos (de pagamento, de compartilhamento de dados ou de vínculo/*enrollment*) cadastrados na plataforma. O dono do consentimento pode ser identificado de uma das seguintes formas:

- `cpf` / `cnpj`: Identifica a pessoa física ou jurídica responsável pela criação do consentimento. Deve conter apenas os dígitos. **Exemplo**: *99999999999*.
- `consentOwner`: Conjunto de informações definidas pela Instituição para identificar o dono do consentimento como, por exemplo, agência, conta, CPF, CNPJ etc. É representado por um dicionário *chave/valor* em formato *JSON URL Encoded*. **Exemplo**: Para um identificador formado por agência e conta:

```json
[{"key": "conta", "value": "12345"}, {"key": "agencia", "value": "12345"}]
```

Além disso, as seguintes informações podem ser utilizadas para filtrar o resultado:

- `createdOnBegin` / `createdOnEnd`: Indicam, respectivamente, a data de criação mínima e máxima (ambas inclusas) para a consulta de consentimentos. Devem ser informadas com data e hora no formato especificado na [RFC-3339](https://datatracker.ietf.org/doc/html/rfc3339). **Exemplo**: 2022-12-19T16:39:57Z.
- `consentTermPeriod`: Prazo total do consentimento em meses. Se indeterminado, deve ser utilizado o valor *-1*. Não pode ser utilizado em conjunto com os filtros `createdOnBegin` e/ou `createdOnEnd`. 
- `type` / `typeList`: Limita a consulta a consentimentos de um tipo específico (`DATA_SHARING`, `PAYMENT` ou `ENROLLMENT`) ou a uma lista de tipos separados por vírgula. Os dois filtros não podem ser utilizados em conjunto.
- `status` / `statusList`: Limita a consulta a consentimentos em um status específico ou em uma lista de status separados por vírgula, dentre os seguintes: `AUTHORISED`, `AWAITING_AUTHORISATION`, `REJECTED`, `REVOKED`, `EXPIRED`, `CONSUMED`, `TIMEOUT_AUTHORISATION`, `TIMEOUT_PAYMENT`, `AWAITING_RISK_SIGNALS`, `AWAITING_ACCOUNT_HOLDER_VALIDATION`, `AWAITING_ENROLLMENT` e `PARTIALLY_ACCEPTED`. Os dois filtros não podem ser utilizados em conjunto.
- `orderType`: Define a ordenação da lista de consentimentos retornada. Suporta os valores *ASC* (ordem crescente de data de criação), *DESC* (ordem decrescente de data de criação) e *OPF* (ordenação segundo o padrão Open Finance: ativos, pendentes, vencidos e encerrados).
- `searchKey` / `searchKeys`: Filtra os consentimentos por uma *search key* específica ou por uma lista de *search keys* separadas por vírgula previamente associadas a eles.
- `orgName`: Filtra os consentimentos pelo nome da organização/participante do Open Finance associada, sendo necessário informar no mínimo 3 caracteres.
- `page` / `page-size`: Parâmetros de paginação do resultado.
- `modalityType`(somente para pagamento) / `modalityTypeList` **Observações**: Limita a consulta a consentimentos de pagamento de uma modalidade específica (*IMMEDIATE*, *SCHEDULED* ou *SWEEPING*) ou a uma lista de modalidades separadas por vírgula (podendo incluir também *VRP* e *AUTOMATIC*, conforme exemplo da especificação). Os dois filtros não podem ser utilizados em conjunto.
- `paymentType`(somente para pagamento): Limita a consulta a consentimentos de pagamento de um tipo específico. Suporta os tipos: *PIX*, *TED* ou *TEF*.

### Detalhamento do consentimento

        GET /open-banking/oob-consents/v1/consents/{consentId}

Responsável por recuperar todas as informações de um consentimento, incluindo os recursos e um histórico das mudanças de status realizadas. A consulta é feita através do identificador interno em formato UUID.

### Revogação de consentimento de compartilhamento de dados

        PATCH /open-banking/oob-consents/consents/v1/consents/{consentId}

Responsável pela revogação do consentimento de compartilhamento de dados relacionado ao *consentId* informado.

### Listagem de consentimentos ativos de compartilhamento de dados

        GET /open-banking/oob-consents/consents/v2/active

Responsável pela listagem de consentimentos autorizados. Possui os seguintes parâmetros opcionais:

- `startDate`: Caso fornecido, seleciona todos os consentimentos ativos que tenham sido criados após essa data.
- `endDate`: Caso informado, seleciona todos os consentimentos cuja expiração seja anterior à data fornecida. Consentimentos indeterminados não serão retornados quando esse parâmetro for informado.
- `page`: Número da página desejada.
- `page-size`: Tamanho da página.

### Listagem de pagamentos relacionados a um consentimento

        GET /open-banking/oob-consents/consents/v1/consents/{consentId}/payments

Exibe a lista paginada (`page` / `page-size`) de todos os pagamentos relacionados ao consentimento identificado pelo *consentId* informado, ordenados por data de pagamento em ordem decrescente.

### Revogação de consentimento de pagamento

        PATCH /open-banking/oob-consents/payments/v1/consents/{consentId}

Responsável pela revogação de consentimentos de pagamento automático identificado pelo *consentId* informado.

### Revogação de consentimento de pagamento recorrente (automático)

        PATCH /open-banking/oob-consents/automatic-payments/v1/recurring-consents/{recurringConsentId}

Responsável pela revogação do consentimento de pagamento automático (recorrente) identificado pelo *recurringConsentId* informado. Requer o cabeçalho `X-Brand-ID`.

### Listagem de Payment Ids gerados por ITP

        GET /open-banking/oob-consents/v1/tpps/payment-legacy-ids

Lista os payment ids gerados por ITPs dentro de um intervalo de tempo definido pelos parâmetros:

- `startDate`: Indica a data de criação mínima (inclusa) do payment id. Deve ser informada apenas com data. **Exemplo**: 2022-12-19.
- `endDate`: Indica a data de criação máxima (inclusa) do payment id. Deve ser informada apenas com data. **Exemplo**: 2022-12-25.

### Notificação de mudança de status de pagamento

        POST /open-banking/oob-consents/v1/payment-status-notification

Responsável por notificar ao OOF a alteração de status de um pagamento.

### Detalhamento de prorrogação do consentimento

        GET /open-banking/oob-consents/v1/consents/{consentId}/extends

Responsável por listar, de forma paginada (`page` / `page-size`), todas as prorrogações de um consentimento. A consulta é feita através do identificador interno em formato UUID.

### Autorização completa de consentimento de pagamento de múltipla alçada

        POST /open-banking/oob-consents/v1/payments/consents/{consentId}/authorisation

Responsável por autorizar completamente um consentimento de pagamento de múltipla alçada, sinalizando a aprovação dos múltiplos autorizadores deste consentimento. Requer o cabeçalho `X-Brand-ID`.

### Post de search key

        POST /open-banking/oob-consents/consents/v1/consents/{consentId}/search-key/{searchKey}

Responsável por adicionar uma search-key relacionada a um consentimento, permitindo que consentimentos sejam listados com base nessa search-key posteriormente.

### Delete de search key

        DELETE /open-banking/oob-consents/consents/v1/consents/{consentId}/search-key/{searchKey}

Responsável por deletar uma search-key relacionada a um consentimento.

### Post de múltiplas search keys

        POST /open-banking/oob-consents/consents/v1/consents/{consentId}/search-keys

Responsável por adicionar múltiplas search-keys relacionadas a um consentimento em uma única requisição. Requer o cabeçalho `X-Brand-ID`.

### Consulta de múltiplas search keys

        GET /open-banking/oob-consents/consents/v1/consents/{consentId}/search-keys

Responsável por verificar a existência de múltiplas search-keys em um consentimento, informadas através do parâmetro `searchKeys`. Requer o cabeçalho `X-Brand-ID`.

### Delete de múltiplas search keys

        DELETE /open-banking/oob-consents/consents/v1/consents/{consentId}/search-keys

Responsável por deletar múltiplas search-keys relacionadas a um consentimento em uma única requisição, informadas através do parâmetro `searchKeys`. Requer o cabeçalho `X-Brand-ID`.

### Put consent metadata

        PUT /open-banking/oob-consents/consents/v1/consents/{consentId}/meta-data

Responsável por adicionar um json de metadata vinculado a um consentimento, substituindo qualquer valor que esteja anteriormente nesse campo de metadata. Pode ser usado para adição de informações extras ao consentimento, por exemplo para adicionar informações pertinentes às telas da aplicação.

### Get consent metadata

        GET /open-banking/oob-consents/consents/v1/consents/{consentId}/meta-data

Responsável por recuperar o json de informações de metadata previamente enviado.

### Patch consent metadata

        PATCH /open-banking/oob-consents/consents/v1/consents/{consentId}/meta-data

Responsável por atualizar o json de metadata vinculado a um consentimento, adicionando informação ao metadata já existente.

### Delete consent metadata

        DELETE /open-banking/oob-consents/consents/v1/consents/{consentId}/meta-data

Responsável por apagar as informações de metadata relacionada a um consentimento.

### Revogação de vínculo

        PATCH /open-banking/oob-consents/enrollments/v1/enrollments/{enrollmentId}

Responsável por revogar um vínculo (*enrollment*), retornando os detalhes do mesmo e o histórico de mudanças de status realizadas. A revogação é feita através do identificador interno do vínculo em formato UUID.

### Edição de vínculo

        PATCH /open-banking/oob-consents/enrollments/v1/enrollments/{enrollmentId}/edit

Responsável por editar informações de um vínculo (*enrollment*) já existente, como data de expiração, limite diário e limite por transação. Requer o cabeçalho `X-Brand-ID`.

### Notificação de alteração de recursos

        POST /open-banking/oob-consents/v1/resources-notification

Responsável por notificar ao OOF a alteração de recursos não-selecionáveis (como empréstimo, financiamento, cheque especial, entre outros) por CPF, CNPJ ou search key.

### Ativar/Desativar envio de webhook

        PATCH /open-banking/oob-consents/v1/webhook/toggle/{consentId}

Endpoint usado para ativar ou desativar o envio de webhooks opcionais para a retaguarda, atrelado ao consentimento. Requer o cabeçalho `X-Brand-ID`.

### Get status do envio de webhook

        GET /open-banking/oob-consents/v1/webhook/status/{consentId}

Endpoint usado para buscar o status do envio de webhooks opcionais para a retaguarda, atrelado ao consentimento. Requer o cabeçalho `X-Brand-ID`.

## Pagamentos

Endpoint referente à operação de cancelamento de pagamento, definido na especificação [`oasOOFDados.yml`][API-backoffice].

### Revogação de pagamento

        PATCH /open-banking/oob-payments/v2/pix/payments/{paymentId}

Esse endpoint deve ser usado para cancelar, a pedido do cliente pagador, as transações que estejam em uma das seguintes situações: agendada com sucesso (`SCHD`), retida para análise (`PDNG`) ou aguardando autorização de múltiplas alçadas (`PATC`).

- Caso a requisição seja bem-sucedida, a transação vai para a situação `CANC`.
- Caso o status do pagamento seja diferente de `SCHD`/`PDNG`/`PATC`, ou alguma outra regra de negócio impeça o cancelamento, a requisição retorna HTTP Status 422 com o código `PAGAMENTO_NAO_PERMITE_CANCELAMENTO`.
- Caso receba um 422, a iniciadora deve fazer uma requisição GET no pagamento para verificar a situação atual dele, bem como detalhes associados.
O cancelamento de pagamento deve ser enviado até 23:59 (horário de Brasília) do dia anterior à data de efetivação do pagamento.

[API-backoffice]: ../../../../swagger-ui/index.html?api=oas-back-dados
