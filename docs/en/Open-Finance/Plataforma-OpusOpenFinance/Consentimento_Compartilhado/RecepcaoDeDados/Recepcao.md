---
layout: default
title: "Data Reception"
parent: "Shared Consent"
nav_order: 4
lang: "en"
alternate_lang: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Consentimento-Compartilhado/Recepção/"
---

## Introduction

Our shared consent solution was developed to facilitate adherence to Open Finance Brazil, efficiently meeting regulatory requirements. On this page, you will find a guide that explains, in simple terms, the benefits of using our solution and what needs to be developed by your team.

---

## Items resolved by our solution

Here are the main elements our solution offers:

- **Display and Confirmation of Consent**: Confirmation is part of the solution, minimizing technical effort;

- **Complete Management Area**: Our solution includes a centralized panel for managing consents, payments, and linkages;

- **Listing and Details of Consents**: The received consents are listed with full details available;

- **Revocation of Consents**: We have implemented a simple way for users to revoke consents, payments, or linkages when necessary;

- **Unique Client Institution Portal**: We offer a unified interface for integrated management of Open Finance functionalities.

---

## Items you will need to develop

Although our solution implements all regulatory requirements, some elements require customization or specific integration on your part:

- **Implementation of Data Reception Consent Acceptance Call via Web and/or App**: You will need to adjust your websites/apps to trigger a consent intent and receive (in webview) the screens implemented by our solution.

- **Implementation of the Call to the Consent Management Area**: You will need to develop a mechanism to securely and authenticatedly redirect the user from your app/site directly to the management area. Example: An option in the Main Menu called "Open Finance" that, when selected by the user, redirects them to the management area for their consents.

---

## What our solution implements

Once the user logs in through your application, they will have access to a series of screens developed by the Client Institution, in compliance with the latest Central Bank regulations.

Our goal is to ensure that throughout the entire Open Finance journey, clients have full control over their data and sharing permissions, managing their linked accounts and consents simply and efficiently.

This guide contains descriptions of the developed screens, organized into:

- **Data Reception Consent Request and Effectuation Screens**, dealing with the review of information and consent acceptance.

### Data Reception Consent Request and Effectuation Screens

**Note:** The screens presented in this section are contained in the [User Experience Guide](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17378535/Guia+de+Experi+ncia+do+Usu+rio), Item 02 (Compartilhamento de dados) -> 2.1: Jornada Básica, composed of the stages:

- 1: Consentimento Instituição Receptora (Receiving Institution Consent);
- 2: Redirecionamento Instituição Receptora para Instituição Transmissora (Redirection from Receiving to Transmitting Institution);
- 6: Efetivação Instituição Receptora (Receiving Institution Effectuation).

#### Screen 1: Consent Request

The user can select the origin institution and review the Data Reception consent information, triggering the redirection to the Transmitting Institution. The screen shows authorized data and purposes.

![Consent Request Screen](docs/en/Open-Finance/Plataforma-OpusOpenFinance/Consentimento_Compartilhado/RecepcaoDeDados/images/Tela1-SolicitConsent.png)

#### Screen 2: Redirection to Transmitting Institution

Informs the user about the redirection from the Receiving Institution (where the process was initiated) to the Transmitting Institution. There, the user must authenticate and accept the consent.

![Redirection to Transmitting Institution Screen](docs/en/Open-Finance/Plataforma-OpusOpenFinance/Consentimento_Compartilhado/RecepcaoDeDados/images/Tela2-Redirect.png)

#### Screen 3: Request Effectuation

After the consent is accepted at the Transmitting Institution, the user is redirected again to the Receiving Institution, displaying the information of the effectuated consent.

![Request Effectuation Screen](docs/en/Open-Finance/Plataforma-OpusOpenFinance/Consentimento_Compartilhado/RecepcaoDeDados/images/Tela3-EfetivSoluc.png)

---

## What You Should Implement

### Configuration

Brands need to provide a set of necessary information for integration with Shared Consent. These data will be entered into the application database and are necessary for its functioning.

Additionally, signature and encryption keys will be required for secure communication with the brand.

#### Setup of Brands

The necessary data for brands are:

| Field                   | Description                                                 | Responsible          | Example                                          |
|:-----------------------:|:-----------------------------------------------------------:|:--------------------:|:------------------------------------------------:|
| brandId                 | Brand CNPJ                                                 | Client Institution   | *28811839000129*                                 |
| authorisationServerUrl  | Base address of the brand's OOB installation               | Client Institution   | *https://authorization-server.com*            |
| Callback URL            | Default URL where the brand will be called when the flow exits the Transmitting Institution and returns to it | Client Institution | *https://shared-consent.institution.tech/brand/callback* |
| End of Flow URL         | URL to which the user will be redirected in case of expired session or errors. The brand can redirect the user to the homepage or intercept the URL and handle an error, like closing the app. | Brand                | *https://brand.com/home*                     |
| isAppOnly               | Boolean indicating if the brand only has an app            | Brand                | false                                             |
| assetLinksUrl           | Public URL with the content of assetlinks.json             | Brand                | *https://brand.com/assentlinks*               |
| appleAppSiteUrl         | Public URL with the content of apple-app-site-association  | Brand                | *https://brand.com/appleappsite*              |

#### Keys

The brand's communication with Shared Consent requires a signed JWT to ensure the security of the transmitted information. Therefore, a pair of signature keys is necessary.

#### Signature Key

This pair of signature keys is the responsibility of the Client Institution, which should expose the public key at a JWKS URL and use the private key to sign the JWT sent in responses to Shared Consent. This method was chosen to facilitate the exchange of the signature key by brands whenever necessary. JWKS response example:

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

