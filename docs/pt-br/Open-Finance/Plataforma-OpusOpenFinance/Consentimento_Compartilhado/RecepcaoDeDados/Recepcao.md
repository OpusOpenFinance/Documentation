---
layout: default
title: "Recepção de Dados"
parent: "Consentimento Compartilhado"
nav_order: 3
lang: "pt-br"
alternate_lang: 
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Consentimento-Compartilhado/Recepção/"
      lang: "en"
    - path: "/Documentation/es/Open-Finance/Plataforma-OpusOpenFinance/Consentimento-Compartilhado/Recepção/"
      lang: "es"
---

## Introdução

Nossa solução de consentimento compartilhado foi desenvolvida para facilitar a adesão ao Open Finance Brasil, atendendo às exigências regulatórias de forma eficiente. Nesta página, você encontrará um guia que explica, de maneira simples, os benefícios de usar nossa solução e o que é necessário ser desenvolvido por sua equipe.

---

## Itens resolvidos pela nossa solução

Aqui estão os principais elementos que nossa solução oferece:

- **Exibição e confirmação do consentimento:** A confirmação faz parte da solução, minimizando o esforço técnico;

- **Área de gestão completa:** Nossa solução inclui um painel centralizado para a gestão dos consentimentos, pagamentos e vínculos;

- **Listagem e detalhes dos consentimentos:** Os consentimentos recebidos são listados, com detalhes completos disponíveis;

- **Revogação de consentimentos:** Implementamos uma forma simples para que os usuários possam revogar consentimentos, pagamentos ou vínculos quando necessário;

- **Portal único Instituição Cliente:** Oferecemos uma interface unificada para gestão integrada das funcionalidades do Open Finance.

---

## Itens que você precisará desenvolver

Embora nossa solução implemente todas as exigências regulatórias, alguns elementos exigem personalização ou integração específica da sua parte:

- **Implementação da chamada de aceite de consentimento de Recepção de Dados Web e/ou app:** Você precisará ajustar seus sites/aplicativos para disparar uma intenção de consentimento e receber (em webview) as telas que nossa solução implementa.

- **Implementação da chamada para a Área de gestão de consentimentos:** Você precisará desenvolver um mecanismo que redirecione o usuário do seu aplicativo/site diretamente para a área de gestão de forma segura e já autenticada. Exemplo: Uma opção no Menu Principal chamada “Open Finance” que ao ser selecionada pelo usuário, redirecione-o para a área de gestão dos seus consentimentos.

---

## O que a nossa solução implementa

Uma vez que o usuário efetue o login através da sua aplicação, ele terá acesso a uma série de telas desenvolvidas pela Instituição Cliente, em conformidade com o que há de mais atualizado na regulação do Banco Central.

Nosso objetivo é assegurar que, ao longo de toda a jornada de Open Finance, os clientes tenham controle total sobre seus dados e as permissões de compartilhamento, gerenciando de maneira simples e eficiente suas contas vinculadas e consentimentos.

### Telas de Solicitação e Efetivação de Consentimento

**Observação:** As telas apresentadas nesta seção estão contidas no [Guia de Experiência do Usuário](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17378535/Guia+de+Experi+ncia+do+Usu+rio), Item 02 (Compartilhamento de dados) -> 2.1: Jornada Básica, composta pelas etapas:

- 1: Consentimento Instituição Receptora;
- 2: Redirecionamento Instituição Receptora para Instituição Transmissora;
- 6: Efetivação Instituição Receptora.

#### Tela 1: Solicitação do Consentimento  

O usuário pode selecionar a instituição de origem e revisar as informações do consentimento de Recepção de dados de dados, disparando o redirecionamento para a Instituição Transmissora. A tela mostra os dados autorizados e as finalidades.

![Tela de Solicitação do Consentimento](/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Consentimento_Compartilhado/RecepcaoDeDados/images/Tela1-SolicitConsent.png)

#### Tela 2: Redirecionamento para a Instituição Transmissora

