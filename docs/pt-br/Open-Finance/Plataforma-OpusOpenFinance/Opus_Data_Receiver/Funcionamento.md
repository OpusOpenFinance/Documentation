---
layout: default
title: Funcionamento
parent: "Opus Data Receiver"
nav_order: 5
lang: "pt-br"
---

# Visão Geral

O Opus Data Receiver funciona por meio de um ciclo contendo três componentes principais:

1. Cadastro e criação do consentimento;
2. Coleta e atualização dos Produtos e Subprodutos;
3. Disponibilização dos dados por meio de buscas e consultas.

# Fluxo de Cadastro

Para que o ODR possa acessar os dados de um indivíduo ou empresa no Open Finance, é necessário que exista um consentimento válido. O fluxo de cadastro é justamente o processo de iniciar esse consentimento e registrar todas as informações necessárias para que o ODR possa operar.

O fluxo funciona da seguinte forma:

1. **O cliente inicia o cadastro:** O cliente informa ao ODR quem é o titular dos dados (pessoa física ou jurídica) e quais informações deseja acessar (permissões). Esse processo segue o padrão do Open Finance Brasil;
2. **O ODR cria o consentimento:** Após receber a solicitação, o ODR envia o pedido de consentimento à instituição financeira onde os dados estão armazenados;
3. **O consentimento entra em estado *Aguardando Autorização*:** Neste momento, o cadastro ainda não está ativo. O status indica apenas que o pedido foi criado com sucesso, mas ainda depende da ação do usuário final;
4. **O usuário autoriza o consentimento diretamente na instituição financeira:** O titular dos dados (pessoa física ou jurídica) acessa o ambiente do banco transmissor e autoriza o compartilhamento;
5. **O ODR detecta automaticamente a autorização:** Assim que o consentimento é aprovado, o ODR atualiza o status para *Autorizado*;
6. **Primeira atualização automática dos dados:** Com o consentimento autorizado, o ODR realiza a primeira busca completa de dados para todos os produtos permitidos.

Cada produto passa então a seguir o calendário de atualizações definido na configuração de buscas periódicas automáticas.

## SetupID

Quando o cadastro é concluído, o ODR gera um identificador chamado SetupID, que representa todas as informações necessárias para acesso aos dados daquele consentimento.

O SetupID deve ser enviado em todas as chamadas posteriores, pois identifica:

- O cliente;
- O consentimento;
- A instituição transmissora de dados;
- O conjunto de permissões autorizadas.

# Fluxo de Obtenção de Produtos

Com o consentimento autorizado, o cliente pode consultar os produtos disponíveis (Contas, Câmbio, Investimentos, Operações de Crédito etc.).

Para isso, basta informar o SetupID, não sendo necessário repetir informações do titular nem autorizações adicionais.

Se o consentimento não incluir alguma permissão necessária, a instituição transmissora informará que o acesso não está permitido. Nesse caso, os dados não podem ser obtidos até que um novo consentimento seja criado com as permissões adequadas.

A resposta do ODR inclui:

- A lista de produtos disponíveis;
- Os identificadores de cada produto;
- Informações gerais como paginação e data de atualização.

Esses identificadores são importantes para as próximas etapas.

# Fluxo de Obtenção de Subprodutos

Alguns recursos do Open Finance exigem que o cliente primeiro consulte o produto correspondente para descobrir os IDs necessários.

Por exemplo:

- Para acessar o saldo de uma conta, é necessário primeiro consultar a lista de contas.
- Para consultar pagamentos de um contrato, é preciso primeiro obter os IDs dos contratos.

O processo segue esta lógica:

1. O cliente consulta o produto (como Contas);
2. O ODR retorna um conjunto de registros, cada um com um identificador próprio;
3. O cliente escolhe qual registro deseja detalhar;
4. O cliente faz a consulta específica (como Saldo da Conta), informando o ID do item selecionado e o SetupID.

Esse mecanismo garante segurança e organização, além de evitar consultas desnecessárias.

# Buscas

Sempre que o ODR precisa coletar ou retornar dados, ele realiza uma busca. As buscas servem a três propósitos:

- Atualizar a base de dados;
- Responder requisições REST do cliente;
- Cumprir a programação das buscas periódicas automáticas.

O ODR opera dois tipos de busca: **A Frio** e **A Quente**.

## Busca a Frio

