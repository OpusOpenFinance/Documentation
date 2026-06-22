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

Detalhar os certificados regulatórios exigidos para a operação no Open Finance Brasil e Open Insurance Brasil, suas finalidades e o procedimento seguro para convertê-los em formato JWK quando necessário (por exemplo, para certificação OpenID).

> **:warning: ATENÇÃO:** Jamais disponibilize suas chaves privadas em serviços da internet. A conversão deve ser feita exclusivamente em ambiente local controlado.

## Certificados exigidos

| Certificado | JWK `use` | Finalidade |
| :---------: | :-------: | :--------: |
| **BRCAC** | `"use": "enc"` | Conexões mTLS — identificação da aplicação cliente e criptografia da comunicação entre as partes |
| **BRSEAL** | `"use": "sig"` | Assinatura de mensagens entre a aplicação TPP e o servidor de autenticação, e assinatura de tokens JWS |
| **ID_TOKEN_ENC** | `"use": "enc"` | Criptografia de `id_token` — utilizado em testes de certificação OpenID (opcional, mas necessário para certificação completa) |

Os certificados BRCAC e BRSEAL são gerados pelo Diretório de Participantes. A chave ID_TOKEN_ENC é gerada localmente.

## Conversão segura (PEM → JWK)

Após gerar os certificados, é necessário convertê-los para JWK para uso no programa de certificação OpenID.

### Pré-requisitos

- Node.js instalado localmente
- Pacote `pem-jwk` global: `npm install -g pem-jwk`

### Passos

1. Converter a chave para o formato RSA:

   ```shell
   openssl rsa -in certificado.key -out certificado-rsa.key
   ```

2. Gerar o JWK:

   ```shell
   pem-jwk certificado-rsa.key > certificado-jwk.json
   ```

3. Adicionar os atributos faltantes ao JSON resultante:

   - `"use": "<enc|sig>"` — `enc` para BRCAC e ID_TOKEN_ENC, `sig` para BRSEAL
   - `"alg": "PS256"`
   - `"kid": "<kid>"` — obter do JWKS publicado no Diretório (mesmo valor do arquivo PEM emitido pelo Diretório)

### Encapsulando em um JWKS

A estrutura do arquivo JWKS é:

```json
{
  "jwks": [
    { /* JWK-1 */ },
    { /* JWK-2 */ }
  ]
}
```

Cada JWK individual é o objeto produzido na etapa 3 acima.

## Onde os certificados aparecem na configuração

Após a conversão, os certificados são armazenados em **Kubernetes Secrets** e referenciados no `values.yaml` na seção `privateKeys`:

| Arquivo | Mapeado para |
| :-----: | :----------: |
| `enc.cert` | `brcacSecretKey` no `softwareStatements` |
| `enc.key` | `brcacKeySecretKey` no `softwareStatements` |
| `sig.key` | `brSealSecretKey` no `privateKeys[]` |
| `id_token_enc.key` | `brIdTokenEncSecretKey` no `softwareStatements` (opcional) |

## Links úteis

- **Verificar conteúdo do certificado cliente:** chame `https://prod.idrix.eu/secure/` usando o certificado como cliente para ver suas propriedades.
- **Gerar chaves JWKS para teste (ambientes não-produtivos):** [mkjwk.org](https://mkjwk.org/).

## Referências

- [Guia para TPP — Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/240648607)
- [Guia de Operação do Diretório Central — Open Finance](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17378602)
