---
layout: default
title: "APIs de Gestión de Consentimientos"
parent: "Opus Open Finance"
nav_order: 2
lang: "es"
alternate_lang:
  - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/APIs_de_backoffice/OOF-APIBack/"
    lang: "pt-br"
  - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/APIs_de_backoffice/OOF-APIBack/"
    lang: "en"
---

## APIs de Gestión de Consentimientos

Los consentimientos (tanto de intercambio de datos como de pagos) desempeñan un papel central en todo el modelo de funcionamiento del *Open Finance Brasil*, garantizando que todas las transacciones y operaciones dentro del ecosistema sean realizadas con la debida autorización explícita del cliente final.

La **Plataforma Opus Open Finance** realiza la gestión completa de los consentimientos y los almacena de forma segura en su base de datos interna, inclusive garantizando que eventuales datos personales sensibles asociados a estos consentimientos sean siempre encriptados cuando estén en reposo.

Los consentimientos solo pueden ser creados (y revocados) mediante acción directa del cliente final, ya sea cuando él autoriza la realización de un pago o cuando proporciona un consentimiento de intercambio de datos con un participante debidamente autorizado del *Open Finance Brasil*.

Al mismo tiempo, la creación o revocación de un consentimiento es resultado de la interacción segura entre los participantes del ecosistema y regulada por protocolos de seguridad bastante estrictos. Toda y cualquier solicitud recibida por la plataforma solo puede ser realizada si existe un consentimiento activo y que posea los permisos adecuados para la realización de la operación.

De esta forma, toda la creación y gestión del tiempo de vida y revocación de consentimientos es de responsabilidad exclusiva de la plataforma.

La API de Gestión de Consentimientos permite a las aplicaciones de la institución financiera extraer información sobre los consentimientos (activos o no) referentes a los pagos realizados y a los intercambios de datos cedidos por sus clientes.

### *Open API Specification*

Las definiciones de la API en formato Open API Specification pueden ser encontradas [**aquí**][API-backoffice].

Para descargar el archivo YAML/OAS que contiene la especificación de la API, haga clic [**aquí**](../apis/oas-oof-dados.yml){:download="oas-oof-dados.yml"}.

{: .destaque}
Algunos navegadores de internet, como *Chrome*, ocasionalmente señalan como *no segura* la operación de *descarga* de archivos YAML, exigiendo el desbloqueo manual por el usuario. Sin embargo, estos archivos son de tipo texto y no presentan riesgo por sí mismos.

[API-backoffice]: ../../../../swagger-ui/index.html?api=OAS-back-dados
