---
layout: default
title: "Transmissão de Dados"
parent: "Consentimento Compartilhado"
nav_order: 4
lang: "pt-br"
alternate_lang: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Consentimento-Compartilhado/Transmissão/"
---

## Introdução

Esta página foi elaborada para apoiar usuários que estão utilizando a ferramenta pela primeira vez. Aqui, é possível encontrar instruções passo a passo que tornarão o uso do software mais simples, intuitivo e eficiente, ajudando a explorar todo o seu potencial desde o início, e entender o funcionamento da solução.

---

## Benefícios de usar nossa solução

1. **Facilidade de Implementação**:
Nossa solução já resolve todas as exigências regulatórias, poupando tempo e esforço de sua equipe de desenvolvimento. Os principais processos, como a exibição e a confirmação do consentimento, já possuem a implementação concluída e estão prontos para uso.

2. **Conformidade Regulamentar**:
A solução está em conformidade com todas as diretrizes do Open Finance Brasil, garantindo que você siga as melhores práticas para aceite e gestão de consentimentos.

3. **Experiência do Usuário**:
Através de uma interface que resolve as exigências regulatórias, os clientes podem visualizar e gerenciar seus consentimentos diretamente na plataforma, com uma navegação intuitiva.

## Itens resolvidos pela nossa solução

Aqui estão os principais elementos que nossa solução oferece:

- **Exibição e confirmação do consentimento:** A confirmação faz parte da solução, minimizando o esforço técnico;

- **Tela de Handoff:** A tela de Handoff já está implementada na nossa solução, poupando esse esforço caso você, cliente, só possua uma solução app;

- **Área de gestão completa:** Nossa solução inclui um painel centralizado para a gestão dos consentimentos, pagamentos e vínculos;

- **Listagem e detalhes dos consentimentos:** Os consentimentos transmitidos são listados, com detalhes completos disponíveis;

- **Revogação de consentimentos:** Implementamos uma forma simples para que os usuários possam revogar consentimentos, pagamentos ou vínculos quando necessário;

- **Gestão de consentimentos:** Oferecemos uma interface unificada para gestão integrada das funcionalidades do Open Finance.

## Itens que você precisará desenvolver

Embora nossa solução implemente todas as exigências regulatórias, alguns elementos exigem personalização ou integração específica da sua parte:

- **Autenticação do usuário:** É necessário que você implemente um método seguro para autenticação dos usuários, garantindo conformidade com as políticas de segurança;

- **Telas de autenticação e senha de transação:** A personalização do branding visual precisará ser adaptada de acordo com suas preferências e identidade visual;

- **Senha de transação:** Dependendo do seu modelo de negócio, você pode precisar adicionar uma senha de transação para aprovações de consentimentos;

- **Área de gestão de consentimentos:** Você precisará desenvolver um mecanismo que redirecione o usuário do seu aplicativo/site diretamente para a área de gestão de forma segura e já autenticada. Exemplo: Uma opção no Menu Principal chamada “Open Finance” que ao ser selecionada pelo usuário, redirecione-o para a nossa área de gestão dos seus consentimentos;

- **Implementação do aceite de consentimento Web e/ou App:** Você precisará ajustar seus sites/aplicativos para receber (em webview) as telas que nossa solução implementa.

## O que a nossa solução implementa

Uma vez que o usuário efetue o login através da sua aplicação, ele terá acesso a uma série de telas em conformidade com o que há de mais atualizado na regulação do Banco Central.  

Nosso objetivo é assegurar que, ao longo de toda a jornada de Open Finance, os clientes tenham **controle total** sobre seus **dados** e as **permissões de compartilhamento**, gerenciando de maneira simples e eficiente suas contas vinculadas e consentimentos.

As telas desenvolvidas são organizadas em:

- **Telas de Aceite de Consentimento**, que tratam da revisão das informações e aceite do consentimento. compartilhamento de dados;

Após a autenticação do usuário, este terá acesso as telas descritas:

### Telas de Aceite de Consentimento

**Observação:** As telas apresentadas nesta seção estão contidas no Guia de Experiência do Usuário, Item 02 (Compartilhamento de dados), Item 03 (Iniciação de pagamentos), Item 04 (Jornadas alternativas de iniciação de pagamento – Jornada sem Redirecionamento – Etapa 3). Mais detalhes no [link](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17378535/Guia+de+Experi+ncia+do+Usu+rio).

Essas telas estão associadas ao processo de confirmação de identidade do usuário e de consentimento, garantindo que o cliente tenha controle sobre suas permissões no Open Finance. Abaixo estão as telas que fazem parte dessa etapa:

#### Tela 1: Revisão de Consentimento

- O usuário pode revisar o consentimento de compartilhamento de dados, pagamentos e vínculos de contas antes de finalizar o processo. A tela mostra os dados autorizados e as finalidades.

<!-- Adicionar imagem -->

#### Tela 2: Confirmação de Consentimento

- Informa ao usuário as informações coletadas na etapa anterior, detalhando as permissões concedidas e fornecendo um resumo do que está sendo autorizado.

<!-- Adicionar imagem -->

#### Tela 3: Handoff  

- Informa ao usuário que sua jornada deverá seguir pelo app do cliente, apresentando um QRCode que deve ser escaneado pela câmera do celular. Esta tela será exibida somente para clientes que só possuem a opção app, sem internet banking.

<!-- Adicionar imagem -->

