---
layout: default
title: Conceitos
parent: "OpusTPP"
nav_order: 1
has_children: false
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/opusTPP/conceitos/index"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/opusTPP/conceitos/index"
      lang: "es"
---

## Conceitos Fundamentais

Entender a arquitetura e os fluxos do Open Finance é essencial para a correta implementação do **OpusTPP**. Esta seção apresenta os principais conceitos que norteiam a atuação como Iniciador de Transação de Pagamento (ITP) ou Receptor de Dados.

## Consentimento

Consentimento é a autorização explícita concedida pelo cliente (usuário final) para que a sua Instituição acesse dados ou inicie pagamentos (ITP) em nome dele, junto às [Instituições Detentoras de Conta][Detentoras].

- **Solicitar consentimento:** É o processo de redirecionar o usuário para o ambiente da Detentora de Conta para que ele autorize, de forma autenticada, os escopos de serviço requisitados.
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
  - **Ocorre:** Antes da liquidação financeira.
  - **Quem realiza:** O cliente autenticado (ou a TPP, se o fluxo permitir).
  - **Efeito:** Cancela a transação de pagamento específica. O consentimento continua válido para novas transações.
- **Revogação de Consentimento:**
  - **Ocorre:** A qualquer momento.
  - **Quem realiza:** Exclusivamente o cliente junto à Detentora de Conta.
  - **Efeito:** Invalida **todos** os acessos e permissões associados àquele consentimento. A TPP não consegue mais iniciar pagamentos ou acessar dados até que um novo consentimento seja solicitado e autorizado.

## Jornadas de Iniciação (App-to-App, App-to-Web, Web-to-App)

O método de redirecionamento do usuário para autenticação na detentora de conta varia conforme o ambiente (Aplicativo Móvel vs. Navegador). O **OpusTPP** suporta os principais padrões:

- **App-to-App:** Fluxo entre dois aplicativos nativos:
  - *Funcionamento:* O app da TPP chama o app da detentora de conta via *Deep Link* (URL Scheme ou Android App Links/iOS Universal Links).
  - *Vantagem:* Experiência mais fluida e segura, mantendo o contexto do celular.
- **App-to-Web:** Fluxo que sai de um app nativo e abre o navegador (WebView ou Browser externo):
  - *Funcionamento:* Utilizado quando a detentora não possui app instalado ou como alternativa quando o fluxo preferido falha (*fallback*).
  - *Atenção:* O uso de WebViews restritas (in-app browser) pode causar falhas de autenticação; recomenda-se o uso do navegador padrão do sistema.
- **Web-to-App:** Fluxo que sai de um site/navegador e tenta abrir um app nativo:
  - *Funcionamento:* Utiliza tentativa de *Deep Link*. Se o app não estiver instalado, a experiência geralmente retorna para o fluxo Web (*fallback*).

## Consentimento vs. Vínculo de Dispositivo

São dois conceitos distintos, mas complementares na segurança da jornada:

- **Consentimento:** É a autorização legal e técnica da detentora de conta. É um registro no ecossistema (geralmente associado ao *userId* ou *CPF*).
- **Vínculo de Dispositivo (Enrollment):** É a associação entre um dispositivo específico (identificado por *fingerprint*, token FCM, ou certificado FIDO2) e um consentimento ou usuário.
  - *Utilidade:* Permite que, em Jornadas como a JSR (Jornada Sem Redirecionamento), o sistema reconheça que aquele dispositivo já possui um consentimento ativo, evitando que o usuário precise efetuar o login na Detentora de Conta repetidamente.
  - *Implementação no OpusTPP:* Usa autenticação **FIDO2/WebAuthn** (biometria, PIN) sob coordenação do regulamento de "Pagamento sem Redirecionamento".

### Identificadores de Dispositivo e Credenciais

Vários identificadores aparecem nos fluxos de Vínculo de Dispositivo e podem causar confusão por terem nomes parecidos. Esta seção esclarece cada um:

#### Device Fingerprint

