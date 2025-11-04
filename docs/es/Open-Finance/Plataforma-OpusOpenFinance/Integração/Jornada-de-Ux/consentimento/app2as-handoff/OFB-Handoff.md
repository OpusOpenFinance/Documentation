---
layout: default
title: "Handoff"
parent: "App y Web"
nav_order: 3
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/Jornada-de-Ux/consentimento/app2as-handoff/OFB-Handoff/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/Jornada-de-Ux/consentimento/app2as-handoff/OFB-Handoff/"
      lang: "en"
---

## *Hybrid-flow* con *Handoff*

Las instituciones que poseen autenticación de usuarios solo en aplicaciones móviles necesitan soportar el flujo *Hybrid-flow* con *Handoff* para permitir consentimientos iniciados en dispositivos que no soportan la ejecución de las aplicaciones, típicamente un escritorio o un portátil.

El Authorization Server (AS) de Opus Open Finance soporta el flujo de *handoff* y tiene una biblioteca *Javascript* que permite a la institución personalizar completamente la página web que se mostrará al cliente.

La biblioteca de *handoff* se ha creado para que la institución obtenga toda la información relativa al flujo de *handoff* de un consentimiento, desde los datos para mostrar el QR hasta los eventos relativos al flujo.

El Authorization Server de Opus Open Finance aloja la biblioteca en la URL `https://as.instituicao.com.br/auth/handoff/v1/oob-handoff.js` y debe ser referenciada directamente en lugar de ser copiada y referenciada en otro servidor web.

## Flujo de Opus Open Finance con *Handoff*

El llamante (institución receptora de datos o iniciador de transacción de pago) desconoce si la instalación de Open Finance que está llamando utiliza o no *handoff* y, de hecho, no es su responsabilidad. El flujo OIDC iniciado por él acaba redirigiendo el navegador del cliente al Authorization Server de Opus Open Finance y este, a su vez, redirige el navegador a la página de visualización del *handoff* creada por la institución.

El Authorization Server tiene una configuración que define la *plantilla* de la URL de *handoff* realizada por la institución. De esta forma, el identificador de la intención de consentimiento que será tratado por la página de *handoff* puede ser fusionado en la URL de la forma que la institución desee.

La fusión permite a la institución recibir el identificador a través de `query-string`, `fragment` o `url`, como se muestra en la tabla a continuación:

| Formato      | URL Ejemplo                                                        |
| ------------ | ------------------------------------------------------------------ |
| Query string | `https://ev.instituicao.com.br/handoff.html?codigo=<IDENTIFICADOR>`|
| Fragment     | `https://ev.instituicao.com.br/handoff.html#<IDENTIFICADOR>`       |
| URL          | `https://ev.instituicao.com.br/<IDENTIFICADOR>/handoff.html`       |

La página de *handoff* debe obtener el identificador y usarlo durante la inicialización de la biblioteca como veremos más abajo. El ejemplo proporcionado en la documentación transmite el identificador a través del `fragment` de la URL y debe ser el formato utilizado si es posible. También elimina el identificador del historial de navegación, evitando cualquier confusión por parte del cliente al intentar utilizar una URL antigua de consentimiento.

La página también debe apuntar a la instalación del Authorization Server (dirección pública) al iniciar la biblioteca a través de la configuración **oobAsPublicUrl** según la instrucción a continuación.

## Cómo usar la biblioteca

Tras importar la biblioteca en la página HTML, la variable `oobHandoff` contendrá el punto de entrada de la biblioteca, es necesario iniciarla a través del método `init` pasando el identificador recibido durante el redirect del Authorization Server y los gestores de los eventos que serán disparados.

```Javascript
oobHandoff.init({
    oobStartCode: '<IDENTIFICADOR>',
    oobAsPublicUrl: '<OOB_AS_PUBLIC_URL>',
    onHandoffReady: function(handoffReady) {
        // Texto para QR y código alternativo para digitación listos
    },
    onHandoffQRRead: function() {
        // Usuario realizó la lectura del QR o escribió el código alternativo
    },
    onHandoffTimedOut: function(handoffError) {
        // Tiempo para la conclusión del consentimiento expirado
    },
    onHandoffCompleted: function(handoffCompleted) {
        // Consentimiento concluido con éxito
    },
    onHandoffError: function(handoffError) {
        // Ocurrió un error durante el consentimiento
    }
});
```

Los parámetros de los eventos contienen información necesaria para cada momento. Los objetos están detallados abajo.

### handoffReady

Schema:

```json
{
    "qrCode": "<string>",
    "timeoutSeconds": <int>,
    "typeCode": "<string>",
    "tppName": "<string>",
    "tppLogoUrl": "<string>"
}
```

| Propriedad      | Descripción                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `qrCode`         | Valor para generar QR-code a ser mostrado al usuario                                                                                  |
| `timeoutSeconds` | Tiempo total disponible para la conclusión del consentimiento                                                                               |
| `typeCode`       | Código alternativo para el cliente escribir en caso de fallo de lectura del QR-Code. Presente solo si habilitado en la instalación        |
| `tppName`        | Nombre de la institución iniciadora de pago                                                                                          |
| `tppLogoUrl`     | Logomarca de la institución iniciadora de pago                                                                                     |

