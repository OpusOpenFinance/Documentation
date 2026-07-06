---
layout: default
title: Concepts
parent: "Payment Initiation and Data Receipt"
nav_order: 1
has_children: true
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/conceitos/index"
      lang: "pt-br"
    - path: "/Documentation/es/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/conceitos/index"
      lang: "es"
---

## Fundamental Concepts

Understanding the architecture and flows of Open Finance is essential to grasping the **Payment Initiation Module**. This section presents the main concepts that guide operating as a Payment Transaction Initiator (ITP) or Data Receiver.

## Consent

Consent is the explicit authorization granted by the end user for your Institution to access data or initiate payments (ITP) on their behalf with the [Account Holding Institutions][Detentoras].

- **Authorize the consent:** This is the process of redirecting the user to the Account Holder's environment so that they can authorize, in an authenticated manner, the requested service scopes.
- **Scope (`permissions`):** This is the unit that defines what the TPP can do. Each scope is a string standardized by the regulator (e.g., `ACCOUNTS_READ`, `CREDIT_CARDS_ACCOUNTS_BILLS_READ`, `payments`) that the user explicitly authorizes. The exact set of scopes required depends on the type of data/operation.
- **Validity:** The consent has a validity period defined in the request (`expirationDateTime`, usually 3 to 12 months or Indefinite, depending on the scope).
- **Identifiers:** Once created, the consent is identified by a `consentId` (a URN in the format `urn:<brand>:<uuid>`).

### Consent state machine (high-level)

| Status | Meaning |
| :----: | ----------- |
| `AWAITING_AUTHORISATION` | Consent created, awaiting user authorization at the Account Holder |
| `AUTHORISED` | Consent approved, tokens generated, ready for use |
| `REJECTED` | Consent denied or expired |
| `CONSUMED` | Payment consent already used |
| `PARTIALLY_ACCEPTED` | Multiple approval levels — some approvers still pending |

> **Retry window:** consents in `AWAITING_AUTHORISATION` accept a new authorization attempt for **5 minutes** (payment) or **60 minutes** (data sharing).

## Payment Revocation vs. Consent Revocation

It is essential to distinguish these two events, as they impact the business flow differently:

- **Payment Revocation:**
  - **Occurs:** Before financial settlement;
  - **Who performs it:** The authenticated customer (or the TPP, if the flow allows);
  - **Effect:** Cancels the specific payment transaction. The consent remains valid for new transactions.
- **Consent Revocation:**
  - **Occurs:** At any time;
  - **Who performs it:** Exclusively the customer, with the Account Holder;
  - **Effect:** Invalidates **all** access and permissions associated with that consent. The TPP can no longer initiate payments or access data until a new consent is requested and authorized.

## Initiation Journeys (App-to-App, App-to-Web, Web-to-App)

The method of redirecting the user for authentication at the account holder varies depending on the environment (Mobile App vs. Browser). The **Payment Initiation Module** supports the main standards:

- **App-to-App:** Flow between two native mobile applications:
  - *How it works:* The ITP app calls the account holder's app via a *Deep Link*;
  - *Advantage:* A smoother and more secure experience, keeping the context on the mobile device.
- **App-to-Web:** Flow that leaves a native app and opens the browser (WebView or external Browser):
  - *How it works:* Used when the holder does not have an app installed or as an alternative when the preferred flow fails (*fallback*);
  - *Attention:* The use of restricted WebViews (in-app browser) may cause authentication failures; using the system's default browser is recommended.
- **Web-to-App:** Flow that leaves a website/browser and tries to open a native app:
  - *How it works:* Uses a *Deep Link* attempt. If the app is not installed, the experience usually returns to the Web flow (*fallback*).

## Consent vs. Device Binding

These are two distinct but complementary concepts in the security of the journey:

