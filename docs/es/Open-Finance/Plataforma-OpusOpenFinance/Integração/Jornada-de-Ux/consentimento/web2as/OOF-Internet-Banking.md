---
layout: default
title: "Banca por Internet"
parent: "App y Web"
nav_order: 2
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/Jornada-de-Ux/consentimento/web2as/OOF-Internet-Banking/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/Jornada-de-Ux/consentimento/web2as/OOF-Internet-Banking/"
      lang: "en"
---

## Banca por Internet

Si la institución lo necesita, puede autenticar a sus clientes a través de su propia página de inicio de sesión en la *Banca por Internet*. Una vez realizado el login, la institución puede optar por utilizar las pantallas de generación de consentimiento estándar de Opus Open Banking o sus propias pantallas personalizadas.

## Iniciando el flujo de inicio de sesión web personalizado

El inicio del flujo ocurre a partir de la llamada del primer `GET` a la URL de autenticación junto al Authorization Server de la **Plataforma Opus Open Finance**. La URL presenta el siguiente estándar: (`https://<EV-FQDN-open-banking>/auth/auth`).

Tras recibir este `GET`, el Authorization Server redirige el navegador del usuario a la URL del sistema responsable de la autenticación de la institución. Esta URL es configurable dentro del Authorization Server.

Tal configuración define la *plantilla* de la URL de autenticación personalizada de la institución, de esta forma el identificador inicial del flujo de autenticación que será tratado por la página de inicio de sesión puede ser fusionado en la URL de la forma que la institución desee.

La fusión permite a la institución recibir el identificador a través de `query-string`, `fragment` o `url`, como se muestra en la tabla a continuación:

| Formato      | URL Ejemplo                                              |
| ------------ | -------------------------------------------------------- |
| Query string | `https://ev.instituicao.com.br?codigo=<IDENTIFICADOR>`   |
| Fragment     | `https://ev.instituicao.com.br#<IDENTIFICADOR>`          |
| URL          | `https://ev.instituicao.com.br/<IDENTIFICADOR>`          |

El ejemplo proporcionado en la documentación utiliza el formato **Fragment**, que es el más recomendado entre las opciones existentes, pues también elimina el identificador del historial de navegación, evitando cualquier confusión por parte del cliente (por ejemplo, al intentar utilizar una URL antigua de consentimiento).

Si esta configuración está definida, el Authorization Server entenderá que se trata de un flujo de autenticación web personalizado y devolverá entonces para la aplicación de autorización de la institución una dirección para redireccionamiento conteniendo la identificación del `command` de autenticación creado para inicio del flujo.

La comunicación entre la aplicación web de la institución y el Authorization Server ocurrirá a través de `command`s dentro de un loop de eventos. La definición de este loop de eventos será detallada en el momento de iniciar el proyecto de integración de la aplicación móvil con la plataforma de Opus.

## Utilizando el flujo de generación de consentimiento personalizado

La institución puede elegir entre utilizar las pantallas de generación de consentimiento estándar proporcionadas con Opus Open Finance, o también optar por utilizar sus propias pantallas de generación de consentimiento.

Hay una configuración en el Authorization Server que permite definir cuál será la elección de la institución.

Si la institución opta por utilizar sus propias pantallas de generación de consentimiento, la parte del flujo relativa a la elección de los recursos y aprobación/rechazo del consentimiento, así como la pantalla final responsable de realizar la transición de la generación del consentimiento de vuelta para la institución financiera que realizó la solicitud, quedará a cargo de la propia institución, que deberá comunicarse vía API con el Authorization Server para informar los recursos seleccionados, así como la aprobación/rechazo del consentimiento en cuestión.

## Open API Specification

Las definiciones de la API REST proporcionada por el Authorization Server pueden consultarse [aquí][API-Mobile].

## Diagrama de secuencia

El diagrama de secuencia a continuación ilustra el funcionamiento entre la aplicación web de la institución y el Authorization Server, abarcando la etapa de autenticación seguida del flujo de generación de consentimiento, tanto para la configuración de uso de las pantallas estándar como uso de las pantallas personalizadas.

![Diagrama de secuencia](images/sequencia-web2as.svg)

[API-Mobile]: ../../../../../../../swagger-ui/index.html?api=Mobile
