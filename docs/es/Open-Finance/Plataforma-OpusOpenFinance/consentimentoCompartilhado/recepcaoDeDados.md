---
layout: default
title: "Recepción de Datos"
parent: "Consentimiento Compartido"
nav_order: 3
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/consentimentoCompartilhado/recepcaoDeDados/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/consentimentoCompartilhado/recepcaoDeDados/"
      lang: "en"
---

## Introducción

Nuestra solución de consentimiento compartido fue desarrollada para facilitar la adhesión al Open Finance Brasil, atendiendo a las exigencias regulatorias de manera eficiente. En esta página, encontrarás una guía que explica, de manera simple, los beneficios de usar nuestra solución y qué es necesario desarrollar por tu equipo.

---

## Elementos resueltos por nuestra solución

Aquí están los principales elementos que nuestra solución ofrece:

- **Exhibición y confirmación del consentimiento:** La confirmación forma parte de la solución, minimizando el esfuerzo técnico;

- **Área de gestión completa:** Nuestra solución incluye un panel centralizado para la gestión de los consentimientos, pagos y vínculos;

- **Listado y detalles de los consentimientos:** Los consentimientos recibidos son listados, con detalles completos disponibles;

- **Revocación de consentimientos:** Implementamos una forma sencilla para que los usuarios puedan revocar consentimientos, pagos o vínculos cuando sea necesario;

- **Portal único Institución Cliente:** Ofrecemos una interfaz unificada para gestión integrada de las funcionalidades de Open Finance.

---

## Ítems que necesitarás desarrollar

Aunque nuestra solución implementa todas las exigencias regulatorias, algunos elementos requieren personalización o integración específica de tu parte:

- **Implementación de la llamada de aceptación del consentimiento de Recepción de Datos Web y/o app:** Necesitarás ajustar tus sitios/aplicaciones para disparar una intención de consentimiento y recibir (en webview) las pantallas que nuestra solución implementa.

- **Implementación de la llamada para el Área de gestión de consentimientos:** Necesitarás desarrollar un mecanismo que redirija al usuario de tu aplicación/sitio directamente al área de gestión de forma segura y ya autenticada. Ejemplo: Una opción en el Menú Principal llamada “Open Finance” que al ser seleccionada por el usuario, lo redirija al área de gestión de sus consentimientos.

---

## Lo que implementa nuestra solución

Una vez que el usuario inicia sesión a través de su aplicación, tendrá acceso a una serie de pantallas desarrolladas por la Institución Cliente, en conformidad con la regulación más actualizada del Banco Central.

Nuestro objetivo es asegurar que, a lo largo de toda la jornada de Open Finance, los clientes tengan control total sobre sus datos y las permisiones de compartición, gestionando de manera sencilla y eficiente sus cuentas vinculadas y consentimientos.

### Pantallas de Solicitud y Efectivización de Consentimiento

**Observación:** Las pantallas presentadas en esta sección están contenidas en la [Guía de Experiencia del Usuario](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1477279745/v.19.00.01+Guia+de+Experi+ncia+do+Usu+rio+Open+Finance+Brasil), Ítem 02 (Compartilhamento de dados) -> 2.1: Jornada Básica, compuesta por las etapas:

- 1: Consentimiento Institución Receptora;
- 2: Redirección Institución Receptora a Institución Transmisora;
- 6: Efectivización Institución Receptora.

#### Pantalla 1: Solicitud del Consentimiento  

El usuario puede seleccionar la institución de origen y revisar la información del consentimiento de recepción de datos, disparando la redirección a la Institución Transmisora. La pantalla muestra los datos autorizados y las finalidades.

![Pantalla de Solicitud del Consentimiento](./anexos/imagens/recepcaoDeDados/es-tela1SolicitConsent.png)

#### Pantalla 2: Redirección a la Institución Transmisora

