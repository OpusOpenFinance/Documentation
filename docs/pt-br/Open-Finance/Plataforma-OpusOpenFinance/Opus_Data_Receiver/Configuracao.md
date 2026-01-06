---
layout: default
title: Configuração
parent: "Opus Data Receiver"
nav_order: 5
lang: "pt-br"
---

### Busca Periódica Automática

O Opus Data Receiver permite que cada cliente defina quais dados deseja manter atualizados e em quais intervalos essas atualizações devem ocorrer. Esse processo é chamado de busca periódica automática.

Nele, o cliente configura, para cada subproduto do Open Finance, o intervalo em horas que deve disparar uma nova tentativa de atualização. Essa configuração é cadastrada no ODR durante o Setup do cliente, e o produto garante que cada recurso só será atualizado novamente após o intervalo mínimo definido. Isso evita sobrecarga nas instituições transmissoras e ajuda a cumprir limites regulatórios (desde que o intervalo de atualização não ultrapasse os valores pré-definidos).

A seguir, estão os subprodutos suportados, acompanhados de seus nomes naturais e dos intervalos de atualização pré-configurados, que refletem a quantidade máxima de atualização respeitando os limites operacionais impostos pela regulação:

#### Dados de conta:

| Nome natural | Entidade Open Finance                                         | Intervalo de atualização (em horas) |
| ------------ |---------------------------------------------------------------|-------------------------------------|
| Contas | Account                                                             | 90                                  |
| Detalhes da Conta | AccountDetails                                           | 90                                  |
| Saldos da Conta | AccountBalance                                             | 2                                   |
| Transações | AccountTransactions                                             | 90                                  |
| Transações Recentes | AccountTransactionsCurrent                             | 3                                   |
| Limites de Cheque Especial | AccountOverdraftLimits                          | 2                                   |

#### Cartão de crédito:

| Nome natural | Entidade Open Finance                                         | Intervalo de atualização (em horas) |
| ------------ |---------------------------------------------------------------|-------------------------------------|
| Lista de cartões de crédito | CreditcardAccount                              | 90                                  |
| Detalhes do Cartão | CreditcardAccountDetails                                | 6                                   |
| Faturas | CreditcardBills                                                    | 24                                  |
| Transações da Fatura | CreditcardBillsTransactions                           | 24                                  |
| Limites do Cartão | CreditcardLimits                                         | 4                                   |
| Transações | CreditcardTransactions                                          | 180                                 |
| Transações Recentes | CreditcardTransactionsCurrent                          | 3                                   |

#### Dados pessoais:

| Nome natural | Entidade Open Finance                                         | Intervalo de atualização (em horas) |
| ------------ |---------------------------------------------------------------|-------------------------------------|
| Pessoa física -  Identificação | CustomerPersonalIdentifications             | 90                                  |
| Pessoa física -  Qualificação | CustomerPersonalQualifications               | 90                                  |
| Pessoa física -  Relacionamento | CustomerPersonalFinancialRelations         | 90                                  |
| Pessoa jurídica - Identificação | CustomerBusinessIdentifications            | 90                                  |
| Pessoa jurídica - Qualificação | CustomerBusinessQualifications              | 90                                  |
| Pessoa jurídica - Relacionamento | CustomerBusinessFinancialRelations        | 90                                  |

#### Empréstimos:

| Nome natural | Entidade Open Finance                                         | Intervalo de atualização (em horas) |
| ------------ |---------------------------------------------------------------|-------------------------------------|
| Empréstimos  | CreditLoansContracts                                          | 24                                  |
| Detalhes do Empréstimo | CreditLoansContractDetails                          | 24                                  |
| Parcelas do Empréstimo | CreditLoansContractScheduledInstalments             | 24                                  |
| Garantias do Empréstimo | CreditLoansContractWarranties                      | 90                                  |
| Pagamentos do Empréstimo | CreditLoansContractPayments                       | 6                                   |

#### Financiamentos:

| Nome natural | Entidade Open Finance                                         | Intervalo de atualização (em horas) |
| ------------ |---------------------------------------------------------------|-------------------------------------|
| Financiamentos | CreditFinancingContracts                                    | 24                                  |
| Detalhes do Financiamento | CreditFinancingContractDetails                   | 90                                  |
| Garantias do Financiamento | CreditFinancingContractWarranties               | 90                                  |
| Parcelas do Financiamento | CreditFinancingContractScheduledInstalments      | 24                                  |
| Pagamentos do Financiamento | CreditFinancingContractPayments                | 24                                  |

#### Cheque especial:

