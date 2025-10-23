---
layout: default
title: "Data Transmission"
parent: "Shared Consent"
nav_order: 4
lang: "en"
alternate_lang: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Consentimento-Compartilhado/Transmissão/"
---

## Introdution

This page was created to assist users who are using the tool for the first time. Here, you can find step-by-step instructions that will make using the software simpler, more intuitive, and efficient, helping you explore its full potential from the start and understand how the solution works.

---

## Items resolved by our solution

Here are the main elements our solution offers:

- **Display and confirm consent:** Confirmation is part of the solution, minimizing technical effort;

- **Handoff Screen:** The Handoff screen is already implemented in our solution, saving this effort if you, as a client, only have an app solution;

- **Complete management area:** Our solution includes a centralized panel for managing consents, payments, and linkages;

- **Listing and details of consents:** The transmitted consents are listed with full details available;

- **Revocation of consents:** We implemented a simple way for users to revoke consents, payments, or linkages when necessary;

- **Consent management:** We offer a unified interface for integrated management of Open Finance functionalities.

---

## Items you will need to develop

Although our solution implements all regulatory requirements, some elements require customization or specific integration on your part:

- **User authentication:** You need to implement a secure method for user authentication, ensuring compliance with security policies;

- **Authentication screens and transaction password:** The customization of the visual branding will need to be adapted according to your preferences and visual identity;

- **Transaction password:** Depending on your business model, you may need to add a transaction password for consent approvals;

- **Consent management area:** You will need to develop a mechanism to safely and authenticated redirect the user from your app/site directly to the management area. Example: An option in the Main Menu called “Open Finance” that, when selected by the user, redirects them to our management area for their consents;

- **Web and/or App consent acceptance implementation:** You need to adjust your websites/apps to receive (in webview) the screens implemented by our solution.

---

## What our solution implements

Once the user logs in through your application, they will have access to a series of screens in compliance with the latest Central Bank regulation.

Our aim is to ensure that throughout the entire Open Finance journey, clients have **full control** over their **data** and **sharing permissions**, efficiently managing their linked accounts and consents.

After user authentication, they will have access to the described screens:

### Consent Acceptance Screens

**Note:** The screens presented in this section are contained in the User Experience Guide, Item 02 (Data Sharing), Item 03 (Payment Initiation), Item 04 (Alternative Payment Initiation Journeys – Non-Redirected Journey – Step 3). More details in the [link](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17378535/Guia+de+Experi+ncia+do+Usu+rio).

These screens are associated with the user's identity confirmation and consent process, ensuring that the client has control over their permissions in Open Finance. Below are the screens that are part of this stage:

#### Screen 1: Consent Review

- The user can review the data sharing, payments, and account linkages consent before finalizing the process. The screen shows authorized data and purposes.

![Screen of Consent Review](docs/en/Open-Finance/Plataforma-OpusOpenFinance/Consentimento_Compartilhado/TransmissaoDeDados/images/Tela1-RevisaoConsent.png)

#### Screen 2: Consent Confirmation

- Notifies the user of the information collected in the previous step, detailing the permissions granted and providing a summary of what is being authorized.

![Screen of Consent Confirmation](docs/en/Open-Finance/Plataforma-OpusOpenFinance/Consentimento_Compartilhado/TransmissaoDeDados/images/Tela2-ConfirmConsent.png)

#### Screen 3: Handoff

Informs the user that their journey should continue through the client app, presenting a QR Code to be scanned by the mobile camera. This screen will only be displayed for clients who only have the app option without internet banking.

![Screen of Handoff](docs/en/Open-Finance/Plataforma-OpusOpenFinance/Consentimento_Compartilhado/TransmissaoDeDados/images/Tela3-Handoff.png)

These screens were designed to provide a secure and friendly experience where the user has full control over their permissions and linkages in Open Finance.

By using our shared consent solution, your team can save development time and ensure all regulatory requirements are met. Our platform offers an easy and compliant implementation with Open Finance Brasil, allowing you to focus on developing specific features while our solution handles the rest.

---

## What you need to implement