Assinatura única do dispositivo calculada automaticamente a partir de suas características técnicas — modelo, sistema operacional, resolução de tela, fuso horário, idioma, configurações de hardware, etc. Cada combinação dessas características tende a ser única, permitindo reconhecer o mesmo dispositivo entre sessões sem identificação explícita do usuário.

- **Quando aparece:** análise antifraude da Detentora, no payload de `risk-signals`.
- **Não confundir com:** biometria (impressão do dedo). O nome vem por analogia — é a "impressão digital do dispositivo".

#### Token FCM (Firebase Cloud Messaging)

Identificador emitido pelo serviço de notificações push do Google (FCM) que identifica uma instalação específica de um aplicativo em um dispositivo Android. Cada vez que o app é instalado, atualizado ou os dados de notificação são limpos, um novo token FCM é gerado.

- **Quando aparece:** para vincular um dispositivo Android a um consentimento, garantindo que notificações de mudança de status cheguem ao aparelho correto.
- **Equivalente em iOS:** APNs Device Token (Apple Push Notification service).

#### Credencial FIDO2

Par de chaves criptográficas (pública + privada) gerado pelo próprio dispositivo do usuário no momento do registro do vínculo. A chave privada **nunca sai do dispositivo** — fica protegida pelo hardware seguro (Secure Enclave no iOS, Trusted Execution Environment no Android). A chave pública é enviada à Detentora para futuras verificações.

- **Quando aparece:** no registro do vínculo de dispositivo (`POST /fido-registration`) e em cada autorização posterior (`POST /fido-sign-options` + `POST .../authorise`).
- **Ativada por:** biometria (face, digital) ou PIN do dispositivo.
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

A Jornada Otimizada é um fluxo onde dois cosentimentos de Dados e Pagamentos podem ser criados em uma única interação, combinando dois consenitmentos vinculados:

- **Primário (pagamento):** Autoriza as operações financeiras em si.
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

Uma única instituição (organisation) pode ter múltiplos SSAs (um por aplicativo/marca). O SSA é armazenado no banco do OpusTPP..

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

Mecanismo pelo qual a Instituição Detentora de Conta **notifica** o OpusTPP de mudanças em pagamentos, consentimentos ou vínculos. O OpusTPP recebe a notificação (apenas a data — não o novo status), reenvia para a URL de webhook cadastrada pelo cliente e publica em um tópico Dapr para processamento assíncrono.

Detalhes em [Webhooks](../funcionamento/webhooks.html).

### Backoffice

Interface administrativa do OpusTPP que expõe operações de **consulta** sobre consentimentos, vínculos e pagamentos. Voltada para times de suporte, ops e backoffice — não substitui a UI do cliente. Detalhes em [Backoffice](../funcionamento/backoffice.html).

---

## Glossário técnico-regulatório

### API (Application Programming Interface)

Contrato técnico que define como dois sistemas trocam informações pela internet — quais operações estão disponíveis, em que formato as requisições devem ser feitas e o que retorna em cada resposta. No contexto do OpusTPP, dois tipos convivem:

- **APIs REST tradicionais:** o padrão que a maioria dos desenvolvedores usa — HTTP, verbos simples (GET/POST/PATCH/DELETE), JSON, autenticação por token. É como o OpusTPP se apresenta para a TPP.
- **APIs reguladas:** as APIs do Open Finance Brasil e Open Insurance Brasil, que adicionam camadas extras de segurança e conformidade (mTLS, FAPI-BR, JWS, DCR, fluxos de consentimento). É como o OpusTPP se comunica com as Instituições Destino.

O papel central do OpusTPP é ser o **tradutor** entre os dois: oferecer uma API REST simples para a TPP e cuidar internamente de toda a complexidade regulatória.

### API de Proxy

Subconjunto das APIs do OpusTPP cuja função é **repassar** uma chamada para a Instituição Destino (Detentora ou Transmissora), mantendo o contrato regulatório original e gerenciando os tokens de acesso automaticamente. As rotas de proxy ficam sob o prefixo `/proxy/open-banking/...` ou `/proxy/open-insurance/...` e refletem 1-para-1 o que está definido no contrato regulatório de cada API. Não aceitam o header `x-regulatory-v` (a versão é fixa pelo path).

### FAPI-BR (Financial-grade API — Brasil)

