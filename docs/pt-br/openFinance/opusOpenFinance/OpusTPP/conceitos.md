---
layout: default
title: Conceitos
parent: "Módulo de Iniciação de Pagamentos"
nav_order: 1
has_children: true
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/opusTPP/conceitos/index"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/opusTPP/conceitos/index"
      lang: "es"
---

## Conceitos Fundamentais

Entender a arquitetura e os fluxos do Open Finance é essencial para a compreensão do **Módulo de Iniciação de Pagamentos**. Esta seção apresenta os principais conceitos que norteiam a atuação como Iniciador de Transação de Pagamento (ITP) ou Receptor de Dados.

## Consentimento

Consentimento é a autorização explícita concedida pelo usuário final para que a sua Instituição acesse dados ou inicie pagamentos (ITP) em nome dele, junto às [Instituições Detentoras de Conta][Detentoras].

- **Autorizar o consentimento:** É o processo de redirecionar o usuário para o ambiente da Detentora de Conta para que ele autorize, de forma autenticada, os escopos de serviço requisitados.
- **Escopo (`permissions`):** É a unidade que define o que a TPP pode fazer. Cada escopo é uma string padronizada pelo regulador (ex.: `ACCOUNTS_READ`, `CREDIT_CARDS_ACCOUNTS_BILLS_READ`, `payments`) que o usuário autoriza explicitamente. O conjunto exato de escopos exigido depende do tipo de dado/operação.
- **Vigência:** O consentimento possui prazo de validade definido na solicitação (`expirationDateTime`, geralmente de 3 a 12 meses ou Indeterminado, dependendo do escopo).
- **Identificadores:** Após criação, o consentimento é identificado por um `consentId` (URN no formato `urn:<brand>:<uuid>`).

### Máquina de estados de consentimento (alto-nível)

| Status | Significado |
| :----: | ----------- |
| `AWAITING_AUTHORISATION` | Consentimento criado, aguardando autorização do usuário na Detentora de Conta |
| `AUTHORISED` | Consentimento aprovado, tokens gerados, pronto para uso |
| `REJECTED` | Consentimento negado ou expirado |
| `CONSUMED` | Consentimento de pagamento já utilizado |
| `PARTIALLY_ACCEPTED` | Múltiplas alçadas — alguns aprovadores ainda pendentes |

> **Janela de retry:** consentimentos em `AWAITING_AUTHORISATION` aceitam nova tentativa de autorização por **5 minutos** (pagamento) ou **60 minutos** (compartilhamento de dados).

## Revogação de Pagamento vs. Revogação de Consentimento

É fundamental distinguir esses dois eventos, pois impactam de forma diferente o fluxo do negócio:

- **Revogação de Pagamento:**
  - **Ocorre:** Antes da liquidação financeira;
  - **Quem realiza:** O cliente autenticado (ou a TPP, se o fluxo permitir);
  - **Efeito:** Cancela a transação de pagamento específica. O consentimento continua válido para novas transações.
- **Revogação de Consentimento:**
  - **Ocorre:** A qualquer momento;
  - **Quem realiza:** Exclusivamente o cliente junto à Detentora de Conta;
  - **Efeito:** Invalida **todos** os acessos e permissões associados àquele consentimento. A TPP não consegue mais iniciar pagamentos ou acessar dados até que um novo consentimento seja solicitado e autorizado.

## Jornadas de Iniciação (App-to-App, App-to-Web, Web-to-App)

O método de redirecionamento do usuário para autenticação na detentora de conta varia conforme o ambiente (Aplicativo Móvel vs. Navegador). O **Módulo de Iniciação de Pagamentos** suporta os principais padrões:

- **App-to-App:** Fluxo entre dois aplicativos móveis nativos:
  - *Funcionamento:* O app da ITP chama o app da detentora de conta via *Deep Link*;
  - *Vantagem:* Experiência mais fluida e segura, mantendo o contexto no dispositivo móvel.
