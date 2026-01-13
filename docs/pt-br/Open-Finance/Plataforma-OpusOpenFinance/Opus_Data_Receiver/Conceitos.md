---
layout: default
title: Conceitos
parent: "Opus Data Receiver"
nav_order: 5
lang: "pt-br"
---

# Estrutura de Produtos e Subprodutos

O Opus Data Receiver (ODR) organiza os dados do Open Finance Brasil em uma estrutura semelhante a uma árvore. Nessa árvore:

- Os elementos principais, que representam categorias amplas de informação, são chamados de **Produtos**;
- Os elementos derivados, que detalham ou complementam um Produto, são chamados de **Subprodutos**.

Um Produto é sempre a raiz da árvore e um Subproduto só existe se o Produto correspondente também existir.

Atualmente, o ODR trabalha com 18 Produtos principais:

| Nome natural | Produto Open Finance                                         |
| ------------ |--------------------------------------------------------------|
| Conta Corrente | Account |
| Lista de cartões de crédito | CreditcardAccount |
| Câmbio | Exchanges |
| Pessoa física - Identificação | CustomerPersonalIdentifications |
| Pessoa física - Qualificação | CustomerPersonalQualifications |
| Pessoa física - Relacionamento | CustomerPersonalFinancialRelations |
| Pessoa jurídica - Identificação | CustomerBusinessIdentifications |
| Pessoa jurídica - Qualificação | CustomerBusinessQualifications |
| Pessoa jurídica - Relacionamento | CustomerBusinessFinancialRelations |
| Empréstimos | CreditLoansContracts |
| Adiantamento a depositantes | CreditUnarrangedAccountsOverdraftContracts |
| Financiamentos | CreditFinancingContracts |
| Antecipação de recebíveis | CreditInvoiceFinancingContracts |
| Renda Fixa Bancária | InvestmentsBankFixedIncome |
| Fundos de Investimento | InvestmentsFunds |
| Renda Fixa Crédito | InvestmentsCreditFixedIncome |
| Títulos do Tesouro Direto | InvestmentsTreasureTitles |
| Operações de Renda Variável | InvestmentsVariableIncome |

Cada Produto possui seus Subprodutos específicos. Por exemplo, o Produto Conta Corrente possui Subprodutos como Saldos, Transações, Limites e Detalhes.

# Relação entre Produtos e Subprodutos

A atualização de um Subproduto depende sempre da existência e validade de seu Produto.

O ODR valida periodicamente a situação de cada Produto diretamente na instituição transmissora dos dados. Essa validação determina se o recurso ainda existe e se o consentimento autoriza sua coleta. Caso um Produto deixe de ser válido, o ODR:

- Mantém os dados já coletados;
- Interrompe novas atualizações do Produto e de todos os seus Subprodutos;
- Retorna somente as informações já armazenadas, quando solicitado pelo cliente.

Exemplo:

Se um cartão de crédito de número 1234 do Banco B for cancelado e a transmissora de dados informar ao ODR que o recurso não existe mais, somente os Subprodutos ligados ao Produto “Cartão de Crédito – conta 1234” deixam de ser atualizados. Detalhes, limites, transações e extratos deixam de ser coletados e passam a existir apenas na forma dos dados previamente armazenados (consulta a frio).

# Identificadores no Open Finance

Para acessar Subprodutos, é necessário informar identificadores como, por exemplo:

- accountId;
- creditCardAccountId;
- contractId;
- investmentsId.

Eles são sempre obtidos a partir da consulta ao Produto, garantindo segurança, rastreabilidade e coerência entre os dados.

# Core e Scheduler

O ODR é estruturado em dois componentes que trabalham de forma integrada para garantir a coleta, atualização e disponibilização dos dados do Open Finance: o Core e o Scheduler. Cada um possui responsabilidades distintas e complementares, assegurando desempenho, consistência e conformidade em todas as etapas do processo.

## Core

Componente central do ODR responsável por executar o processamento de dados e operar como o motor do sistema. É o Core que realiza as buscas nas transmissoras, orquestra o fluxo de coleta, aplica regras internas de consistência e disponibiliza os dados para consulta via API. Ele também gerencia o acesso à base interna do ODR, garantindo desempenho, integridade e rastreabilidade das informações compartilhadas.

## Scheduler

Módulo que administra as políticas de atualização e coordena quando cada Produto e Subproduto será coletado. O Scheduler interpreta permissões, intervalos e estados dos recursos, atuando na janela configurada para execução das rotinas de atualização. Ele assegura que as coletas ocorram de forma eficiente, respeitando regras de consentimento e configurações específicas de cada Setup.