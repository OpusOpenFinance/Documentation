---
layout: default
title: "Plataforma Opus Open Finance"
nav_order: 1
has_children: true
lang: "es"
alternate_lang: 
    - path: "/Documentation/pt-br/index/"
      lang: "pt-br"
    - path: "/Documentation/en/index/"
      lang: "en"
---

# Documentación de la Plataforma Opus Open Finance

¡Bienvenido a la documentación de la **Plataforma Opus Open Finance**!

Aquí encontrará detalles sobre la solución ideal para que su institución se homologue en el ecosistema del *Open Finance Brasil*. El producto de **Opus Software** es responsable de garantizar la buena operación de su institución frente a las demandas exigidas por el regulador, además de garantizar la actualización de nuevas versiones y las evoluciones de funcionalidades definidas por las normas regulatorias.

La plataforma fue diseñada para esclarecer toda la complejidad regulatoria del *Open Finance Brasil*, la capa que no aporta el diferencial para su empresa. De esta forma, usted puede enfocarse en **sus objetivos estratégicos**.

Al mismo tiempo que ofrece cobertura completa de las exigencias regulatorias para todos los perfiles de participación en el *Open Finance Brasil*, la **Plataforma Opus Open Finance** dispone también de módulos opcionales que permiten ir más allá de lo regulatorio, estableciendo una base para implementar estrategias que maximicen el retorno sobre la inversión de las instituciones financieras y posibiliten extraer el mejor valor posible de su participación en el ecosistema.

---

## Introducción a la Plataforma Opus Open Finance

La **Plataforma Opus Open Finance** es una solución de software diseñada para atender integralmente las exigencias regulatorias establecidas por el Banco Central de Brasil. Este documento ofrece una visión general de cómo nuestra plataforma puede ayudar a su institución financiera a integrarse y operar eficientemente dentro del Open Finance.

La plataforma actúa como un *middleware* esencial que permite a su institución operar dentro de los cuatro perfiles del Open Finance:

- **Detentor de Cuenta**
- **Transmisor de Datos**
- **Iniciador de Transacción de Pago**
- **Receptor de Datos**

---

## Estructura de este Documento

Este documento está organizado para proporcionar una visión general sobre los conceptos involucrados en el Open Finance y sobre los detalles técnicos necesarios para la adopción de la **Plataforma Opus Open Finance**. También se abordan los aspectos de implantación para cada perfil de participante del *Open Finance Brasil*. Para un detalle técnico, la documentación también contempla diagramas de secuencia y la descripción de APIs en el estándar *Open API Specification*.

---

## Guía de lectura

Esta sección fue creada para orientar a nuevos clientes que están evaluando o iniciando la adopción de la **Plataforma Opus Open Finance** en los perfiles de **Iniciador de Transacción de Pago (ITP)** y **Receptor de Datos**. Para cada perfil, los enlaces a continuación están organizados en el orden recomendado de lectura — desde el entendimiento regulatorio hasta los detalles técnicos de operación.

---

### Iniciador de Transacción de Pago (ITP)

El ITP es el perfil que permite a su institución iniciar pagos en nombre de sus clientes. Es el perfil central para casos de uso como billeteras digitales, plataformas de pago y agregadores financieros.

#### 1. Entendiendo el perfil y el ecosistema

- [Qué es el perfil ITP y cómo encaja en el Open Finance](openFinance/openFinanceBrasil/perfisParticipacao/itp/index.html) — visión general del papel del ITP, medios de pago y roadmap regulatorio.
- [El ecosistema del Open Finance Brasil](openFinance/openFinanceBrasil/ecossistema/index.html) — cómo funciona el ecosistema y cuáles son los perfiles participantes.
- [Jornada de Consentimiento para Pagos](openFinance/openFinanceBrasil/jornadaConsentimento/index.html) — cómo el usuario autoriza un pago y cómo esta jornada se conecta con el papel del ITP.

#### 2. Requisitos regulatorios y certificaciones

- [Certificaciones y Certificados](openFinance/openFinanceBrasil/certificacoesECertificados.html) — el ITP necesita la **certificación OpenID RP** (*Relying Parties*) y el **Certificado de Autenticación**. La página detalla qué exige cada uno, cómo obtenerlos y cuáles autoridades certificadoras están homologadas.

