---
layout: default
title: "App y Web"
parent: "Integración de la Plataforma"
nav_order: 4
has_children: true
lang: "es"
alternate_lang: 
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/appEWeb/index/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/appEWeb/index/"
      lang: "en"
---

## Integración de canales digitales de atención

Cuando una solicitud de creación de consentimiento de otra institución financiera es recibida por la plataforma - ya sea un consentimiento para compartir datos o para realizar un pago - la plataforma activa indirectamente la aplicación móvil del cliente final o el Internet Banking Web, y estos componentes deben estar preparados para manejar esta activación.

Para asegurar que los canales digitales de atención estén preparados, es necesario:

1. Construir las pantallas de la experiencia del usuario, relacionadas con la creación de consentimientos según los canales de autenticación existentes en las instituciones, típicamente Aplicación móvil y/o Internet Banking. La experiencia implementada debe respetar la [Guía de Experiencia del Usuario][GuiaUX] de *Open Finance Brasil*;
2. Realizar la integración de las pantallas con la **Plataforma Opus Open Finance**.

### Canales digitales de atención

Los siguientes canales digitales de atención son previstos por *Open Finance Brasil*:

- Aplicación móvil;
- Internet Banking;
- Pantalla de *Handoff*.

> Cuando la institución financiera no ofrece un canal Web para su cliente (y la solicitud de creación de consentimiento se realizó a través de la Web), se debe mostrar una pantalla de *Handoff*. Esta pantalla deberá contener un *QR Code* que será leído por el cliente a través de un *smartphone* para redireccionar la solicitud de creación de consentimiento a la aplicación móvil de la institución financiera. La **Plataforma Opus Open Finance** incluye una pantalla estándar de *Handoff* que puede ser utilizada por la institución financiera, si es el caso.

### Requisitos de UX

La experiencia del usuario debe respetar una serie de requisitos regulatorios, de manera similar a cómo funciona el Pix actualmente. Hay dos frentes que necesitan ser construidas para la experiencia de usuario.

#### Jornada de consentimiento

La [jornada de consentimiento][JornadaConsentimiento] representa la etapa en la que el cliente final autoriza el consentimiento. La experiencia es muy similar tanto para compartir datos como para pagos, pero hay particularidades que deben ser implementadas. Una vez más, los detalles se pueden encontrar en la [Guía de Experiencia del Usuario][GuiaUX].

#### Gestión del consentimiento

La gestión del consentimiento representa la funcionalidad que permite al cliente final acceder a sus consentimientos de compartir datos o pagos. Esta gestión permite visualizar el historial completo de consentimientos y el poder de revocar/extender un consentimiento.

### Integración con la Plataforma Opus Open Finance

En paralelo a la construcción de las pantallas de la aplicación móvil y/o Internet Banking, también es necesario integrar estos componentes a la plataforma. Las siguientes páginas de esta documentación detallan esta integración, así como el funcionamiento de la pantalla de *Handoff*, en caso de que la institución financiera no ofrezca un canal de autoservicio a través de la Web.

[GuiaUX]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1477279745/v.19.00.01+Guia+de+Experi+ncia+do+Usu+rio+Open+Finance+Brasil
[JornadaConsentimiento]: ../../../Open-Finance-Brasil/JornadaConsentimento/OFB-JornadaConsentimento.html
