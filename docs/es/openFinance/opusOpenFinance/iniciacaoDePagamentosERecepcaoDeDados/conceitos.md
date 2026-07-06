---
layout: default
title: Conceptos
parent: "Iniciación de Pagos y Recepción de Datos"
nav_order: 1
has_children: true
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/conceitos/index"
      lang: "pt-br"
    - path: "/Documentation/en/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/conceitos/index"
      lang: "en"
---

## Conceptos Fundamentales

Entender la arquitectura y los flujos del Open Finance es esencial para la comprensión del **Módulo de Iniciación de Pagos**. Esta sección presenta los principales conceptos que orientan la actuación como Iniciador de Transacción de Pago (ITP) o Receptor de Datos.

## Consentimiento

El consentimiento es la autorización explícita concedida por el usuario final para que su Institución acceda a datos o inicie pagos (ITP) en su nombre, ante las [Instituciones Titulares de Cuenta][Detentoras].

- **Autorizar el consentimiento:** Es el proceso de redireccionar al usuario al entorno de la Institución Titular de Cuenta para que autorice, de forma autenticada, los alcances de servicio solicitados.
- **Alcance (`permissions`):** Es la unidad que define lo que la TPP puede hacer. Cada alcance es una cadena estandarizada por el regulador (ej.: `ACCOUNTS_READ`, `CREDIT_CARDS_ACCOUNTS_BILLS_READ`, `payments`) que el usuario autoriza explícitamente. El conjunto exacto de alcances exigido depende del tipo de dato/operación.
- **Vigencia:** El consentimiento posee un plazo de validez definido en la solicitud (`expirationDateTime`, generalmente de 3 a 12 meses o Indeterminado, dependiendo del alcance).
- **Identificadores:** Tras su creación, el consentimiento es identificado por un `consentId` (URN en el formato `urn:<brand>:<uuid>`).

### Máquina de estados de consentimiento (alto nivel)

| Status | Significado |
| :----: | ----------- |
| `AWAITING_AUTHORISATION` | Consentimiento creado, aguardando autorización del usuario en la Institución Titular de Cuenta |
| `AUTHORISED` | Consentimiento aprobado, tokens generados, listo para su uso |
| `REJECTED` | Consentimiento negado o expirado |
| `CONSUMED` | Consentimiento de pago ya utilizado |
| `PARTIALLY_ACCEPTED` | Múltiples niveles de aprobación — algunos aprobadores aún pendientes |

> **Ventana de retry:** los consentimientos en `AWAITING_AUTHORISATION` aceptan un nuevo intento de autorización durante **5 minutos** (pago) o **60 minutos** (compartición de datos).

## Revocación de Pago vs. Revocación de Consentimiento

Es fundamental distinguir estos dos eventos, ya que impactan de forma diferente al flujo del negocio:

- **Revocación de Pago:**
  - **Ocurre:** Antes de la liquidación financiera;
  - **Quién la realiza:** El cliente autenticado (o la TPP, si el flujo lo permite);
  - **Efecto:** Cancela la transacción de pago específica. El consentimiento continúa válido para nuevas transacciones.
- **Revocación de Consentimiento:**
  - **Ocurre:** En cualquier momento;
  - **Quién la realiza:** Exclusivamente el cliente ante la Institución Titular de Cuenta;
  - **Efecto:** Invalida **todos** los accesos y permisos asociados a aquel consentimiento. La TPP ya no puede iniciar pagos ni acceder a datos hasta que se solicite y autorice un nuevo consentimiento.

## Jornadas de Iniciación (App-to-App, App-to-Web, Web-to-App)

El método de redireccionamiento del usuario para la autenticación en la institución titular de cuenta varía según el entorno (Aplicación Móvil vs. Navegador). El **Módulo de Iniciación de Pagos** soporta los principales estándares:

- **App-to-App:** Flujo entre dos aplicaciones móviles nativas:
  - *Funcionamiento:* La app de la ITP llama a la app de la institución titular de cuenta vía *Deep Link*;
  - *Ventaja:* Experiencia más fluida y segura, manteniendo el contexto en el dispositivo móvil.
