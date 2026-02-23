---
layout: default
title: "API de Cartão de Crédito"
parent: "Compartilhamento de Dados"
nav_order: 2
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/cartaoDeCredito/"
      lang: "en"
    - path: "/Documentation/es/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/cartaoDeCredito/"
      lang: "es"
---

## API de Cartão de Crédito

API da *camada de integração* que retorna informações de contas de pagamento pós-paga mantidas nas instituições transmissoras por seus clientes, incluindo dados como denominação, produto, bandeira, limites de crédito, informações sobre transações de pagamento efetuadas e faturas.

Essa API não faz separação entre pessoa natural e pessoa jurídica.

Antes de qualquer *endpoint* ser acionado, a plataforma já verificou a autenticidade da origem da chamada e a validade, data de expiração, permissões e escopo do consentimento enviado pelo receptor, garantindo que se trata de uma requisição autorizada.

Existem *endpoints* para:

- Obter a lista de contas pós-pagas mantidas pelo cliente na instituição transmissora;
- Obter dados de identificação de um cartão;
- Obter lista de faturas de um cartão;
- Obter a lista de transações de um cartão;
- Obter os limites de um cartão;
- Obter a lista de transações recentes (últimos 7 dias) de  um cartão.

### *Open API Specification* da API

A documentação da API de cartão de crédito a ser construída na *camada de integração* pode ser encontrada [**aqui**][API-Cartao-de-credito].

Para fazer o download do arquivo YAML/OAS que contém a especificação da API clique [**aqui**](./anexos/yml/en-creditCards-2-3-1.yml){:download="en-creditCards-2-3-1.yml"}.

{: .destaque}
Alguns navegadores de internet, como *Chrome*, ocasionalmente sinalizam como *não segura* a operação de *download* de arquivos YAML, exigindo o desbloqueio manual pelo usuário. Esses arquivos, entretanto, têm conteúdo do tipo texto e não apresentam risco por si.

[API-Cartao-de-credito]: ../../../../../swagger-ui/index.html?api=en-cartao-de-credito
