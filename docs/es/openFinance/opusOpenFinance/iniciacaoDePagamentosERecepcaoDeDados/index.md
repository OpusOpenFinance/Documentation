---
layout: default
title: Iniciación de Pagos y Recepción de Datos
parent: "Opus Open Finance"
nav_order: 6
has_children: true
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/index"
      lang: "pt-br"
    - path: "/Documentation/en/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/index"
      lang: "en"
---

## Cómo navegar por esta documentación

La documentación del Módulo de Iniciación de Pagos está organizada en tres grandes bloques. Use los enlaces a continuación como punto de entrada para cada tema:

### [Conceptos](conceitos.html)

Fundamentos del ecosistema Open Finance y del funcionamiento del Módulo de Iniciación de Pagos. Recomendado para quienes están comenzando.

- [Glosario y Conceptos Fundamentales](conceitos.html): Consentimiento, vinculación de dispositivo, jornadas, perfiles regulatorios

### [Funcionamiento](funcionamento/)

Cómo escribir aplicaciones que realizan Iniciación de Pagos y Recepción de Datos

- [Visión general de los flujos](funcionamento/): Consentimiento, pago, vinculación, jornada optimizada
- [Recepción de Datos — Open Finance](funcionamento/recepcaoDeDados.html)
- [Iniciación de Pago PIX](funcionamento/iniciacaoDePagamento.html)
- [Pagos Automáticos](funcionamento/pagamentoAutomatico.html)
- [Vinculación de Dispositivo (FIDO2)](funcionamento/vinculoDeDispositivo.html)
- [Redireccionamiento App-to-App y Web](funcionamento/redirecionamento.html)
- [Webhooks de Pagos](funcionamento/webhooks.html)
- [Backoffice API](funcionamento/backoffice.html)
- [APIs Internas](funcionamento/apisInternas.html)

### [Configuración](configuracao/)

Etapas de configuración y qué certificados digitales son necesarios para el funcionamiento en el ecosistema del Open Finance Brasil.

- [Visión de Configuración](configuracao/): Etapas a alto nivel;
- [Certificados Regulatorios](configuracao/certificadosRegulatorios.html): BRCAC, BRSEAL, ID_TOKEN_ENC y conversión a JWK.

### Anexos

- [Especificaciones OpenAPI (OAS)](anexos/yml/): Contratos oficiales de cada API expuesta por el Módulo de Iniciación de Pagos

## Módulo de Iniciación de Pagos

El Módulo de Iniciación de Pagos es un middleware especializado que abstrae íntegramente las complejidades regulatorias del **Open Finance Brasil**. Permite que las instituciones actúen como Iniciadoras de Pago (ITP) y Receptoras de Datos sin lidiar directamente con estándares de seguridad, requisitos técnicos o flujos regulatorios.

Su objetivo es simple: permitir que los desarrolladores integren APIs del Open Finance Brasil con la misma facilidad de integración de APIs REST comunes.

> Mientras su aplicación realiza llamadas simples en formato REST (HTTP, JSON, token de acceso), nuestra solución se encarga de toda la capa regulatoria y de seguridad exigida por el Open Finance, como mTLS, FAPI-BR, JWS y consentimientos. En otras palabras: usted se comunica con el Módulo de Iniciación de Pagos como lo haría con cualquier API tradicional — y este traduce esas llamadas al estándar regulatorio del Open Finance Brasil, ocupándose automáticamente de toda la parte compleja y técnica detrás de las integraciones.

## El problema que resuelve el Módulo de Iniciación de Pagos

El Open Finance ofrece un ecosistema rico en datos y servicios, pero presenta desafíos técnicos y regulatorios significativos:

- Implementación de estándares de seguridad rigurosos, como FAPI-BR y uso de certificados específicos;
- Integración obligatoria con el Directorio de Participantes;
- Gestión de múltiples tokens, alcances y ciclos de autenticación;
- Ejecución de los flujos completos de solicitud, aprobación y consumo de consentimientos;
- Mantenimiento continuo de conformidad con los cambios regulatorios;
- Diferencias operativas entre cada Institución Transmisora/Manteniente;
- Alta complejidad para atender los requisitos de ITP y Receptor de Datos;
- Costos elevados y necesidad constante de un equipo especializado.

## Qué hace el Módulo de Iniciación de Pagos

El Módulo de Iniciación de Pagos funciona como un proxy cliente regulatorio entre su aplicación y el ecosistema del Open Finance Brasil. Este:

- Garantiza la adhesión completa a los estándares técnicos y de seguridad exigidos;
- Gestiona tokens, autenticaciones y renovaciones de forma transparente;
- Permite la ejecución de todo el flujo de solicitud, aprobación y consumo de consentimientos;
- Expone APIs REST simples, independientemente de la Institución Destino;
- Orquesta llamadas regulatorias de forma estandarizada y confiable;
- Implementa capas de seguridad, monitoreo y validación exigidas por el regulador;
- Simplifica drásticamente la vida de los equipos de desarrollo.

El producto está compuesto por módulos que pueden adquirirse por separado:

- **Receptor de Datos**
  - Permite solicitar y obtener datos de clientes, incluyendo datos de registro, transacciones, tarjetas y productos de crédito.

- **Iniciador de Transacción de Pago**
  - Admite la iniciación, ejecución y seguimiento de pagos, incluyendo toda la jornada de consentimiento.

## Qué no hace el Módulo de Iniciación de Pagos

Para evitar expectativas incorrectas, es importante aclarar lo que el Módulo de Iniciación de Pagos no se propone hacer:

- No actúa como institución regulada — la responsabilidad regulatoria permanece en la Institución Cliente;
- No sustituye sistemas internos, cores bancarios, plataformas de aseguradoras o lógica de negocio;
- No crea experiencias de usuario final para el consentimiento;
- No garantiza la certificación de la institución en los entornos regulatorios;
- No ejecuta análisis, ni interpreta o transforma datos financieros o de seguros;
- No realiza conciliación, liquidación financiera ni procesamiento propio de transacciones.

El foco del Módulo de Iniciación de Pagos es garantizar conformidad, seguridad y estandarización — no sustituir las decisiones o responsabilidades de la Institución Cliente.

## La propuesta central

En esencia, el Módulo de Iniciación de Pagos transforma APIs regulatorias complejas en integraciones simples, estables y escalables.

Permite que su institución participe en el Open Finance sin necesidad de lidiar con:

- Requisitos de seguridad avanzados;
- Gestión de tokens y certificados;
- Llamadas heterogéneas entre instituciones.

El Módulo de Iniciación de Pagos asume toda esa complejidad para que su equipo pueda enfocarse en el producto, en la experiencia del usuario y en la estrategia del negocio — no en la infraestructura regulatoria subyacente.