- **Consent:** This is the legal and technical authorization from the account holder. It is a record in the ecosystem (usually associated with the *userId* or *CPF*);
- **Device Binding (Enrollment):** This is the association between a specific device (identified by *fingerprint*, FCM token, or FIDO2 certificate) and a consent or user:
  - *Usefulness:* Allows that, in journeys such as the JSR (Redirect-less Journey), the system recognizes that the device already has an active consent, avoiding the need for the user to log in to the Account Holder repeatedly;
  - *In the Payment Initiation Module:* The Module can create JSR bindings, forwarding the requests to the Account Holder's **FIDO Server** (the FIDO Server Service of the Opus Open Finance Platform can be contracted separately for this purpose).

### Device Identifiers and Credentials

Several identifiers appear in the Device Binding flows and can cause confusion because they have similar names. This section clarifies each one:

#### Device Fingerprint

A unique signature of the device automatically computed from its technical characteristics — model, operating system, screen resolution, time zone, language, hardware settings, etc. Each combination of these characteristics tends to be unique, allowing the same device to be recognized across sessions without explicit user identification.

- **When it appears:** the Holder's anti-fraud analysis, in the `risk-signals` payload;
- **Not to be confused with:** biometrics (fingerprint). The name comes by analogy; it is the "device's fingerprint".

#### FCM Token (Firebase Cloud Messaging)

An identifier issued by Google's push notification service (FCM) that identifies a specific installation of an application on an Android device. Each time the app is installed, updated, or the notification data is cleared, a new FCM token is generated.

- **When it appears:** to bind an Android device to a consent, ensuring that status-change notifications reach the correct device;
- **iOS equivalent:** APNs Device Token (Apple Push Notification service).

#### FIDO2 Credential

A pair of cryptographic keys (public + private) generated by the user's own device at the moment the binding is registered. The private key **never leaves the device** — it is protected by the secure hardware (Secure Enclave on iOS, Trusted Execution Environment on Android). The public key is sent to the Holder for future verifications.

- **When it appears:** in the device binding registration (`POST /fido-registration`) and in each subsequent authorization (`POST /fido-sign-options` + `POST .../authorise`);
- **Activated by:** biometrics (face, fingerprint) or the device PIN;
- **It is not a "traditional certificate":** it is not issued by a Certificate Authority; it is generated locally.

#### `deviceId`

An identifier chosen by the client application for the device (usually a UUID generated on first installation and persisted locally). Unlike the fingerprint, it is **stable** across sessions (until the app is reinstalled) and is defined by the application itself, not computed.

- **When it appears:** in the `risk-signals` payload (field `data.deviceId`).

#### How these identifiers relate to each other

| Identifier | Who generates it | Where it is stored | Changes when |
| :-----------: | :-------: | :------------------: | :---------: |
| Device Fingerprint | Computed by the TPP/Holder itself | Not persisted — recomputed on each analysis | The device's characteristics change (e.g., OS updated) |
| FCM Token | Google (FCM) / Apple (APNs) | On the client app + push server | App reinstalled, data cleared, or expiration |
| FIDO2 Credential | User's device (secure chip) | Device's secure chip (private) + Holder (public) | Binding revoked/rejected or device reset |
| `deviceId` | Client application | App + sent payloads | App reinstalled |

### Device Binding States

| Status | Meaning |
| :----: | ----------- |
| `AWAITING_RISK_SIGNALS` | Binding created; awaiting the sending of risk signals (up to 15 min) |
| `AWAITING_ACCOUNT_HOLDER_VALIDATION` | Signals received; awaiting user authorization at the Holder |
| `AWAITING_ENROLLMENT` | Authorization granted; awaiting registration of the FIDO2 credential |
| `AUTHORISED` | FIDO2 credential registered — binding ready to authorize payments |
| `REJECTED` | Binding rejected by the user or expired |

## Optimized Journey

The Optimized Journey is a flow where two consents (one for Data and one for Payments) can be created in a single interaction, combining two linked consents:

One of the main causes of failure in Open Finance payment transactions is the attempt to debit an account without sufficient balance. Since the ITP does not have direct access to the user's account, it cannot check the balance before initiating the payment, which results in transactions being rejected by the Account Holder, generating friction in the user experience and unnecessary operational costs. The Optimized Journey solves this problem by combining, in a single authorization, a payment consent with a data-read consent, allowing the ITP to check the available balance before each transaction.

