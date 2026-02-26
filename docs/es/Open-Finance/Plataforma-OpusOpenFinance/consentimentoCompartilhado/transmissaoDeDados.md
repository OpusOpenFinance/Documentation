---
layout: default
title: "Transmisión de Datos"
parent: "Consentimiento Compartido"
nav_order: 2
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/consentimentoCompartilhado/transmissaoDeDados/"
      lang: "pt-br"
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/consentimentoCompartilhado/transmissaoDeDados/"
      lang: "en"
---

## Introducción

Esta página fue elaborada para apoyar a los usuarios que están utilizando la herramienta por primera vez. Aquí, es posible encontrar instrucciones paso a paso que harán el uso del software más simple, intuitivo y eficiente, ayudando a explorar todo su potencial desde el inicio y entender el funcionamiento de la solución.

---

## Ítems resueltos por nuestra solución

Aquí están los principales elementos que nuestra solución ofrece:

- **Exhibición y confirmación del consentimiento:** La confirmación forma parte de la solución, minimizando el esfuerzo técnico;

- **Pantalla de Handoff:** La pantalla de Handoff ya está implementada en nuestra solución, ahorrando ese esfuerzo en caso de que usted, cliente, solo posea una solución app;

- **Área de gestión completa:** Nuestra solución incluye un panel centralizado para la gestión de los consentimientos, pagos y vínculos;

- **Listagem y detalles de los consentimientos:** Los consentimientos transmitidos son listados, con detalles completos disponibles;

- **Revocación de consentimientos:** Implementamos una forma simple para que los usuarios puedan revocar consentimientos, pagos o vínculos cuando sea necesario;

- **Gestión de consentimientos:** Ofrecemos una interfaz unificada para gestión integrada de las funcionalidades del Open Finance.

---

## Ítems que necesitarás desarrollar

Aunque nuestra solución implementa todas las exigencias regulatorias, algunos elementos requieren personalización o integración específica de tu parte:

- **Autenticación del usuario:** Es necesario que implementes un método seguro para la autenticación de los usuarios, garantizando conformidad con las políticas de seguridad;

- **Pantallas de autenticación y contraseña de transacción:** La personalización del branding visual necesitará ser adaptada de acuerdo con tus preferencias e identidad visual;

- **Contraseña de transacción:** Dependiendo de tu modelo de negocio, puedes necesitar agregar una contraseña de transacción para aprobaciones de consentimientos;

- **Área de gestión de consentimientos:** Necesitarás desarrollar un mecanismo que redirija al usuario de tu aplicación/sitio directamente para el área de gestión de forma segura y ya autenticada. Ejemplo: Una opción en el Menú Principal llamada “Open Finance” que al ser seleccionada por el usuario, lo redirija a nuestra área de gestión de sus consentimientos;

- **Implementación del acuse de consentimiento Web y/o App:** Necesitarás ajustar tus sitios/aplicaciones para recibir (en webview) las pantallas que nuestra solución implementa.

---

## Lo que implementa nuestra solución

Una vez que el usuario inicia sesión a través de su aplicación, tendrá acceso a una serie de pantallas en conformidad con la regulación más actualizada del Banco Central.  

Nuestro objetivo es asegurar que, a lo largo de toda la jornada de Open Finance, los clientes tengan **control total** sobre sus **datos** y las **permisiones de compartición**, gestionando de manera simple y eficiente sus cuentas vinculadas y consentimientos.

Tras la autenticación del usuario, este tendrá acceso a las pantallas descritas:

### Pantallas de Aceptación de Consentimiento

**Observación:** Las pantallas presentadas en esta sección están contenidas en la Guía de Experiencia del Usuario, Ítem 02 (Compartilhamento de dados), Ítem 03 (Iniciação de pagamentos), Ítem 04 (Jornadas alternativas de iniciação de pagamento – Jornada sem Redirecionamento – Etapa 3). Más detalles en el [enlace](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1477279745/v.19.00.01+Guia+de+Experi+ncia+do+Usu+rio+Open+Finance+Brasil).

Estas pantallas están asociadas al proceso de confirmación de identidad del usuario y de consentimiento, asegurando que el cliente tenga control sobre sus permisos en el Open Finance. A continuación se muestran las pantallas que forman parte de esta etapa:

#### Pantalla 1: Revisión de Consentimiento

- El usuario puede revisar el consentimiento de compartición de datos, pagos y vínculos de cuentas antes de finalizar el proceso. La pantalla muestra los datos autorizados y las finalidades.

![Pantalla de Revisión de Consentimiento](./anexos/imagens/transmissaoDeDados/es-tela1RevisaoConsent.png)

