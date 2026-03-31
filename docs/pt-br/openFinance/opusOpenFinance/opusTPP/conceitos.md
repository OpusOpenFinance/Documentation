---
layout: default
title: Conceitos
parent: "OpusTPP"
nav_order: 1
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/opusTPP/conceitos"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/opusTPP/conceitos"
      lang: "es"
---

## Conceitos Fundamentais

Entender a arquitetura e os fluxos do Open Finance/Insurance é essencial para a correta implementação do **OpusTPP**. Abaixo estão os principais conceitos que norteiam a atuação como Iniciador de Transação de Pagamento (ITP) ou Transmissor de Dados.

<!--## Open Finance vs. Open Insurance

Embora compartilhem a mesma base regulatória (regulamentação do Banco Central do Brasil), existem diferenças cruciais no escopo e nos dados trafegados:

- **Open Finance:** Focado em produtos do sistema financeiro (contas, cartões de crédito, investimentos, câmbio, etc.). O **OpusTPP** atua aqui como **Iniciador de Pagamento (ITP)** e **Transmissor de Dados**.
- **Open Insurance:** Focado em produtos de seguros, previdência complementar aberta e capitalização. Embora o **OpusTPP** seja originalmente uma solução para pagamentos, ele opera em um ecossistema convergente, onde a jornada de contratação de um seguro pode iniciar com um pagamento via Open Finance.-->

## Consentimento

Consentimento é a autorização explícita concedida pelo cliente (usuário final) para que a sua instituição acesse dados ou inicie pagamentos (ITP) em nome dele, junto às detentoras de conta.

- **Solicitar consentimento:** É o processo de redirecionar o usuário para o ambiente da detentora de conta (banco ou seguradora) para que ele autorize, de forma autenticada, os escopos de serviço requisitados.
- **Escopo:** Define exatamente o que a TPP pode fazer (ex: *payments*, *accounts-read*, *credit-cards-read*).
- **Vigência:** O consentimento possui prazo de validade definido na solicitação (geralmente de 3 a 12 meses, dependendo do escopo).

## Revogação de Pagamento vs. Revogação de Consentimento

É fundamental distinguir esses dois eventos, pois impactam de forma diferente o fluxo do negócio:

- **Revogação de Pagamento:**
  - **Ocorre:** Antes da liquidação financeira.
  - **Quem realiza:** O cliente autenticado (ou a TPP, se o fluxo permitir).
  - **Efeito:** Cancela a transação de pagamento específica. O consentimento continua válido para novas transações.
- **Revogação de Consentimento:**
  - **Ocorre:** A qualquer momento.
  - **Quem realiza:** Exclusivamente o cliente junto à detentora de conta (via canal digital do banco/ seguradora).
  - **Efeito:** Invalida **todos** os acessos e permissões associados àquele consentimento. A TPP não consegue mais iniciar pagamentos ou acessar dados até que um novo consentimento seja solicitado e autorizado.

## Jornadas de Iniciação (App-to-App, App-to-Web, Web-to-App)

O método de redirecionamento do usuário para autenticação na detentora de conta varia conforme o ambiente (Aplicativo Móvel vs. Navegador). O **OpusTPP** suporta os principais padrões:

- **App-to-App:** Fluxo entre dois aplicativos nativos.
  - *Funcionamento:* O app da TPP chama o app da detentora de conta via *Deep Link* (URL Scheme ou Android App Links/iOS Universal Links).
  - *Vantagem:* Experiência mais fluida e segura, mantendo o contexto do celular.
- **App-to-Web:** Fluxo que sai de um app nativo e abre o navegador (WebView ou Browser externo).
  - *Funcionamento:* Utilizado quando a detentora não possui app instalado ou como *fallback*.
  - *Atenção:* O uso de WebViews restritas (in-app browser) pode causar falhas de autenticação; recomenda-se o uso do navegador padrão do sistema.
- **Web-to-App:** Fluxo que sai de um site/navegador e tenta abrir um app nativo.
  - *Funcionamento:* Utiliza tentativa de *Deep Link*. Se o app não estiver instalado, a experiência geralmente retorna para o fluxo Web (*fallback*).

## Consentimento vs. Vínculo de Dispositivo

São dois conceitos distintos, mas complementares na segurança da jornada:

- **Consentimento:** É a autorização legal e técnica da detentora de conta. É um registro no ecossistema (geralmente associado ao *userId* ou *CPF*).
- **Vínculo de Dispositivo:** É a associação entre um dispositivo específico (identificado por *fingerprint*, token FCM, ou certificado) e um consentimento ou usuário.
  - *Utilidade:* Permite que, em jornadas otimizadas, o sistema reconheça que aquele dispositivo já possui um consentimento ativo, evitando que o usuário precise reler códigos de validação ou selecionar a conta repetidamente.

## Jornada Otimizada

A Jornada Otimizada (também conhecida como *Optimized Journey*) é um fluxo onde a detentora de conta reconhece o dispositivo da TPP (via vínculo) e o consentimento ativo do cliente, permitindo que o usuário final confirme a transação com o mínimo de interações (geralmente apenas com biometria do próprio dispositivo ou um clique), sem a necessidade de reautenticação com login e senha completos no ambiente da detentora.

*Requisito:* Para que a Jornada Otimizada funcione, é necessário que o **OpusTPP** gerencie corretamente o vínculo de dispositivo e que a detentora de conta suporte essa funcionalidade.

## TPP (Terceira Parte Iniciadora)

No contexto do Open Finance, a TPP é a instituição (sua empresa) que utiliza o **OpusTPP** para se conectar ao ecossistema. O OpusTPP atua como um *software* que implementa os papéis regulatórios de:

- **ITP (Initiator of Transaction Payment):** Responsável por iniciar pagamentos em contas de terceiros, mediante consentimento do pagador.
- **Transmissor de Dados:** Responsável por acessar e transmitir informações de contas, cartões e outros produtos financeiros, mediante consentimento do titular.

---

> **Nota:** Para detalhes técnicos sobre a implementação desses conceitos (endpoints, payloads, e fluxos de fallback), consulte as seções de [Integração](../integracaoDaPlataforma/index.html).
