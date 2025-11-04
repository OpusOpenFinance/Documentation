---
layout: default
title: "Compartición de Datos"
parent: "Integración de la Plataforma"
nav_order: 2
has_children: true
lang: "es"
alternate_lang: 
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/CamadaIntegração/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/CamadaIntegração/"
      lang: "en"
---

## Compartición de datos

El perfil de participación de *transmisor de datos*, en el pilar de compartición de datos del *Open Finance Brasil*, exige que la institución financiera sea capaz de atender solicitudes de datos provenientes de otras instituciones participantes. Antes de que otra institución financiera pueda realizar solicitudes de datos referentes a los clientes de la transmisora, ese cliente debe haber autorizado previamente la compartición de sus datos, lo que se hace mediante un **consentimiento de compartición de datos**.

Como ya se presentó, la **Plataforma Opus Open Finance** realiza la gestión de consentimientos activos y también verifica la validez de las solicitudes recibidas. Esta verificación incluye evaluar si la solicitud de datos enviada por la institución receptora - que siempre incluye un identificador de consentimiento - es un consentimiento activo y también si autoriza la compartición de los datos que se están solicitando. Por ejemplo, un cliente en teoría podría compartir sus datos de registro y de tarjeta de crédito, pero no sus datos de cuenta corriente o de préstamos.

Una vez realizada la verificación y validada la solicitud, la plataforma realizará una llamada a la *capa de integración* para obtener los datos que se están solicitando. Es precisamente esta capa de integración, responsable de la interacción con los sistemas de backend de la institución transmisora, la que necesita ser construida para que la plataforma pueda entrar en operación.

Para realizar esta integración y mantener una clara división de responsabilidades, la plataforma define un conjunto de APIs REST que son activadas por ella para atender solicitudes asociadas a cada producto financiero ofrecido por la institución. Las APIs están divididas por los diferentes productos financieros cubiertos por el alcance del *Open Finance Brasil*.

La figura a continuación presenta el esquema general del modelo.

---

![Imagen de la Capa de Integración][Imagen de la Capa de Integración]

---

Cabe destacar que la institución no necesariamente ofrece todos los productos previstos por el alcance completo del *Open Finance Brasil* y, por lo tanto, solo necesitará implementar el subconjunto de APIs asociado a los productos que ofrece.

Algunas de las características principales de la capa de integración por construir son:

- No necesita (y no debe) abordar la validez de las solicitudes, ya que la plataforma ya ha realizado todas las validaciones necesarias;
- Debe ser capaz de atender múltiples solicitudes simultáneamente (en teoría, no hay límite para el número de solicitudes por segundo que debe atender);
- Debe ofrecer un tiempo de respuesta compatible con el nivel de servicio exigido por la regulación. Los tiempos de respuesta máximos exigidos por el regulador para cada tipo de solicitud pueden encontrarse [**en la documentación oficial del Open Finance Brasil**][Tiempos de Respuesta].

{: .importante}
Debe considerarse que la Plataforma Opus Open Finance reservará hasta el 40% del tiempo de respuesta para las validaciones y atención de cada solicitud.

A continuación, presentamos los diferentes tipos de datos involucrados en la atención a solicitudes de varios productos financieros cubiertos por el alcance completo del *Open Finance Brasil*, debidamente actualizado para su última versión. Cada sección a continuación, a su vez, referencia una página de documentación específica que detalla estos datos y presenta la API de la *capa de integración* que debe construirse para integrar la **Plataforma Opus Open Finance** con los sistemas de backend de la institución financiera.

{: .nota}
>En la documentación del *Open Finance Brasil* se definen APIs referentes a **consentimiento** (*consents*) y **recursos** (*resources*). En cuanto al consentimiento, la plataforma realiza toda la gestión, haciendo transparente este concepto para la capa de integración. En cuanto al concepto de *recurso*, en el universo del *Open Finance Brasil*, se refiere a cada instancia de producto financiero que el cliente posee con una institución financiera. Por ejemplo, si un cliente tiene 3 tarjetas de crédito con una institución financiera, esto equivale a 3 recursos distintos.
>
>De esta forma, una de las solicitudes más comunes realizadas por las instituciones receptoras es la consulta de todos los productos financieros que el cliente final mantiene con la institución financiera transmisora (siempre que el consentimiento otorgado por el cliente sea lo suficientemente amplio). En este caso, la plataforma ya realiza el debido tratamiento, activando la capa de integración para cada producto específico de manera de atender adecuadamente este tipo de solicitud.

