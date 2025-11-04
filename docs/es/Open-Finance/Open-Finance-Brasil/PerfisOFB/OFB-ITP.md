---
layout: default
title: "ITP"
parent: "Perfiles de participación"
nav_order: 5
has_children: true
lang: "es"
alternate_lang:
  - path: "/Documentation/pt-br/Open-Finance/Open-Finance-Brasil/PerfisOFB/OFB-ITP/"
    lang: "pt-br"
  - path: "/Documentation/en/Open-Finance/Open-Finance-Brasil/PerfisOFB/OFB-ITP/"
    lang: "en"
---

## Iniciador de Transacción de Pagos

El Iniciador de Transacción de Pago (ITP) es el perfil de Open Finance autorizado para realizar iniciaciones de pago en el ecosistema. El ITP iniciará jornadas de consentimiento (para realizar pagos) en instituciones participantes de Open Finance que son titulares de cuenta. Este perfil posibilita una serie de nuevos casos de uso, ya que el ITP no necesita ser custodio del dinero en ningún momento durante la transacción y tampoco necesita ser el dueño de la cuenta corriente que realizará la liquidación del pago.

### Medios de Pago en Open Finance

Actualmente, los medios de pago previstos en Open Finance incluyen:

- **Pix**;
- **Boleto**;*
- **Débito en Cuenta**;*
- **TED/TEF**;*
- **Tarjeta de Crédito**.*

{: .nota}
Los elementos marcados con asterisco aún no están disponibles en Open Finance y no tienen previsión de entrada.

### Jornada de Consentimiento

El proceso de autorización para efectuar pagos se realiza a través de una **jornada completa de consentimiento**. Más detalles pueden ser encontrados [aquí][Jornada-Consentimiento].

> Además, el [diagrama de secuencia][Diagrama-Secuencia] ilustra el flujo de consentimiento de acuerdo con cada [API ofrecida por el producto][API-pagos].

### Roadmap Regulatorio

#### Funcionalidades ya disponibles

- **Pago Pix inmediato**;
- **Pago Pix programado**;
- **Recurrencia de pagos programados**;
- **Transferencias automáticas entre cuentas de la misma titularidad** (conocidas como *sweeping accounts*).

#### Funcionalidades previstas

- **Pagos en lote (1:n)**;
- **Pagos sin redirección** (ausencia de redirección al Titular de Cuenta desde la perspectiva del usuario);
- **Pagos recurrentes** (Variable Recurring Payment - VRP);
- **Pix por aproximación**.

El [portal del desarrollador][Portal-Dev] ofrece un calendario con las próximas entregas.

### Plataforma Opus Open Finance

Para iniciar el uso del software, existen algunos pre-requisitos:

1. Completar el proceso de [setup (implantación)][Setup];

2. Haber completado toda la homologación del perfil de Titular de Cuenta. (recomendamos la evaluación de este criterio con el compliance de su institución);

3. Crear la experiencia de usuario para que la jornada de consentimiento sea posible para los clientes. El [Guía de Experiencia del Usuario de Open Finance Brasil][GuiaUX] ofrece una descripción detallada sobre esta jornada;

4. Completar todo el proceso de [onboarding de ITP][OnboardingITP].

{: .destaque}
El módulo de iniciación de pagos de la **Plataforma Opus Open Finance** es completamente autocontenido y no requiere la construcción de una capa de integración. Funcionando de manera autónoma, ofrece APIs que aíslan los detalles específicos de los protocolos de autenticación y seguridad del *Open Finance Brasil* y facilita mucho la construcción de aplicaciones. La descripción de estas APIs puede ser encontrada [aquí (pagos)][API-pagos] y [aquí (pagos automáticos)][API-pagos-automáticos].  

[GuiaUX]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17378535/Guia+de+Experi+ncia+do+Usu+ri
[API-pagos]: ../../../../swagger-ui/index.html?api=OAS-ITP-pagamentos
[API-pagos-automáticos]: ../../../../swagger-ui/index.html?api=OAS-ITP-pagamentos-automaticos
[OnboardingITP]: ../PerfisOFB/OnboardingITP.html
[Setup]: ../../Plataforma-OpusOpenFinance/Implantação/OOF-Implantação.html
[Jornada-Consentimiento]: ../JornadaConsentimento/OFB-JornadaConsentimento.html
[Diagrama-Secuencia]: ../../Plataforma-OpusOpenFinance/ITP/images/consent-sequence.png
[Portal-Dev]: https://openfinancebrasil.atlassian.net/wiki/spaces/DraftOF/calendars
