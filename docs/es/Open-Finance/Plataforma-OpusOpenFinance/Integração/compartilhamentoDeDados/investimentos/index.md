---
layout: default
title: "Inversiones"
parent: "Compartición de Datos"
nav_order: 5
has_children: true
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/investimentos/index/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/investimentos/index/"
      lang: "en"
---

## Inversiones

Todas las modalidades de inversión son susceptibles de compartir datos en el ámbito del *Open Finance Brasil*.

El consentimiento para la compartición de datos efectuado por el cliente se realiza por agrupación de productos. Esto significa que, si el cliente concede un consentimiento de compartición de datos para "*Inversiones*", todas las modalidades estarán incluidas.

Las diferentes modalidades de inversión son:

- Renta fija bancaria;
- Renta fija crédito;
- Renta variable;
- Fondos de inversión;
- Títulos del tesoro directo.

Dado que cada una de estas modalidades posee sus propias características, la *capa de integración* debe implementar cinco APIs distintas, considerando sus diferentes tipos de datos.

En la documentación oficial del *Open Finance Brasil* hay una tabla que resume las inversiones asociadas a cada modalidad, así como la API que debe responsabilizarse por ella, y que puede visualizarse [aquí][Tabla-Inversión-OFB].

Todas las APIs comparten algunas características importantes definidas por la regulación:

**Oportunidad de los datos para APIs de inversión:**

- Hasta una hora para las APIs Renta Fija Bancaria, Renta Fija Crédito, Títulos del Tesoro Directo y Fondos de Inversión;
- Para la API Renta Variable, debido a la frecuente alteración de los precios y la dinámica de funcionamiento del producto (órdenes de compra y venta), se expondrán la posición y movimientos del cierre del día anterior (d-1).

**Recursos que deben ser incluidos en la compartición:**

- Inversiones activas en un período de hasta 12 meses anterior al inicio de la vigencia del consentimiento;
- Inversiones que expiraron, fueron rescatadas o tuvieron su titularidad/custodia transferida en un período de hasta 12 meses anterior al inicio de la vigencia del consentimiento;
- Inversiones contratadas durante el período de vigencia del consentimiento;
- Inversiones que expiraron, fueron rescatadas o tuvieron su titularidad/custodia transferida durante el período de vigencia del consentimiento.

**Recursos que no deben ser incluidos en la compartición:**

- Inversiones que expiraron o fueron rescatadas en un período mayor que 12 meses anteriores al inicio de la vigencia del consentimiento;
- Inversiones que pertenecen a clientes que están bajo algún tipo de bloqueo conforme políticas internas de las instituciones;
- Inversiones con aplicación y rescate automático.

A continuación se encuentra el enlace para cada una de las APIs de Inversión:

|API                        |Enlace                   |
|---------------------------|:-----------------------:|
|Renta fija bancaria        |[Enlace](./rendaFixaBancaria.html)|
|Renta fija crédito         |[Enlace](./rendaFixaCredito.html) |
|Renta variable             |[Enlace](./rendaVariavel.html)     |
|Títulos del tesoro directo |[Enlace](./titulosTesouroDireto.html)            |
|Fondos de inversión        |[Enlace](./fundosInvestimento.html)             |

[Tabla-Inversión-OFB]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/102957060/Orienta+es+-+DC+Investimentos
