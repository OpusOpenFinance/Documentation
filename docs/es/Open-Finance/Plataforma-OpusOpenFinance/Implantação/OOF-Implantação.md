---
layout: default
title: "Implementación de la Plataforma"
parent: "Opus Open Finance"
nav_order: 3
has_children: true
lang: "es"
alternate_lang:
  - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Implantação/OOF-Implantação/"
    lang: "pt-br"
  - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Implantação/OOF-Implantação/"
    lang: "en"
---

## Implementación de la Plataforma

El proceso de implementación de la **Plataforma Opus Open Finance** sigue una secuencia de etapas bien definidas que incluyen desde la correcta configuración de los entornos de ejecución necesarios hasta la entrada efectiva en producción. El equipo de Opus acompaña todos los pasos de la implementación, que se presentarán a continuación, de manera de garantizar el éxito de cada etapa.

Durante la implementación, un **Delivery Manager** del equipo de Opus es designado para gestionar el proceso de punta a punta, manteniendo el contacto continuo con el cliente. Después de la implementación, Opus y el cliente deberán definir quiénes serán los puntos focales para el día a día de la relación, tanto para acompañar la operación y el debido cumplimiento de los SLAs regulatorios como para evaluar e implementar nuevas exigencias regulatorias.

Un punto importante a resaltar es que las etapas más laboriosas del proceso de implementación son aquellas relacionadas a la integración de la **Plataforma Opus Open Finance** a los sistemas de respaldo y canales de atención (aplicación móvil y Web Internet Banking) de la institución financiera. Tales etapas exigen el desarrollo de nuevos artefactos de software y la adaptación de las aplicaciones de atención a los clientes. En la documentación, existen secciones específicas que detallan las etapas de integración necesarias para cada perfil de participación de la institución financiera en el *Open Finance Brasil*.

---

## Roadmap de Implementación

![Roadmap](./images/implantação.png)

### 1. **Kickoff**

- Presentación del plan de proyecto con detalle de actividades y cronograma;
- Definición del equipo necesario para cada etapa del proceso;
- Introducción al equipo de implementación.

---

### 2. **Configuración de los Entornos**

- Provisión de los entornos:
  - Desarrollo;
  - Homologación;
  - Producción.
- Configuración de la **Plataforma Opus Open Finance** en los entornos;
- Configuración del *sandbox* del directorio de participantes del Open Finance Brasil, que es el entorno seguro de pruebas del ecosistema enfocado en la realización de pruebas de integración.

---

### 3. **Certificación OpenID**

- Ejecución de pruebas para validación del entorno de homologación;
- Preparación de las evidencias para envío a OpenID ([certificaciones RP y OP](../../Open-Finance-Brasil/OFB-Certificações.html));
- Efectuación del pago de la tasa de certificación.
- Publicación de la institución en el [sitio oficial de OpenID][Site-OpenID].

---

### 4. **Integración de las Pantallas**

- Construcción de las pantallas de la [jornada de consentimiento](../../Open-Finance-Brasil/JornadaConsentimento/OFB-JornadaConsentimento.html):
  - Para web, aplicación y handoff (si es necesario);
  - Según la [guía de experiencia del usuario](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1477279745/v.19.00.01+Guia+de+Experi+ncia+do+Usu+rio+Open+Finance+Brasil) del *Open Finance Brasil*.
- Ejecución de pruebas de la jornada de consentimiento;
- Integración completa de la jornada en los canales de la institución.

---

### 5. **Layer de Integración**

- Integración de los sistemas de respaldo de la institución al producto, conforme el [perfil de participación de la institución financiera](../../Open-Finance-Brasil/PerfisOFB/OFB-Perfis.html). Típicamente, [involucra la construcción del *layer de integración*](../Integração/index.html) adaptado a los sistemas de respaldo de la institución.
- **Nota:** Normalmente, no es necesario adaptar los sistemas de respaldo en sí, sino mapear la forma de extracción de la información referente a cada producto financiero ofrecido por la institución (en el caso del perfil transmisor de datos), o la forma de realizar pagos y consultar el resultado de esas operaciones (en el caso del perfil titular de cuenta). La capa de integración funciona justamente como un adaptador entre los formatos internos de los sistemas de respaldo y aquellos exigidos por el *Open Finance Brasil*.

---

### 6. **Migración**

- Migración de consentimientos y DCRs a la nueva base del producto;
- Necesaria solo para instituciones que ya participan del Open Finance con otra solución o tecnología propia.

---

### 7. **Configuraciones Finales**

- Pruebas de la jornada completa con layer de integración y pantallas listas;
- Ejecución de pruebas funcionales;
- Configuración del directorio de participantes de producción.

---

### 8. **Certificados Digitales**

- Adquisición de los [certificados digitales](../../Open-Finance-Brasil/OFB-Certificações.html);
- Registro de los certificados en el directorio.

---

### 9. **Go-Live**

- Inicio de la monitorización de la solución;
- Envío de informes regulatorios.

[Site-OpenID]: https://openid.net/certification/#FAPI_OPs