#### Pantalla 2: Confirmación de Consentimiento

- Informa al usuario la información recopilada en la etapa anterior, detallando los permisos concedidos y proporcionando un resumen de lo que se está autorizando.

![Pantalla de Confirmación de Consentimiento](./anexos/imagens/transmissaoDeDados/es-tela2ConfirmConsent.png)

#### Pantalla 3: Handoff  

- Informa al usuario que su jornada deberá seguir por la app del cliente, presentando un QRCode que debe ser escaneado por la cámara del celular. Esta pantalla será exhibida solo para clientes que solo posean la opción app, sin internet banking.

![Pantalla de Handoff](./anexos/imagens/transmissaoDeDados/es-tela3Handoff.png)

Estas pantallas fueron diseñadas para proporcionar una experiencia segura y amigable, donde el usuario tiene control total sobre sus permisos y vínculos en el Open Finance.

Utilizando nuestra solución de consentimiento compartido, tu equipo puede ahorrar tiempo en el desarrollo y asegurar que todas las exigencias regulatorias sean atendidas. Nuestra plataforma ofrece una implementación fácil y en conformidad con el Open Finance Brasil, permitiéndote que te enfoques en desarrollar funcionalidades específicas, mientras nuestra solución cuida del resto.

---

## Lo que debes implementar

### Configuración

Las marcas necesitan proporcionar un conjunto de informaciones necesarias para la integración con el Consentimiento Compartido. Estos datos serán ingresados en la base de datos de la aplicación y son necesarios para su funcionamiento.

Además, se necesitarán claves de firma y de cifrado para el flujo seguro de la comunicación con la marca.

#### Configuración de las Marcas

Los datos necesarios de las marcas son:

| Campo | Descripción | Responsable | Ejemplo |
| :---: | :---------: | :---------: | :-----: |
| brandId | CNPJ de la marca | Opus | *28811839000129* |
| authorisationServerUrl | Dirección base de la instalación de la OOB de la marca | Opus | *https://authorization-server.instituicao.com.br* |
| authenticationBrandUrl | URL de login de la marca al cual será enviado el post de autenticación del cliente | Marca | *https://marca.instituicao.com.br/login* |
| transactionAuthenticationBrandUrl | URL de la contraseña de transacción del cliente en la marca | Marca | *https://marca.instituicao.com.br/user/password* |
| homePageRedirectBrandUrl | URL a la que el usuario será redirigido en caso de sesión expirada o errores. La marca puede redirigir al usuario a la home o interceptar la URL y realizar alguna acción de error como cerrar la app. | Marca | *https://marca.instituicao.com.br/home* |
| isAppOnly | Booleano que indica si la marca solo tiene aplicación | Marca | false |
| assetLinksUrl | URL pública con el contenido de *assetlinks.json* | Marca | *https://marca.instituicao.com.br/assentlinks* |
| appleAppSiteUrl | URL pública con el contenido de *apple-app-site-association* | Marca | *https://marca.instituicao.com.br/appleappsite* |

#### Claves

La comunicación de la marca con el Consentimiento Compartido necesita de un jwt firmado para garantizar la seguridad de la información transmitida. Por lo tanto, es necesaria la existencia de un par de claves de firma.

#### Clave de Firma  

Ese par de claves de firma está encargado a la Institución Cliente, que debe exponer la clave pública en una URL de jwks y usar la clave privada para firmar el jwt enviado en las respuestas al Consentimiento Compartido. La dirección de la clave será informada a través de la variable de entorno "*application.jwt.brand.jwks.url*". Este método fue elegido para facilitar el intercambio de la clave de firma siempre que sea necesario por parte de las marcas. Ejemplo de respuesta del jwks:

```shell
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

### Flujo de aceptación de consentimiento APP

El flujo vía aplicación para dispositivos móviles requiere algunos tratamientos importantes, más específicamente la revisión de la URL inicial del acuse de consentimiento de la marca y el tratamiento de redirecciones internas en el webview para las páginas de autenticación del cuentahabiente y de contraseña de transacción.

#### Deeplink y Universal Link

Es necesario que la aplicación de la marca realice deeplink (Android) o universal link (iOS) en la URL de redirección de los ITPs para el correcto tratamiento de redirecciones app-to-app regulatoria del Open Finance Brasil.

Los archivos *assetlinks.json* y *apple-app-site-association* necesitan ser alojados y tener las URLs enviadas a la Institución que hará el servicio de proxy de tales archivos garantizando así independencia de la marca en la gestión de sus aplicaciones.

#### Webview

Al recibir el estímulo inicial de la URL de acuse de consentimiento, la aplicación debe abrir inmediatamente un webview y navegar hacia la URL completa que disparó la aplicación. Esta etapa es muy importante ya que existen varios TTLs (time-to-live) cortos que pueden expirar si existe algún proceso anterior a la navegación.

Para garantizar que la solicitud viene de una aplicación que está tratando el flujo de consentimiento correctamente, es necesario configurar el *user-agent* del webview con el valor “*openfinance-webview*” (sin comillas).

Además, es necesario interceptar la carga de nuevas URLs y al detectar una navegación para la URL *authenticationBrandUrl* o *transactionAuthenticationBrandUrl*, la aplicación debe interceptar la navegación y utilizar la parte correspondiente de la aplicación para autenticación del cuentahabiente o validación de contraseña de transacción. El tratamiento debe implementar las llamadas de backend descritas abajo para informar el resultado en una llamada backend-to-backend y volver al webview en la URL retornada en la llamada de backend.

Otro caso que necesita ser tratado vía interceptación de URL es el redireccionamiento de retorno al ITP que no puede ser abierto en el webview, debemos entonces verificar que la URL no es la *authenticationBrandUrl* y *transactionAuthenticationBrandUrl*, ni tampoco posee los FQDNs proporcionados por la Institución Cliente. Si es una URL de redirect para el ITP, la aplicación debe delegar la apertura de la URL al sistema operativo.

>En el caso de errores sin redireccionamiento para el ITP, el consentimiento compartido redirigirá al usuario de vuelta para la página principal de la marca, de forma que también será necesario interceptar la url *homePageRedirectBrandUrl*. El componente de webview debe también permitir la ejecución de JavaScript y el almacenamiento del DOM (*domStorageEnabled = true*).

#### Ejemplo

A continuación, un ejemplo de implementación en Kotlin:

![Implementación en Kotlin](./anexos/imagens/transmissaoDeDados/es-implementacaoKotlin.png)

#### Checklist de implementación APP

Verifica la implementación de la app con el siguiente checklist:

<div id="checklist-app">
  <p><input type="checkbox"> Disponiblizar URLs públicas para os conteúdos dos links <code>assetlinks.json</code> e <code>apple-app-site-association</code></p>
  <p><input type="checkbox"> Deeplink / Universal link na URL de autenticação da marca</p>
  <p><input type="checkbox"> Webview deve permitir execução de código JavaScript</p>
  <p><input type="checkbox"> Webview deve usar User-Agent com valor "<code>openfinance-webview</code>" (sem aspas)</p>
  <p><input type="checkbox"> Abrir webview com a URL completa (query string inclusa) do Deeplink / Universal link imediatamente</p>
  <p><input type="checkbox"> Direcionar para tela de autenticação quando webview navegar para <code>authenticationBrandUrl</code></p>
  <p><input type="checkbox"> Direcionar para tela de senha transação (se existir) quando webview navegar para <code>transactionAuthenticationBrandUrl</code></p>
  <p><input type="checkbox"> Direcionar para a tela principal ou para um tratamento de erro quando a webview navegar para <code>homePageBrandUrl</code></p>
  <p><input type="checkbox"> Delegar para o sistema operacional a abertura de URLs diferentes do FQDN Opus e URLs da marca</p>
</div>

### Flujo de aceptación de consentimiento WEB

El flujo de autenticación de consentimiento es más simple que el tratado por la APP, basta con que la marca implemente las URLs *authenticationBrandUrl* y *transactionAuthenticationBrandUrl* y realice el tratamiento de las llamadas de backend descritas abajo para informar el resultado de las operaciones en una llamada backend-to-backend y redirigir el navegador para la URL retornada en la llamada de backend.

#### Checklist de implementación WEB

Verifica la implementación web con el siguiente checklist:

<div id="checklist-web">
  <p><input type="checkbox"> Implementar as URLs <code>authenticationBrandUrl</code> e <code>transactionAuthenticationBrandUrl</code></p>
  <p><input type="checkbox"> Realizar o tratamento das chamadas de backend (backend-to-backend) para informar o resultado das operações</p>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const checklists = document.querySelectorAll("div[id^='checklist-']");
    checklists.forEach(list => {
      const boxes = list.querySelectorAll("input[type=checkbox]");
      const listId = list.id;

      boxes.forEach((box, i) => {
        // Restaurar estado salvo localmente
        box.checked = localStorage.getItem(listId + "-box" + i) === "true";
        // Salvar alterações
        box.addEventListener("change", () => {
          localStorage.setItem(listId + "-box" + i, box.checked);
        });
      });
    });
  });
</script>

---

## Flujos

### Flujo de las URLs y llamadas backend-to-backend

En esta sección se presentará el flujo de integración entre la API de consentimiento compartido y la autenticación de la marca. La integración se da en dos etapas: en la **pantalla de autenticación del cliente**, y posteriormente a través de una **pantalla de contraseña de transacción**.

Todo el flujo será controlado por la aplicación del consentimiento compartido, siendo que el usuario será redirigido a las páginas de la marca solo para hacer su autenticación. De esa forma, cada una de estas pantallas debe ser desarrollada de forma responsiva pues podrán ser accedidas tanto por dispositivos móviles como por escritorio.

### Flujo de Autenticación de Consentimiento

En esta sección se presentará el flujo de integración entre la API de consentimiento compartido y la autenticación de la marca. La integración se da en dos etapas: en la **pantalla de autenticación del cliente**, y posteriormente a través de una **pantalla de contraseña de transacción**.

Todo el flujo será controlado por la aplicación del consentimiento compartido, siendo que el usuario será redirigido a las páginas de la marca solo para hacer su autenticación. De esa forma, cada una de estas pantallas debe ser desarrollada de forma responsiva pues podrán ser accedidas tanto por dispositivos móviles como por escritorio.

#### Página de Autenticación de la Marca

El flujo comienza cuando un usuario desea compartir sus datos o iniciar un pago en otra institución financiera, siendo necesario redirigirlo a la página de autenticación de la titular de los datos.

Como cada marca posee un mecanismo de autenticación diferente, la API de consentimiento compartido redirige al cliente a la página registrada por la marca, pasando la información de la institución iniciadora del compartimiento/pago. Así, la marca utiliza la propia autenticación existente para los cuentahabientes. La información enviada en el GET (fragment) son:

- **authenticationId:** El identificador del comando. Este campo debe estar presente en el JWT de redireccionamiento.

#### Ejemplo 1

``` shell
GET <authenticationBrandUrl>#authenticationId=sPzx8uBDm4ZYGm0EJErCE HTTP/1.1 
```

Con el identificador de la autenticación, la marca puede recuperar los detalles de la solicitud a través del endpoint *GET /authentication/{authenticationId}/details*, el cual devolverá los detalles conforme el ejemplo abajo:

``` shell
{  
  "authenticationId": "auth12345",  
  "tppName": "TPP Bank",  
  "tppLogoUrl": https://example.com/tpp-logo.png,  
  "type": "DATA_SHARING" 
} 
```

Onde:

- **tppName**: El nombre del TPP que solicitó el consentimiento;
- **tppLogoUrl**: El logotipo del TPP que solicitó el consentimiento;
- **type**: El tipo del consentimiento de la autenticación. Puede ser “DATA_SHARING”, “PAYMENT”, “ENROLLMENT” o “MANAGEMENT”.

Después de autenticar o rechazar al usuario, el backend de la marca que realizó la autenticación debe hacer un **POST** conteniendo un JWT firmado con la clave de la marca, y obtener la **URL del retorno del POST** y redirigir el navegador del usuario para tal URL.

Ejemplo para tokens del tipo “DATA_SHARING”, “PAYMENT” o “ENROLLMENT”:

``` shell
POST /authentication/result HTTP/1.1  
Host: consentimento.compartilhado.com.br  
Content-Type: application/jwt 
Content-Length: *  
  
eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.JbC9dCW4uXidMaiKjFAmJ2bVDOqyCdFO1Q_bwKZ1qAcvF8AhVdg424QjTDdVeP0iBANQKvMc0p2IIEnumDL-tbuhdy6WF0VtrKR6B1Hdd0t3Up6H6L0t_1L1TmNZnFFpvKRmlaH283Y4vzPRqEC0zgdY8hV4saEFEa05YOhwYUeVXxgwSqnWp6y-DIsn66PY-AeqoOafk3Zq7913nsspNRQUQSJ_ob2OAoDpgKjMnGH... 
```

El JWT debe contener los siguientes claims:

| Claim | Descripción | Obligatorio | Detalles |
| :---: | :---------: | :---------: | :------: |
| jti | Identificador único del token | Obligatorio | -- |
| iat | Data de emissão do token no formato unix epoch | Obligatorio | El emisor debe tener su reloj sincronizado, dado que esta claim será usada para calcular la expiración del token |
| authenticationId | El id enviado en el POST para la página de autenticación | Obligatorio solo para autenticación de consentimientos | -- |
| brandId | El identificador de la marca a la cual la autenticación pertenece | Obligatorio | -- |
| name | Nombre del cliente autenticado | -- | -- |
| cpf | CPF del cliente autenticado | Obligatorio | -- |
| cnpj | CNPJ del cliente autenticado | Obligatorio solo para cliente PJ | -- |
| refused | Variable booleana que indica si la autenticación fue rechazada por la marca. También sirve para casos negativos como la contraseña o usuario incorrecto. Se considerará el valor predeterminado false si no se envía | -- | -- |
| deviceId | Identificador del dispositivo | -- | -- |
| accountIds | Lista de cuentas a ser filtradas por el conector | -- | -- |

Además de esta información, también está permitido agregar otras claims que sean necesarias para la pantalla de contraseña de transacción, siempre que estén dentro del objeto “customClaims”.

#### Ejemplo 2

``` shell
{ 
  "jti": "1cd2a25f-efd4-4cb8-9caf-57cddaf6df07", 
  "brandId": "08438716000187", 
  "name": "José da Silva", 
  "cpf": "12312312387", 
  "cnpj": "32575976000189", 
  "iat": 1633526347.068, 
  "refused": false, 
  "deviceId": "00000000-54b3-e7c7-0000-000046bffd97", 
  "authenticationId": "123123123123", 
  "customClaims": {
    "custom_claim1": "valor_personalizado1",  
    "custom_claim2": "valor_personalizado2"  
  } 
}
```

### Página de Contraseña de Transacción

Para consentimientos del tipo “**PAYMENT**” o “**ENROLLMENT**”, es posible configurar una segunda página de autenticación para aprobar una transacción. Será exhibida tras el cliente revisar y aceptar la información del consentimiento, permitiendo solicitar una segunda contraseña.

Al igual que ocurre en la pantalla de autenticación, el cliente será redirigido a la página de contraseña de transacción de la marca, que debe recibir un GET con el identificador de la autenticación en el frontchannel, teniendo el identificar es posible obtener los detalles de la solicitud a través del backchannel, incluyendo las claims adicionales recibidas anteriormente.

Tras obtener los detalles de la autenticación, el cliente debe ingresar la contraseña en la página de la marca para que pueda enviar el resultado de la operación, en un JWT similar al mencionado anteriormente. Como respuesta del endpoint de transacción, la marca debe recibir una URL a la que el navegador del cliente debe ser redirigido. Allí, el cliente podrá dar continuidad al flujo por el consentimiento compartido.

#### Ejemplos

##### Redirección a marca

``` shell
GET /transactionAuthenticationBrandUrl#authenticationId={id} HTTP/1.1 
```

##### Endpoint de detalles de autenticación

``` shell
 GET /transactionAuthentication/{authenticationId}/details, que responderá algo como: 