### Configuration

Brands need to provide a set of necessary information for integration with Shared Consent. These data will be entered into the application database and are required for its functioning.

In addition, signature and encryption keys will be required for secure communication with the brand.

#### Setup of Brands

The necessary data for brands are:

| Field | Description | Responsible | Example |
|:-----:|:-----------:|:-----------:|:-------:|
| brandId | Local ID | Opus | *28811839000129* |
| authorisationServerUrl | Brand's OOB installation base address | Opus | *https://authorization-server.institution.com.br* |
| authenticationBrandUrl | Brand login URL to which the client authentication post will be sent | Brand | *https://brand.institution.com/login* |
| transactionAuthenticationBrandUrl | Client transaction password URL at the brand | Brand | *https://brand.institution.com/user/password* |
| homePageRedirectBrandUrl | URL to where the user will be redirected in case of expired session or errors. The brand can redirect the user to the homepage or intercept the URL and perform an error handling like closing the app | Brand | *https://brand.institution.com/home* |
| isAppOnly | Boolean indicating if the brand only has an application | Marca | false |
| assetLinksUrl | Public URL with the content of *assetlinks.json* | Marca | *https://brand.institution.com/assentlinks* |
| appleAppSiteUrl | Public URL with the content of *apple-app-site-association* | Brand | *https://brand.institution.com/appleappsite* |

#### Keys

The brand's communication with Shared Consent requires a signed JWT to ensure the security of the transmitted information. Thus, a pair of signature keys is necessary.

#### Signature Key

This pair of signature keys is the responsibility of the Client Institution, which should expose the public key at a jwks URL and use the private key to sign the JWT sent in responses to Shared Consent. The key address will be informed through the environment variable "*application.jwt.brand.jwks.url*". This method was chosen to facilitate the exchange of the signature key whenever necessary by the brands. Example of a jwks response:

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

### APP Consent Acceptance Flow

The mobile app flow requires some important treatments, specifically the handling of the initial URL of brand consent acceptance and the handling of internal redirects in the webview to the account authentication and transaction password pages.

#### Deeplink and Universal Link

The brand application needs to perform deeplink (Android) or universal link (iOS) on the ITP redirect URL to correctly handle regulatory app-to-app redirects of Open Finance Brazil.

*assetlinks.json* and *apple-app-site-association* files need to be hosted and their URLs sent to the Institution providing the proxy service for such files, thus ensuring brand independence in managing their apps.

#### Webview

Upon receiving the initial stimulus from the consent acceptance URL, the app must immediately open a webview and navigate to the full URL that triggered the application. This step is crucial as there are several short TTLs (time-to-live) that can expire if there is any process before navigation.

To ensure the request comes from an application correctly handling the consent flow, it is necessary to configure the webview's *user-agent* with the value "*openfinance-webview*" (without quotes).

Moreover, new URL loads should be intercepted, and when navigating to the *authenticationBrandUrl* or *transactionAuthenticationBrandUrl*, the app should intercept the navigation and use the corresponding app part for account authentication or transaction password validation. The handling involves implementing backend calls described below to inform the result in a backend-to-backend call and return to the webview at the URL returned from the backend call.

Another case that needs URL interception handling is the redirect return to the ITP, which cannot open in the webview. We should check that the URL is not the *authenticationBrandUrl* and *transactionAuthenticationBrandUrl*, nor contain the FQDNs provided by the Client Institution. If it is a redirect URL to the ITP, the app should then delegate the URL opening to the operating system.

>In case of errors with no redirect to the ITP, the shared consent will redirect the user back to the brand's homepage, requiring interception of the *homePageRedirectBrandUrl*. The webview component should also allow JavaScript execution and DOM storage (*domStorageEnabled = true*).

#### Example

Below is an implementation example in Kotlin:

![Impementation in Kotlin](docs/en/Open-Finance/Plataforma-OpusOpenFinance/Consentimento_Compartilhado/TransmissaoDeDados/images/ImplementacaoKotlin.png)

#### App Implementation Checklist

Check the app implementation with the checklist below:

<div id="checklist-app">
  <p><input type="checkbox"> Provide public URLs for the <code>assetlinks.json</code> and <code>apple-app-site-association</code> file contents</p>
  <p><input type="checkbox"> Deeplink / Universal link on the brand authentication URL</p>
  <p><input type="checkbox"> Webview should allow JavaScript code execution</p>
  <p><input type="checkbox"> Webview should use User-Agent with the value "<code>openfinance-webview</code>" (without quotes)</p>
  <p><input type="checkbox"> Open webview with full URL (query string included) of the Deeplink / Universal link immediately
</p>
  <p><input type="checkbox"> Direct to the authentication screen when webview navigates to <code>authenticationBrandUrl</code></p>
  <p><input type="checkbox"> Direct to the transaction password screen (if existing) when webview navigates to <code>transactionAuthenticationBrandUrl</code></p>
  <p><input type="checkbox"> Direct to the main screen or handle errors when webview navigates to <code>homePageBrandUrl</code></p>
  <p><input type="checkbox"> Delegate to the operating system the opening of URLs different from the Opus FQDN and brand URLs</p>
</div>

### WEB Consent Acceptance Flow

The consent authentication flow is simpler than handled by the APP, with the brand only needing to implement the authenticationBrandUrl and transactionAuthenticationBrandUrl URLs and handle the backend calls described below to report the operation results in a backend-to-backend call and redirect the browser to the URL returned from the backend call.

#### WEB Implementation Checklist

Check the web implementation with the checklist below:

<div id="checklist-web">
  <p><input type="checkbox"> Implement the <code>authenticationBrandUrl</code> and <code>transactionAuthenticationBrandUrl</code> URLs</p>
  <p><input type="checkbox"> Handle the backend calls</p>
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

## Flows

### URL and backend-to-backend calls flow

This section presents the integration flow between the shared consent API and the brand authentication. The integration occurs in two stages: on the **client authentication screen** and subsequently through a **transaction password screen**.

The entire flow is controlled by the shared consent application, with the user being redirected to the brand pages only for authentication. Thus, each of these screens should be developed responsively as they may be accessed by both mobile and desktop devices.

### Consent Authentication Flow

This section presents the integration flow between the shared consent API and the brand authentication. The integration occurs in two stages: on the **client authentication screen** and subsequently through a **transaction password screen**.

The entire flow is controlled by the shared consent application, with the user being redirected to the brand pages only for authentication. Thus, each of these screens should be developed responsively as they may be accessed by both mobile and desktop devices.

#### Brand Authentication Page

The flow starts when a user wishes to share their data or initiate a payment with another financial institution, requiring them to be redirected to the data holder's authentication page.

As each brand has a different authentication mechanism, the shared consent API redirects the client to the brand's registered page, passing along the starter institution's sharing/payment information. The information sent in the GET (fragment) is:

- **authenticationId**: The command identifier. This field must be present in the redirect JWT.

#### Example 1

```shell
GET <authenticationBrandUrl>#authenticationId=sPzx8uBDm4ZYGm0EJErCE HTTP/1.1
```

With the authentication identifier, the brand can retrieve the request details via the endpoint *GET /authentication/{authenticationId}/details*, which will return the details as follows:

``` shell
{  
  "authenticationId": "auth12345",  
  "tppName": "TPP Bank",  
  "tppLogoUrl": https://example.com/tpp-logo.png,  
  "type": "DATA_SHARING" 
} 
```

Where:

- **tppName**: The name of the TPP requesting consent.
- **tppLogoUrl**: The logo of the TPP requesting consent.
- **type**: The type of authentication consent. Possible values are "DATA_SHARING", "PAYMENT", "ENROLLMENT", or "MANAGEMENT".

After authenticating or rejecting the user, the backend of the brand that performed the authentication should send a **POST** containing a signed JWT with the brand's key, obtain the **POST return URL**, and redirect the user's browser to that URL.

Example for tokens of type "DATA_SHARING", "PAYMENT", or "ENROLLMENT":