- **App-to-Web:** Fluxo que sai de um app nativo e abre o navegador (WebView ou Browser externo):
  - *Funcionamento:* Utilizado quando a detentora não possui app instalado ou como alternativa quando o fluxo preferido falha (*fallback*);
  - *Atenção:* O uso de WebViews restritas (in-app browser) pode causar falhas de autenticação; recomenda-se o uso do navegador padrão do sistema.
- **Web-to-App:** Fluxo que sai de um site/navegador e tenta abrir um app nativo:
  - *Funcionamento:* Utiliza tentativa de *Deep Link*. Se o app não estiver instalado, a experiência geralmente retorna para o fluxo Web (*fallback*).

## Consentimento vs. Vínculo de Dispositivo

São dois conceitos distintos, mas complementares na segurança da jornada:

- **Consentimento:** É a autorização legal e técnica da detentora de conta. É um registro no ecossistema (geralmente associado ao *userId* ou *CPF*);
- **Vínculo de Dispositivo (Enrollment):** É a associação entre um dispositivo específico (identificado por *fingerprint*, token FCM, ou certificado FIDO2) e um consentimento ou usuário:
  - *Utilidade:* Permite que, em Jornadas como a JSR (Jornada Sem Redirecionamento), o sistema reconheça que aquele dispositivo já possui um consentimento ativo, evitando que o usuário precise efetuar o login na Detentora de Conta repetidamente;
  - *No Módulo de Iniciação de Pagamentos:* O Módulo pode realizar a criação de vínculos de JSR, repassando os requests para o **FIDO Server** da Detentora de Conta (o Serviço FIDO Server da Plataforma Opus Open Finance pode ser contratado separadamente para essa finalidade).

### Identificadores de Dispositivo e Credenciais

Vários identificadores aparecem nos fluxos de Vínculo de Dispositivo e podem causar confusão por terem nomes parecidos. Esta seção esclarece cada um:

#### Device Fingerprint

Assinatura única do dispositivo calculada automaticamente a partir de suas características técnicas — modelo, sistema operacional, resolução de tela, fuso horário, idioma, configurações de hardware, etc. Cada combinação dessas características tende a ser única, permitindo reconhecer o mesmo dispositivo entre sessões sem identificação explícita do usuário.

- **Quando aparece:** análise antifraude da Detentora, no payload de `risk-signals`;
- **Não confundir com:** biometria (impressão do dedo). O nome vem por analogia, é a "impressão digital do dispositivo".

#### Token FCM (Firebase Cloud Messaging)

Identificador emitido pelo serviço de notificações push do Google (FCM) que identifica uma instalação específica de um aplicativo em um dispositivo Android. Cada vez que o app é instalado, atualizado ou os dados de notificação são limpos, um novo token FCM é gerado.

- **Quando aparece:** para vincular um dispositivo Android a um consentimento, garantindo que notificações de mudança de status cheguem ao aparelho correto;
- **Equivalente em iOS:** APNs Device Token (Apple Push Notification service).

#### Credencial FIDO2

Par de chaves criptográficas (pública + privada) gerado pelo próprio dispositivo do usuário no momento do registro do vínculo. A chave privada **nunca sai do dispositivo** — fica protegida pelo hardware seguro (Secure Enclave no iOS, Trusted Execution Environment no Android). A chave pública é enviada à Detentora para futuras verificações.

- **Quando aparece:** no registro do vínculo de dispositivo (`POST /fido-registration`) e em cada autorização posterior (`POST /fido-sign-options` + `POST .../authorise`);
- **Ativada por:** biometria (face, digital) ou PIN do dispositivo;
- **Não é um "certificado tradicional":** não é emitida por uma Autoridade Certificadora, é gerada localmente.

#### `deviceId`

