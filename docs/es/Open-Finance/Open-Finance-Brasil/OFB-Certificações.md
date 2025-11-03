---
layout: default
title: "Certificaciones y Certificados"
parent: "Open Finance Brasil"
nav_order: 4
lang: "es"
alternate_lang:
  - path: "/Documentation/pt-br/Open-Finance/Open-Finance-Brasil/OFB-Certificações/"
    lang: "pt-br"
  - path: "/Documentation/en/Open-Finance/Open-Finance-Brasil/OFB-Certificações/"
    lang: "en"
---

## Certificaciones y Certificados

Para participar en el Open Finance, las instituciones financieras deben realizar los procedimientos para obtener dos tipos de certificación:

- **Certificación de seguridad OpenID**;
- **Certificación funcional**.

Además, el ecosistema exige que los participantes contraten algunos certificados digitales:

- **Certificado de Transporte**;
- **Certificado EV**;
- **Certificado de Autenticación**;
- **Certificado de Firma**.

{: .nota}
**¡Certificaciones y certificados son diferentes!**
**Las certificaciones** son evidencias de que la implementación del *Open Finance Brasil* de los participantes está conforme a las especificaciones funcionales y de seguridad.
**Los certificados** son generados por una certificadora autorizada y utilizados para garantizar la autenticidad y/o encriptar la comunicación entre los participantes del *Open Finance Brasil*.

---

### Certificación de seguridad OpenID

El protocolo de seguridad adoptado por el Open Finance brasileño sigue los requisitos de la [OpenID Foundation](https://openid.net/).

Un motor de conformidad de seguridad garantiza que una institución cumpla con los requisitos de este protocolo, realizando las pruebas necesarias en la capa FAPI-BR dentro de la estructura de OpenID.

#### Tipos de certificación

1. **OpenID Providers (OP)**:  
   Obligatoria para los perfiles de Titular de Cuenta y Transmisor de Datos.
2. **Relying Parties (RP)**:  
   Obligatoria para los perfiles de Iniciador de Transacción de Pago (ITP) y Receptor de Datos.

#### Recursos para certificación

- [Guía de certificación de Conformidad](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/155910145/Guia+de+Certifica+o+de+Conformidade);
- [Directrices Técnicas de Certificación de Conformidad](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17378905/Diretrizes+T+cnicas+de+Certifica+o+de+Conformidade);
- [Orientaciones para certificación](https://openfinancebrasil.atlassian.net/wiki/download/attachments/17378905/20230124_Orienta%C3%A7%C3%B5es%20sobre%20certifica%C3%A7%C3%B5es.pptx?api=v2).

*Durante el proceso de implementación, Opus se encarga de todo el proceso de certificación de seguridad para su institución.*

---

### Certificación funcional

En el contexto de homologación del *Open Finance Brasil*, las diversas especificaciones de APIs deben ser implementadas por la institución participante. Para garantizar que el participante esté con todo el recorrido de esa funcionalidad en los parámetros esperados, la gobernanza del *Open Finance Brasil* proporciona un *motor funcional* para pruebas. Dentro de él están disponibles diversos planes de pruebas para que cada una de las APIs regulatorias sea probada y certificada conforme el grado de adherencia de su comportamiento a las normas regulatorias.

Es posible seguir las pruebas publicadas de las instituciones participantes [a través de este enlace](https://web.conformance.directory.openbankingbrasil.org.br/plans.html?public=true).

#### Etapas para certificación

1. Crear cuenta en el [sandbox](https://web.sandbox.directory.openbankingbrasil.org.br/organisations) del directorio de participantes;
2. Configurar el directorio de [sandbox](https://web.sandbox.directory.openbankingbrasil.org.br/organisations);
3. Certificar el entorno de homologación (Certificación de seguridad OpenID);
4. Desarrollar el layer de integración;
5. Realizar las pruebas y obtener la certificación funcional.

*Las pruebas obligatorias varían según el perfil de actuación y los productos ofrecidos por la institución.*

---

### Certificados digitales

Los certificados digitales se dividen en 4 tipos:

1. **Certificado de Transporte**:
   - Autentica el canal MTL;
   - Realiza autenticación de la aplicación cliente vía OAuth2.0 mTLS o private_key_jwt.

2. **Certificado EV**:
   - Utilizado para servicios como páginas web.

3. **Certificado de Autenticación**:
   - Protege y autentica el canal TLS de las APIs consumidas por las aplicaciones participantes del Open Finance.

4. **Certificado de Firma**:
   - Realiza firma del payload utilizando JWS (JSON Web Signature).

#### Necesidad de certificados por perfil

| Certificado         | Titular de Cuenta | ITP | Transmisor de Datos | Receptor de Datos |
|---------------------|:------------------:|:---:|:-------------------:|:-----------------:|
| Transporte          | Sí                | No  | Sí                 | No               |
| EV                  | Sí                | No  | Sí                 | No               |
| Autenticación       | Sí                | Sí  | Sí                 | Sí               |
| Firma               | Sí                | No  | Sí                 | No               |

#### Autoridades certificadoras aprobadas por el *Open Finance Brasil*

- **CertiSign**;
- **Serpro**;
- **Soluti**.
