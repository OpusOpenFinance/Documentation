---
layout: default
title: Iniciación de Pago
parent: "Funcionamiento"
grand_parent: "Iniciación de Pagos y Recepción de Datos"
nav_order: 2
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/iniciacaoDePagamento"
      lang: "pt-br"
    - path: "/Documentation/en/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/iniciacaoDePagamento"
      lang: "en"
---

## Objetivo

La API de Iniciación de Transacción de Pago Pix expone los endpoints para crear, consultar y revocar consentimientos de pago, y para iniciar y gestionar pagos Pix propiamente dichos.

El Módulo de Iniciación de Pagos soporta **simultáneamente las versiones regulatorias v4 y v5** de las APIs de pago, permitiendo que la TPP elija qué versión llamar según lo que cada Institución Titular acepte durante el período de convivencia.

> **Requisito previo:** todos los endpoints de iniciación solo funcionan después de que el consentimiento de pago haya sido creado y esté en `AUTHORISED` (ver [Funcionamiento](./)). Para los posibles valores de cada clave JSON consulte la [API asociada][API-Pagamentos].

[API-Pagamentos]: ../../../../../swagger-ui/index.html?api=es-otpp-iniciacao_pagamentos

## Endpoints de consentimiento de pago

| Tipo | Endpoint | Descripción | Éxito |
| :--: | :------: | :-------: | :-----: |
| POST | `/opus-open-finance/payments/v1/consents` | Creación de consentimiento de pago | 201 |
| GET | `/opus-open-finance/payments/v1/consents/{consentId}` | Consulta de estado y datos | 200 |
| POST | `/opus-open-finance/payments/v1/consents/{consentId}/authorisation-retry` | Nuevo intento de autorización (ventana de 5 min) | 200 |

## Endpoints de iniciación de pago Pix

La TPP elige la versión llamando al endpoint correspondiente:

| Método | Endpoint v4 | Endpoint v5 | Descripción | Éxito |
| :----: | :---------: | :---------: | :-------: | :-----: |
| POST | `/proxy/open-banking/payments/v4/pix/payments` | `/proxy/open-banking/payments/v5/pix/payments` | Creación del pago Pix | 201 |
| GET | `/proxy/open-banking/payments/v4/pix/payments/{paymentId}` | `/proxy/open-banking/payments/v5/pix/payments/{paymentId}` | Consulta de estado de un pago | 200 |
| PATCH | `/proxy/open-banking/payments/v4/pix/payments/{paymentId}` | `/proxy/open-banking/payments/v5/pix/payments/{paymentId}` | Revocación de un pago individual | 200 |
| GET | — | `/proxy/open-banking/payments/v5/consents/{consentId}/pix/payments` | Consulta de todos los pagos del mismo consentimiento | 200 |
| PATCH | `/proxy/open-banking/payments/v4/pix/payments/consents/{consentId}` | `/proxy/open-banking/payments/v5/consents/{consentId}/pix/payments` | Revocación de todos los pagos del mismo consentimiento | 200 |

Referencias oficiales:

- **v4:** [SV Pagamentos 4.0.0][SV-Pagamentos-v4]
- **v5:** [SV Pagamentos 5.0.0-rc.1][SV-Pagamentos-v5]

[SV-Pagamentos-v4]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/347078657/v4.0.0+-+SV+Pagamentos
[SV-Pagamentos-v5]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1600030254/v5.0.0-rc.1+-+SV+Pagamentos

## Comportamiento esperado

- **Éxito (201 Created):** El consentimiento asociado transita a `CONSUMED`. El pago entra en una máquina de estados propia (definida por la Institución Titular) — es necesario hacer **polling** en el GET para acompañar la liquidación efectiva.
- **Error de negocio (422 Unprocessable Entity):** El consentimiento transita a `REJECTED`. El cuerpo devuelto es un **JWT** (no JSON puro) que contiene el objeto de error estándar del Open Finance Brasil.
- **Revocación:** Solo se permite cuando el pago está en `SCHEDULED` (SCHD) o retenido para análisis (`PDNG`).

## Códigos de error más comunes

| Código | Escenario típico |
| :----: | :------------: |
| `PAGAMENTO_DIVERGENTE_DO_CONSENTIMENTO` | Algún campo del pago (ej.: `amount`, `creditorAccount`) diverge del consentimiento aprobado |
| `PAGAMENTO_NAO_PERMITE_CANCELAMENTO` | Intento de revocación fuera de los estados elegibles (SCHD/PDNG) |

La lista completa de códigos está en el schema `422ResponseErrorCreatePixPayment` de la documentación oficial.

## Orientaciones importantes

- Todas las fechas siguen **RFC3339** con formato *zulu*;
- La máquina de estados completa del pago está documentada en las referencias oficiales v4 y v5;
- Para la especificación completa de payload y schemas de respuesta, consulte [`oas-pagamentos.yml`](../anexos/yml/es-opusTPP-iniciacaoPagamentos.yml) o la [API asociada][API-Pagamentos].

## Referencias

- [SV Pagamentos v4.0.0 — Open Finance Brasil][SV-Pagamentos-v4]
- [SV Pagamentos v5.0.0-rc.1 — Open Finance Brasil][SV-Pagamentos-v5]
- [Pago Automático (Pix Automático)](pagamentoAutomatico.html) — para pagos recurrentes