Informa al usuario sobre su redirección de la Institución Receptora (donde el proceso fue iniciado) a la Institución Transmisora. Allí, debe autenticarse y aceptar el consentimiento.

![Pantalla de Redirección a la Institución Transmisora](./anexos/imagens/recepcaoDeDados/es-tela2Redirect.png)

#### Pantalla 3: Efectivización de la Solicitud

Después de que el consentimiento sea aceptado en la Institución Transmisora, el usuario es redirigido nuevamente a la Institución Receptora de los datos, mostrando la información del consentimiento efectivado.

![Pantalla de Efectivización de la Solicitud](./anexos/imagens/recepcaoDeDados/es-tela3EfetivSoluc.png)

---

## Lo que debes implementar

### Configuración

Las marcas deben proporcionar un conjunto de información necesaria para la integración con el Consentimiento Compartido. Estos datos serán ingresados en la base de datos de la aplicación y son necesarios para su funcionamiento.

Además, se necesitarán claves de firma y cifrado para el flujo seguro de comunicación con la marca.

#### Configuración de las Marcas

Los datos necesarios de las marcas son:

| Campo | Descripción | Responsable | Ejemplo |
| :---: | :---------: | :---------: | :-----: |
| brandId | CNPJ de la marca | Institución Cliente | *28811839000129* |
| authorisationServerUrl | Dirección base de la instalación del OOB de la marca | Institución Cliente | *https://authorization-server.com.br* |
| URL de callback | URL predeterminada donde la marca será llamada cuando el flujo salga de la Institución Transmisora y vuelva a ella | Institución Cliente | *https://shared-consent.instituicao-cliente.tech/marca/callback* |
| URL de fin de flujo | URL a la que el usuario será redirigido en caso de sesión expirada o errores. La marca puede redirigir al usuario a la página de inicio o interceptar la URL y realizar alguna acción de error, como cerrar la app. | Marca | *https://marca.com.br/home* |
| isAppOnly | Booleano que indica si la marca solo tiene aplicación | Marca | false |
| assetLinksUrl | URL pública con el contenido de assetlinks.json | Marca | *https://marca.com.br/assentlinks* |
| appleAppSiteUrl | URL pública con el contenido de apple-app-site-association | Marca | *https://marca.com.br/appleappsite* |

#### Claves

La comunicación de la marca con el Consentimiento Compartido necesita de un jwt firmado para garantizar la seguridad de la información transmitida. Por lo tanto, es necesario la existencia de un par de claves de firma.

#### Clave de firma

Ese par de claves de firma está bajo la responsabilidad de la Institución Cliente, que debe exponer la clave pública en una URL de jwks y usar la clave privada para firmar el jwt enviado en las respuestas al Consentimiento Compartido. Este método fue elegido para facilitar el intercambio de la clave de firma siempre que sea necesario por parte de las marcas. Ejemplo de respuesta del jwks:

``` shell
{ 
  "keys": [ 
    { 
      "kty": "RSA", 
      "kid": "UN5LN1nBeln-E9H1_OR_vwGSMczSdFXbdC75XZPNui8", 
      "alg": "RS256", 
      "e": "AQAB", 
      "n": "uQJhnLGtKlIsrvZLtJMwZF5baUxwAN_QIJTeHBSamC0yKZMlSKCKPjTFRcPWs3LEk8q3NIijexTQ0yEgt63_ieqJMWVc2jWW9ZFnQQmnVKfe4tWvjQClVKWqXdS4I2FxL8eG_uW1SdvbEYBjdOOdlvmI-aUM7-xIFurL33R2--KbgAl6llfT7maJazbQazRbE5H5x8WPha4c0ZLPCdpC2lb13iWlCq8_9pvcJtfcHqJViPhseqG7QJbR8IMQjxYfbkoPddfh5ZxRFGi04KWQ-UaJ3BcUiaGI-WcUtOAlmMXipvCEYY8vFW9IsUAn570xsau8V7r_5dcsLxJc6PBHyw" 
    } 
  ] 
}
```

