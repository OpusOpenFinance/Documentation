---
layout: default
title: Backoffice
parent: "Funcionamiento"
grand_parent: "Iniciación de Pagos y Recepción de Datos"
nav_order: 8
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/backoffice"
      lang: "pt-br"
    - path: "/Documentation/en/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/backoffice"
      lang: "en"
---

## Objetivo

La API de Backoffice expone operaciones administrativas de **consulta** sobre los datos de consentimientos, vinculaciones y pagos del Módulo de Iniciación de Pagos. Está destinada a equipos de soporte, operaciones y backoffice, y **no sustituye** las interfaces orientadas al usuario final o a la app cliente.

> **Versión actual:** `1.0.0-beta.1`. Para los posibles valores de cada clave JSON consulte la [API asociada][API-Backoffice].

## Endpoints

### 1. Listar consentimientos

```
GET /backoffice/consents
```

Lista consentimientos con filtros, paginación y ordenación.

**Filtros principales:**

| Filtro | Tipo | Descripción |
| :----: | :--: | :-------: |
| `cnpj`, `cpf` | string | Documento del titular |
| `createdOnBegin`, `createdOnEnd` | date | Ventana de creación |
| `expiresOn` | date | Fecha límite de expiración |
| `searchKey`, `searchKeys` | string / list | Búsqueda por términos genéricos |
| `tppId` | UUID | Identificador de la TPP (cuando el Módulo de Iniciación de Pagos atiende múltiples TPPs) |
| `consentId`, `consentIdList` | string / list | Filtro directo por identificador |
| `consentStatus`, `consentStatusList` | string / list | Filtro por estado (ej.: `AUTHORISED`, `REVOKED`) |
| `page`, `pageSize`, `orderType` | int / string | Paginación y ordenación |

**Header obligatorio:** `x-application-id`

### 2. Listar enrollments

```
GET /backoffice/enrollments
```

Lista vinculaciones de dispositivo con filtros, paginación y ordenación.

**Filtros principales:**

| Filtro | Tipo | Descripción |
| :----: | :--: | :-------: |
| `cnpj`, `cpf` | string | Documento del titular |
| `createdOnBegin`, `createdOnEnd` | date | Ventana de creación |
| `expiresOn` | date | Fecha límite de expiración |
| `tppId` | UUID | Identificador de la TPP |
| `enrollmentId`, `enrollmentIdList` | string / list | Filtro directo por identificador |
| `enrollmentStatus`, `enrollmentStatusList` | string / list | Filtro por estado (ej.: `AUTHORISED`, `REJECTED`) |
| `page`, `pageSize`, `orderType` | int / string | Paginación y ordenación |

**Header obligatorio:** `x-application-id`

### 3. Listar pagos por consentimiento

```
GET /backoffice/consents/{consentId}/payments
```

Lista todos los pagos asociados a un consentimiento.

## Escenarios de uso típico

- **Soporte al cliente final:** consultar el estado de un consentimiento específico para un cliente que llamó al servicio de atención reclamando por la operación;
- **Auditoría interna:** extraer todos los consentimientos autorizados en un período para conciliación o conformidad;
- **Investigación de incidentes:** filtrar por `consentStatus=REJECTED` en una ventana para análisis de causa raíz;
- **Informes operativos:** combinar con `tppId` cuando el Módulo de Iniciación de Pagos atiende múltiples marcas/instituciones.

## Referencias

- Especificación OpenAPI: [`backoffice.yml`](../anexos/yml/opusTPP-backoffice.yml) (ver también [API asociada][API-Backoffice])

[API-Backoffice]: ../../../../../swagger-ui/index.html?api=es-otpp-backoffice