The JWT must contain the following claims:

| Claim        | Description                                                                         | Requirement | Details                         |
|:------------:|:---------------------------------------------------------------------------------:|:---------------:|:--------------------------------:|
| jti          | Unique token identifier                                                      | Mandatory     |                                  |
| iat          | Token issuance date in unix epoch format                                    | Mandatory     | The issuer's clock must be synchronized as this claim will be used to calculate token expiry |
| brandId      | Identifier of the brand to which the authentication belongs                           | Mandatory     |                                  |
| name         | Name of the authenticated client                                                       | Mandatory     |                                  |
| companyName  | Corporate Name of the CNPJ                                                              | Mandatory only for legal entity clients |               |
| cpf          | CPF of the authenticated client                                                        | Mandatory     |                                  |
| cnpj         | CNPJ of the authenticated client                                                       | Mandatory only for legal entity clients |               |
| accountIds   | List of accounts to be filtered by the connector                                   |                 |                                  |

Example:

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

### APP Consent Acceptance Flow

The flow begins when a user wishes to receive their data from another financial institution, requiring the consent review and redirecting them to the Transmitting Institution for consent acceptance.

The mobile app flow requires certain important treatments, specifically triggering the Data Reception consent request via the API */received-consent/result*, handling of internal redirect URLs in the webview, and listening to the Issuer's callback URL, which will be stimulated by the Transmitting Institution.

#### Deeplink and Universal Link

The Issuer's application should perform deeplink (Android) or universal link (iOS) on the callback URL for correct regulatory app-to-app redirect handling of Open Finance Brasil. Through this URL, you will receive the stimulus to open your app from the Transmitting Institution's return.

The *assetlinks.json* and *apple-app-site-association* files need to be hosted and have their URLs sent to the Client Institution, which will proxy these files, ensuring brand independence in managing their apps.

#### Webview

Webview screens will be sent to the app as a return from the post on the API */received-consent/result*. Upon receiving this return, the application must immediately open a webview and navigate to the full URL returned by the API.

To ensure the request comes from an application correctly handling the consent flow, it is necessary to configure the webview's user-agent with the value "*openfinance-webview*" (without quotes).

The webview component must also allow JavaScript execution and DOM storage (*domStorageEnabled = true*).

Specific handling of URLs returned from webview calls is necessary, according to the following cases:

1. **URL contains “shared-consent” or the Client Institution's FQDN:** Open the URL directly with the Webview;

2. **End of Flow URL:** When this URL is returned, the webview flow has ended, and the user has received feedback on the error/end of flow (the webview handles this feedback). Upon receiving this URL, the Issuer's app should redirect the user to the screen where the flow started. For example: The client performed data reception, and this option was contained in an Open Finance menu, so the user should be redirected back to this screen;

3. **Other URLs:** Delegate the opening of these URLs to the System. These URLs represent the user's redirection to other Financial Institutions in the Data Reception process.

#### APP Implementation Checklist

Check the app implementation with the checklist below:

<div id="checklist-app">
  <p>
    <input type="checkbox" id="item1"> 
    Provide public URLs for the contents of the <code>assetlinks.json</code> and <code>apple-app-site-association</code> links
  </p>
  <p>
    <input type="checkbox" id="item2"> 
    Deeplink / Universal link on the brand's authentication URL
  </p>
  <p>
    <input type="checkbox" id="item3"> 
    Webview should allow the execution of JavaScript code
  </p>
  <p>
    <input type="checkbox" id="item4"> 
     Webview should use User-Agent with value "<code>openfinance-webview</code>" (without quotes)
  </p>
  <p>
    <input type="checkbox" id="item5"> 
    Open webview with the full URL (including query string) of the deeplink / Universal link immediately
  </p>
  <p>
    <input type="checkbox" id="item6"> 
    Redirect to the authentication screen when webview navigates to <code>authenticationBrandUrl</code>
  </p>
  <p>
    <input type="checkbox" id="item7"> 
    Redirect to the transaction password screen (if existing) when webview navigates to <code>transactionAuthenticationBrandUrl</code>
  </p>
  <p>
    <input type="checkbox" id="item8"> 
    Redirect to the main screen or error handling when the webview navigates to <code>homePageBrandUrl</code>
  </p>
  <p>
    <input type="checkbox" id="item9"> 
    Delegate the opening of URLs different from the Opus FQDN and brand URLs to the operating system
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

## Flows

### URL Flow and Backend-to-Backend Calls

This section presents the integration flow between the shared consent API and the brand authentication. Integration occurs in two stages: in the initial calls of the Reception and Consent Management flows. After the initial call, the entire flow will be controlled by the shared consent application, with the user being redirected to the Transmitting Institution only to accept the consent. URL handling should follow the same mapping performed for the app, but opening URLs different from the end-of-flow URL FQDNs directly with the browser (without using the webview).

Redirection for Consent Management
In addition to authentication for consent creation, shared consent also allows users to manage sharing done. For this, the user must be logged into the brand, so the shared consent expects to receive a signed token similar to that sent by the brand authorization screen, with the difference that sending the *authenticationId* claim is not necessary and that the callback address should follow the example:

``` shell
POST /management/result HTTP/1.1 
Host: consentimento.compartilhado.com.br 
Content-Type: application/jwt 
Content-Length: * 
 
eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.JbC9dCW4uXidMaiKjFAmJ2bVDOqyCdFO1Q_bwKZ1qAcvF8AhVdg424QjTDdVeP0iBANQKvMc0p2IIEnumDL-... 
```

Como resposta a marca deve receber uma URL para qual deve redirecionar o cliente.
