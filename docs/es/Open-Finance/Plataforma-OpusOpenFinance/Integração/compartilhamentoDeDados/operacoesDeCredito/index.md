---
layout: default
title: "Operaciones de Crédito"
parent: "Compartición de Datos"
nav_order: 4
has_children: true
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/operacoesDeCredito/index/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/compartilhamentoDeDados/operacoesDeCredito/index/"
      lang: "en"
---

## Operaciones de Crédito

Todas las modalidades de operaciones de crédito son susceptibles de compartir datos en el ámbito del *Open Finance Brasil*.

El consentimiento para la compartición de datos efectuado por el cliente se realiza por agrupación de productos. Esto significa que, si el cliente concede un consentimiento de compartición de datos para "*Operaciones de Crédito*", todas las modalidades estarán incluidas.

Las diferentes modalidades de operaciones de crédito son:

- Préstamos;
- Financiamientos;
- Adelanto a depositantes;
- Derechos crediticios descontados.

Dado que cada una de estas modalidades posee sus propias características, la *capa de integración* debe implementar cuatro APIs distintas, considerando sus diferentes tipos de datos.

En la documentación oficial del *Open Finance Brasil* hay una tabla que resume las operaciones de crédito asociadas a cada modalidad, así como la API que debe responsabilizarse por ella, y que puede visualizarse [aquí][Tabla-Crédito-OFB].

Todas las APIs comparten algunas características importantes definidas por la regulación:

- Todas las operaciones de crédito de los últimos 12 meses son ámbitos de exposición en el *Open Finance Brasil*, salvo las excepciones presentadas en los siguientes ítems adicionales;
- Operaciones de crédito liquidadas hace más de 12 meses en relación a la fecha de consulta por la institución receptora ya no estarán disponibles (hay un *status* de retorno en las APIs, *UNAVAILABLE*, para señalar eventuales consultas específicas a operaciones que excedieron este límite de tiempo);
- Casos de uso en que un cliente final efectúe un consentimiento para el cual uno de los contratos exija la aprobación de múltiples instancias (*PENDING_AUTHORISATION*) y otro(s) contrato(s) esté(n) disponible para consulta (*AVAILABLE*), el comportamiento esperado es que cada contrato tenga su *status* representado de forma independiente, disponiendo inmediatamente los contratos ya aprobados;
- Operaciones de crédito canceladas no son ámbito de exposición;
- Operaciones de crédito que se hayan ido a pérdida no son ámbito de exposición en Open Finance;
- Operaciones de crédito que se hayan transferido a otra institución dejan de ser ámbito de exposición.

Contratos cancelados, que se hayan ido a pérdida o transferidos, si han sido compartidos anteriormente, deben ser señalados con *status UNAVAILABLE*.

El detalle de las APIs de cada modalidad de operación de crédito puede encontrarse en la tabla a continuación:

|API                             |Enlace                   |
|--------------------------------|:-----------------------:|
|Préstamo                        |[Enlace][Préstamo]|
|Financiamiento                  |[Enlace][Financiamiento]|
|Adelanto a depositantes         |[Enlace][Adelanto]|
|Derechos crediticios descontados|[Enlace][Derechos-Crediticios]|

[Préstamo]: ./emprestimos.html
[Financiamiento]: ./financiamento.html
[Adelanto]: ./adiantamentoDepositantes.html
[Derechos-Crediticios]: ./direitosCreditorios.html
[Tabla-Crédito-OFB]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/320176146/Orienta+es+-+DC+Opera+es+de+cr+dito#Tabela-com-as-modalidades-e-submodalidades-das-APIs-de-opera%C3%A7%C3%B5es-de-cr%C3%A9dito
