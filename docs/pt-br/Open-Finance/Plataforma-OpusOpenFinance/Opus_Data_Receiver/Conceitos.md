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

Para acessar Subprodutos, normalmente é necessário informar identificadores como, por exemplo:

- accountId;
- creditCardAccountId;
- contractId;
- investmentsId.

Eles são sempre obtidos a partir da consulta ao Produto, garantindo segurança, rastreabilidade e coerência entre os dados.