### Datos de Registro

Datos de registro de clientes y sus representantes, incluyendo datos de identificación, de calificación financiera, información sobre representantes registrados y sobre la relación financiera del cliente con la institución transmisora de los datos. Posee separación entre persona natural y persona jurídica.

Información detallada sobre los *endpoints* y los datos necesarios para atender este tipo de solicitud pueden encontrarse en la [página específica para datos de registro][Datos-Registro].

### Tarjeta de Crédito

Información de cuentas de pago post-pago mantenidas en las instituciones transmisoras por sus clientes, incluyendo datos como denominación, producto, marca, límites de crédito, información sobre transacciones de pago realizadas y facturas. No posee separación entre persona natural y persona jurídica.

Información detallada sobre los *endpoints* y los datos necesarios para atender este tipo de solicitud pueden encontrarse en la [página específica para tarjeta de crédito][Tarjeta-Crédito].

### Cuentas

Información de cuentas de depósito a la vista, cuentas de ahorro y cuentas de pago prepagas mantenidas en las instituciones transmisoras por sus clientes, incluyendo datos de identificación de la cuenta, saldos, límites y transacciones. No posee segregación entre persona natural y persona jurídica.

Información detallada sobre los *endpoints* y los datos necesarios para atender este tipo de solicitud pueden encontrarse en la [página específica para cuentas][Cuentas].

### Operaciones de Crédito

En el caso de operaciones de crédito, el cliente realiza la compartición por agrupación de productos, es decir, todas las modalidades de operaciones de crédito se comparten en el ámbito del *Open Finance Brasil*. A continuación, se presenta una lista de las operaciones:

- [Préstamos][Préstamo];
- [Financiaciones][Financiación];
- [Adelanto a depositantes][Adelanto];
- [Derechos crediticios descontados][Derechos-Crediticios].

Información detallada sobre los datos necesarios para cada una de estas operaciones pueden encontrarse en la [página específica para operaciones de crédito][Crédito].

### Inversiones

Las inversiones también están divididas en diferentes productos. A continuación, se presenta una lista de los productos posibles de inversión, así como el enlace lleva al documento detallado sobre los datos del producto en cuestión:

- [Renta fija bancaria](./datos-inversiones/datos-renta-fija-bancaria.html);
- [Renta fija crédito](./datos-inversiones/datos-renta-fija-crédito.html);
- [Renta variable](./datos-inversiones/datos-renta-variable.html);
- [Títulos del tesoro directo](./datos-inversiones/datos-tesoro.html);
- [Fondos de inversión](./datos-inversiones/datos-fondos.html).

Información detallada sobre los datos necesarios para este producto pueden encontrarse en la [página específica para inversiones](./OOF-Inversión.html).

### Cambio

Información de operaciones de cambio realizadas en las instituciones transmisoras por sus clientes, incluyendo datos como información de la operación contratada, valor de la operación en moneda nacional y moneda extranjera, clasificación de la operación, forma de entrega, VET y, cuando sea aplicable, valor a liquidar. También se compartirán los eventos de alteración de la operación, si existen, con la información modificada. No separa persona natural y persona jurídica.

Información detallada sobre los datos necesarios para este producto pueden encontrarse en la [página específica para cambio][Cambio].

<!-- **gambia**: [API-Commons](../../../../swagger-ui/index.html?api=Opus-Commons) -->

<!-- Definición de enlaces utilizados en esta página -->

[Imagen de la Capa de Integración]: ./images/CamadaIntegração.png
[Tiempos de Respuesta]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17957025/Refer+ncia
<!-- [Guía APIs]: https://openfinancebrasil.atlassian.net/wiki/pages/viewpageattachments.action?pageId=17378841&preview=%2F17378841%2F17378864%2F%5B23-06%5DGuia_GT_Implementa%C3%A7%C3%A3oAPIs.pdf -->
[Datos-Registro]: ../apis/Dados-Cadastrais.html
[Tarjeta-Crédito]: ../apis/Cartão-de-Credito.html
[Cuentas]: ../apis/Contas.html
[Crédito]: ./OOF-Crédito.html
[Cambio]: ../apis/Câmbio.html
[Préstamo]: ../apis/Empréstimo.html
[Financiación]: ../apis/Financiamento.html
[Adelanto]: ../apis/Adiantamento.html
[Derechos-Crediticios]: ../apis/DireitosCreditórios.html
