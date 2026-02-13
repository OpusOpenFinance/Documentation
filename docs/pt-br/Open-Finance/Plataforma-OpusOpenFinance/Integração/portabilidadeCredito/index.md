---
layout: default
title: "Portabilidade de Crédito"
parent: "Integração da Plataforma"
nav_order: 5
lang: "pt-br"
---

## API de Portabilidade de Crédito

API da *camada de integração* que possibilitar a realização de uma portabilidade de crédito de um cliente.

Em linhas gerais, existem *endpoints* para:

- Criar um pedido de portabilidade de crédito para um contrato específico;
- Comunicar o cancelamento de um pedido de portabilidade de crédito;
- Verificar se um contrato está elegível para solicitação de portabilidade de crédito;
- Obter os dados da conta necessários para realizar o pagamento da operação via TED.

### *Open API Specification* da API

A documentação da API de Portabilidade de Crédito a ser construída na *camada de integração* pode ser encontrada [**aqui**][API-Portabilidade].

Para fazer o download do arquivo YAML/OAS que contém a especificação da API clique [**aqui**](./anexos/yml/portability.yml){:download="portability.yml"}.

{: .destaque}
Alguns navegadores de internet, como *Chrome*, ocasionalmente sinalizam como *não segura* a operação de *download* de arquivos YAML, exigindo o desbloqueio manual pelo usuário. Esses arquivos, entretanto, têm conteúdo do tipo texto e não apresentam risco por si.

[API-Portabilidade]: ../../../../../swagger-ui/index.html?api=portability
