---
layout: default
title: Configuração
parent: "OpusTPP"
nav_order: 2
has_children: true
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/opusTPP/configuracao/index"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/opusTPP/configuracao/index"
      lang: "es"
---

## Etapas de Configuração

> **Importante:** Caso surja alguma dúvida acerca de algum termo utilizado, consulte a página de [**Conceitos**](../conceitos.html).

### 1. Registrar a instituição e o aplicativo no Diretório de Participantes - Responsabilidade Opus

São dois cadastros:

- **Organização** (identificada pelo CNPJ) — representa a ITP;
- **Aplicação**, que gera um Software Statement ID e um client_id — representa cada marca/aplicativo cliente.

Esses IDs são essenciais para o funcionamento do produto.

> **Importante:** Para que a Opus possa realizar esse registro de forma independente, é necessário que a instituição cliente nos forneça todos os acessos necessários ao Diretório de Participantes.

### 2. Definir URLs de redirecionamento - Responsabilidade da Instituição Cliente

São utilizadas pelas instituições para redirecionar usuários após consentimentos e autorizações.

Exemplos comuns:

- `/opus-open-finance/consents/redirect-uri`
- `/opus-open-finance/payments/redirect-uri`
- `/opus-open-insurance/consents/redirect-uri`

Essas URLs devem ser cadastradas no Software Statement de cada aplicação. Quando a instituição tem mais de um app, cada URL precisa carregar um `redirect_identifier` único — ver [Redirecionamento](../funcionamento/redirecionamento.html).

### 3. Disponibilizar os ambientes de Homologação e Produção - Responsabilidade Opus

A Opus realizará a configuração de um ambiente de Homologação (HML) e Produção (PRD).

### 4. Obter certificados regulatórios - Opus + Instituição Cliente

São exigidos pelo Open Finance Brasil:

- BRCAC;
- BRSEAL;
- MTLS;
- Servidor EV.

Para mais detalhes, acesse [link para Certificados Regulatórios]

### 5. Fornecer informações ao time técnico - Responsabilidade da Instituição Cliente

Os técnicos irão configurar o Módulo de Iniciação de Pagamentos, mas precisam receber:

- Certificados e respectivas chaves privadas (BRCAC, BRSEAL, ID_TOKEN_ENC quando aplicável);
- Redirect URIs cadastradas no Diretório;
- Software Statement ID e `client_id`;
- FQDN público escolhido;
- Caso a instalção seja SaaS, não é necessário fornecer qualquer acesso. Caso o cliente queira manter o produto em sua infraestrutura, precisamos de dados de acesso com as permissões necessárias para a instalação.

---

## Conclusão

A configuração em alto nível se resume a:

1. Realizar registro no Diretório de Participantes;
2. Escolher URLs e domínio;
3. Obter certificados regulatórios;
4. Prover dados ao time técnico (caso não seja SaaS).

> **Nota:** Todo o restante pertence à descrição mais técnica e ao procedimento operacional.