Busca a Frio significa buscar somente nos dados já armazenados no ODR. Ela existe para cenários em que o cliente só deseja recuperar os dados mais recentes já salvos, sem precisar atualizar nada.

Vantagens:

- Não consome fichas regulatórias;
- Não aciona as Instituições Transmissoras de Dados;
- Não aciona limites operacionais;
- É usada quando não há necessidade de dados novos (além dos que já estão contidos na base de dados);
- É extremamente rápida e segura, uma vez que consome somente os dados locais e não está sugeita ao tempo de resposta de outras instituições.

A Busca a Frio é ideal quando:

- Os dados foram atualizados recentemente;
- A transmissora atingiu os limites operacionais;
- O recurso se tornou inválido (ex.: conta encerrada);
- O cliente quer reduzir tráfego e custos.

Apesar de simples, a busca a frio é fundamental para manter o ODR eficiente, reduzir custos operacionais e preservar limites mensais.

## Busca a Quente

A Busca a Quente consulta as Instituições Transmissoras de Dados em tempo real. Essa busca é síncrona, ou seja, o ODR consulta a Transmissora no momento da solicitação, processa os resultados e então devolve a resposta.

A busca a quente é poderosa porque garante que os dados retornados são os mais atualizados possíveis. Porém, ela possui riscos importantes.

### Riscos da Busca a Quente

Cada consulta feita a quente consome fichas, que são limitadas por recurso, transmissora, cliente final e receptora.

Excesso de buscas a quente pode resultar em:

- Esgotamento das fichas;
- Bloqueio de atualizações;
- Retorno apenas de dados a frio;
- Percepção incorreta de erro de consentimento;
- Piora na experiência do usuário final.

Por isso, é importante calibrar bem os intervalos das buscas periódicas automáticas e reservar fichas para operações críticas, deixando uma margem para chamadas a quente disparadas pelos sistemas clientes.

## Como Evitar Consumo Excessivo de Fichas

O ODR recomenda:

- Reduzir os intervalos de atualização automática quando não houver necessidade de sincronização contínua;
- Reservar fichas mensais para buscas a quente, especialmente em recursos críticos para o negócio;
- Usar buscas a frio sempre que dados atualizados recentemente já estiverem na base;
- Configurar intervalos distintos por subproduto, priorizando apenas os dados realmente sensíveis ao tempo.

Com esse equilíbrio o cliente garante atualização regular, capacidade para chamadas emergenciais e pleno cumprimento das regras operacionais do Open Finance.

## APIs de busca

As duas modalidades de busca (a quente e a frio) são realizadas através de chamadas REST ao ODR. A diferenciação entre elas ocorre exclusivamente via um header enviado pelo cliente na requisição.

O header utilizado para indicar o tipo de busca é *x-update-data*, onde:

- *True*: Dispara uma **Busca a quente**;
- *False*: Dispara uma **Busca a frio**.

Comportamento Padrão: Caso o header não seja enviado, a busca é tratada como a frio por padrão, garantindo segurança e evitando consumo acidental de fichas na transmissora.

As seguintes APIs permitem buscas para os grupos de recursos:

- [Conta Corrente][API-Conta-Corrente]
- [Conta Cartão][API-Cartao-Credito]
- [Dados Cadastrais e Transacionais][API-Dados-Cadastrais]
- Operações de crédito:
  - [Financiamentos][API-Financiamentos]
  - [Empréstimos][API-Empréstimos]
  - [Adiantamento a Depositantes][API-Adiantamento]
  - [Direitos Creditórios Descontados][API-Direitos-Creditorios]
- Investimentos:
  - [Renda Fixa Bancária][API-Renda-Fixa-Bancaria]
  - [Renda Fixa Crédito][API-Renda-Fixa-Credito]
  - [Renda Variável][API-Renda-Variavel]
  - [Títulos do Tesouro Direto][API-Tesouro-Direto]
  - [Fundos de Investimento][API-Fundos-Investimento]
  - [Câmbio][API-Cambio]

# Visão Geral do Fluxo Operacional Completo

1. O cliente cria um consentimento através do ODR;
2. O usuário final autoriza o compartilhamento na instituição transmissora;
3. O ODR identifica a autorização e coleta os primeiros dados;
4. O cliente consulta Produtos e Subprodutos usando o SetupID;
5. O ODR atualiza os dados automaticamente conforme a configuração de intervalos;
6. Buscas a frio e a quente operam conforme necessidade, respeitando limites regulatórios.


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