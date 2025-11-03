---
layout: default
title: "Titular de Cuenta"
parent: "Perfiles de participación"
nav_order: 3
lang: "es"
alternate_lang:
  - path: "/Documentation/pt-br/Open-Finance/Open-Finance-Brasil/PerfisOFB/OFB-Detentor/"
    lang: "pt-br"
  - path: "/Documentation/en/Open-Finance/Open-Finance-Brasil/PerfisOFB/OFB-Detentor/"
    lang: "en"
---

## Titular de Cuenta

El perfil de participación como **Titular de Cuenta** en el *Open Finance Brasil* representa a la institución que recibe solicitudes de pago de un **Iniciador de Transacción de Pago (ITP)**. Este perfil en la **Plataforma Opus Open Finance** es responsable de cumplir con todas las exigencias regulatorias establecidas por el Banco Central.

---

### Ecosistema Open Finance - Titular de Cuenta

Los Titulares de Cuenta son las instituciones donde los clientes tienen cuentas de depósito a la vista, cuentas de ahorro y cuentas de pago prepagas, que pueden ser accesadas en el contexto del *Open Finance Brasil* para procesar iniciaciones de pago. Quienes envían las solicitudes de pago son instituciones homologadas como *iniciadores de transacción de pago*.

---

### Medios de Pago en Open Finance

Actualmente, los medios de pago previstos en Open Finance incluyen:

- **Pix**;
- **Boleto**;*
- **Débito en Cuenta**;*
- **TED/TEF**;*
- **Tarjeta de Crédito**.*

*Los elementos marcados con asterisco aún no están disponibles en Open Finance y no tienen previsión de entrada.*

---

### Jornada de Consentimiento

El proceso de autorización para efectuar pagos es llevado a cabo por el cliente a través de una **jornada completa de consentimiento**. Más detalles pueden ser encontrados [aquí](../JornadaConsentimento/OFB-JornadaConsentimento.html).

---

### Roadmap Regulatorio

#### Funcionalidades ya disponibles

- **Pago Pix inmediato**;
- **Pago Pix programado**;
- **Recurrencia de pagos programados**;
- **Transferencias automáticas entre cuentas de la misma titularidad** (recurso también conocido como *sweeping accounts* o *transferencias inteligentes*).

#### Funcionalidades previstas

- **Pagos en lote (1:n)**;
- **Pagos sin redirección** (ausencia de redirección al Titular de Cuenta desde la perspectiva del usuario);
- **Pagos recurrentes** (Variable Recurring Payment - VRP - implementado por el *Pix Automático*);
- **Pix por aproximación**.

El [portal del desarrollador](https://openfinancebrasil.atlassian.net/wiki/spaces/DraftOF/calendars) ofrece un calendario con las próximas entregas.

---

### APIs Regulatorias

#### APIs Vigentes

|**Descripción**                     | **Enlace al Portal del Desarrollador**                           |
|------------------------------------|:----------------------------------------------------------------:|
|**Iniciación de Pago**              |[Acceder aquí](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17375943/SV+API+-+Pagamentos) |
|**Iniciación de Pagos Automáticos** |[Acceder aquí](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/198410569/SV+API+-+Pagamentos+Autom+ticos) |
|**Iniciación de Pago**              |[Acceder aquí](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/141557761/SV+API+-+Pagamentos+sem+Redirecionamento) |

### Plataforma Opus Open Finance

Para utilizar la **Plataforma Opus Open Finance** para cumplir con las exigencias regulatorias del perfil de participación Titular de Cuenta, es necesario completar las siguientes etapas:

1. Completar el proceso de [implantación](../../Plataforma-OpusOpenFinance/Implantação/OOF-Implantação.html).
2. Construir la experiencia del usuario para aplicación y Banca por Internet (si aplica). [La guía de experiencia del usuario](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17378535/Guia+de+Experi+ncia+do+Usu+rio) presenta los detalles del flujo de interacción con el usuario final que los canales digitales de atención deben implementar para cumplir con las normas regulatorias.
3. Construir la capa de integración con los sistemas de respaldo de pagos.