Essas telas foram projetadas para fornecer uma experiência segura e amigável, onde o usuário tem controle total sobre suas permissões e vínculos no Open Finance.

Utilizando nossa solução de consentimento compartilhado, sua equipe pode economizar tempo no desenvolvimento e assegurar que todas as exigências regulatórias sejam atendidas. Nossa plataforma oferece uma implementação fácil e em conformidade com o Open Finance Brasil, permitindo que você foque em desenvolver funcionalidades específicas, enquanto nossa solução cuida do resto.

## O que você deve implementar

### Configuração

As marcas precisam fornecer um conjunto de informações necessárias à integração com o Consentimento Compartilhado. Esses dados serão inseridos no banco de dados da aplicação e são necessários para o seu funcionamento.

Além disso, chaves de assinatura e de encriptação serão necessárias para o fluxo seguro da comunicação com a marca.

#### Setup das Marcas

Os dados necessários das marcas são:

| Campo | Descrição | Responsável | Exemplo |
|:-----:|:---------:|:-----------:|:-------:|
| brandId | CNPJ da marca | Opus | *28811839000129* |
| authorisationServerUrl | Endereço base da instalação do OOB da marca | Opus | *https://authorization-server.instituicao.com.br* |
| authenticationBrandUrl | Url de login da marca ao qual será enviado o post de autenticação do cliente | Marca | *https://marca.instituicao.com.br/login* |
| transactionAuthenticationBrandUrl | Url da senha de transação do cliente na marca | Marca | *https://marca.instituicao.com.br/user/password* |
| homePageRedirectBrandUrl | Url para qual o usuário será redirecionado em caso de sessão expirada ou erros. A marca pode redirecionar o usuário para a home ou interceptar a URL e realizar alguma tratativa de erro como fechar o app. | Marca | *https://marca.instituicao.com.br/home* |
| isAppOnly | Booleana que indica se a marca só tem aplicativo | Marca | false |
| assetLinksUrl | Url pública com o conteúdo do assetlinks.json | Marca | *https://marca.instituicao.com.br/assentlinks* |
| appleAppSiteUrl | Url pública com o conteúdo do apple-app-site-association | Marca | *https://marca.instituicao.com.br/appleappsite* |

#### Chaves

A comunicação da marca com o Consentimento Compartilhado necessita de um jwt assinado para garantir a segurança da informação transmitida. Sendo assim faz-se necessário a existência de um par de chaves de assinatura.

#### Chave de Assinatura  

Esse par de chaves de assinatura fica a encargo da Instituição Cliente, que deve expor a chave pública em uma url de jwks e usar a chave privada para assinar o jwt enviado nas respostas ao Consentimento Compartilhado. O endereço da chave será informado através da variável de ambiente "*application.jwt.brand.jwks.url*". Esse método foi escolhido para facilitar a troca da chave de assinatura sempre que necessário por parte das marcas. Exemplo de resposta do jwks:

```shell
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

### Fluxo de aceite de consentimento APP

O fluxo via aplicativo para dispositivos móveis requer alguns tratamentos importantes, mais especificamente a triagem da URL inicial do aceite de consentimento da marca e o tratamento de redirecionamentos internos no webview para as páginas de autenticação do correntista e de senha de transação.

#### Deeplink e Universal Link

É necessário a aplicação da marca fazer deeplink (Android) ou universal link (iOS) na URL de redirecionamento dos ITPs para o correto tratamento de redirecionamentos app-to-app regulatório do Open Finance Brasil.

Os arquivos *assetlinks.json* e *apple-app-site-association* precisam ser hospedados e ter as URL enviadas para a Instituição que fará o serviço de proxy de tais arquivos garantindo assim independência da marca na gestão de seus aplicativos.

#### Webview

Ao receber o estímulo inicial da URL de aceite de consentimento, o aplicativo deve abrir imediatamente um webview e navegar para a URL completa que disparou o aplicativo. Essa etapa é muito importante pois existem vários TTLs (time-to-live) curtos que podem expirar caso exista algum processo anterior à navegação.

Para garantir que a requisição vem de um aplicativo que está tratando o fluxo de consentimento corretamente, é necessário configurar o *user-agent* do webview com o valor “*openfinance-webview*” (sem aspas).

Além disso é necessário interceptar o carregamento de novas URLs e ao detectar uma navegação para a URL *authenticationBrandUrl* ou *transactionAuthenticationBrandUrl*, o aplicativo deve interceptar a navegação e utilizar a parte correspondente do aplicativo para autenticação do correntista ou validação de senha de transação. O tratamento deve implementar as chamadas de backend descritas abaixo para informar o resultado num chamada backend-to-backend e voltar ao webview na URL retornada na chamada de backend.

Outro caso que precisa ser tratado via interceptação de URL é o redirecionamento do retorno ao ITP que não pode ser aberto no webview, devemos então verificar que a URL não é a *authenticationBrandUrl* e *transactionAuthenticationBrandUrl*, tão pouco possui os FQDNs fornecidos pela Instituição Cliente. Caso seja uma URL de redirect para o ITP, o aplicativo deve disparar então delegar a abertura da URL ao sistema operacional.

>No caso de erros sem redirecionamento para o ITP, o consentimento compartilhado irá redirecionar o usuário de volta para a homepage da marca, de forma que também será necessário interceptar a url *homePageRedirectBrandUrl*. O componente de webview deve também permitir a execução de JavaScript e o armazenamento do DOM (*domStorageEnabled = true*).

<!--Terminar de adicionar-->