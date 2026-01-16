---
layout: default
title: Opus Data Receiver
parent: "Opus Open Finance"
nav_order: 6
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/index/"
      lang: "en"
    - path: "/Documentation/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/index/"
      lang: "es"
---

## Opus Data Receiver

O Opus Data Receiver (ODR) é uma plataforma especializada em receber, organizar e manter atualizados os dados financeiros compartilhados através do Open Finance Brasil. Ele foi criado para resolver um desafio central de quem opera com informações reguladas: como garantir acesso contínuo, confiável e dentro das regras a dados que mudam o tempo todo e dependem de múltiplas instituições financeiras?

### O problema que o ODR resolve

O ecossistema do Opus Open Finance oferece acesso a uma ampla variedade de dados, mas impõe desafios técnicos importantes:

- Limites rigorosos de chamadas por Instituição, Produto e Cliente Final;
- Dificuldade em controlar quando e como atualizar dados sem ultrapassar esses limites;
- Latência e indisponibilidade pontual das Instituições Transmissoras;
- Complexidade para saber quais recursos ainda são válidos, foram alterados ou deixaram de existir;
- Custos elevados para manter infraestrutura própria de sincronização e armazenamento;

O resultado: Sem um intermediário especializado, costuma ser instabilidade, gasto desordenado de fichas regulatórias, dados desatualizados e fricção na experiência do usuário final.

O ODR foi criado para eliminar esse problema.

### O que o ODR faz

O ODR funciona como uma camada inteligente entre seu sistema e o Open Finance. Ele:

- Mantém uma cópia organizada e atualizada dos dados autorizados via consentimento;
- Realiza atualizações periódicas configuráveis por Produto e Subproduto;
- Responde rapidamente com dados armazenados, mesmo quando a Transmissora está indisponível;
- Permite consultas sob demanda (*a quente*) quando uma atualização imediata é necessária;
- Lida com toda a complexidade de gestão de consentimentos, validação de recursos e fluxo operacional;
- Expõe uma API unificada e estável, independentemente da Instituição Transmissora;
- Com isso, seus sistemas passam a consumir dados do Open Finance de maneira simples, previsível e confiável.

### O que o ODR não faz

Para evitar expectativas incorretas, é importante entender o que o ODR não se propõe a fazer:

- **Não** cria experiências de usuário final para coleta de consentimentos;
- **Não** substitui a Instituição Transmissora — e sim depende das informações fornecidas por ela;
- **Não** ignora limites operacionais regulatórios e não força atualizações além do permitido;
- **Não** altera, interpreta ou transforma dados financeiros — e sim os replica e os mantém atualizados;
- **Não** executa recomendações financeiras, análises de risco ou decisões de crédito;
- **Não** dispara buscas automáticas infinitas; segue estritamente o calendário configurado pelo cliente.

O foco do ODR é governança, atualização e disponibilidade de dados — não a aplicação de lógica de negócio sobre eles.

### A proposta central

Em essência, o ODR transforma o Open Finance em uma fonte estável, contínua e previsível de dados.

Ele permite que seu sistema dependa dessas informações sem precisar lidar com:

- Limites regulatórios;
- Sincronização;
- Tratamentos de erro das Transmissoras;
- Quedas e instabilidades;
- Lógica de atualização;
- Organização de Produtos e Subprodutos.

O ODR cuida de tudo isso para que você cuide da estratégia do seu produto e faça as melhores análises sobre os dados obtidos.