#### 3. Licencia propia vs. licencia compartida

Un punto decisivo para nuevos clientes es la elección entre usar su propia licencia o utilizar la licencia de un proveedor.

En caso de utilizar la licencia propia, el cliente debe realizar el [Onboarding del ITP](openFinance/openFinanceBrasil/perfisParticipacao/itp/onboardingITP.html), compuesto por:

- Autorización por el Banco Central;
- Etapa prehomologatoria;
- Etapa homologatoria del Open Finance.

En caso de que el cliente utilice la licencia de un proveedor, el proceso es más simple, bastando la integración con la Plataforma Opus Open Finance.

#### 4. Tipos de pago soportados

- [Iniciación de Pago Pix](openFinance/opusOpenFinance/opusTPP/funcionamento/iniciacaoDePagamento.html) — pago inmediato y programado. Detalla los endpoints de consentimiento y de pago, el comportamiento esperado en caso de éxito y error, y los códigos de error más comunes.
- [Pago Automático (Pix Automático)](openFinance/opusOpenFinance/opusTPP/funcionamento/pagamentoAutomatico.html) — consentimientos recurrentes para débitos periódicos (suscripciones, mensualidades, cuotas). Soporta las versiones v1 y v2 de la API regulatoria.
- [Escenarios de pago](openFinance/opusOpenFinance/integracaoDaPlataforma/pagamentos/cenariosPagamentos.html) — casos de uso prácticos y combinaciones de tipos de pago.

#### 5. Flujos técnicos y redireccionamiento

- [Funcionamiento general del OpusTPP](openFinance/opusOpenFinance/opusTPP/funcionamento/index.html) — visión de los flujos de negocio: listado de participantes, creación de consentimiento, redireccionamiento y consulta de estado.
- [Redireccionamiento App-to-App y Web](openFinance/opusOpenFinance/opusTPP/funcionamento/redirecionamento.html) — cómo el usuario es enviado a la Detentora de Cuenta para autorizar el pago y retorna al entorno del ITP.
- [Webhooks de pagos](openFinance/opusOpenFinance/opusTPP/funcionamento/webhooks.html) — cómo recibir notificaciones asíncronas sobre cambios de estado de los pagos.

#### 6. Implantación e integración

- [Implantación de la Plataforma](openFinance/opusOpenFinance/implantacaoDaPlataforma/index.html) — el roadmap de implantación conducido por Opus: kickoff, configuración de entornos, certificación OpenID, integración de las pantallas de la jornada de consentimiento y capa de integración.
- [Integración de Pagos](openFinance/opusOpenFinance/integracaoDaPlataforma/pagamentos/index.html) — detalles técnicos de la integración de la capa de pagos con los sistemas de retaguardia.

---

### Receptor de Datos

El Receptor de Datos es el perfil que permite a su institución solicitar y obtener datos financieros de clientes de otras instituciones (Transmisoras de Datos), con el consentimiento del propio cliente. Casos de uso típicos incluyen agregadores financieros, plataformas de crédito y gestión de patrimonio.

#### 1. Entendiendo el perfil y los datos disponibles

- [Qué es el perfil Receptor de Datos](openFinance/openFinanceBrasil/perfisParticipacao/receptorDeDados.html) — visión general del papel del Receptor, los datos que pueden compartirse (catastrales, cuenta corriente, tarjeta, crédito, cambio e inversiones) y los prerrequisitos de utilización.
- [El ecosistema del Open Finance Brasil](openFinance/openFinanceBrasil/ecossistema/index.html) — cómo Receptor y Transmisor se complementan dentro del ecosistema.
- [Jornada de Consentimiento para Compartición de Datos](openFinance/openFinanceBrasil/jornadaConsentimento/index.html) — cómo el usuario autoriza la compartición y las diferencias respecto a la jornada de pago (plazo del consentimiento, alcances, renovación).

#### 2. Requisitos regulatorios y certificaciones

- [Certificaciones y Certificados](openFinance/openFinanceBrasil/certificacoesECertificados.html) — al igual que el ITP, el Receptor necesita la **certificación OpenID RP** (*Relying Parties*) y el **Certificado de Autenticación**. La tabla de necesidad de certificados por perfil ayuda a identificar exactamente qué contratar.

#### 3. Licencia propia vs. licencia compartida