Padrão de segurança baseado no perfil FAPI do OpenID Foundation, adaptado ao Open Finance Brasil. Define requisitos de autenticação mTLS, JWS, encriptação de tokens, e validação de assinaturas. O OpusTPP implementa o perfil completo de forma transparente.

### DCR (Dynamic Client Registration)

Mecanismo pelo qual o OpusTPP **se registra dinamicamente** como cliente nas instituições destino antes de iniciar fluxos. Evita que o cliente precise pré-cadastrar a TPP em cada banco/seguradora.

### BRCAC (BR Certificate — Authentication & Confidentiality)

Certificado regulatório utilizado em conexões **mTLS** para identificar a aplicação cliente e criptografar a comunicação. Possui `use: "enc"` no formato JWK.

### BRSEAL (BR Seal)

Certificado regulatório utilizado para **assinatura** de mensagens JWS entre a TPP e o servidor de autenticação da Detentora. Possui `use: "sig"` no formato JWK.

> Detalhes operacionais sobre geração e conversão para JWK em [Certificados Regulatórios](../configuracao/certificadosRegulatorios.html).<!--VALIDAR-->

### FIDO2 / WebAuthn

Padrão da W3C para autenticação baseada em credenciais públicas/privadas armazenadas no dispositivo, ativadas por biometria ou PIN. O OpusTPP usa FIDO2 no fluxo de **Vínculo de Dispositivo** (Pagamento sem Redirecionamento). Detalhes em [Vínculo de Dispositivo](../funcionamento/vinculoDeDispositivo.html).<!--VALIDAR-->

### JWS / JWT

- **JWS** (JSON Web Signature): formato de mensagem assinada digitalmente. Usado em corpos de requisição/resposta regulatórios e em SSAs.
- **JWT** (JSON Web Token): token JWS contendo *claims* (afirmações). Usado em respostas de erro de pagamento (que vêm em JWT, não em JSON puro).

### `RESOURCES_READ`

Permissão **sempre obrigatória** em qualquer agrupamento de consentimento. Habilita a chamada `/resources`, que lista os recursos vinculados ao consentimento e seu status.

### Agrupamento de Permissões

Conjunto pré-definido de *scopes* que devem ser solicitados juntos para acesso a um produto/categoria. A Detentora **rejeita** consentimentos com permissões divergentes do agrupamento esperado (HTTP 400).

### `PAGINATION-KEY`

Chave passada em chamadas paginadas no Open Finance Brasil que permite **iterar 1 hora sem custo adicional** dentro de uma mesma busca. Sem essa chave, cada nova página conta como nova requisição contra o limite regulatório.

### Latência

Tempo de resposta entre fazer uma requisição e receber o retorno. Em arquiteturas distribuídas como a do OpusTPP — onde uma única operação passa por TPP → OpusTPP → Detentora — a latência total é a soma do tempo gasto em cada etapa. Medir latência por etapa é essencial em produção para identificar gargalos e garantir que o usuário não fique esperando.

### Traces distribuídos

"Rastro" de uma única requisição à medida que passa pelos diferentes serviços/componentes do sistema. Cada etapa é registrada com timestamps, dados de contexto e eventuais erros. O OpusTPP exporta esses traces via **OpenTelemetry** para ferramentas de observabilidade (Tempo, Jaeger, Grafana Cloud), permitindo visualizar a jornada completa de cada operação.

### Cache

Armazenamento temporário de dados consultados com frequência, evitando ir até a fonte original a cada nova requisição. O OpusTPP usa cache (via componentes Dapr) em dois pontos:

- **Brand Cache:** guarda a lista de instituições participantes do Diretório. **Recomendado manter habilitado** pelo alto tempo de resposta do Diretório de Participantes.
- **Webhook Cache:** opcional, geralmente desativado, útil apenas em volumes altos de notificações.

---

> **Nota:** Para detalhes técnicos sobre a implementação desses conceitos (endpoints, payloads, e fluxos de fallback), consulte a seção de [Funcionamento](../funcionamento/).

[Detentoras]: ../../openFinanceBrasil/perfisParticipacao/detentorDeContas.html