Identificador escolhido pelo aplicativo cliente para o dispositivo (geralmente uma UUID gerada na primeira instalação e persistida localmente). Diferente da fingerprint, é **estável** entre sessões (até o app ser reinstalado) e definido pela própria aplicação, não calculado.

- **Quando aparece:** no payload de `risk-signals` (campo `data.deviceId`).

#### Como esses identificadores se relacionam

| Identificador | Quem gera | Onde fica armazenado | Muda quando |
| :-----------: | :-------: | :------------------: | :---------: |
| Device Fingerprint | Calculado pela própria TPP/Detentora | Não persistido — recalculado a cada análise | Características do dispositivo mudam (ex.: SO atualizado) |
| Token FCM | Google (FCM) / Apple (APNs) | No app cliente + servidor de push | App reinstalado, dados limpos, ou expiração |
| Credencial FIDO2 | Dispositivo do usuário (chip seguro) | Chip seguro do dispositivo (privada) + Detentora (pública) | Vínculo revogado/rejeitado ou dispositivo resetado |
| `deviceId` | Aplicativo cliente | App + payloads enviados | App reinstalado |

### Estados do Vínculo de Dispositivo

| Status | Significado |
| :----: | ----------- |
| `AWAITING_RISK_SIGNALS` | Vínculo criado; aguardando envio de sinais de risco (até 15 min) |
| `AWAITING_ACCOUNT_HOLDER_VALIDATION` | Sinais recebidos; aguardando autorização do usuário na Detentora |
| `AWAITING_ENROLLMENT` | Autorização concedida; aguardando registro da credencial FIDO2 |
| `AUTHORISED` | Credencial FIDO2 registrada — vínculo apto para autorizar pagamentos |
| `REJECTED` | Vínculo rejeitado pelo usuário ou expirado |

## Jornada Otimizada

A Jornada Otimizada é um fluxo onde dois consentimentos (um de Dados e um de Pagamentos) podem ser criados em uma única interação, combinando dois consentimentos vinculados:

Um dos principais motivos de falha em transações de pagamento no Open Finance é a tentativa de débito em conta sem saldo suficiente. Como o ITP não tem acesso direto à conta do usuário, ele não consegue verificar o saldo antes de iniciar o pagamento, o que resulta em transações rejeitadas pela Detentora de Conta, gerando fricção na experiência do usuário e custos operacionais desnecessários. A Jornada Otimizada resolve esse problema ao combinar, em uma única autorização, um consentimento de pagamento com um consentimento de leitura de dados, permitindo que o ITP consulte o saldo disponível antes de cada transação.

- **Primário (transferências inteligentes para pagamentos ou vínculo de dispositivo para JSR):** Autoriza as operações financeiras em si.
- **Secundário (dados):** Autoriza a leitura de saldo da conta para validar a viabilidade do pagamento antes da execução.

---

## Conceitos do ecossistema Open Finance

### Diretório de Participantes (Diretório Central)

Repositório oficial mantido pelo Banco Central que registra todas as instituições autorizadas a operar no Open Finance Brasil. Toda TPP precisa estar cadastrada no Diretório para:

- Receber seus **certificados regulatórios** (BRCAC, BRSEAL);
- Publicar seu **Software Statement** (declaração da aplicação);
- Identificar-se nas chamadas mTLS para as instituições destino.

### Software Statement (SSA — Software Statement Assertion)

Documento JWS emitido pelo Diretório de Participantes que descreve uma aplicação específica da TPP. Cada SSA tem:

- Um `softwareStatementId` (UUID);
- Um `client_id` associado;
- Lista de *redirect URIs* autorizadas;
- Metadados da aplicação.

Uma única instituição (organisation) pode ter múltiplos SSAs (um por aplicativo/marca). O SSA é armazenado no banco do Módulo de Iniciação de Pagamentos..

### Perfis Regulatórios (`role`)

Ao buscar instituições no Diretório (`GET /participants`), elas vêm classificadas por papel regulador:

