---
layout: default
title: Iniciação de Pagamentos e Recepção de Dados
parent: "Opus Open Finance"
nav_order: 6
has_children: true
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/index"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/index"
      lang: "es"
---

## Como navegar nesta documentação

A documentação do Módulo de Iniciação de Pagamentos está organizada em três grandes blocos. Use os links abaixo como ponto de entrada para cada tema:

### [Conceitos](conceitos.html)

Fundamentos do ecossistema Open Finance e do funcionamento do Módulo de Iniciação de Pagamentos. Recomendado para quem está começando.

- [Glossário e Conceitos Fundamentais](conceitos.html): Consentimento, vínculo de dispositivo, jornadas, perfis regulatórios

### [Funcionamento](funcionamento/)

Como escrever aplicações que fazem Iniciação de Pagamentos e Recepção de Dados

- [Visão geral dos fluxos](funcionamento/): Consentimento, pagamento, vínculo, jornada otimizada
- [Recepção de Dados — Open Finance](funcionamento/recepcaoDeDados.html)
- [Iniciação de Pagamento PIX](funcionamento/iniciacaoDePagamento.html)
- [Pagamentos Automáticos](funcionamento/pagamentoAutomatico.html)
- [Vínculo de Dispositivo (FIDO2)](funcionamento/vinculoDeDispositivo.html)
- [Redirecionamento App-to-App e Web](funcionamento/redirecionamento.html)
- [Webhooks de Pagamentos](funcionamento/webhooks.html)
- [Backoffice API](funcionamento/backoffice.html)
- [APIs Internas](funcionamento/apisInternas.html)

### [Configuração](configuracao/)

Etapas de configuração e quais certificados digitais são necessários para o funcionamento no ecossistema do Open Finance Brasil.

- [Visão de Configuração](configuracao/): Etapas em alto nível;
- [Certificados Regulatórios](configuracao/certificadosRegulatorios.html): BRCAC, BRSEAL, ID_TOKEN_ENC e conversão para JWK.

### Anexos

- [Especificações OpenAPI (OAS)](anexos/yml/): Contratos oficiais de cada API exposta pelo Módulo de Iniciação de Pagamentos

## Módulo de Iniciação de Pagamentos

O Módulo de Iniciação de Pagamentos é um middleware especializado que abstrai integralmente as complexidades regulatórias do **Open Finance Brasil**. Ele permite que instituições atuem como Iniciadoras de Pagamento (ITP) e Receptoras de Dados sem lidar diretamente com padrões de segurança, requisitos técnicos ou fluxos regulatórios.

Seu objetivo é simples: permitir que desenvolvedores integrem APIs do Open Finance Brasil com a mesma facilidade de integração de APIs REST comuns.

> Enquanto sua aplicação faz chamadas simples em formato REST (HTTP, JSON, token de acesso), nossa solução se encarrega de toda a camada regulatória e de segurança exigida pelo Open Finance, como mTLS, FAPI-BR, JWS e consentimentos. Em outras palavras: você se comunica com o Módulo de Iniciação de Pagamentos como faria com qualquer API tradicional — e ele traduz essas chamadas para o padrão regulatório do Open Finance Brasil, cuidando automaticamente de toda a parte complexa e técnica por trás das integrações.

## O problema que o Módulo de Iniciação de Pagamentos resolve

O Open Finance oferece um ecossistema rico em dados e serviços, mas apresentam desafios técnicos e regulatórios significativos:

- Implementação de padrões de segurança rigorosos, como FAPI-BR e uso de certificados específicos;
- Integração obrigatória com o Diretório de Participantes;
- Gestão de múltiplos tokens, escopos e ciclos de autenticação;
- Execução dos fluxos completos de solicitação, aprovação e consumo de consentimentos;
- Manutenção contínua de conformidade com mudanças regulatórias;
- Diferenças operacionais entre cada Instituição Transmissora/Detentora;
- Alta complexidade para atender aos requisitos de ITP e Receptor de Dados;
- Custos elevados e necessidade constante de equipe especializada.

## O que o Módulo de Iniciação de Pagamentos faz

O Módulo de Iniciação de Pagamentos funciona como um proxy cliente regulatório entre sua aplicação e o ecossistema do Open Finance Brasil. Ele:

- Garante aderência completa aos padrões técnicos e de segurança exigidos;
- Gerencia tokens, autenticações e renovações de forma transparente;
- Permite a execução de todo o fluxo de solicitação, aprovação e consumo de consentimentos;
- Expõe APIs REST simples, independentemente da Instituição Destino;
- Orquestra chamadas regulatórias de forma padronizada e confiável;
- Implementa camadas de segurança, monitoramento e validação exigidas pelo regulador;
- Simplifica drasticamente a vida dos times de desenvolvimento.

O produto é composto por módulos que podem ser adquiridos separadamente:

- **Receptor de Dados**
  - Permite solicitar e obter dados de clientes, incluindo dados cadastrais, transações, cartões e produtos de crédito.

- **Iniciador de Transação de Pagamento**
  - Suporta iniciação, execução e acompanhamento de pagamentos, incluindo toda a jornada de consentimento.

## O que o Módulo de Iniciação de Pagamentos não faz

Para evitar expectativas incorretas, é importante esclarecer o que o Módulo de Iniciação de Pagamentos não se propõe a fazer:

- Não atua como instituição regulada — a responsabilidade regulatória permanece com a Instituição Cliente;
- Não substitui sistemas internos, cores bancários, plataformas de seguradoras ou lógica de negócio;
- Não cria experiências de usuário final para consentimento;
- Não garante a certificação da instituição nos ambientes regulatórios;
- Não executa análises, interpreta ou transforma dados financeiros ou de seguros;
- Não realiza conciliação, liquidação financeira ou processamento próprio de transações.

O foco do Módulo de Iniciação de Pagamentos é garantir conformidade, segurança e padronização — não substituir as decisões ou responsabilidades da Instituição Cliente.

## A proposta central

Em essência, o Módulo de Iniciação de Pagamentos transforma APIs regulatórias complexas em integrações simples, estáveis e escaláveis.

Ele permite que sua instituição participe do Open Finance sem precisar lidar com:

- Requisitos de segurança avançados;
- Gestão de tokens e certificados;
- Chamadas heterogêneas entre instituições.

O Módulo de Iniciação de Pagamentos assume toda essa complexidade para que sua equipe possa focar no produto, na experiência do usuário e na estratégia do negócio — não na infraestrutura regulatória subjacente.