| Nome natural | Entidade Open Finance                                                         | Intervalo de atualização (em horas) |
| ------------ |-------------------------------------------------------------------------------|-------------------------------------|
| Cheque especial | CreditUnarrangedAccountsOverdraftContracts                                 | 24                                  |
| Detalhes do Cheque Especial | CreditUnarrangedAccountsOverdraftContractDetails               | 90                                  |
| Garantias do Cheque Especial | CreditUnarrangedAccountsOverdraftContractWarranties           | 90                                  |
| Parcelas (quando aplicável)  | CreditUnarrangedAccountsOverdraftContractScheduledInstalments | 24                                  |
| Pagamentos de cheque especial | CreditUnarrangedAccountsOverdraftContractPayments            | 24                                  |
| Contratos de Antecipação de Recebíveis | CreditInvoiceFinancingContracts                     | 24                                  |
| Detalhes da Antecipação | CreditInvoiceFinancingContractDetails                              | 90                                  |
| Garantias da Antecipação | CreditInvoiceFinancingContractWarranties                          | 90                                  |
| Parcelas da Antecipação | CreditInvoiceFinancingContractScheduledInstalments                 | 24                                  |
| Pagamentos de Antecipação | CreditInvoiceFinancingContractPayments                           | 24                                  |

#### Investimentos:

| Nome natural | Entidade Open Finance                                         | Intervalo de atualização (em horas) |
| ------------ |---------------------------------------------------------------|-------------------------------------|
| Renda Fixa Bancária | InvestmentsBankFixedIncome                             | 24                                  |
| Detalhes da Renda Fixa Bancária | InvestmentsBankFixedIncomeDetails          | 90                                  |
| Saldos de Renda Fixa Bancária | InvestmentsBankFixedIncomeBalances           | 6                                   |
| Transações de Renda Fixa Bancária | InvestmentsBankFixedIncomeTransactions   | 90                                  |
| Transações Recentes | InvestmentsBankFixedIncomeTransactionsCurrent          | 6                                   |
| Renda Fixa Crédito | InvestmentsCreditFixedIncome                            | 24                                  |
| Detalhes de Renda Fixa Crédito | InvestmentsCreditFixedIncomeDetails         | 90                                  |
| Saldos de Renda Fixa Crédito | InvestmentsCreditFixedIncomeBalances          | 6                                   |
| Transações de Renda Fixa Crédito | InvestmentsCreditFixedIncomeTransactions  | 90                                  |
| Transações Recentes | InvestmentsCreditFixedIncomeTransactionsCurrent        | 6                                   |
| Renda Variável | InvestmentsVariableIncome                                   | 24                                  |
| Detalhes de Renda Variável | InvestmentsVariableIncomeDetails                | 90                                  |
| Saldos de Renda Variável | InvestmentsVariableIncomeBalances                 | 24                                  |
| Transações de Renda Variável | InvestmentsVariableIncomeTransactions         | 90                                  |
| Transações Recentes | InvestmentsVariableIncomeTransactionsCurrent           | 24                                  |
| Notas de Corretagem | InvestmentsVariableIncomesBrokerNotes                  | 24                                  |
| Títulos do Tesouro | InvestmentsTreasureTitles                               | 24                                  |
| Detalhes de Títulos do Tesouro | InvestmentsTreasureTitlesDetails            | 90                                  |
| Saldos de Títulos do Tesouro | InvestmentsTreasureTitlesBalances             | 6                                   |
| Transações de Títulos do Tesouro | InvestmentsTreasureTitlesTransactions     | 90                                  |
| Transações Recentes | InvestmentsTreasureTitlesTransactionsCurrent           | 6                                   |
| Fundos de Investimento | InvestmentsFunds                                    | 24                                  |
| Detalhes de Fundos de Investimento | InvestmentsFundsDetails                 | 90                                  |
| Saldos de Fundos de Investimento | InvestmentsFundsBalances                  | 6                                   |
| Transações de Fundos de Investimento | InvestmentsFundsTransactions          | 90                                  |
| Transações Recentes | InvestmentsFundsTransactionsCurrent                    | 6                                   |

#### Câmbio:

| Nome natural | Entidade Open Finance                                         | Intervalo de atualização (em horas) |
| ------------ |---------------------------------------------------------------|-------------------------------------|
| Câmbio | Exchanges                                                           | 24                                  |
| Detalhes de Câmbio | ExchangesDetails                                        | 90                                  |
| Eventos de Câmbio | ExchangesEvents                                          | 24                                  |

Considerando os valores das tabelas e tomando o recurso de Câmbio como exemplo: Seu intervalo de atualização é de 24 horas. Após a execução de uma chamada à entidade Exchanges, o ODR somente tentará nova atualização após 24 horas.

### Limites Operacionais

Cada entidade do Open Finance possui limites regulatórios de quantidade de chamadas permitidas em um período específico. Esses limites são regulados com base tupla **instituição transmissora x produto x cliente final**. 

Por exemplo, o recurso **Contas** (Account) só pode ser consultado até 8 vezes por mês para um mesmo cliente, entre uma mesma receptora e transmissora. Assim, um indivíduo com contas nos bancos A, B e C pode consultar:

- 8 vezes suas contas do Banco A a partir do Banco B;
- 8 vezes suas contas do Banco A a partir do Banco C;
- 8 vezes suas contas do Banco B a partir do Banco C.
- ...

Sempre que o ODR recebe da transmissora um erro indicando que o limite operacional foi atingido, ele suspende automaticamente novas atualizações daquele recurso até o período se renovar. Nesse intervalo, o ODR continua respondendo com os dados mais recentes já armazenados em sua base, garantindo estabilidade para os sistemas que dependem dessas informações sem violar as regras regulatórias.