El JWT debe contener las siguientes claims (afirmaciones):

| Claim | Descripción | Obligatorio | Detalles |
| :---: | :---------: | :---------: | :------: |
| jti | Identificador único del token | Obligatorio | -- |
| iat | Fecha de emisión del token en formato unix epoch | Obligatorio | El emisor debe tener su reloj sincronizado, dado que esta claim será usada para calcular la expiración del token |
| brandId | El identificador de la marca a la cual la autenticación pertenece | Obligatorio | -- |
| name | Nombre del cliente autenticado | Obligatorio | -- |
| companyName | Razón Social del CNPJ | Obligatorio solo para cliente PJ | -- |
| cpf | CPF del cliente autenticado | Obligatorio | -- |
| cnpj | CNPJ del cliente autenticado | Obligatorio solo para cliente PJ | -- |
| accountIds | Lista de cuentas a ser filtradas por el conector | -- | -- |

Ejemplo:

``` shell
{ 
  "jti": "1cd2a25f-efd4-4cb8-9caf-57cddaf6df07", 
  "brandId": "08438716000187", 
  "name": "José da Silva", 
  "cpf": "12312312387", 
  "cnpj": "32575976000189", 
  "iat": 1633526347.068, 
   
  } 
} 
```

### Flujo de aceptación de consentimiento APP

El flujo comienza cuando un usuario desea recibir sus datos de otra institución financiera, siendo necesario revisar el consentimiento y redirigirlo a la Institución Transmisora para que el consentimiento sea aceptado.

El flujo vía aplicación para dispositivos móviles requiere algunos tratamientos importantes, más específicamente el disparo de la solicitud de consentimiento de Recepción a través de la API */received-consent/result*, la revisión de las URLs de redirecciones internas en el webview y la escucha de la URL de callback del Emisor que será estimulada por la Institución Transmisora.

#### Deeplink y Universal Link

Es necesario que la aplicación del Emisor realice deeplink (Android) o universal link (iOS) en la URL de callback para el correcto tratamiento de redirecciones app-to-app regulatoria del Open Finance Brasil. A través de esta URL, recibirás el estímulo de apertura de tu app a partir del retorno de la Institución Transmisora.

Los archivos *assetlinks.json* y *apple-app-site-association* necesitan ser alojados y tener las URLs enviadas a la Institución Cliente, que hará el servicio de proxy de tales archivos garantizando así independencia de la marca en la gestión de sus aplicaciones.

#### Webview

Las pantallas de Webview serán enviadas a la app como retorno del post en la API */received-consent/result*. Al recibir este retorno, la aplicación debe abrir inmediatamente un webview y navegar hacia la URL completa que fue retornada por la API.

Para garantizar que la solicitud viene de una aplicación que está tratando el flujo de consentimiento correctamente, es necesario configurar el agente de usuario del webview con el valor “*openfinance-webview*” (sin comillas).

El componente de webview también debe permitir la ejecución de JavaScript y el almacenamiento del DOM (*domStorageEnabled = true*).

Es necesario un tratamiento específico de las URLs que son recibidas como retorno de las llamadas al webview, de acuerdo con los siguientes casos:

1. **URL contiene “shared-consent” o el FQDN de la Institución Cliente:** Abrir la URL directamente con el Webview;

2. **URL de fin de flujo:** Cuando esta URL es retornada, el flujo webview se ha terminado y el usuario ya tuvo un feedback del error/fin de flujo (el webview ya cuida de ese feedback). Al recibir esta URL, la App del Emisor debe redirigir al usuario a la pantalla de donde el flujo se inició. Por ejemplo: El cliente realizó una recepción de datos, y esta opción estaba contenida en un menú Open Finance, luego el usuario debe ser redirigido nuevamente a esta pantalla;

3. **Otras URLs:** Delegar la apertura de estas URLs al Sistema. Estas URLs representan la redirección del usuario a otras Instituciones Financieras en el proceso de Recepción de Datos.