- **App-to-Web:** Flujo que sale de una app nativa y abre el navegador (WebView o Browser externo):
  - *Funcionamiento:* Utilizado cuando la institución titular no posee app instalada o como alternativa cuando el flujo preferido falla (*fallback*);
  - *Atención:* El uso de WebViews restringidas (in-app browser) puede causar fallas de autenticación; se recomienda el uso del navegador estándar del sistema.
- **Web-to-App:** Flujo que sale de un sitio/navegador e intenta abrir una app nativa:
  - *Funcionamiento:* Utiliza un intento de *Deep Link*. Si la app no está instalada, la experiencia generalmente retorna al flujo Web (*fallback*).

## Consentimiento vs. Vinculación de Dispositivo

Son dos conceptos distintos, pero complementarios en la seguridad de la jornada:

- **Consentimiento:** Es la autorización legal y técnica de la institución titular de cuenta. Es un registro en el ecosistema (generalmente asociado al *userId* o *CPF*);
- **Vinculación de Dispositivo (Enrollment):** Es la asociación entre un dispositivo específico (identificado por *fingerprint*, token FCM, o certificado FIDO2) y un consentimiento o usuario:
  - *Utilidad:* Permite que, en Jornadas como la JSR (Jornada Sin Redireccionamiento), el sistema reconozca que aquel dispositivo ya posee un consentimiento activo, evitando que el usuario tenga que efectuar el login en la Institución Titular de Cuenta repetidamente;
  - *En el Módulo de Iniciación de Pagos:* El Módulo puede realizar la creación de vínculos de JSR, retransmitiendo los requests al **FIDO Server** de la Institución Titular de Cuenta (el Servicio FIDO Server de la Plataforma Opus Open Finance puede contratarse por separado para esa finalidad).

### Identificadores de Dispositivo y Credenciales

Varios identificadores aparecen en los flujos de Vinculación de Dispositivo y pueden causar confusión por tener nombres parecidos. Esta sección aclara cada uno:

#### Device Fingerprint

Firma única del dispositivo calculada automáticamente a partir de sus características técnicas — modelo, sistema operativo, resolución de pantalla, huso horario, idioma, configuraciones de hardware, etc. Cada combinación de esas características tiende a ser única, permitiendo reconocer el mismo dispositivo entre sesiones sin identificación explícita del usuario.

- **Cuándo aparece:** análisis antifraude de la Institución Titular, en el payload de `risk-signals`;
- **No confundir con:** biometría (huella del dedo). El nombre viene por analogía, es la "huella digital del dispositivo".

#### Token FCM (Firebase Cloud Messaging)

Identificador emitido por el servicio de notificaciones push de Google (FCM) que identifica una instalación específica de una aplicación en un dispositivo Android. Cada vez que la app se instala, se actualiza o se limpian los datos de notificación, se genera un nuevo token FCM.

- **Cuándo aparece:** para vincular un dispositivo Android a un consentimiento, garantizando que las notificaciones de cambio de estado lleguen al aparato correcto;
- **Equivalente en iOS:** APNs Device Token (Apple Push Notification service).

#### Credencial FIDO2

Par de claves criptográficas (pública + privada) generado por el propio dispositivo del usuario en el momento del registro del vínculo. La clave privada **nunca sale del dispositivo** — queda protegida por el hardware seguro (Secure Enclave en iOS, Trusted Execution Environment en Android). La clave pública es enviada a la Institución Titular para futuras verificaciones.

- **Cuándo aparece:** en el registro de la vinculación de dispositivo (`POST /fido-registration`) y en cada autorización posterior (`POST /fido-sign-options` + `POST .../authorise`);
- **Activada por:** biometría (rostro, huella) o PIN del dispositivo;
- **No es un "certificado tradicional":** no es emitida por una Autoridad Certificadora, se genera localmente.

#### `deviceId`

