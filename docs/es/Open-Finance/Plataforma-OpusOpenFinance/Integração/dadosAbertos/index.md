---
layout: default
title: "Datos Abiertos"
parent: "Integración de la Plataforma"
nav_order: 1
lang: "es"
alternate_lang: 
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integration/OpenData/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integration/OpenData/"
      lang: "en"
---

## Datos Abiertos

El perfil de datos abiertos corresponde a los datos públicos que las instituciones participantes de Open Finance deben divulgar al ecosistema. Para obtener más información sobre el perfil de datos abiertos, [vea aquí][Perfis-Open-Finance-Brasil]. El perfil de datos abiertos es exigido para todos los participantes del ecosistema, y los datos deben ser accesibles a través de APIs. La Plataforma Opus Open Finance implementa la totalidad de estas APIs.

### Integración

La integración del perfil de datos abiertos no exige conexión con los sistemas de backend del cliente, ya que rara vez las instituciones financieras mantienen esta información estructurada y almacenada en un repositorio central. Además, la información referente a los datos abiertos - canales de atención y productos financieros ofrecidos por la institución - normalmente no cambia con mucha frecuencia.

De esta forma, aunque la plataforma haya sido construida manteniendo un estándar de arquitectura que permite la integración con sistemas de backend que eventualmente mantengan esta información, la forma más práctica y simple de publicar estos datos en Open Finance es proporcionando archivos estáticos ya en formato JSON. Así, para responder a las solicitudes recibidas vía API, la plataforma simplemente copiará el archivo JSON directamente al mensaje de respuesta a ser enviado al solicitante.

Por lo tanto, en una implementación estándar será necesaria solo la creación de un archivo JSON para cada tipo de solicitud. Naturalmente, se necesitarán archivos JSON solo para aquellos productos financieros ofrecidos por la institución.

La Plataforma Opus Open Finance posee un parámetro de configuración para indicar la ubicación de estos archivos estáticos, y este parámetro será configurado durante el proceso de implementación de la solución.

{: .importante}
>Si su institución posee un sistema de registro estructurado de sus canales de atención y productos financieros ofrecidos al mercado, hay dos posibilidades de integración:
>
>1. Alterar el sistema en cuestión para generar archivos JSON en el formato exigido por la regulación (o desarrollar un programa específico que extraiga esta información y genere este archivo). Esta es la opción más simple y, por lo tanto, la recomendada;
>2. Integrar directamente la Plataforma Opus Open Finance al sistema de backend desarrollando conectores especializados. En este caso, durante el proceso de implementación se proporcionará documentación específica para la construcción de estos conectores.

### APIs de datos abiertos

#### Canales de atención

La API de canales de atención proporciona información sobre los canales de atención de la institución. Los canales de atención previstos en la regulación son:

1. Sucursales físicas
2. Canales de atención electrónicos
3. Canales de atención telefónicos
4. Corresponsales bancarios de la IF
5. Terminales de autoservicio

#### Productos

Las APIs de productos son referentes a los productos que la institución ofrece. Tipos posibles:

1. Cuentas
2. Préstamos
3. Financiamientos
4. Derechos crediticios descontados (anticipación de recibos)
5. Adelanto a depositantes (descubierto bancario)
6. Tarjeta de crédito
7. Inversiones
8. Seguros
9. Adquirencia/Accreditation
10. Títulos de capitalización
11. Previsión
12. Cambio

### Archivo JSON para integración

Se presentan a continuación las APIs regulatorias referentes a Datos Abiertos y ejemplos de archivos JSON para el cumplimiento de las llamadas a estas APIs.

{: .importante}
>Las APIs se presentan aquí solo para ilustrar el escenario completo del cumplimiento de los requisitos regulatorios relativos a Datos Abiertos. Además, en la descripción de cada API se presentan los posibles valores válidos para todas las claves del JSON de respuesta.
>
>La Plataforma Opus Open Finance **ya implementa** estas APIs y, por lo tanto, no es necesario construirlas.
>
>Para integrar nuestra solución será necesario solo construir archivos JSON de respuesta a cada API, y los ejemplos presentados son excelentes puntos de partida para esta construcción.
>
>Recordamos una vez más que es necesario proporcionar archivos JSON solo para los productos financieros efectivamente ofrecidos por la institución.

|API                               |Link Open API          |Link Ejemplo JSON           |
|----------------------------------|:---------------------:|:--------------------------:|
|Canales de atención               |[Link][Channels]       |[JSON][Channels-JSON]       |
|Cuentas                           |[Link][Accounts]       |[JSON][Accounts-JSON]       |
|Préstamos                         |[Link][Loans]          |[JSON][Loans-JSON]          |
|Financiamientos                   |[Link][Financings]     |[JSON][Financings-JSON]     |
|Adelanto a depositantes           |[Link][Unarranged]     |[JSON][Unarranged-JSON]     |
|Derechos crediticios descontados  |[Link][Inv-financings] |[JSON][Inv-financings-JSON] |
|Tarjeta de crédito                |[Link][CreditCard]     |[JSON][CreditCard-JSON]     |
|Inversiones                       |[Link][Investments]    |[JSON][Investments-JSON]    |
|Seguros                           |[Link][Insurance]      |[JSON][Insurance-JSON]      |
|Adquirencia/Accreditation         |[Link][Acquiring]      |[JSON][Acquiring-JSON]      |
|Títulos de capitalización         |[Link][Capitalization] |[JSON][Capitalization-JSON] |
|Previsión                         |[Link][Pension]        |[JSON][Pension-JSON]        |
|Cambio                            |[Link][Exchange]       |[JSON][Exchange-JSON]       |

[Acquiring]: ../../../../../swagger-ui/index.html?api=es-open-data-acquiring
[Accounts]: ../../../../../swagger-ui/index.html?api=es-open-data-accounts
[Capitalization]: ../../../../../swagger-ui/index.html?api=es-open-data-capitalization
[Channels]: ../../../../../swagger-ui/index.html?api=es-open-data-channels
[CreditCard]: ../../../../../swagger-ui/index.html?api=es-open-data-credit-cards
[Exchange]: ../../../../../swagger-ui/index.html?api=es-open-data-exchange
[Financings]: ../../../../../swagger-ui/index.html?api=es-open-data-financings
[Insurance]: ../../../../../swagger-ui/index.html?api=es-open-data-insurance
[Investments]: ../../../../../swagger-ui/index.html?api=es-open-data-investments
[Inv-financings]: ../../../../../swagger-ui/index.html?api=es-open-data-invoice-financings
[Loans]: ../../../../../swagger-ui/index.html?api=es-open-data-loans
[Pension]: ../../../../../swagger-ui/index.html?api=es-open-data-pension
[Unarranged]: ../../../../../swagger-ui/index.html?api=es-open-data-unarranged

[Channels-JSON]: ./canaisAtendimento.html
[Accounts-JSON]: ./contas.html
[Loans-JSON]: ./emprestimos.html
[Financings-JSON]: ./financiamentos.html
[Unarranged-JSON]: ./adiantamentoADepositantes.html
[Inv-financings-JSON]: ./direitosCreditoriosDescontados.html
[CreditCard-JSON]: ./cartaoCredito.html
[Investments-JSON]: ./investimentos.html
[Insurance-JSON]: ./seguros.html
[Acquiring-JSON]: ./adquirencia.html
[Capitalization-JSON]: ./capitalizacao.html
[Pension-JSON]: ./previdencia.html
[Exchange-JSON]: ./cambio.html

[Perfis-Open-Finance-Brasil]: ../../../Open-Finance-Brasil/PerfisOFB/Dados-abertos.html
