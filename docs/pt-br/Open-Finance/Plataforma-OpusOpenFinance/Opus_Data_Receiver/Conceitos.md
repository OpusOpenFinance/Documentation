---
layout: default
title: Conceitos
parent: "Opus Data Receiver"
nav_order: 5
lang: "pt-br"
---

### Produtos e Subprodutos
No Opus Data Receiver (ODR), os recursos obtidos do Open Finance podem ser entendidos como uma estrutura em forma de árvore. Nessa estrutura, alguns dados dependem de identificadores específicos, como accountId, contractId ou investmentsId, para que suas informações possam ser acessadas. As raízes dessas árvores são chamadas de Produtos, enquanto seus desdobramentos diretos, que representam detalhes ou conjuntos de informações relacionadas, são chamados de Subprodutos.

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

Cada Produto representa uma categoria principal de dados do Open Finance Brasil, e cada Subproduto contém informações complementares relacionadas exclusivamente à raiz da qual faz parte. Assim, a atualização de Subprodutos depende diretamente da existência e validade do Produto a que estão vinculados.

Periodicamente, o ODR valida todos os Produtos de cada cadastro junto às instituições transmissoras dos dados. Esse processo verifica se cada recurso ainda está ativo e autorizado. Caso um Produto deixe de ser válido, o ODR mantém seus dados previamente armazenados, mas interrompe qualquer atualização automática ou consulta sob demanda relacionada a ele ou aos seus Subprodutos.

Por exemplo, considere um indivíduo com uma conta de cartão de crédito 1234 no Banco B. Se essa conta for cancelada e o ODR identificar essa condição, somente os Subprodutos vinculados ao Produto “Cartão de Crédito – conta 1234” deixam de ser atualizados. Isso significa que detalhes da conta, limites, transações e extratos referentes à conta 1234 do Banco B não serão mais coletados automaticamente nem retornados nas consultas realizadas via API REST.

