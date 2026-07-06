---
layout: default
title: App-to-App and Web Redirect
parent: "How It Works"
grand_parent: "Payment Initiation and Data Receipt"
nav_order: 6
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/redirecionamento"
      lang: "pt-br"
    - path: "/Documentation/es/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/redirecionamento"
      lang: "es"
---

## Purpose

Detail the handling of the return of the Payment Initiation Module flow both on the mobile path (App-to-App via Android App Links / iOS Universal Links) and on the web path, including the `authorization-result` endpoint, the standard OAuth 2.0 error formats, and support for multiple applications.

> As [defined by Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/240650297/Redirecionamento+App-to-App), the communication between the Receiver's application and the Transmitter's application must be **direct**, without intermediate steps (such as web pages for application selection).

## URLs the application must intercept

| Description | URL |
| :-------: | :-: |
| Data consent | `https://<FQDN>/opus-open-finance/consents/redirect-uri` |
| Payment consent | `https://<FQDN>/opus-open-finance/payments/redirect-uri` |
| Data consent  | `https://<FQDN>/opus-open-insurance/consents/redirect-uri` |

The `<FQDN>` is the FQDN configured in the corresponding `application` table row.

## Asset Links and Apple App Site Association files

These files allow the device's operating system to recognize which apps are authorized to intercept each URL. The Payment Initiation Module serves these files at the following routes:

| Platform | Route |
| :--------: | :--: |
| Android | `GET https://<FQDN>/.well-known/assetlinks.json` |
| iOS | `GET https://<FQDN>/.well-known/apple-app-site-association` |

The content of these files is configured via deploy environment variables (`config.androidAssetLinksFile` and `config.appleAppSiteAssociationFile`).

## `authorization-result` endpoint

After intercepting the return URL, the app must send the OIDC result to the Payment Initiation Module via this endpoint:

| Verb | URL | Payload |
| :---: | :-: | :-----: |
| POST | `https://<FQDN>/opus-open-finance/authorization-result` | `{ "data": "<query string ou fragment>" }` |
| POST | `https://<FQDN>/opus-open-insurance/authorization-result` | same |

The query string or fragment must be extracted **as-is** from the intercepted URL (everything that comes after `?` or `#`).

**Possible returns:**

| Status | Meaning | Body |
| :----: | :---------: | :---: |
| 204 No Content | Authorization succeeded | empty |
| 422 Unprocessable Entity | Authorization failed | `{ "error": "...", "error_description": "..." }` |

> **Recommendation:** call `/authorization-result` **immediately** after intercepting the URL, even before requiring user authentication in the app. The *authorization code* returned by the Payment Initiation Module flow has a very short TTL (defined by the Transmitter — often less than 60 seconds).

## Mobile path vs. web path

The authorization result is delivered through different paths depending on **where the flow was started**:

| Origin | What happens on the return | Technical path |
| :----: | :-----------------------: | :-------------: |
| **Mobile application** | The Receiver's app intercepts the redirect via App Links / Universal Links | `POST /authorization-result` |
| **Browser** | The browser follows the Transmitter's redirect to the Payment Initiation Module | `/redirect-uri` → 302 to `callbackApplicationUri` |

> **Critical warning:** Even when the flow is started in an app, it is **mandatory** to implement **both** paths. Mobile interception may fail (misconfigured App Links, the user chooses to open with another app, etc.). Without the web handling as a contingency, the user is left without feedback on the result.

### Path 1 — Mobile

The app intercepts the redirect, extracts the query string or fragment, and calls `POST /authorization-result`. The result arrives in the HTTP response of the call:

- **Success:** `204 No Content` (empty body)
- **Error:** `422 Unprocessable Entity` with `error` and `error_description` in the JSON body

### Path 2 — Web

When the browser follows the Transmitter's redirect to the Payment Initiation Module's `/redirect-uri` route, the Payment Initiation Module performs an **HTTP 302** to the `callbackApplicationUri` registered in the consent, adding the following query parameters:

**Success:**

```
<callbackApplicationUri>?result=success
```

**Error:**

```
<callbackApplicationUri>?result=error&error=<código>&error_description=<descrição>
```

| Parameter | Who defines it | Possible values |
| :-------: | :---------: | :---------------: |
| `result` | Payment Initiation Module | `success` or `error` |
| `error` | Transmitter (OAuth 2.0) | Standard code [RFC 6749 §4.1.2.1](https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1). Examples: `access_denied` (user denied), `invalid_grant` (invalid/expired authorization code) |
| `error_description` | Transmitter (OAuth 2.0) | Free text, varies by each Transmitter's implementation |

### About the error parameters

On both paths, `error` and `error_description` are **standard OAuth 2.0** (RFC 6749): they are generated by the Transmitter and forwarded by the Payment Initiation Module. The `result` parameter (present only on the path via `callbackApplicationUri`) is the only one added by our solution, to make it easier to detect the result without having to check for the absence of `error`.

## Support for multiple applications

When the Receiver has more than one application linked to the product, it is essential to ensure that the user **stays in the same application** in which they started the consent after returning from the Transmitter.

To configure this, each of the institution's applications must intercept exclusively the URIs with the `FQDN` corresponding to the one registered in its `application` row, taking into account the associated `redirect_identifier`.

Example — two apps, `id-app-a` and `id-app-b`, with FQDNs *ooc-appA.instituicao.com.br* and *ooc-appB.instituicao.com.br*:

| Product | App | URI the app must intercept |
| :-----: | :-: | :----------------------------: |
| OF Data | id-app-a | `https://ooc-appA.instituicao.com.br/opus-open-finance/consents/redirect-uri/id-app-a` |
| OF Payment | id-app-a | `https://ooc-appA.instituicao.com.br/opus-open-finance/payments/redirect-uri/id-app-a` |
| OI Data | id-app-a | `https://ooc-appA.instituicao.com.br/opus-open-insurance/consents/redirect-uri/id-app-a` |
| OF Data | id-app-b | `https://ooc-appB.instituicao.com.br/opus-open-finance/consents/redirect-uri/id-app-b` |
| OF Payment | id-app-b | `https://ooc-appB.instituicao.com.br/opus-open-finance/payments/redirect-uri/id-app-b` |
| OI Data | id-app-b | `https://ooc-appB.instituicao.com.br/opus-open-insurance/consents/redirect-uri/id-app-b` |

> **Important:** All redirection URIs used by the institution must be registered in the Software Statement of the Participant Directory (see [Configuration](../configuracao/)).

## References

- [App-to-App Redirection — Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17378415/Redirecionamento+App-to-App)
- [RFC 6749 — OAuth 2.0 §4.1.2.1](https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1)