Un punto decisivo para nuevos clientes es la elección entre usar su propia licencia o utilizar la licencia de un proveedor.

En caso de utilizar la licencia propia, el cliente debe realizar el [Onboarding del ITP](openFinance/openFinanceBrasil/perfisParticipacao/itp/onboardingITP.html), compuesto por:

- Autorización por el Banco Central;
- Etapa prehomologatoria;
- Etapa homologatoria del Open Finance.

En caso de que el cliente utilice la licencia de un proveedor, el proceso es más simple, bastando la integración con la Plataforma Opus Open Finance.

#### 4. Datos disponibles para recepción

- [Recepción de Datos — funcionamiento y endpoints](openFinance/opusOpenFinance/opusTPP/funcionamento/recepcaoDeDados.html) — endpoints de consentimiento (creación, consulta, revocación, renovación) y los aproximadamente 78 proxies regulatorios organizados por familia: clientes, cuentas, tarjeta de crédito, operaciones de crédito, cambio e inversiones.
- [Compartición de Datos — visión de integración](openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/index.html) — cómo se organizan los datos recibidos, por producto financiero.
- [Consentimiento Compartido — Recepción de Datos](openFinance/opusOpenFinance/consentimentoCompartilhado/recepcaoDeDados.html) — gestión del ciclo de vida de los consentimientos de datos desde la perspectiva del producto.

#### 5. Flujos técnicos y redireccionamiento

- [Funcionamiento general del OpusTPP](openFinance/opusOpenFinance/opusTPP/funcionamento/index.html) — los flujos de consentimiento de datos siguen la misma lógica general del ITP (listado de participantes → creación → redireccionamiento → consulta), con diferencias en los alcances y en la vigencia.
- [Redireccionamiento App-to-App y Web](openFinance/opusOpenFinance/opusTPP/funcionamento/redirecionamento.html) — cómo el usuario es enviado a la Transmisora para autorizar la compartición y retorna al entorno del Receptor.

#### 6. Implantación e integración

- [Implantación de la Plataforma](openFinance/opusOpenFinance/implantacaoDaPlataforma/index.html) — el proceso de implantación es el mismo descrito para el ITP. Cabe destacar que para el perfil Receptor **no es necesario construir una capa de integración con sistemas de retaguardia** — la integración ocurre solamente en las pantallas de la jornada de consentimiento.

---

## Sobre Opus Software

Opus Software es una empresa de desarrollo de software que actúa desde hace 38 años en el mercado. A lo largo de su historia, la empresa siempre estuvo involucrada con proyectos de alto valor agregado, gran volumen transaccional y con requisitos exigentes en términos de desempeño, calidad y plazos agresivos. El principal segmento de actuación de la empresa es el mercado financiero, atendiendo a bancos, instituciones de pago, empresas de medios de pago y aseguradoras. La empresa actúa también junto a empresas de retail, especialmente atendiendo las demandas de sus áreas financieras y de atención.

En su trayectoria, Opus Software también ha desarrollado soluciones propias. En su origen, la empresa desarrolló protocolos de comunicación y software básico, posteriormente construyendo una oferta de automatización bancaria que funcionó por diversos años en varias instituciones financieras del mercado nacional. En el año 2020, la empresa creó una unidad de negocios orientada al Open Finance, construyendo la solución Opus Open Finance, que es utilizada actualmente por diversas instituciones financieras destacadas del escenario brasileño.

Uniendo su vocación en la prestación de servicios de desarrollo de software personalizado con la capacidad de su equipo de construir sistemas distribuidos de alto desempeño, confiabilidad y resiliencia, la oferta de la **Plataforma Opus Open Finance** agrega la estandarización demandada por las reglas regulatorias del *Open Finance Brasil* con la capacidad de adaptación a las necesidades específicas de las instituciones financieras.

---

## Soporte y Asistencia

Sabemos que la implantación de una nueva plataforma de software puede traer desafíos únicos. Por eso, nuestro equipo de soporte está listo para asistirlo en cada etapa del proceso.

Si tiene dudas o necesita asistencia técnica, **no dude en ponerse en contacto con el *Delivery Manager* de Opus Software designado a su institución**. Estamos aquí para garantizar que su experiencia con la **Plataforma Opus Open Finance** sea tranquila y exitosa.