Identificador elegido por la aplicación cliente para el dispositivo (generalmente un UUID generado en la primera instalación y persistido localmente). A diferencia del fingerprint, es **estable** entre sesiones (hasta que la app sea reinstalada) y definido por la propia aplicación, no calculado.

- **Cuándo aparece:** en el payload de `risk-signals` (campo `data.deviceId`).

#### Cómo se relacionan estos identificadores

| Identificador | Quién lo genera | Dónde se almacena | Cambia cuando |
| :-----------: | :-------: | :------------------: | :---------: |
| Device Fingerprint | Calculado por la propia TPP/Institución Titular | No persistido — recalculado en cada análisis | Las características del dispositivo cambian (ej.: SO actualizado) |
| Token FCM | Google (FCM) / Apple (APNs) | En la app cliente + servidor de push | La app se reinstala, se limpian los datos, o expira |
| Credencial FIDO2 | Dispositivo del usuario (chip seguro) | Chip seguro del dispositivo (privada) + Institución Titular (pública) | El vínculo es revocado/rechazado o el dispositivo se reinicia |
| `deviceId` | Aplicación cliente | App + payloads enviados | La app se reinstala |

### Estados de la Vinculación de Dispositivo

| Status | Significado |
| :----: | ----------- |
| `AWAITING_RISK_SIGNALS` | Vínculo creado; aguardando envío de señales de riesgo (hasta 15 min) |
| `AWAITING_ACCOUNT_HOLDER_VALIDATION` | Señales recibidas; aguardando autorización del usuario en la Institución Titular |
| `AWAITING_ENROLLMENT` | Autorización concedida; aguardando registro de la credencial FIDO2 |
| `AUTHORISED` | Credencial FIDO2 registrada — vínculo apto para autorizar pagos |
| `REJECTED` | Vínculo rechazado por el usuario o expirado |

## Jornada Optimizada

La Jornada Optimizada es un flujo donde dos consentimientos (uno de Datos y uno de Pagos) pueden crearse en una única interacción, combinando dos consentimientos vinculados:

Uno de los principales motivos de falla en transacciones de pago en el Open Finance es el intento de débito en una cuenta sin saldo suficiente. Como la ITP no tiene acceso directo a la cuenta del usuario, no puede verificar el saldo antes de iniciar el pago, lo que resulta en transacciones rechazadas por la Institución Titular de Cuenta, generando fricción en la experiencia del usuario y costos operativos innecesarios. La Jornada Optimizada resuelve este problema al combinar, en una única autorización, un consentimiento de pago con un consentimiento de lectura de datos, permitiendo que la ITP consulte el saldo disponible antes de cada transacción.

- **Primario (transferencias inteligentes para pagos o vinculación de dispositivo para JSR):** Autoriza las operaciones financieras en sí.
- **Secundario (datos):** Autoriza la lectura del saldo de la cuenta para validar la viabilidad del pago antes de la ejecución.

---

## Conceptos del ecosistema Open Finance

### Directorio de Participantes (Directorio Central)

Repositorio oficial mantenido por el Banco Central que registra todas las instituciones autorizadas a operar en el Open Finance Brasil. Toda TPP debe estar registrada en el Directorio para:

- Recibir sus **certificados regulatorios** (BRCAC, BRSEAL);
- Publicar su **Software Statement** (declaración de la aplicación);
- Identificarse en las llamadas mTLS a las instituciones destino.

### Software Statement (SSA — Software Statement Assertion)

Documento JWS emitido por el Directorio de Participantes que describe una aplicación específica de la TPP. Cada SSA tiene:

- Un `softwareStatementId` (UUID);
- Un `client_id` asociado;
- Lista de *redirect URIs* autorizadas;
- Metadatos de la aplicación.

Una única institución (organisation) puede tener múltiples SSAs (uno por aplicación/marca). El SSA se almacena en la base de datos del Módulo de Iniciación de Pagos..

### Perfiles Regulatorios (`role`)

