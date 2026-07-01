---
layout: default
title: Redirecionamento App-to-App e Web
parent: "Funcionamento"
grand_parent: "OpusTPP"
nav_order: 6
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/opusTPP/funcionamento/redirecionamento"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/opusTPP/funcionamento/redirecionamento"
      lang: "es"
---

## Objetivo

Detalhar o tratamento do retorno do fluxo do Módulo de Iniciação de Pagamentos tanto no caminho mobile (App-to-App via Android App Links / iOS Universal Links) quanto no caminho web, incluindo o endpoint `authorization-result`, os formatos de erro padrão OAuth 2.0 e o suporte a múltiplos aplicativos.

> Conforme [definido pelo Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17378415/Redirecionamento+App-to-App), a comunicação entre o aplicativo da Receptora e o aplicativo da Transmissora deve ser **direta**, sem etapas intermediárias (como páginas web para seleção de aplicativo).

## URLs que o aplicativo deve interceptar

| Descrição | URL |
| :-------: | :-: |
| Consentimento de dados (OOFC) | `https://<OOC-FQDN>/opus-open-finance/consents/redirect-uri` |
| Consentimento de pagamentos (OOFC) | `https://<OOC-FQDN>/opus-open-finance/payments/redirect-uri` |
| Consentimento de dados (OOIC) | `https://<OOC-FQDN>/opus-open-insurance/consents/redirect-uri` |

O `<OOC-FQDN>` é o FQDN configurado na linha da tabela `application` correspondente.

## Arquivos Asset Links e Apple App Site Association

Esses arquivos permitem que o sistema operacional do dispositivo reconheça quais apps são autorizados a interceptar cada URL. O Módulo de Iniciação de Pagamentos serve esses arquivos nas seguintes rotas:

| Plataforma | Rota |
| :--------: | :--: |
| Android | `GET https://<OOC-FQDN>/.well-known/assetlinks.json` |
| iOS | `GET https://<OOC-FQDN>/.well-known/apple-app-site-association` |

A configuração do conteúdo desses arquivos é feita via variáveis de ambiente do deploy (`config.androidAssetLinksFile` e `config.appleAppSiteAssociationFile`).

## Endpoint `authorization-result`

Após interceptar a URL de retorno, o app deve enviar o resultado OIDC ao Módulo de Iniciação de Pagamentos via este endpoint:

| Verbo | URL | Payload |
| :---: | :-: | :-----: |
| POST | `https://<OOC-FQDN>/opus-open-finance/authorization-result` | `{ "data": "<query string ou fragment>" }` |
| POST | `https://<OOC-FQDN>/opus-open-insurance/authorization-result` | idem |

A query string ou fragment deve ser extraída **as-is** da URL interceptada (tudo o que vem depois de `?` ou `#`).

**Retornos possíveis:**

| Status | Significado | Corpo |
| :----: | :---------: | :---: |
| 204 No Content | Autorização bem sucedida | vazio |
| 422 Unprocessable Entity | Falha na autorização | `{ "error": "...", "error_description": "..." }` |

> **Recomendação:** chame `/authorization-result` **imediatamente** após interceptar a URL, antes mesmo de exigir autenticação do usuário no app. O *authorization code* retornado pelo fluxo do Módulo de Iniciação de Pagamentos tem TTL muito curto (definido pela Transmissora — frequentemente menos de 60 segundos).

## Caminho mobile vs. caminho web

O resultado da autorização é entregue por caminhos diferentes dependendo de **onde o fluxo foi iniciado**:

| Origem | O que acontece no retorno | Caminho técnico |
| :----: | :-----------------------: | :-------------: |
| **Aplicativo mobile** | App da Receptora intercepta o redirect via App Links / Universal Links | `POST /authorization-result` |
| **Browser** | Browser segue o redirect da Transmissora até o Módulo de Iniciação de Pagamentos | `/redirect-uri` → 302 para `callbackApplicationUri` |

