---
layout: default
title: OpusTPP
parent: "Opus Open Finance"
nav_order: 5
lang: "pt-br"
---

# OpusTPP

O OpusTPP é um middleware especializado que abstrai integralmente as complexidades regulatórias do **Open Finance Brasil** e do **Open Insurance Brasil**. Ele permite que instituições atuem como Iniciadoras de Pagamento (ITP) e Receptoras de Dados sem lidar diretamente com padrões de segurança, requisitos técnicos ou fluxos regulatórios.

Seu objetivo é simples: permitir que desenvolvedores integrem APIs reguladas como se fossem APIs REST tradicionais, enquanto o OpusTPP cuida de tudo que é complexo e regulatório.

# O problema que o OpusTPP resolve

O Open Finance e o Open Insurance oferecem um ecossistema rico em dados e serviços, mas apresentam desafios técnicos e regulatórios significativos:

- Implementação de padrões de segurança rigorosos, como FAPI-BR, DCR e uso de certificados específicos;
- Integração obrigatória com o Diretório de Participantes;
- Gestão de múltiplos tokens, escopos e ciclos de autenticação;
- Execução dos fluxos completos de solicitação, aprovação e consumo de consentimentos;
- Manutenção contínua de conformidade com mudanças regulatórias;
- Diferenças operacionais entre cada Instituição Transmissora/Detentora;
- Alta complexidade para atender aos requisitos de ITP e Receptor de Dados;
- Custos elevados e necessidade constante de equipe especializada.

# O que o OpusTPP faz

O OpusTPP funciona como um proxy cliente regulatório entre sua aplicação e os ecossistemas do Open Finance Brasil e Open Insurance Brasil. Ele:

- Garante aderência completa aos padrões técnicos e de segurança exigidos (FAPI-BR, DCR, certificados);
- Gerencia tokens, autenticações e renovações de forma transparente;
- Executa todo o fluxo de solicitação, aprovação e consumo de consentimentos;
- Expõe APIs REST simples, independentemente da Instituição Destino;
- Orquestra chamadas regulatórias de forma padronizada e confiável;
- Isola o cliente de alterações e atualizações regulatórias contínuas;
- Implementa camadas de segurança, monitoramento e validação exigidas pelo regulador;
- Simplifica drasticamente a vida dos times de desenvolvimento.

O produto é composto por módulos que podem ser adquiridos separadamente:

## Open Finance Brasil

- **Receptor de Dados Cadastrais e Transacionais:**
  - Permite solicitar e obter dados de clientes, incluindo dados cadastrais, transações, cartões e produtos de crédito.
  - Inclui o módulo opcional Opus Data Receiver, que armazena e atualiza automaticamente os dados financeiros.

- **Iniciador de Transação de Pagamento (ITP):**
  - Suporta iniciação, execução e acompanhamento de pagamentos, incluindo toda a jornada de consentimento.

## Open Insurance Brasil:**

- **Receptor de Dados Cadastrais e Apólices:**
  - Permite acesso a dados cadastrais e informações de seguros, previdência complementar aberta e capitalização.

Com isso, integrações regulatórias passam a ser simples, previsíveis e estáveis.

# O que o OpusTPP não faz

Para evitar expectativas incorretas, é importante esclarecer o que o OpusTPP não se propõe a fazer:

- Não atua como instituição regulada — a responsabilidade regulatória permanece com o cliente;
- Não substitui sistemas internos, cores bancários, plataformas de seguradoras ou lógica de negócio;
- Não cria experiências de usuário final para consentimento;
- Não garante a certificação da instituição nos ambientes regulatórios;
- Não executa análises, interpreta ou transforma dados financeiros ou de seguros;
- Não realiza conciliação, liquidação financeira ou processamento próprio de transações.

O foco do OpusTPP é garantir conformidade, segurança e padronização — não substituir as decisões ou responsabilidades da instituição usuária.

# A proposta central

Em essência, o OpusTPP transforma APIs regulatórias complexas em integrações simples, estáveis e escaláveis.

Ele permite que sua instituição participe do Open Finance e do Open Insurance sem precisar lidar com:

- Requisitos de segurança avançados;
- Gestão de tokens e certificados;
- Chamadas heterogêneas entre instituições;
- Fluxos completos de consentimento;
- Conformidade regulatória contínua;
- Atualizações de padrões técnicos.

O OpusTPP assume toda essa complexidade para que sua equipe possa focar no produto, na experiência do usuário e na estratégia do negócio — não na infraestrutura regulatória subjacente.