Informa ao usuário seu redirecionamento da Instituição Receptora (onde o processo foi iniciado) para a Instituição Transmissora. Lá, ele deve autenticar-se e aceitar o consentimento.

![Tela de Redirecionamento para a Instituição Transmissora](/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Consentimento_Compartilhado/RecepcaoDeDados/images/Tela2-Redirect.png)

#### Tela 3: Efetivação da Solicitação

Após o consentimento ser aceito na Instituição Transmissora, o usuário é redirecionado novamente para a Instituição Receptora dos dados, exibindo as informações do consentimento efetivado.

![Tela de Efetivação da Solicitação](/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Consentimento_Compartilhado/RecepcaoDeDados/images/Tela3-EfetivSoluc.png)

---

## O que você deve implementar

### Configuração

As marcas precisam fornecer um conjunto de informações necessárias à integração com o Consentimento Compartilhado. Esses dados serão inseridos no banco de dados da aplicação e são necessários para o seu funcionamento.

Além disso, chaves de assinatura e de encriptação serão necessárias para o fluxo seguro da comunicação com a marca.

#### Setup das Marcas

Os dados necessários das marcas são:

| Campo                    | Descrição                                                       | Responsável         | Exemplo                    |
|:------------------------:|:---------------------------------------------------------------:|:-------------------:|:--------------------------:|
| brandId                  | CNPJ da marca                                                   | Instituição Cliente | *28811839000129*             |
| authorisationServerUrl   | Endereço base da instalação do OOB da marca                     | Instituição Cliente | *https://authorization-server.com.br* |
| URL de callback          | Url padrão onde a marca será chamada quando o fluxo sair da Instituição Transmissora e voltar para ela | Instituição Cliente | *https://shared-consent.instituicao-cliente.tech/marca/callback* |
| URL de fim de fluxo      | Url para qual o usuário será redirecionado em caso de sessão expirada ou erros. A marca pode redirecionar o usuário para a home ou interceptar a URL e realizar alguma tratativa de erro, como fechar o app.                    | Marca               | *https://marca.com.br/home* |
| isAppOnly                | Booleana que indica se a marca só tem aplicativo                | Marca               | false                      |
| assetLinksUrl            | Url pública com o conteúdo do assetlinks.json                   | Marca               | *https://marca.com.br/assentlinks* |
| appleAppSiteUrl          | Url pública com o conteúdo do apple-app-site-association        | Marca               | *https://marca.com.br/appleappsite* |

#### Chaves

A comunicação da marca com o Consentimento Compartilhado necessita de um jwt assinado para garantir a segurança da informação transmitida. Sendo assim faz-se necessário a existência de um par de chaves de assinatura.

#### Chave de assinatura

Esse par de chaves de assinatura fica a encargo da Instituição Cliente, que deve expor a chave pública em uma url de jwks e usar a chave privada para assinar o jwt enviado nas respostas ao Consentimento Compartilhado. Esse método foi escolhido para facilitar a troca da chave de assinatura sempre que necessário por parte das marcas. Exemplo de resposta do jwks:

``` shell
{ 
  "keys": [ 
    { 
      "kty": "RSA", 
      "kid": "UN5LN1nBeln-E9H1_OR_vwGSMczSdFXbdC75XZPNui8", 
      "alg": "RS256", 
      "e": "AQAB", 
      "n": "uQJhnLGtKlIsrvZLtJMwZF5baUxwAN_QIJTeHBSamC0yKZMlSKCKPjTFRcPWs3LEk8q3NIijexTQ0yEgt63_ieqJMWVc2jWW9ZFnQQmnVKfe4tWvjQClVKWqXdS4I2FxL8eG_uW1SdvbEYBjdOOdlvmI-aUM7-xIFurL33R2--KbgAl6llfT7maJazbQazRbE5H5x8WPha4c0ZLPCdpC2lb13iWlCq8_9pvcJtfcHqJViPhseqG7QJbR8IMQjxYfbkoPddfh5ZxRFGi04KWQ-UaJ3BcUiaGI-WcUtOAlmMXipvCEYY8vFW9IsUAn570xsau8V7r_5dcsLxJc6PBHyw" 
    } 
  ] 
}   
```

