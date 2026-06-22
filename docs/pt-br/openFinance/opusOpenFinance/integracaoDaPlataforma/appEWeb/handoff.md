---
layout: default
title: "Handoff"
parent: "App e Web"
nav_order: 3
lang: "pt-br"
alternate_lang: 
    - path: "/Documentation/en/openFinance/opusOpenFinance/integracaoDaPlataforma/appEWeb/handoff/"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/integracaoDaPlataforma/appEWeb/handoff/"
      lang: "es"
---

## *Hybrid-flow* com *Handoff*

Instituições que possuem autenticação de usuários apenas em aplicativos mobile precisam suportar o fluxo *Hybrid-flow* com *Handoff* para permitir consentimentos iniciados em dispositivos que não suportam a execução dos aplicativos, tipicamente um desktop ou um laptop.

O Authorization Server (AS) do Opus Open Finance suporta o fluxo de *handoff* e possui uma biblioteca *Javascript* que permite à instituição customizar completamente a página web que será exibida para o cliente.

A biblioteca de *handoff* foi feita para a instituição obter todas as informações relativas ao fluxo de *handoff* de um consentimento, desde os dados para exibição do QR até os eventos relativos ao fluxo.

O Authorization Server do Opus Opus Finance hospeda a biblioteca na URL `https://as.instituicao.com.br/auth/handoff/v1/oob-handoff.js` e deve ser referenciada diretamente ao invés de ser copiada e referenciada em outro servidor web.

## Fluxo do Opus Opus Finance com *Handoff*

O chamador (instituição receptor de dados ou iniciador de transação de pagamento) desconhece se a instalação de Open Finance que ele está chamando utiliza ou não *handoff* e isso de fato não é de sua responsabilidade. O fluxo OIDC iniciado por ele acaba redirecionando o navegador do cliente para o Authorization Server do Opus Open Finance e esse, por usa vez, redireciona o navegador para a página de exibição do *handoff* feita pela instituição.

O Authorization Server possui uma configuração que define o *template* da URL de *handoff* feita pela instituição. Desta forma o identificador da intenção de consentimento que será tratado pela página de *handoff* pode ser mesclado na URL da forma que a
instituição desejar.

A mescla permite a instituição receber o identificador através da `query-string`, `fragment` ou `url`, como exibido na tabela abaixo:

| Formato      | URL Exemplo                                                         |
| :----------: | :-----------------------------------------------------------------: |
| Query string | `https://ev.instituicao.com.br/handoff.html?codigo=<IDENTIFICADOR>` |
| Fragment     | `https://ev.instituicao.com.br/handoff.html#<IDENTIFICADOR>`        |
| URL          | `https://ev.instituicao.com.br/<IDENTIFICADOR>/handoff.html`        |

A página de *handoff* deverá obter o identificador e utilizá-lo durante a inicialização da biblioteca como veremos mais abaixo. O exemplo fornecido na documentação trafega o identificador através do `fragment` da URL e deve ser o formato utilizado se possível. Ele também remove o identificador do histórico de navegação, evitando qualquer confusão por parte do cliente em tentar utilizar uma URL antiga de consentimento.

A página também deve apontar para a instalação do Authorization Server (endereço público) ao iniciar a biblioteca através da configuração **oobAsPublicUrl** conforme instrução abaixo.

## Como usar a biblioteca

Após importar a biblioteca na página HTML a variável `oobHandoff` conterá o ponto de entrada da biblioteca, é necessário iniciá-la através do método `init` passando o identificador recebido durante o redirect do Authorization Server e os tratadores dos eventos que serão disparados.

```Javascript
oobHandoff.init({
    oobStartCode: '<IDENTIFICADOR>',
    oobAsPublicUrl: '<OOB_AS_PUBLIC_URL>',
    onHandoffReady: function(handoffReady) {
        // Texto para QR e código alternativo para digitação prontos
    },
    onHandoffQRRead: function() {
        // Usuário realizou a leitura do QR ou digitou o código alternativo
    },
    onHandoffTimedOut: function(handoffError) {
        // Tempo para conclusão do consentimento expirado
    },
    onHandoffCompleted: function(handoffCompleted) {
        // Consentimento concluído com sucesso
    },
    onHandoffError: function(handoffError) {
        // Ocorreu um erro durante o consentimento
    }
});
```

Os parâmetros dos eventos contêm informações necessárias para cada momento. Os objetos estão detalhados abaixo.

### handoffReady

