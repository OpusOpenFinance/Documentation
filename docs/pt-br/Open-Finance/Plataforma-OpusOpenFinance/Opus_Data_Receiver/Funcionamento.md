---
layout: default
title: Funcionamento
parent: "Opus Data Receiver"
nav_order: 5
lang: "pt-br"
---

### Buscas

Buscas são o mecanismo central do funcionamento do ODR. Sempre que o sistema precisa obter, atualizar ou retornar dados de um recurso do Open Finance, ele dispara um processo de busca. Cada busca segue um fluxo padronizado, que envolve validação de consentimento, checagem de limites regulatórios, comunicação com a instituição transmissora e registro dos resultados.

Existem três propósitos principais para uma busca:

1. Atualizar informações na base de dados do ODR, para que estejam alinhadas ao estado atual das instituições financeiras.
2. Atender uma chamada vinda de um cliente via API REST, retornando dados atualizados ou salvos.
3. Manter o ciclo de sincronização definido pelo cliente por meio das buscas periódicas automáticas.

Como o Open Finance possui limites rígidos de acesso, buscas precisam ser cuidadosamente controladas para evitar consumo excessivo das fichas de consulta. Por isso, o ODR divide as buscas em duas modalidades: busca a frio e busca a quente.

#### Busca a frio

A busca a frio é uma consulta realizada exclusivamente nos dados já presentes na base do ODR.

Nenhuma chamada é feita à transmissora. Isso significa que:

- Não consome fichas regulatórias.
- Não aciona limites operacionais.
- Não gera tráfego ou carga para as instituições transmissoras.
- É extremamente rápida e segura.

A busca a frio existe para cenários em que o cliente só deseja recuperar os dados mais recentes já salvos, sem precisar atualizar nada. Isso é útil quando:

- O sistema cliente está apenas exibindo dados previamente carregados.
- A instituição transmissora atingiu o limite de buscas.
- O recurso está marcado como inválido (por exemplo, conta encerrada).
- A busca periódica está configurada para atualizar com baixa frequência.
- O cliente quer evitar chamadas desnecessárias.

Apesar de simples, a busca a frio é fundamental para manter o ODR eficiente, reduzir custos operacionais e preservar limites mensais.

#### Busca a quente - API REST

A busca a quente ocorre quando o cliente solicita uma atualização imediata via API REST. Essa busca é síncrona: o ODR consulta a transmissora em tempo real, processa os resultados e então devolve a resposta.

As seguintes APIs permitem buscas a quente para diferentes grupos de recursos:

- [Conta Corrente][API-Conta-Corrente]
- [Conta Cartão][API-Cartao-Credito]
- [Dados Cadastrais e Transacionais][API-Dados-Cadastrais]
- Operações de crédito
  - [Financiamentos][API-Financiamentos]
  - [Empréstimos][API-Empréstimos]
  - [Adiantamento a Depositantes][API-Adiantamento]
  - [Direitos Creditórios Descontados][API-Direitos-Creditorios]
- Investimentos
  - [Renda Fixa Bancária][API-Renda-Fixa-Bancaria]
  - [Renda Fixa Crédito][API-Renda-Fixa-Credito]
  - [Renda Variável][API-Renda-Variavel]
  - [Títulos do Tesouro Direto][API-Tesouro-Direto]
  - [Fundos de Investimento][API-Fundos-Investimento]
  - [Câmbio][API-Cambio]

A busca a quente é poderosa porque garante que os dados retornados são os mais atualizados possíveis. Porém, ela possui riscos importantes.

### Riscos 

#### O risco de excesso de buscas a quente

Cada entidade do Open Finance tem um número limitado de consultas que podem ser feitas dentro de um período (diário, semanal ou mensal). Essas consultas são as fichas operacionais de acesso.

Quando uma API REST dispara uma busca a quente:

- Ela consome uma ficha do recurso e do subproduto correspondente.
- Esse consumo é registrado por transmissora, por indivíduo ou empresa, e por receptora.

Se muitas buscas a quente forem feitas em sequência, é possível esgotar rapidamente todas as fichas disponíveis. Isso causa:

- Bloqueio temporário de novas atualizações.
- Retorno exclusivo de dados a frio até o período virar.
- Risco de o sistema cliente acreditar que há um problema no consentimento, quando na verdade o limite foi atingido.
- Piora da experiência para o usuário final, que deixa de receber dados atualizados.

Para evitar isso, é essencial calibrar corretamente os intervalos de busca periódica automática definidos na configuração do produto. Uma frequência muito alta pode consumir fichas rapidamente, deixando pouca margem para chamadas a quente disparadas pelos sistemas clientes.

#### Como evitar o consumo excessivo de fichas

O ODR recomenda:

- Reduzir os intervalos de atualização automática quando não houver necessidade de sincronização contínua.
- Reservar fichas mensais para buscas a quente, especialmente em recursos críticos para o negócio.
- Usar buscas a frio sempre que dados atualizados recentemente já estiverem na base.
- Configurar intervalos distintos por subproduto, priorizando apenas os dados realmente sensíveis ao tempo.

Com esse equilíbrio, o cliente garante atualização regular, capacidade para chamadas emergenciais e pleno cumprimento das regras operacionais do Open Finance.

### Fluxo de cadastro

### Fluxo de obtenção de produto

### Fluxo de obtenção de subprodutos





[API-Conta-Corrente]:/Documentation/swagger-ui/index.html?api=ODR-accounts
[API-Cartao-Credito]:/Documentation/swagger-ui/index.html?api=ODR-creditcard
[API-Dados-Cadastrais]:/Documentation/swagger-ui/index.html?api=ODR-customer
[API-Financiamentos]:/Documentation/swagger-ui/index.html?api=ODR-credit_financing
[API-Empréstimos]:/Documentation/swagger-ui/index.html?api=ODR-credit_loans
[API-Adiantamento]:/Documentation/swagger-ui/index.html?api=ODR-credit_invoice_financing
[API-Direitos-Creditorios]:/Documentation/swagger-ui/index.html?api=ODR-credit_unarranged_accounts
[API-Renda-Fixa-Bancaria]:/Documentation/swagger-ui/index.html?api=ODR-investments_bank_fixed_income
[API-Renda-Fixa-Credito]:/Documentation/swagger-ui/index.html?api=ODR-investments_credit_fixed_income
[API-Renda-Variavel]:/Documentation/swagger-ui/index.html?api=ODR-investments_variable_incomes
[API-Tesouro-Direto]:/Documentation/swagger-ui/index.html?api=ODR-investments_treasure_titles
[API-Fundos-Investimento]:/Documentation/swagger-ui/index.html?api=ODR-investments_funds
[API-Cambio]:/Documentation/swagger-ui/index.html?api=ODR-exchanges