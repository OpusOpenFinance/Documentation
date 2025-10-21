---
layout: default
title: "API de Financiamento"
parent: "Operações de Crédito"
nav_order: 2
lang: "pt-br"
alternate_lang: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/apis/Financiamento/"
---

## Financiamento

API da *camada de integração* que retorna informações de operações de crédito do tipo *financiamento*, mantidas nas instituições transmissoras por seus clientes, incluindo dados como denominação, modalidade, número do contrato, tarifas, prazo, prestações, pagamentos (ao menos para os últimos 12 meses), amortizações, garantias, encargos e taxas de juros remuneratórios.

Essa API não faz separação entre pessoa natural e pessoa jurídica.

Antes de qualquer *endpoint* da *camada de integração* ser acionado, a plataforma já verificou a autenticidade da origem da chamada e a validade, data de expiração, permissões e escopo do consentimento enviado pelo receptor, garantindo que se trata de uma requisição autorizada.

Existem *endpoints* para:

- Obter o conjunto de informações de contratos de financiamento mantidos pelo cliente na instituição transmissora;
- Obter os dados de um contrato de financiamento;
- Obter os dados do cronograma de parcelas de um contrato de financiamento;
- Obter a lista de garantias vinculadas a um contrato de financiamento;
- Obter os dados de pagamento de um contrato de financiamento.

### *Open API Specification* da API

A documentação da API de Financiamento a ser construída na *camada de integração* pode ser encontrada [**aqui**][API-Financiamento].

Para fazer o download do arquivo YAML/OAS que contém a especificação da API clique [**aqui**](financings-2-3-0.yml){:download="financings-2-3-0.yml"}.

{: .destaque}
Alguns navegadores de internet, como *Chrome*, ocasionalmente sinalizam como *não segura* a operação de *download* de arquivos YAML, exigindo o desbloqueio manual pelo usuário. Esses arquivos, entretanto, têm conteúdo do tipo texto e não apresentam risco por si.

[API-Financiamento]: ../../../../swagger-ui/index.html?api=Financiamento
