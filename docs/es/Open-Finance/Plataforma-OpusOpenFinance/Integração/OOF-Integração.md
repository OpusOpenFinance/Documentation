---
layout: default
title: "Integración de la Plataforma"
parent: "Opus Open Finance"
nav_order: 4
has_children: true
lang: "es"
alternate_lang: 
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/OOF-Integração/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/OOF-Integração/"
      lang: "en"
---

## Integración de la Plataforma con la institución financiera

La **Plataforma Opus Open Finance** actúa como una *interfaz* entre las instituciones financieras y el ecosistema de *Open Finance Brasil*, llevando a cabo todas las actividades inherentes a esta *interfaz* como la implementación de las APIs regulatorias, la creación y gestión de consentimientos y la validación de cada llamada recibida de otras instituciones financieras. La plataforma funciona como una capa que abstrae los aspectos específicos del ecosistema Open Finance e interactúa con los sistemas de la institución financiera para cumplir con los requisitos de las normas regulatorias.

Para llevar a cabo las operaciones implementadas en el ámbito de *Open Finance Brasil*, la plataforma interactúa con componentes de software de la institución financiera cliente en dos momentos distintos:

- En la creación de un consentimiento;
- En la atención de solicitudes provenientes de otras instituciones financieras.

### Integración para creación de un consentimiento

La creación de un consentimiento exige la interacción con el cliente final de la institución financiera. De hecho, lo mismo se aplica a la remoción de consentimientos. Por lo tanto, es necesario integrar los sistemas que implementan los principales canales digitales de atención - típicamente la aplicación móvil y la banca electrónica - a la plataforma. La forma de integrar los canales de atención a la plataforma se detalla [aquí][Integración app-web].

### Integración con los sistemas de retaguardia para la atención de solicitudes

Las solicitudes, a su vez, se realizan a través de llamadas a la API regulatoria realizadas por la institución que está demandando servicios, que pueden ser pedidos de envío de datos de clientes - en el caso de compartir datos - o de formalización de pagos. Para atenderlas, la plataforma realiza todas las validaciones necesarias para asegurar que se trata de solicitudes válidas y que están de acuerdo con los consentimientos asociados a ellas. En cada llamada, después de realizar las validaciones, la plataforma acciona los sistemas de retaguardia de la institución financiera para efectivizar la atención a la solicitud. Este accionamiento se realiza a través de una *capa de integración* (o *integration layer*).

El enfoque de concentrar la integración entre la plataforma y los sistemas de retaguardia de la institución financiera en una capa distinta proporciona aislamiento funcional entre los componentes, garantizando que la solución mantenga una misma base de implementación para todos los clientes que la utilizan. Las características específicas de los sistemas de retaguardia de cada institución financiera se contienen en esta capa. Naturalmente, hay un incentivo económico para esto: el costo de mantenimiento evolutivo de la plataforma se reparte entre todos los clientes que utilizan la plataforma.

En términos generales, las solicitudes de *Open Finance Brasil* se dividen en dos categorías distintas:

- Consultas a datos de clientes;
- Realización de pagos.

Dadas las características específicas de cada categoría de solicitudes, la plataforma utiliza modelos de integración distintos para cada una. En ambos casos, **es necesaria la construcción de artefactos de software** que realizarán la interacción entre la plataforma y los sistemas de retaguardia de la institución financiera.

En el caso de la integración de datos, necesaria para el [perfil *transmisor de datos*][Transmisor], el detalle del modelo de integración puede encontrarse [**en este enlace**][Capa de integración].

En el caso de pagos, necesario para el [perfil *tenedor de cuentas*][Tenedor], el detalle del modelo de integración puede encontrarse [**en este enlace**][Conectores de Pago].

[Capa de Integración]: ./CamadaIntegração.html
[Conectores de Pago]: ./Conectores-Pagto.html
[Integración app-web]: ./App-e-Web.html
[Transmisor]: ../../Open-Finance-Brasil/PerfisOFB/OFB-Transmissor.html
[Tenedor]: ../../Open-Finance-Brasil/PerfisOFB/OFB-Detentor.html
