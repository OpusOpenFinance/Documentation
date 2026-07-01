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

> **ATENÇÃO:** Jamais disponibilize suas chaves privadas em serviços da internet. A conversão deve ser feita exclusivamente em ambiente local controlado.

## Certificados exigidos

| Certificado | Finalidade |
| :---------: | :--------: |
| **BRCAC** | Conexões mTLS — identificação da aplicação cliente e criptografia da comunicação entre as partes |
| **BRSEAL** | Assinatura de mensagens entre a aplicação TPP e o servidor de autenticação, e assinatura de tokens JWS |
| **MTLS** | Autenticação mútua em conexões TLS de APIs privadas: identificação e validação tanto do servidor quanto do cliente na comunicação entre instituições |
| **Servidor EV** | Habilitação do canal HTTPS em APIs públicas: protege a conexão sem exigir autenticação mútua, emitido por Autoridade Certificadora comercial reconhecida |

## Referências

- [Guia para TPP — Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/240648607)
- [Guia de Operação do Diretório Central — Open Finance](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/941817857/Guia+de+Opera+o+do+Diret+rio+Central.)