| Role | Significado |
| :--: | :---------: |
| `DADOS` | Compartilhamento de dados cadastrais e transacionais |
| `PAGTO` | Iniciação de pagamentos (PIX) |
| `CONTA` | Operações em conta corrente |
| `CCORR` | Câmbio (Conta de Pagamento Pré-paga / Crédito ao Cliente — `[ANNA: confirmar definição exata de CCORR]`) |

### `AuthorisationServerId`

Identificador único de cada **marca** (brand) que uma instituição opera no Open Finance. Uma mesma instituição pode ter múltiplas marcas (ex.: bancos com varejo + private + digital). O `AuthorisationServerId` é o identificador usado:

- No header `x-authorisation-server-id` de chamadas subsequentes;
- Na seleção da Detentora durante o fluxo de consentimento;
- Para descobrir os endpoints técnicos da instituição via `.well-known/openid-configuration`.

### Webhook

Mecanismo pelo qual a Instituição Detentora de Conta **notifica** o Módulo de Iniciação de Pagamentos de mudanças em pagamentos, consentimentos ou vínculos. O Módulo recebe a notificação (apenas a data — não o novo status), reenvia para a URL de webhook cadastrada pelo cliente e publica em um tópico Dapr para processamento assíncrono.

Detalhes em [Webhooks][Webhooks].

### Backoffice

Interface administrativa do Módulo de Iniciação de Pagamentos que expõe operações de **consulta** sobre consentimentos, vínculos e pagamentos. Voltada para times de suporte, ops e backoffice — não substitui a UI do cliente. Detalhes em [Backoffice][Backoffice].

### Permissions vs. Scopes

Embora ambos estejam relacionados à autorização de acesso a dados, eles têm papéis diferentes dentro do ecossistema:

- Permissions (ou permissões): São informações declaradas na criação de um consentimento de compartilhamento de dados, que especificam quais tipos de dados transacionais o cliente autoriza compartilhar com a instituição receptora. Ou seja, definem o escopo de negócios do consentimento. Por exemplo, um consentimento pode permitir o acesso a informações de contas, cartões de crédito, operações de crédito ou investimentos, cada uma representada por uma permission diferente. Essas permissões precisam ser informadas corretamente pelo cliente que está criando o consentimento, seguindo a documentação oficial que define o formato do request;
- Scopes: Fazem parte da camada técnica de segurança do protocolo FAPI-BR / OpenID Connect. Eles indicam quais operações um determinado token de acesso está autorizado a realizar dentro da infraestrutura regulada. Cada API do Open Finance possui seu conjunto específico de scopes obrigatório. Por exemplo: A API de criação de consentimentos exige o scope consents, as APIs de pagamentos exigem o scope payments, e as APIs de acesso a dados de contas exigem o scope accounts. Esses scopes são validados durante o fluxo de autenticação e autorização e garantem que o token emitido tenha apenas os privilégios necessários para a operação solicitada.

Em resumo: Enquanto as permissions descrevem quais dados o titular autoriza compartilhar (nível de negócio), os scopes definem como esse acesso é tecnicamente permitido (nível de segurança e comunicação entre sistemas). No caso do Módulo de Iniciação de Pagamentos, a gestão dos scopes é totalmente automatizada pela plataforma, dispensando configurações adicionais por parte do cliente. Já as permissions devem ser corretamente informadas pelo integrador ao criar o consentimento de compartilhamento, conforme as regras da especificação do Open Finance Brasil.

---

> **Nota:** Para detalhes técnicos sobre a implementação desses conceitos (endpoints, payloads, e fluxos de fallback), consulte a seção de [Funcionamento][Funcionamento].

[Detentoras]: ../../openFinanceBrasil/perfisParticipacao/detentorDeContas.html
[Webhooks]: ./funcionamento/webhooks.html
[Backoffice]: ./funcionamento/backoffice.html
[Funcionamento]: ./funcionamento/
