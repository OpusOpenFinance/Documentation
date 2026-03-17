---
layout: default
title: Configuração Técnica
parent: "Configuração"
nav_order: 2
lang: "pt-br"
---

## Objetivo

Descrever os parâmetros técnicos necessários para configurar o OpusTPP.

Instruções de instalação via Helm e Kubernetes podem ser obtidos em [arquivo instalcao tecnica].

## Etapas de Configuração

### 1. Certificados no Kubernetes

O OpusTPP utiliza:

- enc.cert (BRCAC);
- enc.key (chave privada do BRCAC);
- sig.key (BRSEAL);
- id_token_enc.key (opcional).

Esses arquivos devem ser carregados em secrets do Kubernetes.

### 2. Estrutura necessária no banco

O banco precisa conter:

#### Organização

Identificador do participante (CNPJ → id_organisation).

#### Software Statement

- softwareStatementId
- client_id

#### Application

- id_application
- id_organisation
- id_software_statement
- kid
- kid_id_token_enc (opcional)
- fqdn (opcional)
- redirect_identifier (opcional)

### 3. Estrutura de Configurações (Helm values.yaml)

#### services

- URLs do Diretório Central.

#### privateKeys

Relaciona:

- Secrets do Kubernetes;
- Certificados BRCAC e BRSEAL;
- Chaves privadas;
- softwareStatementId;
- securityProfilePriority.

#### db

Configurações PostgreSQL.

#### config

Inclui:

- logLevel;
- redirectUri;
- issuerCacheTime;
- asset links Android/iOS;
- companyProfileInfoUri;
- pepper.

#### dapr

Configura:

- Dapr App Port
- Scheduler
- Pub/Sub
- State store (opcional, recomendado)

#### cache (webhook)

Habilitação e TTL.

#### logs

Configurações de logs regulatórios.

#### mqd

Integração com o Motor de Qualidade de Dados.

#### additionalVars

Parâmetros opcionais, como:

- OUTGOING_HTTP_LOGGER_ENABLED
- SEQUELIZE_POOL_CONNECTION_MIN
- SEQUELIZE_POOL_CONNECTION_MAX
- SEQUELIZE_LOG_ENABLED