{ 
  "authenticationId": "_OVbMtNWJLgI8XFMpcP2G", 
  "type": "PAYMENT", 
  "tppName": "OOB Client Um", 
  "tppLogoUrl": https://opus-open-banking.s3.sa-east-1.amazonaws.com/opus-redondo.svg", 
  "brandId: "08438716000187" 

 
  "cpf": "12312312387", 
  "cnpj": "32575976000189", 
  "deviceId": "00000000-54b3-e7c7-0000-000046bffd97", 
  "customClaims": { 
    "custom_claim1": "valor_personalizado1", 
    "custom_claim2": "valor_personalizado2" 
  } 
} 
```

##### Endpoint de confirmación de contraseña de transacción

``` shell
POST /transactionAuthentication/result HTTP/1.1 
Host: consentimento.compartilhado.com.br 
Content-Type: application/jwt 
Content-Length: * 
 
eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.JbC9dCW4uXidMaiKjFAmJ2bVDOqyCdFO1Q_bwKZ1qAcvF8AhVdg424QjTDdVeP0iBANQKvMc0p2IIEnumDL-... 
```

### Redirección para Gestión de Consentimientos

Además de la autenticación para crear consentimientos, el consentimiento compartido también permite que el usuario gestione las comparticiones efectuadas. Para ello, el usuario debe estar logueado en la marca, de modo que el consentimiento compartido espera recibir un token firmado similar al enviado por la pantalla de autorización de la marca, con la diferencia de que no es necesario el envío de la claim *authenticationId* y que la dirección de callback debe seguir el ejemplo:

``` shell
POST /management/result HTTP/1.1 
Host: consentimento.compartilhado.com.br 
Content-Type: application/jwt 
Content-Length: * 
 
eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.JbC9dCW4uXidMaiKjFAmJ2bVDOqyCdFO1Q_bwKZ1qAcvF8AhVdg424QjTDdVeP0iBANQKvMc0p2IIEnumDL-... 
```

Como respuesta, la marca debe recibir una URL a la que debe redirigir al cliente.
