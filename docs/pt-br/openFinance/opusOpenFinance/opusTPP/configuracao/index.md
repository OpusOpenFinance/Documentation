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

### 1. Obter certificados regulatórios - Opus + Instituição Cliente

São exigidos pelo Open Finance Brasil:

- Certificado de transporte (**BRCAC**) — para autenticação mTLS;
- Certificado de assinatura (**BRSEAL**) — para assinar mensagens entre a TPP e a Detentora;

Esses certificados são gerados no Diretório de Participantes. Detalhes técnicos sobre conversão para JWK em [Certificados Regulatórios](certificadosRegulatorios.html).

### 2. Registrar a instituição e o aplicativo no Diretório Central - Opus

São dois cadastros:

- **Organização** (identificada pelo CNPJ) — representa a TPP;
- **Aplicação**, que gera um Software Statement ID e um client_id — representa cada marca/aplicativo cliente.

Esses IDs são essenciais para o funcionamento do produto. Open Finance e Open Insurance possuem Diretórios independentes — instituições que atuam nos dois ecossistemas precisam de cadastros separados.

### 3. Definir URLs de redirecionamento - Instituição Cliente

São utilizadas pelas instituições para redirecionar usuários após consentimentos e autorizações.

Exemplos comuns:

- `/opus-open-finance/consents/redirect-uri`
- `/opus-open-finance/payments/redirect-uri`
- `/opus-open-insurance/consents/redirect-uri`

Essas URLs devem ser cadastradas no Software Statement de cada aplicação. Quando a instituição tem mais de um app, cada URL precisa carregar um `redirect_identifier` único — ver [Redirecionamento](../funcionamento/redirecionamento.html).

### 4. Disponibilizar o ambiente de execução - Opus

A Opus realizará a configuração de um ambiente de execução - COMPLEMENTAR.

### 5. Fornecer informações ao time técnico

Os técnicos irão configurar o OpusTPP, mas precisam receber:

- Certificados e respectivas chaves privadas (BRCAC, BRSEAL, ID_TOKEN_ENC quando aplicável);
- Redirect URIs cadastradas no Diretório;
- Software Statement ID e `client_id`;
- FQDN público escolhido;
- Dados de acesso ao banco de dados (host, porta, credenciais).

### 6. Decidir integrações opcionais

O OpusTPP é modular. Estas integrações podem ser ativadas conforme a necessidade do negócio:

#### OpenTelemetry

Habilita exportação de **traces distribuídos** para uma plataforma de observabilidade (Tempo, Jaeger, Grafana Cloud, etc.). Recomendado para ambientes produtivos onde análise de latência e troubleshooting de chamadas é crítica.

#### Cache via Dapr

Reduz drasticamente o tempo de resposta para informações que mudam pouco (ex.: lista de participantes do Diretório). **O cache de Brands é recomendado** porque o Diretório de Participantes tem tempo de resposta alto. Cache de Webhook é opcional.

#### Logs regulatórios

Direciona logs de requisição/resposta das chamadas regulatórias para um coletor externo (Fluent Bit, ELK, CloudWatch). Recomendado para fins de auditoria e conformidade.

#### Webhook cache

Cache opcional sobre os dados da funcionalidade de webhook. Por padrão, vem **desabilitado** e a maioria das instituições não o ativa.

#### PCM Service

Módulo **obrigatório** para envio dos reportes de chamadas para a Plataforma de Coleta de Métricas (PCM) do Open Finance Brasil. Tem banco próprio, consome eventos do OOFC-Core via Dapr, e envia reportes periódicos. Detalhes em [PCM Service](pcmService.html).

## Conclusão

A configuração em alto nível se resume a:

1. Ter certificados regulatórios
2. Ter registro no Diretório Central (OF)
3. Escolher URLs e domínio
4. Prover esses dados ao time técnico
5. Decidir quais integrações opcionais ativar

Todo o restante pertence à descrição mais técnica, em [Configuração Técnica](configuracaoTecnica.html) e ao procedimento operacional em [Instalação Técnica](instalacaoTecnica.html).