Al buscar instituciones en el Directorio (`GET /participants`), estas vienen clasificadas por rol regulador:

| Role | Significado |
| :--: | :---------: |
| `DADOS` | Compartición de datos registrales y transaccionales |
| `PAGTO` | Iniciación de pagos (Pix) |
| `CONTA` | Operaciones en cuenta corriente |
| `CCORR` | Cambio de divisas (Cuenta de Pago Prepaga / Crédito al Cliente — `[ANNA: confirmar definição exata de CCORR]`) |

### `AuthorisationServerId`

Identificador único de cada **marca** (brand) que una institución opera en el Open Finance. Una misma institución puede tener múltiples marcas (ej.: bancos con retail + private + digital). El `AuthorisationServerId` es el identificador usado:

- En el header `x-authorisation-server-id` de las llamadas subsiguientes;
- En la selección de la Institución Titular durante el flujo de consentimiento;
- Para descubrir los endpoints técnicos de la institución vía `.well-known/openid-configuration`.

### Webhook

Mecanismo por el cual la Institución Titular de Cuenta **notifica** al Módulo de Iniciación de Pagos de cambios en pagos, consentimientos o vínculos. El Módulo recibe la notificación (solo la fecha — no el nuevo estado), la reenvía a la URL de webhook registrada por el cliente y la publica en un tópico Dapr para procesamiento asíncrono.

Detalles en [Webhooks][Webhooks].

### Backoffice

Interfaz administrativa del Módulo de Iniciación de Pagos que expone operaciones de **consulta** sobre consentimientos, vínculos y pagos. Orientada a los equipos de soporte, ops y backoffice — no sustituye la UI del cliente. Detalles en [Backoffice][Backoffice].

### Permissions vs. Scopes

Aunque ambos están relacionados con la autorización de acceso a datos, tienen roles diferentes dentro del ecosistema:

- Permissions (o permisos): Son informaciones declaradas en la creación de un consentimiento de compartición de datos, que especifican qué tipos de datos transaccionales el cliente autoriza compartir con la institución receptora. Es decir, definen el alcance de negocio del consentimiento. Por ejemplo, un consentimiento puede permitir el acceso a información de cuentas, tarjetas de crédito, operaciones de crédito o inversiones, cada una representada por una permission diferente. Estos permisos deben ser informados correctamente por el cliente que está creando el consentimiento, siguiendo la documentación oficial que define el formato del request;
- Scopes: Forman parte de la capa técnica de seguridad del protocolo FAPI-BR / OpenID Connect. Indican qué operaciones un determinado token de acceso está autorizado a realizar dentro de la infraestructura regulada. Cada API del Open Finance posee su conjunto específico de scopes obligatorio. Por ejemplo: La API de creación de consentimientos exige el scope consents, las APIs de pagos exigen el scope payments, y las APIs de acceso a datos de cuentas exigen el scope accounts. Estos scopes se validan durante el flujo de autenticación y autorización y garantizan que el token emitido tenga solo los privilegios necesarios para la operación solicitada.

En resumen: Mientras que las permissions describen qué datos el titular autoriza compartir (nivel de negocio), los scopes definen cómo ese acceso es técnicamente permitido (nivel de seguridad y comunicación entre sistemas). En el caso del Módulo de Iniciación de Pagos, la gestión de los scopes está totalmente automatizada por la plataforma, prescindiendo de configuraciones adicionales por parte del cliente. Las permissions, por su parte, deben ser correctamente informadas por el integrador al crear el consentimiento de compartición, conforme a las reglas de la especificación del Open Finance Brasil.

---

> **Nota:** Para detalles técnicos sobre la implementación de estos conceptos (endpoints, payloads y flujos de fallback), consulte la sección de [Funcionamiento][Funcionamento].

[Detentoras]: ../../openFinanceBrasil/perfisParticipacao/detentorDeContas.html
[Webhooks]: ./funcionamento/webhooks.html
[Backoffice]: ./funcionamento/backoffice.html
[Funcionamento]: ./funcionamento/
