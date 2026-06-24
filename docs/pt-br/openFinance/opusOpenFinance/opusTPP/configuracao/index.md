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

### 1. Obter certificados regulatórios - Opus + Instituição Cliente

São exigidos pelo Open Finance Brasil:

- Certificado de transporte (**BRCAC**) — para autenticação mTLS;
- Certificado de assinatura (**BRSEAL**) — para assinar mensagens entre a TPP e a Detentora.

### 2. Registrar a instituição e o aplicativo no Diretório Central - Responsabilidade Opus

São dois cadastros:

- **Organização** (identificada pelo CNPJ) — representa a TPP;
- **Aplicação**, que gera um Software Statement ID e um client_id — representa cada marca/aplicativo cliente.

Esses IDs são essenciais para o funcionamento do produto.

### 3. Definir URLs de redirecionamento - Responsabilidade da Instituição Cliente

São utilizadas pelas instituições para redirecionar usuários após consentimentos e autorizações.

Exemplos comuns:

- `/opus-open-finance/consents/redirect-uri`
- `/opus-open-finance/payments/redirect-uri`
- `/opus-open-insurance/consents/redirect-uri`

Essas URLs devem ser cadastradas no Software Statement de cada aplicação. Quando a instituição tem mais de um app, cada URL precisa carregar um `redirect_identifier` único — ver [Redirecionamento](../funcionamento/redirecionamento.html).

### 4. Disponibilizar o ambiente de execução - Responsabilidade Opus

A Opus realizará a configuração de um ambiente de execução - COMPLEMENTAR. <!--VALIDAR-->

### 5. Fornecer informações ao time técnico - Responsabilidade da Instituição Cliente

Os técnicos irão configurar o OpusTPP, mas precisam receber:

- Certificados e respectivas chaves privadas (BRCAC, BRSEAL, ID_TOKEN_ENC quando aplicável);
- Redirect URIs cadastradas no Diretório;
- Software Statement ID e `client_id`;
- FQDN público escolhido;
- Dados de acesso ao banco de dados (host, porta, credenciais).

---

## Conclusão

A configuração em alto nível se resume a:

1. Ter certificados regulatórios;
2. Ter registro no Diretório Central (OF);
3. Escolher URLs e domínio;
4. Prover esses dados ao time técnico.

> **Nota:** Todo o restante pertence à descrição mais técnica e ao procedimento operacional.