> **Atenção crítica:** Mesmo quando o fluxo é iniciado em um app, é **obrigatório** implementar **ambos** os caminhos. A interceptação mobile pode falhar (App Links mal configurados, usuário escolhe abrir com outro app, etc.). Sem o tratamento web como contingência, o usuário fica sem feedback do resultado.

### Caminho 1 — Mobile

O app intercepta o redirect, extrai a query string ou fragment, e chama `POST /authorization-result`. O resultado chega na resposta HTTP da chamada:

- **Sucesso:** `204 No Content` (corpo vazio)
- **Erro:** `422 Unprocessable Entity` com `error` e `error_description` no corpo JSON

### Caminho 2 — Web

Quando o browser segue o redirect da Transmissora até a rota `/redirect-uri` do Módulo de Iniciação de Pagamentos, o Módulo de Iniciação de Pagamentos realiza um **HTTP 302** para a `callbackApplicationUri` cadastrada no consentimento, acrescentando os seguintes parâmetros de consulta:

**Sucesso:**

```
<callbackApplicationUri>?result=success
```

**Erro:**

```
<callbackApplicationUri>?result=error&error=<código>&error_description=<descrição>
```

| Parâmetro | Quem define | Valores possíveis |
| :-------: | :---------: | :---------------: |
| `result` | Opus Open Client | `success` ou `error` |
| `error` | Transmissora (OAuth 2.0) | Código padrão [RFC 6749 §4.1.2.1](https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1). Exemplos: `access_denied` (usuário negou), `invalid_grant` (código de autorização inválido/expirado) |
| `error_description` | Transmissora (OAuth 2.0) | Texto livre, varia por implementação de cada Transmissora |

### Sobre os parâmetros de erro

Em ambos os caminhos, `error` e `error_description` são **padrão OAuth 2.0** (RFC 6749): são gerados pela Transmissora e repassados pelo Módulo de Iniciação de Pagamentos. O parâmetro `result` (presente apenas no caminho via `callbackApplicationUri`) é o único acrescentado pela nossa solução, para facilitar a detecção do resultado sem precisar verificar a ausência de `error`.

## Suporte a múltiplos aplicativos

Quando a Receptora possui mais de um aplicativo vinculado ao produto, é fundamental garantir que o usuário **continue no mesmo aplicativo** em que iniciou o consentimento após o retorno da Transmissora.

Para configurar isso, cada aplicativo da instituição deve interceptar exclusivamente as URIs com o `FQDN` correspondente ao registrado em sua linha de `application`, levando em conta o `redirect_identifier` associado.

Exemplo — dois apps, `id-app-a` e `id-app-b`, com FQDNs *ooc-appA.instituicao.com.br* e *ooc-appB.instituicao.com.br*:

| Produto | App | URI que o app deve interceptar |
| :-----: | :-: | :----------------------------: |
| OF Dados | id-app-a | `https://ooc-appA.instituicao.com.br/opus-open-finance/consents/redirect-uri/id-app-a` |
| OF Pagamento | id-app-a | `https://ooc-appA.instituicao.com.br/opus-open-finance/payments/redirect-uri/id-app-a` |
| OI Dados | id-app-a | `https://ooc-appA.instituicao.com.br/opus-open-insurance/consents/redirect-uri/id-app-a` |
| OF Dados | id-app-b | `https://ooc-appB.instituicao.com.br/opus-open-finance/consents/redirect-uri/id-app-b` |
| OF Pagamento | id-app-b | `https://ooc-appB.instituicao.com.br/opus-open-finance/payments/redirect-uri/id-app-b` |
| OI Dados | id-app-b | `https://ooc-appB.instituicao.com.br/opus-open-insurance/consents/redirect-uri/id-app-b` |

> **Importante:** Todas as URIs de redirecionamento utilizadas pela instituição devem estar registradas no Software Statement do Diretório de Participantes (ver [Configuração](../configuracao/)).

## Referências

- [Redirecionamento App-to-App — Open Finance Brasil](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17378415/Redirecionamento+App-to-App)
- [RFC 6749 — OAuth 2.0 §4.1.2.1](https://www.rfc-editor.org/rfc/rfc6749#section-4.1.2.1)