Schema:

```json
{
    "qrCode": "<string>",
    "timeoutSeconds": <int>,
    "typeCode": "<string>",
    "tppName": "<string>",
    "tppLogoUrl": "<string>"
}
```

| Propriedade      | Descrição                                                                                                                            |
| :--------------: | :----------------------------------------------------------------------------------------------------------------------------------: |
| `qrCode`         | Valor para gerar QR-code a ser exibido para usuário                                                                                  |
| `timeoutSeconds` | Tempo total disponível para conclusão do consentimento                                                                               |
| `typeCode`       | Código alternativo para o cliente digitar em caso de falha de leitura do QR-Code. Presente apenas se habilitado na instalação        |
| `tppName`        | Nome da instituição iniciadora de pagamento                                                                                          |
| `tppLogoUrl`     | Logomarca da instituição iniciadora de pagamento                                                                                     |

### handoffCompleted

Schema baseado no `completedCommand` da interface APP2AS:

```json
{
    "tpp": {
        "name": "<string>",
        "logoUrl": "<string>"
    },
    "completedCommand": {
        "redirect": {
            "redirectTo": "<string>"
        }
    }
}
```

| Propriedade                            | Descrição                                                             |
| :------------------------------------: | :-------------------------------------------------------------------: |
| `tpp.name`                             | Nome da instituição chamadora (TPP) para exibição na tela de retorno  |
| `tpp.logoUrl`                          | URL com o logotipo do TPP para exibição na tela de retorno            |
| `completedCommand.redirect.redirectTo` | URL para redirecionamento após exibição da tela de retorno ao usuário |

### handoffError

Schema baseado no `errorCommand` da interface APP2AS:

```json
{
    "tpp": {
        "name": "<string>",
        "logoUrl": "<string>"
    },
    "errorCommand": {
        "type": "<string>",
        "message": "<string>",
        "redirect": {
            "redirectTo": "<string>"
        }
    }
}
```

| Categoria de Dados | Agrupamento | Permissões |
| :----------------: | :---------: | :--------: |
| Cadastro | Dados cadastrais PF | CUSTOMERS_PERSONAL_IDENTIFICATIONS_READ, RESOURCES_READ |
| Cadastro | Informações complementares PF | CUSTOMERS_PERSONAL_ADITTIONALINFO_READ, RESOURCES_READ |
| Cadastro | Dados cadastrais PJ | CUSTOMERS_BUSINESS_IDENTIFICATIONS_READ, RESOURCES_READ |
| Cadastro | Informações complementares PJ | CUSTOMERS_BUSINESS_ADITTIONALINFO_READ, RESOURCES_READ |
| Contas | Saldos | ACCOUNTS_READ, ACCOUNTS_BALANCES_READ, RESOURCES_READ |
| Contas | Limites | ACCOUNTS_READ, ACCOUNTS_OVERDRAFT_LIMITS_READ, RESOURCES_READ |
| Contas | Extratos | ACCOUNTS_READ, ACCOUNTS_TRANSACTIONS_READ, RESOURCES_READ |
| Cartão de Crédito | Limites | CREDIT_CARDS_ACCOUNTS_READ, CREDIT_CARDS_ACCOUNTS_LIMITS_READ, RESOURCES_READ |
| Cartão de Crédito | Transações | CREDIT_CARDS_ACCOUNTS_READ, CREDIT_CARDS_ACCOUNTS_TRANSACTIONS_READ, RESOURCES_READ |
| Cartão de Crédito | Faturas | CREDIT_CARDS_ACCOUNTS_READ, CREDIT_CARDS_ACCOUNTS_BILLS_READ, CREDIT_CARDS_ACCOUNTS_BILLS_TRANSACTIONS_READ, RESOURCES_READ |
| Operações de Crédito | Dados do Contrato | LOANS_READ, LOANS_WARRANTIES_READ, LOANS_SCHEDULED_INSTALMENTS_READ, LOANS_PAYMENTS_READ, FINANCINGS_READ, FINANCINGS_WARRANTIES_READ, FINANCINGS_SCHEDULED_INSTALMENTS_READ, FINANCINGS_PAYMENTS_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_WARRANTIES_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_SCHEDULED_INSTALMENTS_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_PAYMENTS_READ, INVOICE_FINANCINGS_READ, INVOICE_FINANCINGS_WARRANTIES_READ, INVOICE_FINANCINGS_SCHEDULED_INSTALMENTS_READ, INVOICE_FINANCINGS_PAYMENTS_READ, RESOURCES_READ |
| Operações de Crédito | Antecipação de recebíveis | INVOICE_FINANCINGS_READ, INVOICE_FINANCINGS_WARRANTIES_READ, INVOICE_FINANCINGS_SCHEDULED_INSTALMENTS_READ, INVOICE_FINANCINGS_PAYMENTS_READ, RESOURCES_READ |
| Operações de Crédito | Financiamentos | FINANCINGS_READ, FINANCINGS_WARRANTIES_READ, FINANCINGS_SCHEDULED_INSTALMENTS_READ, FINANCINGS_PAYMENTS_READ, RESOURCES_READ |
| Operações de Crédito | Empréstimos | LOANS_READ, LOANS_WARRANTIES_READ, LOANS_SCHEDULED_INSTALMENTS_READ, LOANS_PAYMENTS_READ, RESOURCES_READ |
| Operações de Crédito | Adiantamento a depositantes | UNARRANGED_ACCOUNTS_OVERDRAFT_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_WARRANTIES_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_SCHEDULED_INSTALMENTS_READ, UNARRANGED_ACCOUNTS_OVERDRAFT_PAYMENTS_READ, RESOURCES_READ |
| Operações de Crédito | Investimentos | BANK_FIXED_INCOMES_READ, CREDIT_FIXED_INCOMES_READ, FUNDS_READ, VARIABLE_INCOMES_READ, TREASURE_TITLES_READ, RESOURCES_READ |
| Operações de Crédito | Câmbio | EXCHANGES_READ, RESOURCES_READ |

