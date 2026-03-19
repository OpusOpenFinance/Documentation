---
layout: default
title: Opus Data Receiver
parent: "Opus Open Finance"
nav_order: 6
lang: "es"
alternate_lang:
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/index/"
      lang: "en"
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/index/"
      lang: "pt-br"
---

## Opus Data Receiver

El Opus Data Receiver (ODR) es una plataforma especializada en recibir, organizar y mantener actualizados los datos financieros compartidos a través del Open Finance Brasil. Fue creado para resolver un desafío central para quienes operan con información regulada: ¿cómo garantizar acceso continuo, confiable y dentro de las reglas a datos que cambian constantemente y dependen de múltiples instituciones financieras?

### El problema que resuelve el ODR

El ecosistema de Opus Open Finance ofrece acceso a una amplia variedad de datos, pero presenta importantes desafíos técnicos:

- Límites estrictos de llamadas por Institución, Producto y Cliente Final;
- Dificultad para controlar cuándo y cómo actualizar los datos sin exceder esos límites;
- Latencia e indisponibilidad puntual de las Instituciones Transmisoras;
- Complejidad para saber qué recursos siguen vigentes, fueron modificados o dejaron de existir;
- Costos elevados para mantener infraestructura propia de sincronización y almacenamiento;

El resultado: sin un intermediario especializado, suele haber inestabilidad, gasto desordenado de fichas regulatorias, datos desactualizados y fricción en la experiencia del usuario final.

El ODR fue creado para eliminar este problema.

### Qué hace el ODR

El ODR funciona como una capa inteligente entre su sistema y el Open Finance. Él:

- Mantiene una copia organizada y actualizada de los datos autorizados mediante consentimiento;
- Realiza actualizaciones periódicas configurables por Producto y Subproducto;
- Responde rápidamente con datos almacenados, incluso cuando la Transmisora está indisponible;
- Permite consultas bajo demanda (*a caliente*) cuando se necesita una actualización inmediata;
- Maneja toda la complejidad de gestión de consentimientos, validación de recursos y flujo operativo;
- Expone una API unificada y estable, independientemente de la Institución Transmisora;
- Con esto, sus sistemas pasan a consumir datos del Open Finance de manera simple, predecible y confiable.

### Qué NO hace el ODR

Para evitar expectativas incorrectas, es importante entender lo que el ODR NO se propone hacer:

- **NO** crea experiencias de usuario final para la recolección de consentimientos;
- **NO** reemplaza a la Institución Transmisora — sino que depende de la información proporcionada por ella;
- **NO** ignora los límites operativos regulatorios ni fuerza actualizaciones más allá de lo permitido;
- **NO** altera, interpreta ni transforma datos financieros — sino que los replica y los mantiene actualizados;
- **NO** ejecuta recomendaciones financieras, análisis de riesgo ni decisiones de crédito;
- **NO** dispara búsquedas automáticas infinitas; sigue estrictamente el calendario configurado por el cliente.

El enfoque del ODR es la gobernanza, actualización y disponibilidad de los datos — no la aplicación de lógica de negocio sobre ellos.

### La propuesta central

En esencia, el ODR transforma el Open Finance en una fuente estable, continua y predecible de datos.

Permite que su sistema dependa de esta información sin necesidad de lidiar con:

- Límites regulatorios;
- Sincronización;
- Tratamiento de errores de las Transmisoras;
- Caídas e inestabilidades;
- Lógica de actualización;
- Organización de Productos y Subproductos.

El ODR se encarga de todo esto para que usted pueda enfocarse en la estrategia de su producto y realice los mejores análisis con los datos obtenidos.