#### Checklist implementación APP

Verifica la implementación de la app con el siguiente checklist:

<div id="checklist-app">
  <p>
    <input type="checkbox" id="item1"> 
    Disponiblizar URLs públicas para os conteúdos dos links <code>assetlinks.json</code> e <code>apple-app-site-association</code>
  </p>
  <p>
    <input type="checkbox" id="item2"> 
    Deeplink / Universal link na URL de autenticação da marca
  </p>
  <p>
    <input type="checkbox" id="item3"> 
    Webview deve permitir execução de código JavaScript
  </p>
  <p>
    <input type="checkbox" id="item4"> 
    Webview deve usar User-Agent com valor "<code>openfinance-webview</code>" (sem aspas)
  </p>
  <p>
    <input type="checkbox" id="item5"> 
    Abrir webview com a URL completa (query string inclusa) do deeplink / Universal link imediatamente
  </p>
  <p>
    <input type="checkbox" id="item6"> 
    Direcionar para tela de autenticação quando webview navegar para <code>authenticationBrandUrl</code>
  </p>
  <p>
    <input type="checkbox" id="item7"> 
    Direcionar para tela de senha transação (se existir) quando webview navegar para <code>transactionAuthenticationBrandUrl</code>
  </p>
  <p>
    <input type="checkbox" id="item8"> 
    Direcionar para a tela principal ou para um tratamento de erro quando a webview navegar para <code>homePageBrandUrl</code>
  </p>
  <p>
    <input type="checkbox" id="item9"> 
    Delegar para o sistema operacional a abertura de URLs diferentes do FQDN Opus e URLs da marca
  </p>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        function loadChecklist() {
            for (let i = 1; i <= 9; i++) {
                const isChecked = localStorage.getItem('checklist-item-' + i) === 'true';
                document.getElementById('item' + i).checked = isChecked;
            }
        }

        function saveChecklist() {
            for (let i = 1; i <= 9; i++) {
                const checkbox = document.getElementById('item' + i);
                localStorage.setItem('checklist-item-' + i, checkbox.checked);
            }
        }

        const checkboxes = document.querySelectorAll('#checklist-app input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', saveChecklist);
        });

        loadChecklist();
    });
</script>

---

## Flujos

### Flujo de las URLs y llamadas backend-to-backend

En esta sección se presentará el flujo de integración entre la API de consentimiento compartido y la autenticación de la marca. La integración se da en dos etapas: en las llamadas iniciales de los flujos de Recepción y Gestión de Consentimientos. Después de la llamada inicial, todo el flujo será controlado por la aplicación del consentimiento compartido, siendo que el usuario será redirigido a la Institución Transmisora solo para aceptar el consentimiento. El tratamiento de las URLs debe seguir el mismo mapeo realizado para la app, pero abriendo URLs diferentes de los FQDNs de la URL de fin de flujo directamente con el navegador (sin utilizar el webview).

### Redirección para la Gestión de Consentimientos

Además de la autenticación para la creación de consentimientos, el consentimiento compartido también permite que el usuario gestione las comparticiones efectuadas. Para ello, el usuario debe estar logueado en la marca, de forma que el consentimiento compartido espera recibir un token firmado similar al enviado por la pantalla de autorización de la marca, con la diferencia de que no es necesario el envío de la claim *authenticationId* y que la dirección de callback debe seguir el ejemplo:

``` shell
POST /management/result HTTP/1.1 
Host: consentimento.compartilhado.com.br 
Content-Type: application/jwt 
Content-Length: * 
 
eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.JbC9dCW4uXidMaiKjFAmJ2bVDOqyCdFO1Q_bwKZ1qAcvF8AhVdg424QjTDdVeP0iBANQKvMc0p2IIEnumDL-... 
```

Como respuesta la marca debe recibir una URL a la que debe redirigir al cliente.