As informações `tpp.name`, `tpp.logoUrl`, `errorCommand.message` e `errorCommand.redirect.redirectTo` podem não estar presentes no retorno.

## Cancelamento

A tela de *handoff* reage passivamente aos eventos ocorridos no fluxo.  Em qualquer momento, o usuário pode abortar ativamente o fluxo de *handoff*. Para isso, é necessário disponibilizar um botão de "Cancelar" na tela.

Para efetuar o cancelamento do fluxo é necessário realizar uma requisição para a api `https://as.instituicao.com.br/auth/handoff/v1/<oobStartCode>/abort`, sendo o **oobStartCode** o mesmo código usado para iniciar a biblioteca.

Após o cancelamento, a tela deve direcionar o usuário de volta à instituição chamadora e o app deve informar ao usuário (ex.: com uma mensagem de erro), interrompendo o fluxo de *handoff*.

## Exemplo

Uma aplicação funcional de exemplo está disponível. Há uma página de exemplo de *handoff* com o tratamento de todos os eventos do fluxo. Essa página de exemplo é a que a instituição deve fazer, hospedar e configurar a URL na instalação do **Plataforma Opus Open Finance**.

A aplicação de exemplo está utilizando a versão *mockada* da biblioteca que simula 3 cenários distintos através dos identificadores listados na tabela abaixo.

| Identificador            | Cenário                                        |
| :----------------------: | :--------------------------------------------: |
| L3YxL21vY2svc3VjY2Vzcw== | Consentimento efetuado com sucesso             |
| L3YxL21vY2svY3BmLWVycm9y | Erro de CPF_MISMATCH                           |
| L3YxL21vY2svdGltZW91dA== | Tempo esgotado para conclusão do consentimento |

É possível executar a aplicação de exemplo hospedando o diretório `src` em algum servidor web. Para executar localmente sugerimos utilizar o pacote [`http-server`](https://www.npmjs.com/package/http-server) do [Node.js](https://nodejs.org/en/download/):

```bash
cd /src
npx http-server -p 3030 --cors -c-1
```

É possível iniciar os cenários mockados através das seguintes URLs:

| Cenário      | URL                                                       |
| :----------: | :-------------------------------------------------------: |
| Sucesso      | <http://lvh.me:3030/sample.html#L3YxL21vY2svc3VjY2Vzcw==> |
| CPF_MISMATCH | <http://lvh.me:3030/sample.html#L3YxL21vY2svY3BmLWVycm9y> |
| Timeout      | <http://lvh.me:3030/sample.html#L3YxL21vY2svdGltZW91dA==> |

## Página de *handoff* customizável

Se a instituição preferir não implementar a própria página de *handoff*, é possível utilizar a solução fornecida pelo Opus Open Finance: uma página completa que configura as principais características estéticas e de conteúdo para se adaptar ao estilo da instituição.
