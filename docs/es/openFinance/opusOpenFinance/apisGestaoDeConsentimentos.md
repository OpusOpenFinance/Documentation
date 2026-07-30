---
layout: default
title: "APIs de Gestión de Consentimientos"
parent: "Opus Open Finance"
nav_order: 2
lang: "es"
alternate_lang: 
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/apisGestaoDeConsentimentos/"
      lang: "pt-br"
    - path: "/Documentation/en/openFinance/opusOpenFinance/apisGestaoDeConsentimentos/"
      lang: "en"
---
 
## APIs de Gestión de Consentimientos

Los consentimientos (tanto de compartición de datos como de pagos) desempeñan un papel central en todo el modelo de funcionamiento del *Open Finance Brasil*, garantizando que todas las transacciones y operaciones dentro del ecosistema se realicen con el debido permiso explícito del cliente final.

La **Plataforma Opus Open Finance** realiza la gestión completa de los consentimientos y los almacena de forma segura en su base de datos interna, garantizando además que los eventuales datos personales sensibles asociados a esos consentimientos estén siempre encriptados.

Los consentimientos solo pueden ser creados (y revocados) mediante acción directa del cliente final, ya sea cuando autoriza la realización de un pago o cuando otorga un consentimiento de compartición de datos a un participante debidamente autorizado del *Open Finance Brasil*.

Al mismo tiempo, la creación o revocación de un consentimiento es resultado de la interacción segura entre participantes del ecosistema y está regulada por protocolos de seguridad. Toda solicitud recibida por la plataforma solo puede realizarse si existe un consentimiento activo que posea los permisos adecuados para la realización de la operación.

De esta forma, toda la creación y gestión del tiempo de vida y revocación de consentimientos es responsabilidad exclusiva de la plataforma.

La API de Gestión de Consentimientos permite a las aplicaciones de la institución financiera extraer información sobre los consentimientos (activos o no) referentes a los pagos realizados y a las comparticiones de datos otorgadas por sus clientes, además de realizar operaciones de retaguardia como revocación, prórroga, edición y asociación de metadatos y search keys a esos consentimientos.

### *Open API Specification*

Las definiciones de la API en formato Open API Specification pueden encontrarse [**aquí**][API-backoffice].

## Consentimientos