O JWT deve conter as seguintes claims:

| Claim        | Descrição                                                                         | Obrigatoriedade | Detalhes                         |
|:------------:|:---------------------------------------------------------------------------------:|:---------------:|:--------------------------------:|
| jti          | Identificador único do token                                                      | Obrigatório     |                                  |
| iat          | Data de emissão do token no formato unix epoch                                    | Obrigatório     | O emissor deve ter seu relógio sincronizado, dado que essa claim será usada para calcular a expiração do token |
| brandId      | O identificador da marca a qual a autenticação pertence                           | Obrigatório     |                                  |
| name         | Nome do cliente autenticado                                                       | Obrigatório     |                                  |
| companyName  | Razão Social do CNPJ                                                              | Obrigatório apenas para cliente PJ |               |
| cpf          | CPF do cliente autenticado                                                        | Obrigatório     |                                  |
| cnpj         | CNPJ do cliente autenticado                                                       | Obrigatório apenas para cliente PJ |               |
| accountIds   | Lista de contas a serem filtradas pelo conector                                   |                 |                                  |

Exemplo:

``` shell
{ 
  "jti": "1cd2a25f-efd4-4cb8-9caf-57cddaf6df07", 
  "brandId": "08438716000187", 
  "name": "José da Silva", 
  "cpf": "12312312387", 
  "cnpj": "32575976000189", 
  "iat": 1633526347.068, 
   
  } 
} 
```

### Fluxo de aceite de consentimento APP

O fluxo tem início quando um usuário deseja receber seus dados de outra instituição financeira, sendo necessário revisar o consentimento e redirecioná-lo para a Instituição Transmissora para que o consentimento seja aceito.

O fluxo via aplicativo para dispositivos móveis requer alguns tratamentos importantes, mais especificamente o disparo da solicitação de consentimento de Recepção através da API */received-consent/result*, a triagem das URLs de redirecionamentos internos no webview e a escuta da URL de callback do Issuer que será estimulada pela Instituição Transmissora.

#### Deeplink e Universal Link

É necessário a aplicação do Issuer fazer deeplink (Android) ou universal link (iOS) na URL de callback para o correto tratamento de redirecionamentos app-to-app regulatório do Open Finance Brasil. Através dessa URL, você receberá o estímulo de abertura do seu app a partir do retorno da Instituição Transmissora.  

Os arquivos *assetlinks.json* e *apple-app-site-association* precisam ser hospedados e ter as URL enviadas para a Instituição Cliente, que fará o serviço de proxy de tais arquivos garantindo assim independência da marca na gestão de seus aplicativos.  

#### Webview

As telas de Webview serão enviadas ao app como retorno do post na API */received-consent/result*. Ao receber esse retorno, o aplicativo deve abrir imediatamente um webview e navegar para a URL completa que foi retornada pela API.

Para garantir que a requisição vem de um aplicativo que está tratando o fluxo de consentimento corretamente, é necessário configurar o user-agent do webview com o valor “*openfinance-webview*” (sem aspas).

O componente de webview deve também permitir a execução de JavaScript e o armazenamento do DOM (*domStorageEnabled = true*).

É necessário um tratamento específico das URLs que são recebidas como retorno das chamadas ao webview, de acordo com os seguintes casos:

1. **URL possui “shared-consent” ou o FQDN da Instituição Cliente:** Abrir a URL diretamente com o Webview;

2. **URL de fim de fluxo:** Quando esta URL é retornada, o fluxo webview se encerrou e o usuário já teve um feedback do erro/fim de fluxo (o webview já cuida desse feedback). Ao receber esta URL, o App do Issuer deve redirecionar o usuário para a tela de onde o fluxo se iniciou. Por exemplo: O cliente realizou uma recepção de dados, e essa opção estava contida em um menu Open Finance, logo o usuário deve ser redirecionado novamente para esta tela;