``` shell
POST /authentication/result HTTP/1.1  
Host: consentimento.compartilhado.com.br  
Content-Type: application/jwt 
Content-Length: *  
  
eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.JbC9dCW4uXidMaiKjFAmJ2bVDOqyCdFO1Q_bwKZ1qAcvF8AhVdg424QjTDdVeP0iBANQKvMc0p2IIEnumDL-tbuhdy6WF0VtrKR6B1Hdd0t3Up6H6L0t_1L1TmNZnFFpvKRmlaH283Y4vzPRqEC0zgdY8hV4saEFEa05YOhwYUeVXxgwSqnWp6y-DIsn66PY-AeqoOafk3Zq7913nsspNRQUQSJ_ob2OAoDpgKjMnGH... 
```

The JWT must contain the following claims:

| Claim            | Description                                               | Requirement | Details                                          |
|:----------------:|:-------------------------------------------------------:|:---------------:|:-------------------------------------------------:|
| jti              | Unique token identifier                            | Mandatory     |                                                   |
| iat              | Token issuance date in unix epoch format          | Mandatory     | The issuer's clock must be synchronized as this claim will be used to calculate token expiry |
| authenticationId | The ID sent in the authentication page POST      | Mandatory only for consent authentications |            |
| brandId          | The identifier of the brand to which the authentication belongs | Mandatory     |                                                   |
| name             | Name of the authenticated client                             |                 |                                                   |
| cpf              |  CPF of the authenticated client                              | Mandatory     |                                                   |
| cnpj             | CNPJ of the authenticated client                             | Mandatory only for legal entity clients |                                |
| refused          | Boolean indicating whether the authentication was refused by the brand. Defaults to false if not sent |                                     |                                                   |
| deviceId         | Device identifier                            |                 |                                                   |
| accountIds       | List of accounts to be filtered by the connector         |                 |                                                   |

In addition to these, other claims required for the transaction password screen can be added, provided they are within the "*customClaims*" object.

#### Example 2

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

### Transaction Password Page

For consents of type "**PAYMENT**" or "**ENROLLMENT**", a second authentication page can be configured to approve a transaction. It will be shown after the client reviews and accepts the consent information, allowing for a second password request.

Similar to the authentication screen, the client will be redirected to the brand's transaction password page, which should receive a GET with the authentication identifier on the front channel. This identifier can then be used to get the request details via the back channel, including any additional claims received earlier.

After obtaining the authentication details, the client must enter the password on the brand page so that it can send the result of the operation in a JWT similar to that described earlier. As a response from the transaction endpoint, the brand should receive a URL where the client's browser should be redirected to continue the flow with shared consent.

#### Examples

##### Redirection to brand

``` shell
GET /transactionAuthenticationBrandUrl#authenticationId={id} HTTP/1.1 
```

##### Authentication details endpoint

``` shell
 GET /transactionAuthentication/{authenticationId}/details, which will respond with: 

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

##### Transaction password confirmation endpoint

``` shell
POST /transactionAuthentication/result HTTP/1.1 
Host: consentimento.compartilhado.com.br 
Content-Type: application/jwt 
Content-Length: * 
 
eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.JbC9dCW4uXidMaiKjFAmJ2bVDOqyCdFO1Q_bwKZ1qAcvF8AhVdg424QjTDdVeP0iBANQKvMc0p2IIEnumDL-... 
```

### Redirection for Consent Management

Besides authentication for consent creation, the shared consent also allows users to manage shared permissions. For this, the user must be logged in to the brand so that the shared consent expects to receive a JWT signed similarly to that sent by the brand's authorization page, except that the *authenticationId* claim isn't necessary and that the callback address must follow the example:

``` shell
POST /management/result HTTP/1.1 
Host: consentimento.compartilhado.com.br 
Content-Type: application/jwt 
Content-Length: * 
 
eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.JbC9dCW4uXidMaiKjFAmJ2bVDOqyCdFO1Q_bwKZ1qAcvF8AhVdg424QjTDdVeP0iBANQKvMc0p2IIEnumDL-... 
```

In response, the brand should receive a URL to which it must redirect the client.
