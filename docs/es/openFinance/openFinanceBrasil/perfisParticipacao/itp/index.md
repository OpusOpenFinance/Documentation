---
layout: default
title: "ITP"
parent: "Perfiles de participación"
nav_order: 5
has_children: true
lang: "es"
alternate_lang: 
    - path: "/Documentation/pt-br/openFinance/openFinanceBrasil/perfisParticipacao/itp/index/"
      lang: "pt-br"
    - path: "/Documentation/en/openFinance/openFinanceBrasil/perfisParticipacao/itp/index/"
      lang: "en"
---

## Iniciador de Transacción de Pagos

El **Iniciador de Transacción de Pagos (ITP)** es el perfil de Open Finance Brasil autorizado a realizar iniciaciones de pago en el ecosistema. El ITP conduce jornadas de consentimiento — para la realización de pagos — junto a instituciones participantes de Open Finance que son Detentoras de Cuenta. Este perfil posibilita una serie de nuevos casos de uso, pues el ITP hace el puente entre la Institución y el Cliente, sin necesidad de poseer la custodia de los recursos en ningún momento de la transacción y sin ser el titular de la cuenta corriente que realizará la liquidación del pago.

### Ecosistema Open Finance - ITP

El perfil de ITP se refiere a las instituciones financieras autorizadas por el Banco Central para iniciar pagos en *Open Finance Brasil* en nombre de sus clientes. Para ello, el ITP obtiene el consentimiento del usuario pagador y, con base en ese consentimiento, instruye a la institución Detentora de Cuenta para que procese la transacción.

> La norma regulatoria establece requisitos de certificación y homologación que deben cumplirse antes de que una institución pueda operar como ITP en producción con su propia licencia. El proceso completo está descrito en la página de [onboarding del ITP][OnboardingITP].

### Jornada de Consentimiento

El proceso de autorización para efectuar pagos lo realiza el cliente a través de una **jornada completa de consentimiento**. Más detalles pueden encontrarse [aquí][Jornada-Consentimento].

> El [diagrama de secuencia][Diagrama-Sequência] ilustra el flujo de consentimiento de acuerdo con cada modalidad de pago.

### Roadmap Regulatorio

#### Funcionalidades ya disponibles

- **Pago Pix inmediato**;
- **Pago Pix programado**;
- **Pago Pix por aproximación**;
- **Recurrencia de pagos programados**;
- **Transferencias automáticas entre cuentas de la misma titularidad** (recurso también conocido como *transferencias inteligentes* o *sweeping accounts*);
- **Pagos sin redireccionamiento** (ausencia del redireccionamiento hacia la Detentora de Cuenta desde la perspectiva del usuario).

#### Funcionalidades previstas

- **Pagos en lote (1:n)**;
- **Pagos recurrentes** (Variable Recurring Payment - VRP - implementado mediante el *Pix Automático*).

El [portal del desarrollador][Portal-Dev] ofrece un calendario con las próximas entregas.

### APIs Regulatorias

#### APIs Vigentes

| **Descripción** | **Enlace al Portal del Desarrollador** |
| :-------------: | :------------------------------------: |
| **Iniciación de Pago** | [Acceda aquí](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17375943/SV+API+-+Pagamentos) |
| **Iniciación de Pagos Automáticos** | [Acceda aquí](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/198410569/SV+API+-+Pagamentos+Autom+ticos) |
| **Iniciación de Pago sin Redireccionamiento** | [Acceda aquí](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/141557761/SV+API+-+Pagamentos+sem+Redirecionamento) |

### Plataforma Opus Open Finance

Para utilizar la **Plataforma Opus Open Finance** en el perfil de ITP, es necesario concluir las siguientes etapas:

1. Completar el proceso de [implantación][Setup].
2. Haber completado toda la homologación del perfil de Detentor de Cuenta. (recomendamos la evaluación de este criterio con el compliance de su institución)
3. Construir la experiencia de usuario para que la jornada de consentimiento sea posible para los clientes. La [Guía de Experiencia del Usuario de Open Finance Brasil][GuiaUX] trae una descripción detallada sobre esta jornada.
4. Completar todo el proceso de [onboarding de ITP][OnboardingITP].

[GuiaUX]: https://guia-de-ux-open-finance-brasil.scroll.site/guia-de-experi-ncia-open-finance-brasil/v.22.00.01
[Portal-Dev]: https://openfinancebrasil.atlassian.net/wiki/spaces/DraftOF/calendars
[OnboardingITP]: ./onboardingITP.html
[Setup]: ../../../opusOpenFinance/implantacaoDaPlataforma/index.html
[Jornada-Consentimento]: ../../jornadaConsentimento/index.html
[Diagrama-Sequência]: ../anexos/imagens/itp-consentSequence.png