Endpoints referentes a la consulta, revocación, prórroga, edición y asociación de metadatos/search-keys a los consentimientos (de pago, de compartición de datos y de vínculo/*enrollment*), definidos en la especificación [`oasOOFDados.yml`][API-backoffice].

### Listado de consentimientos

        GET /open-banking/oob-consents/v1/consents

Devuelve el listado paginado de consentimientos (de pago, de compartición de datos o de vínculo/*enrollment*) registrados en la plataforma. El dueño del consentimiento puede identificarse de una de las siguientes formas:

- `cpf` / `cnpj`: Identifica a la persona física o jurídica responsable de la creación del consentimiento. Debe contener solo los dígitos. **Ejemplo**: *99999999999*.
- `consentOwner`: Conjunto de información definida por la Institución para identificar al dueño del consentimiento como, por ejemplo, agencia, cuenta, CPF, CNPJ, etc. Se representa mediante un diccionario *clave/valor* en formato *JSON URL Encoded*. **Ejemplo**: Para un identificador formado por agencia y cuenta:

```json
[{"key": "conta", "value": "12345"}, {"key": "agencia", "value": "12345"}]
```

Además, la siguiente información puede utilizarse para filtrar el resultado:

- `createdOnBegin` / `createdOnEnd`: Indican, respectivamente, la fecha de creación mínima y máxima (ambas inclusive) para la consulta de consentimientos. Deben informarse con fecha y hora en el formato especificado en la [RFC-3339](https://datatracker.ietf.org/doc/html/rfc3339). **Ejemplo**: 2022-12-19T16:39:57Z.
- `consentTermPeriod`: Plazo total del consentimiento en meses. Si es indeterminado, debe utilizarse el valor *-1*. No puede utilizarse junto con los filtros `createdOnBegin` y/o `createdOnEnd`.
- `type` / `typeList`: Limita la consulta a consentimientos de un tipo específico (`DATA_SHARING`, `PAYMENT` o `ENROLLMENT`) o a una lista de tipos separados por comas. Los dos filtros no pueden utilizarse en conjunto.
- `status` / `statusList`: Limita la consulta a consentimientos en un estado específico o en una lista de estados separados por comas, entre los siguientes: `AUTHORISED`, `AWAITING_AUTHORISATION`, `REJECTED`, `REVOKED`, `EXPIRED`, `CONSUMED`, `TIMEOUT_AUTHORISATION`, `TIMEOUT_PAYMENT`, `AWAITING_RISK_SIGNALS`, `AWAITING_ACCOUNT_HOLDER_VALIDATION`, `AWAITING_ENROLLMENT` y `PARTIALLY_ACCEPTED`. Los dos filtros no pueden utilizarse en conjunto.
- `orderType`: Define el ordenamiento de la lista de consentimientos devuelta. Admite los valores *ASC* (orden creciente de fecha de creación), *DESC* (orden decreciente de fecha de creación) y *OPF* (ordenamiento según el estándar Open Finance: activos, pendientes, vencidos y cerrados).
- `searchKey` / `searchKeys`: Filtra los consentimientos por una *search key* específica o por una lista de *search keys* separadas por comas previamente asociadas a ellos.
- `orgName`: Filtra los consentimientos por el nombre de la organización/participante del Open Finance asociada, siendo necesario informar como mínimo 3 caracteres.
- `page` / `page-size`: Parámetros de paginación del resultado.
- `modalityType` (solo para pago) / `modalityTypeList` **Observaciones**: Limita la consulta a consentimientos de pago de una modalidad específica (*IMMEDIATE*, *SCHEDULED* o *SWEEPING*) o a una lista de modalidades separadas por comas (pudiendo incluir también *VRP* y *AUTOMATIC*, conforme el ejemplo de la especificación). Los dos filtros no pueden utilizarse en conjunto.
- `paymentType` (solo para pago): Limita la consulta a consentimientos de pago de un tipo específico. Admite los tipos: *PIX*, *TED* o *TEF*.

### Detalle del consentimiento

        GET /open-banking/oob-consents/v1/consents/{consentId}

Responsable de recuperar toda la información de un consentimiento, incluyendo los recursos y un historial de los cambios de estado realizados. La consulta se realiza a través del identificador interno en formato UUID.

### Revocación de consentimiento de compartición de datos

        PATCH /open-banking/oob-consents/consents/v1/consents/{consentId}

Responsable de la revocación del consentimiento de compartición de datos relacionado con el *consentId* informado.

### Listado de consentimientos activos de compartición de datos

        GET /open-banking/oob-consents/consents/v2/active

Responsable del listado de consentimientos autorizados. Posee los siguientes parámetros opcionales:

- `startDate`: En caso de proporcionarse, selecciona todos los consentimientos activos que hayan sido creados después de esa fecha.
- `endDate`: En caso de informarse, selecciona todos los consentimientos cuya expiración sea anterior a la fecha proporcionada. Los consentimientos indeterminados no serán devueltos cuando se informe este parámetro.
- `page`: Número de la página deseada.
- `page-size`: Tamaño de la página.

### Listado de pagos relacionados con un consentimiento

        GET /open-banking/oob-consents/consents/v1/consents/{consentId}/payments

Muestra la lista paginada (`page` / `page-size`) de todos los pagos relacionados con el consentimiento identificado por el *consentId* informado, ordenados por fecha de pago en orden decreciente.

### Revocación de consentimiento de pago

        PATCH /open-banking/oob-consents/payments/v1/consents/{consentId}

Responsable de la revocación del consentimiento de pago automático identificado por el *consentId* informado.

### Revocación de consentimiento de pago recurrente (automático)

        PATCH /open-banking/oob-consents/automatic-payments/v1/recurring-consents/{recurringConsentId}

Responsable de la revocación del consentimiento de pago automático (recurrente) identificado por el *recurringConsentId* informado. Requiere el encabezado `X-Brand-ID`.

### Listado de Payment Ids generados por ITP

        GET /open-banking/oob-consents/v1/tpps/payment-legacy-ids

Lista los payment ids generados por ITPs dentro de un intervalo de tiempo definido por los parámetros:

- `startDate`: Indica la fecha de creación mínima (inclusive) del payment id. Debe informarse solo con fecha. **Ejemplo**: 2022-12-19.
- `endDate`: Indica la fecha de creación máxima (inclusive) del payment id. Debe informarse solo con fecha. **Ejemplo**: 2022-12-25.

### Notificación de cambio de estado de pago

        POST /open-banking/oob-consents/v1/payment-status-notification

Responsable de notificar al OOF la alteración de estado de un pago.

### Detalle de prórroga del consentimiento

        GET /open-banking/oob-consents/v1/consents/{consentId}/extends

Responsable de listar, de forma paginada (`page` / `page-size`), todas las prórrogas de un consentimiento. La consulta se realiza a través del identificador interno en formato UUID.

### Autorización completa de consentimiento de pago de múltiple autorización

        POST /open-banking/oob-consents/v1/payments/consents/{consentId}/authorisation

Responsable de autorizar completamente un consentimiento de pago de múltiple autorización, señalando la aprobación de los múltiples autorizadores de este consentimiento. Requiere el encabezado `X-Brand-ID`.

### Post de search key

        POST /open-banking/oob-consents/consents/v1/consents/{consentId}/search-key/{searchKey}

Responsable de agregar una search-key relacionada con un consentimiento, permitiendo que los consentimientos sean listados con base en esa search-key posteriormente.

### Delete de search key

        DELETE /open-banking/oob-consents/consents/v1/consents/{consentId}/search-key/{searchKey}

Responsable de eliminar una search-key relacionada con un consentimiento.

### Post de múltiples search keys

        POST /open-banking/oob-consents/consents/v1/consents/{consentId}/search-keys

Responsable de agregar múltiples search-keys relacionadas con un consentimiento en una única solicitud. Requiere el encabezado `X-Brand-ID`.

### Consulta de múltiples search keys

        GET /open-banking/oob-consents/consents/v1/consents/{consentId}/search-keys

Responsable de verificar la existencia de múltiples search-keys en un consentimiento, informadas a través del parámetro `searchKeys`. Requiere el encabezado `X-Brand-ID`.

### Delete de múltiples search keys

        DELETE /open-banking/oob-consents/consents/v1/consents/{consentId}/search-keys

Responsable de eliminar múltiples search-keys relacionadas con un consentimiento en una única solicitud, informadas a través del parámetro `searchKeys`. Requiere el encabezado `X-Brand-ID`.

### Put consent metadata

        PUT /open-banking/oob-consents/consents/v1/consents/{consentId}/meta-data

Responsable de agregar un json de metadata vinculado a un consentimiento, sustituyendo cualquier valor que estuviera anteriormente en ese campo de metadata. Puede usarse para agregar información extra al consentimiento, por ejemplo para agregar información pertinente a las pantallas de la aplicación.

### Get consent metadata

        GET /open-banking/oob-consents/consents/v1/consents/{consentId}/meta-data

Responsable de recuperar el json de información de metadata previamente enviado.

### Patch consent metadata

        PATCH /open-banking/oob-consents/consents/v1/consents/{consentId}/meta-data

Responsable de actualizar el json de metadata vinculado a un consentimiento, agregando información al metadata ya existente.

### Delete consent metadata

        DELETE /open-banking/oob-consents/consents/v1/consents/{consentId}/meta-data

Responsable de borrar la información de metadata relacionada con un consentimiento.

### Revocación de vínculo

        PATCH /open-banking/oob-consents/enrollments/v1/enrollments/{enrollmentId}

Responsable de revocar un vínculo (*enrollment*), devolviendo los detalles del mismo y el historial de cambios de estado realizados. La revocación se realiza a través del identificador interno del vínculo en formato UUID.

### Edición de vínculo

        PATCH /open-banking/oob-consents/enrollments/v1/enrollments/{enrollmentId}/edit

Responsable de editar información de un vínculo (*enrollment*) ya existente, como fecha de expiración, límite diario y límite por transacción. Requiere el encabezado `X-Brand-ID`.

### Notificación de alteración de recursos

        POST /open-banking/oob-consents/v1/resources-notification

Responsable de notificar al OOF la alteración de recursos no seleccionables (como préstamo, financiamiento, cheque especial, entre otros) por CPF, CNPJ o search key.

### Activar/Desactivar envío de webhook

        PATCH /open-banking/oob-consents/v1/webhook/toggle/{consentId}

Endpoint usado para activar o desactivar el envío de webhooks opcionales a la retaguardia, vinculado al consentimiento. Requiere el encabezado `X-Brand-ID`.

### Get estado del envío de webhook

        GET /open-banking/oob-consents/v1/webhook/status/{consentId}

Endpoint usado para buscar el estado del envío de webhooks opcionales a la retaguardia, vinculado al consentimiento. Requiere el encabezado `X-Brand-ID`.

## Pagos

Endpoint referente a la operación de cancelación de pago, definido en la especificación [`oasOOFDados.yml`][API-backoffice].

### Revocación de pago

        PATCH /open-banking/oob-payments/v2/pix/payments/{paymentId}

Este endpoint debe usarse para cancelar, a pedido del cliente pagador, las transacciones que estén en una de las siguientes situaciones: agendada con éxito (`SCHD`), retenida para análisis (`PDNG`) o aguardando autorización de múltiples autorizaciones (`PATC`).

- En caso de que la solicitud sea exitosa, la transacción pasa a la situación `CANC`.
- En caso de que el estado del pago sea diferente de `SCHD`/`PDNG`/`PATC`, o alguna otra regla de negocio impida la cancelación, la solicitud devuelve HTTP Status 422 con el código `PAGAMENTO_NAO_PERMITE_CANCELAMENTO`.
- En caso de recibir un 422, la iniciadora debe hacer una solicitud GET en el pago para verificar la situación actual del mismo, así como los detalles asociados.
La cancelación de pago debe enviarse hasta las 23:59 (horario de Brasilia) del día anterior a la fecha de efectivización del pago.

[API-backoffice]: ../../../swagger-ui/index.html?api=es-oas-back-dados
