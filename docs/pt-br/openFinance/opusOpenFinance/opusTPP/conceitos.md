---
layout: default
title: Conceitos
parent: "OpusTPP"
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

Entender a arquitetura e os fluxos do Open Finance é essencial para a correta implementação do **OpusTPP**. Esta seção apresenta os principais conceitos que norteiam a atuação como Iniciador de Transação de Pagamento (ITP) ou Receptor de Dados.

> **Quer mergulhar em uma referência específica?** Veja [Permissões — Open Finance](permissoesOpenFinance.html), [Permissões — Open Insurance](permissoesOpenInsurance.html) e [Modelo de Dados](modeloDeDados.html).

## Consentimento

Consentimento é a autorização explícita concedida pelo cliente (usuário final) para que a sua Instituição acesse dados ou inicie pagamentos (ITP) em nome dele, junto às Instituições Detentoras de Conta.

- **Solicitar consentimento:** É o processo de redirecionar o usuário para o ambiente da Detentora de Conta para que ele autorize, de forma autenticada, os escopos de serviço requisitados.
- **Escopo (`permissions`):** Define exatamente o que a TPP pode fazer (ex.: `payments`, `ACCOUNTS_READ`, `CREDIT_CARDS_ACCOUNTS_BILLS_READ`). O conjunto exato de *scopes* depende do tipo de dado/operação — ver [tabelas de permissões](permissoesOpenFinance.html).
- **Vigência:** O consentimento possui prazo de validade definido na solicitação (`expirationDateTime`, geralmente de 3 a 12 meses ou Indeterminado, dependendo do escopo).
- **Identificadores:** Após criação, o consentimento é identificado por um `consentId` (URN no formato `urn:<brand>:<uuid>`).

### Máquina de estados de consentimento (alto-nível)

| Status | Significado |
|---|---|
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
  - *Funcionamento:* Utilizado quando a detentora não possui app instalado ou como *fallback*.
  - *Atenção:* O uso de WebViews restritas (in-app browser) pode causar falhas de autenticação; recomenda-se o uso do navegador padrão do sistema.
- **Web-to-App:** Fluxo que sai de um site/navegador e tenta abrir um app nativo:
  - *Funcionamento:* Utiliza tentativa de *Deep Link*. Se o app não estiver instalado, a experiência geralmente retorna para o fluxo Web (*fallback*).

## Consentimento vs. Vínculo de Dispositivo

São dois conceitos distintos, mas complementares na segurança da jornada:

- **Consentimento:** É a autorização legal e técnica da detentora de conta. É um registro no ecossistema (geralmente associado ao *userId* ou *CPF*).
- **Vínculo de Dispositivo (Enrollment):** É a associação entre um dispositivo específico (identificado por *fingerprint*, token FCM, ou certificado FIDO2) e um consentimento ou usuário.
  - *Utilidade:* Permite que, em Jornadas como a JSR (Jornada Sem Redirecionamento), o sistema reconheça que aquele dispositivo já possui um consentimento ativo, evitando que o usuário precise efetuar o login na Detentora de Conta repetidamente.
  - *Implementação no OpusTPP:* Usa autenticação **FIDO2/WebAuthn** (biometria, PIN) sob coordenação do regulamento de "Pagamento sem Redirecionamento".

### Estados do Vínculo de Dispositivo

| Status | Significado |
|---|---|
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

## Conceitos do ecossistema Open Finance/Insurance

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

Uma única instituição (organisation) pode ter múltiplos SSAs (um por aplicativo/marca). O SSA é armazenado no banco do OpusTPP — ver [Modelo de Dados](modeloDeDados.html).

### Perfis Regulatórios (`role`)

Ao buscar instituições no Diretório (`GET /participants`), elas vêm classificadas por papel regulador:

| Role | Significado |
|---|---|
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

### FAPI-BR (Financial-grade API — Brasil)

Padrão de segurança baseado no perfil FAPI do OpenID Foundation, adaptado ao Open Finance Brasil. Define requisitos de autenticação mTLS, JWS, encriptação de tokens, e validação de assinaturas. O OpusTPP implementa o perfil completo de forma transparente.

### DCR (Dynamic Client Registration)

Mecanismo pelo qual o OpusTPP **se registra dinamicamente** como cliente nas instituições destino antes de iniciar fluxos. Evita que o cliente precise pré-cadastrar a TPP em cada banco/seguradora.

### BRCAC (BR Certificate — Authentication & Confidentiality)

Certificado regulatório utilizado em conexões **mTLS** para identificar a aplicação cliente e criptografar a comunicação. Possui `use: "enc"` no formato JWK.

### BRSEAL (BR Seal)

Certificado regulatório utilizado para **assinatura** de mensagens JWS entre a TPP e o servidor de autenticação da Detentora. Possui `use: "sig"` no formato JWK.

> Detalhes operacionais sobre geração e conversão para JWK em [Certificados Regulatórios](../configuracao/certificadosRegulatorios.html).

### FIDO2 / WebAuthn

Padrão da W3C para autenticação baseada em credenciais públicas/privadas armazenadas no dispositivo, ativadas por biometria ou PIN. O OpusTPP usa FIDO2 no fluxo de **Vínculo de Dispositivo** (Pagamento sem Redirecionamento). Detalhes em [Vínculo de Dispositivo](../funcionamento/vinculoDeDispositivo.html).

### JWS / JWT

- **JWS** (JSON Web Signature): formato de mensagem assinada digitalmente. Usado em corpos de requisição/resposta regulatórios e em SSAs.
- **JWT** (JSON Web Token): token JWS contendo *claims* (afirmações). Usado em respostas de erro de pagamento (que vêm em JWT, não em JSON puro).

### `RESOURCES_READ`

Permissão **sempre obrigatória** em qualquer agrupamento de consentimento. Habilita a chamada `/resources`, que lista os recursos vinculados ao consentimento e seu status. Veja [Permissões — Open Finance](permissoesOpenFinance.html).

### Agrupamento de Permissões

Conjunto pré-definido de *scopes* que devem ser solicitados juntos para acesso a um produto/categoria. A Detentora **rejeita** consentimentos com permissões divergentes do agrupamento esperado (HTTP 400). Veja [Permissões — Open Finance](permissoesOpenFinance.html) e [Permissões — Open Insurance](permissoesOpenInsurance.html).

### `PAGINATION-KEY`

Chave passada em chamadas paginadas no Open Finance Brasil que permite **iterar 1 hora sem custo adicional** dentro de uma mesma busca. Sem essa chave, cada nova página conta como nova requisição contra o limite regulatório. Detalhes operacionais em [Configuração do Opus Data Receiver](../configuracao/opusDataReceiverCore.html).

---

> **Nota:** Para detalhes técnicos sobre a implementação desses conceitos (endpoints, payloads, e fluxos de fallback), consulte a seção de [Funcionamento](../funcionamento/).
