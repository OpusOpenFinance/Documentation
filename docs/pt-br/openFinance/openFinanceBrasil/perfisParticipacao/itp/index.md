---
layout: default
title: "ITP"
parent: "Perfis de participação"
nav_order: 5
has_children: true
lang: "pt-br"
alternate_lang: 
    - path: "/Documentation/en/openFinance/openFinanceBrasil/perfisParticipacao/itp/index/"
      lang: "en"
    - path: "/Documentation/es/openFinance/openFinanceBrasil/perfisParticipacao/itp/index/"
      lang: "es"
---

## Iniciador de Transação de Pagamentos

O **Iniciador de Transação de Pagamento (ITP)** é o perfil do Open Finance Brasil autorizado a realizar iniciações de pagamento no ecossistema. O ITP conduz jornadas de consentimento — para a realização de pagamentos — junto a instituições participantes do Open Finance que são Detentoras de Conta. Esse perfil possibilita uma série de novos casos de uso, pois o ITP faz a ponte entre a Instituição e o Cliente, não precisando possuir a custódia dos recursos em nenhum momento da transação e não sendo o titular da conta corrente que realizará a liquidação do pagamento.

### Ecossistema Open Finance - ITP

O perfil de ITP diz respeito às instituições financeiras autorizadas pelo Banco Central a iniciar pagamentos no *Open Finance Brasil* em nome de seus clientes. Para tanto, o ITP obtém o consentimento do usuário pagador e, com base nesse consentimento, instrui a instituição Detentora de Conta a processar a transação.

> A norma regulatória estabelece requisitos de certificação e homologação que precisam ser cumpridos antes de uma instituição poder operar como ITP em produção com sua própria licença. O processo completo está descrito na página de [onboarding do ITP][OnboardingITP].

### Jornada de Consentimento

O processo de autorização para efetuar pagamentos é realizado pelo cliente por meio de uma **jornada completa de consentimento**. Mais detalhes podem ser encontrados [aqui][Jornada-Consentimento].

> O [diagrama de sequência][Diagrama-Sequência] ilustra o fluxo de consentimento de acordo com cada modalidade de pagamento.

### Roadmap Regulatório

#### Funcionalidades já disponíveis

- **Pagamento Pix imediato**;
- **Pagamento Pix agendado**;
- **Pagamento Pix por aproximação**;
- **Recorrência de pagamentos agendados**;
- **Transferências automáticas entre contas de mesma titularidade** (recurso também conhecido como *transferências inteligentes* ou *sweeping accounts*);
- **Pagamentos sem redirecionamento** (ausência do redirecionamento para a Detentora de Conta na perspectiva do usuário).

#### Funcionalidades previstas

- **Pagamentos em lote (1:n)**;
- **Pagamentos recorrentes** (Variable Recurring Payment - VRP - implementado pelo *Pix Automático*).

O [portal do desenvolvedor][Portal-Dev] oferece um calendário com as próximas entregas.

### APIs Regulatórias

#### APIs Vigentes

| **Descrição** | **Link para o Portal do Desenvolvedor** |
| :-----------: | :-------------------------------------: |
| **Iniciação de Pagamento** | [Acesse aqui](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17375943/SV+API+-+Pagamentos) |
| **Iniciação de Pagamentos Automáticos** | [Acesse aqui](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/198410569/SV+API+-+Pagamentos+Autom+ticos) |
| **Iniciação de Pagamento sem Redirecionamento** | [Acesse aqui](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/141557761/SV+API+-+Pagamentos+sem+Redirecionamento) |

### Plataforma Opus Open Finance

Para utilizar a **Plataforma Opus Open Finance** no perfil de ITP, é necessário concluir as seguintes etapas:

1. Completar o processo de [implantação][Setup].
2. Ter completado toda a homologação do perfil de Detentor de Conta. (recomendamos a avaliação desse critério com o compliance de sua instituição)
3. Construir a experiência de usuário para que a jornada de consentimento seja possível para os clientes. O [Guia de Experiência do Usuário do Open Finance Brasil][GuiaUX] traz uma descrição detalhada sobre essa jornada.
4. Completar todo o processo de [onboarding de ITP][OnboardingITP].

[GuiaUX]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1477279745/v.19.00.01+Guia+de+Experi+ncia+do+Usu+rio+Open+Finance+Brasil
[Portal-Dev]: https://openfinancebrasil.atlassian.net/wiki/spaces/DraftOF/calendars
[OnboardingITP]: ./onboardingITP.html
[Setup]: ../../../opusOpenFinance/implantacaoDaPlataforma/index.html
[Jornada-Consentimento]: ../../jornadaConsentimento/index.html
[Diagrama-Sequência]: ../anexos/imagens/itp-consentSequence.png
