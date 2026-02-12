---
layout: default
title: "Banca Móvil"
parent: "App y Web"
nav_order: 1
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/Jornada-de-Ux/consentimento/app2as/OOF-App-Móvel/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/Jornada-de-Ux/consentimento/app2as/OOF-App-Móvel/"
      lang: "en"
---

## Aplicación Móvil

La integración por aplicación móvil para la generación del consentimiento es la que proporciona la mejor experiencia de uso para el cliente de la institución, puesto que permite que la jornada de consentimiento y gestión de consentimientos se realicen de manera fluida y natural.

En el contexto del *Open Finance Brasil*, la aplicación móvil es activada en el momento en que el cliente va a efectuar un consentimiento. Típicamente, él ha activado en otra institución financiera la opción de compartir sus datos con ella, y será necesario ejecutar un flujo de autorización en el que la aplicación móvil de la otra institución llamará a la aplicación móvil de la institución financiera transmisora (es decir, nuestra aplicación móvil) para autenticar el consentimiento.

De manera análoga, cuando el cliente autoriza un *iniciador de transacción de pago* a enviar una solicitud de pago a la institución financiera detentora de cuenta, se disparará una jornada de consentimiento que activará la aplicación móvil para realizar la autenticación que confirmará la transacción.

## Deep Link y Enlace Universal

La aplicación de la institución necesita interceptar las llamadas del receptor de datos (que está requiriendo la creación de un consentimiento de compartición de datos) o del iniciador de transacción de pagos y enviarlas al Authorization Server cuando ocurren en el celular del usuario, permitiendo de esta manera realizar la generación del consentimiento en la aplicación.

La aplicación también puede ser activada durante el flujo *hybrid flow* con *Handoff*, donde el usuario está creando el consentimiento en una computadora vía Web y la institución solo posee autenticación a través de su aplicación móvil. En este escenario, el Authorization Server
(AS) de la **Plataforma Opus Open Finance** exhibirá un código QR con una URL que también debe ser interceptada por la aplicación. Utilizar una URL interceptable por la aplicación permite al usuario, inclusive, realizar la lectura del código QR a través de cualquier aplicación además de la propia de la institución.

De esta forma, tenemos dos patrones de URLs que deben ser interceptadas por la aplicación de la institución, como se ve en la tabla a continuación:

| Origen                       | URL                                                    |
| ----------------------------| ------------------------------------------------------ |
| Mismo dispositivo           | `https://<EV-FQDN-open-banking>/auth/auth`             |
| Otro dispositivo (*HandOff*)| `https://<EV-FQDN-open-banking>/auth/handoff/{id}`     |

### ¿Qué hacer al interceptar una URL?

Una vez que la aplicación está interceptando las URLs y siendo activada durante una solicitud de consentimiento, el siguiente paso es realizar todo el tratamiento de la generación del consentimiento de hecho.

Con una URL interceptada, el primer paso es realizar el *request* `GET` de hecho en la URL accionada, incluyendo todos los parámetros de *query-string* que puedan existir y añadiendo el header `Accept` con el valor `application/json`. Este header informa al Authorization Server que la llamada está siendo realizada por la aplicación y no por el navegador.

El Authorization Server, sabiendo que la llamada fue realizada por la aplicación, comenzará a funcionar como una API REST, respondiendo a las *requests* siempre en formato JSON. La adición del header es obligatoria en todas las llamadas entre la aplicación de la institución y el Authorization Server de Opus Open Finance.

La respuesta del `GET` inicial es el primero de una serie de comandos que la aplicación debe ejecutar durante un loop de eventos procedentes del Authorization Server. La definición de este loop de eventos será detallada en el momento de iniciar el proyecto de integración de la aplicación móvil con la plataforma de Opus.

## Diagrama de secuencia

El siguiente diagrama de secuencia ilustra de forma resumida el funcionamiento de la interacción entre la aplicación móvil de la institución y el Authorization Server.

![Diagrama de secuencia](./anexos/imagens/mobileBanking-diagramaSequencia.svg)

## Open API Specification

Las definiciones de la API REST disponible por el Authorization Server para la aplicación móvil pueden consultarse [aquí][API-Mobile].

## Mock para integración

Para asistir en el desarrollo de la integración está disponible un *mock* en la herramienta [Mockoon](https://mockoon.com/) y definido en este [archivo JSON](./anexos/json/mobileBanking/es-mockoon.json).

Varios escenarios están falseados y son accionados a través de las respectivas URLs iniciales:

| Escenario                                                                 | URL para iniciar proceso                              |
| ------------------------------------------------------------------------  | ------------------------------------------------------ |
| Hybrid-flow / Pago                                                        | <http://localhost:3301/auth/auth?id=standard>          |
| Hybrid-flow hand-off / Pago                                               | <http://localhost:3301/auth/app/commands/handoff>      |
| Hybrid-flow / CPF_MISMATCH en la autenticación                            | <http://localhost:3301/auth/auth?id=cpf>               |
| Hybrid-flow / EXPIRED_CONSENT en el enlace inicial                        | <http://localhost:3301/auth/auth?id=expired>           |
| Hybrid-flow / RESOURCE_MUST_CONTAIN_ID en la confirmación                 | <http://localhost:3301/auth/auth?id=resource>          |
| Hybrid-flow / RESOURCE_MUST_CONTAIN_ID_SELECTABLE_PRODUCTS en la confirmación | <http://localhost:3301/auth/auth?id=resource>      |
| Hybrid-flow / DISCOVERY_ERROR en la autenticación                         | <http://localhost:3301/auth/auth?id=discovery>         |
| Hybrid-flow / DISCOVERY_TIMEOUT en la autenticación                       | <http://localhost:3301/auth/auth?id=discovery-timeout> |
| Hybrid-flow / INVALID_STATUS_CONFIRMATION en la confirmación              | <http://localhost:3301/auth/auth?id=resource>          |
| Hybrid-flow / GENERIC_ERROR en el enlace inicial                          | <http://localhost:3301/auth/auth?id=generic>           |

Para ejecutar el mock basta importar el JSON en la herramienta *Mockoon* e iniciar el servidor del *environment* "Opus Open Finance Authorization Server Apps API".

[API-Mobile]: ../../../../../swagger-ui/index.html?api=es-mobile