### handoffCompleted

Schema basado en el `completedCommand` de la interfaz APP2AS:

```json
{
    "tpp": {
        "name": "<string>",
        "logoUrl": "<string>"
    },
    "completedCommand": {
        "redirect": {
            "redirectTo": "<string>"
        }
    }
}
```

| Propriedad                            | Descripción                                                             |
| -------------------------------------- | --------------------------------------------------------------------- |
| `tpp.name`                             | Nombre de la institución llamadora (TPP) para mostrar en la pantalla de retorno  |
| `tpp.logoUrl`                          | URL con el logotipo del TPP para mostrar en la pantalla de retorno            |
| `completedCommand.redirect.redirectTo` | URL para redireccionamiento tras mostrar la pantalla de retorno al usuario |

### handoffError

Schema basado en el `errorCommand` de la interfaz APP2AS:

```json
{
    "tpp": {
        "name": "<string>",
        "logoUrl": "<string>"
    },
    "errorCommand": {
        "type": "<string>",
        "message": "<string>",
        "redirect": {
            "redirectTo": "<string>"
        }
    }
}
```

| Propriedad                        | Descripción                                                                                                                                                                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tpp.name`                         | Nombre del TPP para mostrar en la pantalla de retorno.                                                                                                                                                                                              |
| `tpp.logoUrl`                      | URL con el logotipo del TPP para mostrar en la pantalla de retorno                                                                                                                                                                                 |
| `errorCommand.type`                | Tipo do error. Misma `enum` que APP2AS: `CPF_MISMATCH`, `CNPJ_MISMATCH`, `EXPIRED_CONSENT`, `RESOURCE_MUST_CONTAIN_ID`, `GENERIC_ERROR`, `OIDC_ERROR`, `DISCOVERY_ERROR`, `RESOURCE_MUST_CONTAIN_ID_SELECTABLE_PRODUCTS`, `DISCOVERY_TIMEOUT`, `INVALID_STATUS_CONFIRMATION`, `INVALID_ENROLLMENT_INFORMATION` |
| `errorCommand.message`             | Mensaje de error para mostrar al usuario en la pantalla de retorno                                                                                                                                                                                 |
| `errorCommand.redirect.redirectTo` | URL para redireccionamiento tras mostrar la pantalla de retorno al usuario                                                                                                                                                                      |

La información `tpp.name`, `tpp.logoUrl`, `errorCommand.message` y `errorCommand.redirect.redirectTo` puede no estar presente en el retorno.

## Cancelación

La pantalla de *handoff* reacciona pasivamente a los eventos ocurridos en el flujo. En cualquier momento, el usuario puede abortar activamente el flujo de *handoff*. Para ello, es necesario proporcionar un botón de "Cancelar" en la pantalla.

Para efectuar la cancelación del flujo es necesario realizar una solicitud a la api `https://as.instituicao.com.br/auth/handoff/v1/<oobStartCode>/abort`, siendo el **oobStartCode** el mismo código utilizado para iniciar la biblioteca.

Tras la cancelación, la pantalla debe dirigir al usuario de vuelta a la institución llamadora y la app debe informar al usuario (ej.: con un mensaje de error), interrumpiendo el flujo de *handoff*.

## Ejemplo

Una aplicación funcional de ejemplo está disponible. Hay una página de ejemplo de *handoff* con el tratamiento de todos los eventos del flujo. Esta página de ejemplo es la que la institución debe hacer, alojar y configurar la URL en la instalación del **Plataforma Opus Open Finance**.

La aplicación de ejemplo está utilizando la versión *mockada* de la biblioteca que simula 3 escenarios distintos a través de los identificadores listados en la tabla a continuación.

| Identificador            | Escenario                                        |
| ------------------------ | ---------------------------------------------- |
| L3YxL21vY2svc3VjY2Vzcw== | Consentimiento efectuado con éxito             |
| L3YxL21vY2svY3BmLWVycm9y | Error de CPF_MISMATCH                           |
| L3YxL21vY2svdGltZW91dA== | Tiempo agotado para la conclusión del consentimiento |

Es posible ejecutar la aplicación de ejemplo alojando el directorio `src` en algún servidor web. Para ejecutar localmente sugerimos utilizar el paquete [`http-server`](https://www.npmjs.com/package/http-server) de [Node.js](https://nodejs.org/en/download/):

```bash
cd /src
npx http-server -p 3030 --cors -c-1
```

Es posible iniciar los escenarios mockeados a través de las siguientes URLs:

| Escenario      | URL                                                       |
| ------------ | --------------------------------------------------------- |
| Éxito      | <http://lvh.me:3030/sample.html#L3YxL21vY2svc3VjY2Vzcw==> |
| CPF_MISMATCH | <http://lvh.me:3030/sample.html#L3YxL21vY2svY3BmLWVycm9y> |
| Timeout      | <http://lvh.me:3030/sample.html#L3YxL21vY2svdGltZW91dA==> |

## Página de handoff personalizable

Si la institución prefiere no implementar su propia página de *handoff*, es posible utilizar la solución proporcionada por Opus Open Finance: una página completa que configura las principales características estéticas y de contenido para adaptarse al estilo de la institución.
