---
layout: default
title: Certificados Regulatórios
parent: "Configuração"
grand_parent: "OpusTPP"
nav_order: 3
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/opusTPP/configuracao/certificadosRegulatorios"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/opusTPP/configuracao/certificadosRegulatorios"
      lang: "es"
---

## Objetivo

Detalhar os certificados regulatórios exigidos para a operação no Open Finance Brasil e suas finalidades.

> **:warning: ATENÇÃO:** Jamais disponibilize suas chaves privadas em serviços da internet. A conversão deve ser feita exclusivamente em ambiente local controlado.

## Certificados exigidos

| Certificado | JWK `use` | Finalidade |
| :---------: | :-------: | :--------: |
| **BRCAC** | `"use": "enc"` | Conexões mTLS — identificação da aplicação cliente e criptografia da comunicação entre as partes |
| **BRSEAL** | `"use": "sig"` | Assinatura de mensagens entre a aplicação TPP e o servidor de autenticação, e assinatura de tokens JWS |
| **ID_TOKEN_ENC** | `"use": "enc"` | Criptografia de `id_token` — utilizado em testes de certificação OpenID (opcional, mas necessário para certificação completa) |

## Referências

- [Guia para TPP — Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/240648607)
- [Guia de Operação do Diretório Central — Open Finance](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/941817857/Guia+de+Opera+o+do+Diret+rio+Central.)