3. **Outras URLs:** Delegar a abertura dessas URLs para o Sistema. Essas URLs representam o redirecionamento do usuário para outras Instituições Financeiras no processo de Recepção de Dados.

#### Checklist implementação APP

Confira a implementação do app com o checklist abaixo:

<div id="checklist-app">
  <p>
    <input type="checkbox" id="item1"> 
    Disponiblizar URLs públicas para os conteúdos dos links <code>assetlinks.json</code> e <code>apple-app-site-association</code>
  </p>
  <p>
    <input type="checkbox" id="item2"> 
    Deeplink / Universal link na URL de autenticação da marca
  </p>
  <p>
    <input type="checkbox" id="item3"> 
    Webview deve permitir execução de código JavaScript
  </p>
  <p>
    <input type="checkbox" id="item4"> 
    Webview deve usar User-Agent com valor "<code>openfinance-webview</code>" (sem aspas)
  </p>
  <p>
    <input type="checkbox" id="item5"> 
    Abrir webview com a URL completa (query string inclusa) do deeplink / Universal link imediatamente
  </p>
  <p>
    <input type="checkbox" id="item6"> 
    Direcionar para tela de autenticação quando webview navegar para <code>authenticationBrandUrl</code>
  </p>
  <p>
    <input type="checkbox" id="item7"> 
    Direcionar para tela de senha transação (se existir) quando webview navegar para <code>transactionAuthenticationBrandUrl</code>
  </p>
  <p>
    <input type="checkbox" id="item8"> 
    Direcionar para a tela principal ou para um tratamento de erro quando a webview navegar para <code>homePageBrandUrl</code>
  </p>
  <p>
    <input type="checkbox" id="item9"> 
    Delegar para o sistema operacional a abertura de URLs diferentes do FQDN Opus e URLs da marca
  </p>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        function loadChecklist() {
            for (let i = 1; i <= 9; i++) {
                const isChecked = localStorage.getItem('checklist-item-' + i) === 'true';
                document.getElementById('item' + i).checked = isChecked;
            }
        }

        function saveChecklist() {
            for (let i = 1; i <= 9; i++) {
                const checkbox = document.getElementById('item' + i);
                localStorage.setItem('checklist-item-' + i, checkbox.checked);
            }
        }

        const checkboxes = document.querySelectorAll('#checklist-app input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', saveChecklist);
        });

        loadChecklist();
    });
</script>

---

## Fluxos

### Fluxo das URLs e chamadas backend-to-backend

Nesta seção será apresentado o fluxo de integração entre a API de consentimento compartilhado e a autenticação da marca. A integração se dá em duas etapas: nas chamadas iniciais dos fluxos de Recepção e Gestão de Consentimentos. Após a chamada inicial, todo o fluxo será controlado pela aplicação do consentimento compartilhado, sendo que o usuário será redirecionado para a Instituição Transmissora apenas para aceitar o consentimento. O tratamento das URLs deve seguir o mesmo mapeamento realizado para o app, porém abrindo URLs diferentes dos FQDNs da URL de fim de fluxo diretamente com o navegador (sem utilizar o webview).

### Redirecionamento para Gestão de Consentimentos

Além da autenticação para a criação de consentimentos, o consentimento compartilhado também permite que o usuário gerencie os compartilhamentos efetuados. Para isso, o usuário deve estar logado na marca, de forma que o consentimento compartilhado espera receber um token assinado semelhante ao enviado pela tela de autorização da marca, com a diferença de que não é necessário o envio da claim *authenticationId* e que o endereço de callback deve seguir o exemplo:

``` shell
POST /management/result HTTP/1.1 
Host: consentimento.compartilhado.com.br 
Content-Type: application/jwt 
Content-Length: * 
 
eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.JbC9dCW4uXidMaiKjFAmJ2bVDOqyCdFO1Q_bwKZ1qAcvF8AhVdg424QjTDdVeP0iBANQKvMc0p2IIEnumDL-... 
```

Como resposta a marca deve receber uma URL para qual deve redirecionar o cliente.