- **Primary (smart transfers for payments or device binding for JSR):** Authorizes the financial operations themselves.
- **Secondary (data):** Authorizes the reading of the account balance to validate the feasibility of the payment before execution.

---

## Open Finance ecosystem concepts

### Participant Directory (Central Directory)

Official repository maintained by the Central Bank that registers all institutions authorized to operate in Open Finance Brasil. Every TPP must be registered in the Directory in order to:

- Receive its **regulatory certificates** (BRCAC, BRSEAL);
- Publish its **Software Statement** (application declaration);
- Identify itself in the mTLS calls to the destination institutions.

### Software Statement (SSA — Software Statement Assertion)

A JWS document issued by the Participant Directory that describes a specific TPP application. Each SSA has:

- A `softwareStatementId` (UUID);
- An associated `client_id`;
- A list of authorized *redirect URIs*;
- Application metadata.

A single institution (organisation) can have multiple SSAs (one per application/brand). The SSA is stored in the Payment Initiation Module's database.

### Regulatory Profiles (`role`)

When searching for institutions in the Directory (`GET /participants`), they come classified by regulatory role:

| Role | Meaning |
| :--: | :---------: |
| `DADOS` | Sharing of registration and transactional data |
| `PAGTO` | Payment initiation (PIX) |
| `CONTA` | Checking account operations |
| `CCORR` | Foreign exchange (Prepaid Payment Account / Customer Credit — `[ANNA: confirmar definição exata de CCORR]`) |

### `AuthorisationServerId`

The unique identifier of each **brand** that an institution operates in Open Finance. A single institution can have multiple brands (e.g., banks with retail + private + digital). The `AuthorisationServerId` is the identifier used:

- In the `x-authorisation-server-id` header of subsequent calls;
- In selecting the Holder during the consent flow;
- To discover the institution's technical endpoints via `.well-known/openid-configuration`.

### Webhook

The mechanism by which the Account Holding Institution **notifies** the Payment Initiation Module of changes in payments, consents, or bindings. The Module receives the notification (only the date — not the new status), forwards it to the webhook URL registered by the client, and publishes it to a Dapr topic for asynchronous processing.

Details in [Webhooks][Webhooks].

### Backoffice

Administrative interface of the Payment Initiation Module that exposes **query** operations over consents, bindings, and payments. Aimed at support, ops, and backoffice teams — it does not replace the client's UI. Details in [Backoffice][Backoffice].

### Permissions vs. Scopes

Although both are related to authorizing access to data, they play different roles within the ecosystem:

- Permissions: These are pieces of information declared when creating a data-sharing consent, which specify which types of transactional data the customer authorizes to be shared with the receiving institution. In other words, they define the business scope of the consent. For example, a consent may allow access to account information, credit cards, credit operations, or investments, each represented by a different permission. These permissions must be correctly provided by the client creating the consent, following the official documentation that defines the request format;
- Scopes: They are part of the technical security layer of the FAPI-BR / OpenID Connect protocol. They indicate which operations a given access token is authorized to perform within the regulated infrastructure. Each Open Finance API has its own specific set of mandatory scopes. For example: The consent-creation API requires the consents scope, the payment APIs require the payments scope, and the account-data access APIs require the accounts scope. These scopes are validated during the authentication and authorization flow and ensure that the issued token has only the privileges necessary for the requested operation.

In short: While permissions describe which data the holder authorizes to share (business level), scopes define how that access is technically permitted (security and system-to-system communication level). In the case of the Payment Initiation Module, scope management is fully automated by the platform, requiring no additional configuration on the client's part. Permissions, on the other hand, must be correctly provided by the integrator when creating the data-sharing consent, according to the rules of the Open Finance Brasil specification.

---

> **Note:** For technical details on the implementation of these concepts (endpoints, payloads, and fallback flows), see the [How It Works][Funcionamento] section.

[Detentoras]: ../../openFinanceBrasil/perfisParticipacao/detentorDeContas.html
[Webhooks]: ./funcionamento/webhooks.html
[Backoffice]: ./funcionamento/backoffice.html
[Funcionamento]: ./funcionamento/
