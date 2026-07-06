---
layout: default
title: Certificados Regulatorios
parent: "Configuración"
grand_parent: "Iniciación de Pagos y Recepción de Datos"
nav_order: 3
lang: "es"
alternate_lang:
    - path: "/Documentation/pt-br/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/configuracao/certificadosRegulatorios"
      lang: "pt-br"
    - path: "/Documentation/en/openFinance/opusOpenFinance/iniciacaoDePagamentosERecepcaoDeDados/configuracao/certificadosRegulatorios"
      lang: "en"
---

## Objetivo

Detallar los certificados regulatorios exigidos para la operación en el Open Finance Brasil y sus finalidades.

> **ATENCIÓN:** Nunca ponga sus claves privadas a disposición en servicios de internet. La conversión debe realizarse exclusivamente en un entorno local controlado.

## Certificados exigidos

| Certificado | Finalidad |
| :---------: | :--------: |
| **BRCAC** | Conexiones mTLS — identificación de la aplicación cliente y cifrado de la comunicación entre las partes |
| **BRSEAL** | Firma de mensajes entre la aplicación TPP y el servidor de autenticación, y firma de tokens JWS |
| **MTLS** | Autenticación mutua en conexiones TLS de APIs privadas: identificación y validación tanto del servidor como del cliente en la comunicación entre instituciones |
| **Servidor EV** | Habilitación del canal HTTPS en APIs públicas: protege la conexión sin exigir autenticación mutua, emitido por una Autoridad Certificadora comercial reconocida |

## Referencias

- [Guía para TPP — Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/240648607)
- [Guía de Operación del Directorio Central — Open Finance](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/941817857/Guia+de+Opera+o+do+Diret+rio+Central.)
