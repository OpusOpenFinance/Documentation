---
layout: default
title: Configuração
parent: "OpusTPP"
nav_order: 2
lang: "pt-br"
---

## Objetivo

Descrever, de forma simples, o que uma instituição precisa fazer para configurar o OpusTPP.

Este documento não contém comandos ou termos técnicos desnecessários. Para acessar a descrição mais técnica acesse [arquivo config técnica].

## Etapas de Configuração

### 1. Obter certificados regulatórios

São exigidos pelo Open Finance Brasil e Open Insurance Brasil:

- Certificado de transporte (BRCAC)
- Certificado de assinatura (BRSEAL)
- Chave de criptografia de id_token (quando aplicável)

Esses certificados são gerados no Diretório de Participantes.

### 2. Registrar a instituição e o aplicativo no Diretório Central

São dois cadastros:

- Organização (identificada pelo CNPJ)
- Aplicação, que gera um Software Statement ID e um client_id

Esses IDs são essenciais para o funcionamento do produto.

### 3. Definir URLs de redirecionamento

São utilizadas pelas instituições transmissoras para redirecionar usuários após consentimentos e autorizações.

Exemplos comuns:

- /consents/redirect-uri
- /payments/redirect-uri

Essas URL devem ser cadastradas no software-statement.

### 4. Disponibilizar o ambiente de execução

A instituição deve fornecer:

- Infraestrutura Kubernetes
- Banco PostgreSQL

Um domínio (FQDN) para expor o produto

### 5. Fornecer informações ao time técnico

Os técnicos irão configurar o OpusTPP, mas precisam receber:

- Certificados e respectivas chaves privadas
- Redirect URIs
- Software Statement ID
- FQDN público
- Dados do banco de dados

### 6. Decidir integrações opcionais

O OpusTPP suporta:

- OpenTelemetry
- MQD
- Cache via Dapr
- Logs regulatórios
- Webhook cache

Cabe ao negócio definir o que será habilitado.

## Conclusão

A configuração em alto nível se resume a:

Ter certificados
Ter registro no Diretório Central
Escolher URLs e domínio
Prover essas informações ao time técnico

Todo o restante pertence a descrição mais técnica, em [arquivo config técnica].
