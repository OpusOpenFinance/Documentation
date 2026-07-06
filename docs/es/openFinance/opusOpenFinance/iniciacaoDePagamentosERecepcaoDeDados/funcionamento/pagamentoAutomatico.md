---
layout: default
title: Pago Automático
parent: "Funcionamiento"
grand_parent: "Iniciación de Pagos y Recepción de Datos"
nav_order: 3
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/pagamentoAutomatico"
      lang: "pt-br"
    - path: "/Documentation/en/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/funcionamento/pagamentoAutomatico"
      lang: "en"
---

## Objetivo

La API de Pago Automático permite la creación de **consentimientos recurrentes** que autorizan el débito periódico en cuenta para finalidades como suscripciones, mensualidades, cuotas y cobros recurrentes en general.

> Para los posibles valores de cada clave JSON consulte la [API asociada][API-Auto].

[API-Auto]: ../../../../../swagger-ui/index.html?api=es-otpp-pagamentos_automaticos

## Consentimiento recurrente

| Tipo | Endpoint | Descripción | Éxito |
| :--: | :------: | :-------: | :-----: |
| POST | `/opus-open-finance/automatic-payments/v1/recurring-consents` | Creación de consentimiento de pago automático | 201 |
| GET | `/opus-open-finance/automatic-payments/v1/recurring-consents/{recurringConsentId}` | Consulta de consentimiento | 200 |
| PATCH | `/opus-open-finance/automatic-payments/v1/recurring-consents/{recurringConsentId}` | Revocación de consentimiento | 200 |
| POST | `/opus-open-finance/automatic-payments/v1/recurring-consents/{recurringConsentId}/authorisation-retry` | Nuevo intento de autorización | 200 |

## Pagos recurrentes

| Método | Endpoint v2 | Descripción | Éxito |
| :----: | :---------: | :-------: | :-----: |
| POST   | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments` | Creación de pago automático | 201 |
| GET    | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments` | Consulta de todos los pagos del consentimiento | 200 |
| GET    | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments/{recurringPaymentId}` | Consulta de pago individual | 200 |
| PATCH  | `/proxy/open-banking/automatic-payments/v2/pix/recurring-payments/{recurringPaymentId}` | Revocación de pago | 200 |

Referencias:

- **v2:** [SV Pagamentos Automáticos 2.1.0](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/931037185/v2.1.0+SV+Pagamentos+Autom+ticos)

## Comportamiento esperado

- **Éxito:** El consentimiento permanece en `AUTHORIZED` hasta alcanzar los límites globales de transacciones establecidos en el payload (cantidad total, valor total, fecha límite, etc.). Cuando esos límites se alcanzan, el estado transita a `CONSUMED`;
- **Error de negocio (HTTP 422):** El estado del pago individual entra en `REJECTED`. El consentimiento permanece activo (a menos que se haya violado una regla global). Schemas de error: `422ResponseErrorCreatePixRecurringPayment` y `422ResponseErrorCreateRecurringPaymentsPaymentId`;
- **Revocación de pago individual:** Permitida cuando el pago está en `SCHEDULED` (SCHD) o `PDNG`;
- **Revocación de consentimiento:** Permitida cuando el consentimiento está en `AUTHORIZED`. Schema de error: `422ResponseErrorRecurringConsents`.

## Referencias

- [Máquina de Estados v2.0.0 — Pagamentos Automáticos](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/931037243/M+quina+de+Estados+-+v2.1.0+-+SV+Pagamentos+Autom+ticos)
- Especificación OpenAPI: [`oas-pagamentos-automaticos.yml`](../anexos/yml/es-opusTPP-pagamentosAutomaticos.yml) (ver también [API asociada][API-Auto])
