---
layout: default
title: Guia Portal de Backoffice
parent: "Ferramentas Auxiliares"
nav_order: 2
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/ferramentasAuxiliares/guiaPortalDeBackoffice/index/"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/ferramentasAuxiliares/guiaPortalDeBackoffice/index/"
      lang: "es"
---

## Introdução

O Portal de Backoffice de Pagamentos tem como objetivo permitir a **visualização, consulta e rastreabilidade de pagamentos**, oferecendo informações detalhadas sobre cada transação, seu status e dados relacionados e garantindo visibilidade completa do fluxo, desde a criação até a liquidação ou falha.

Esta documentação descreve as funcionalidades disponíveis nas telas do sistema, bem como o comportamento esperado de cada campo e ação, auxiliando no uso e navegação da aplicação.

---

## Máquina de Estados do Pagamento (OOF)

[Clique aqui](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1600030369/M+quina+de+Estados+-+v5.0.0-rc.1+-+SV+Pagamentos#Pagamento%3A-Arranjo-Pix) para acessar a página.

---

## Tela 01 – Login

![Tela de Login](./anexos/imagens/index-telaLogin.png)

Tela inicial do sistema, responsável pela autenticação do usuário.

**Campos:**

- **Usuário;**
- **Senha.**

Nesta página você deve fazer login inserindo seu e-mail, no campo `Usuário` e adicionar a `Senha` correspondente.

Caso tenha algum problema com a senha ou a tenha esquecido, você pode clicar na opção `Esqueci minha senha` abaixo do botão de `Èntrar`:

[Botão "Esqueci minha senha"](./anexos/imagens/index-esqueciMinhaSenha.png)

Após sua autenticação ser bem-sucedida, você será redirecionado automaticamente para a **Tela 02 – Listagem de Pagamentos**.

---

## Tela 02 – Listagem de Pagamentos

![Listagem de Pagamentos](./anexos/imagens/index-listagemPagamentos.png)

Exibe todos os pagamentos registrados no sistema, permitindo busca e filtragem.

**Campos da listagem:**

- **Payment ID:** Identificador único do pagamento;
- **E2E ID:** Identificador do fluxo Pix;
- **Status:** Estado atual do pagamento;
- **Instituição Detentora:** Banco responsável pelo pagamento;
- **Valor:** Valor monetário;
- **Criado em:** Data/hora de criação;
- **Data de Liquidação:** Data prevista ou realizada da liquidação.

### Filtros da listagem

![Filtros da Listagem](./anexos/imagens/index-filtroListagem.png)

**Campos Fixos:**

- Instituição Detentora;
- Status.

**Campos Dinâmicos:**

Existem duas maneiras de filtrar dinamicamente:

- Filtro por ID;
- Filtro por Data.

#### Filtro por ID

- Tipo de ID:
  - Todos (abrange todos os tipos de ID);
  - Payment ID;
  - E2E ID;
  - Internal ID;
  - Consent ID;
- Campo de busca livre.

[Filtro por ID](./anexos/imagens/index-filtroPorId.png)

#### Filtro por Data

- Data inicial (De);
- Data final (Até).

[Filtro por Data](./anexos/imagens/index-filtroPorData.png)

Ao aplicar filtros, você pode limpar a seleção clicando no **“X”**.
Se não houver pagamentos cadastrados, você verá a seguinte mensagem:
  > “Nenhum pagamento encontrado. Inicie um novo pagamento para visualizá-lo.”
Se não houver resultados para a filtragem escolhida, você verá a seguinte mensagem:
  > “Nenhum pagamento corresponde aos filtros selecionados. Ajuste os filtros e tente novamente.”

Ao selecionar um pagamento, você será redirecionado para a **Tela 03 – Detalhes do Pagamento**.

---

## Tela 03 – Detalhe de um Pagamento

![Detalhe do Pagamento](./anexos/imagens/index-detalhePagamentos.png)

Apresenta todas as informações detalhadas de um pagamento específico.

---

### Seções da tela de detalhes

---

### Cabeçalho

![Cabeçalho do Pagamento](./anexos/imagens/index-cabecalhoDetalhePagamentos.png)

**Campos:**

- Instituição Detentora;
- Tipo: PIX (fixo);
- Valor (com cor baseada no status);
- Status;
- Atualizado em.

**Ações:**

- **Voltar:** Retorna à listagem mantendo filtros;
- **Atualizar:** Consulta o status mais recente na instituição.

---

### IDs Correlacionáveis

![IDs Correlacionáveis](./anexos/imagens/index-idsCorrelacionaveis.png)

**Campos de IDs:**

- Payment ID;
- E2E ID;
- Internal ID;
- Consent ID.

**Ações:**

- **Copiar:** Copia o valor para a área de transferência;
- **Selecionar Consent ID:** Redireciona para listagem filtrada.

Ao clicar no `Consent ID`, você pode consultar os pagamentos vinculados a esse consentimento.

---

### Timeline (Linha do Tempo)

![Linha do Tempo](./anexos/imagens/index-timeline.png)

**Campos do Timeline:**

Cada evento contém:

- Status (título);
- Data e hora;
- FAPI Interaction ID.

---

### Detalhes

Aqui você pode escolher visualizar detalhes do `Pagamento` ou do `Consentimento`.

#### Pagamento

![Detalhes do Pagamento](./anexos/imagens/index-cardDetalhesPagamentos.png)

**Campos:**

- Criado (data/hora);
- Atualizado (data/hora);
- Moeda.

#### Consentimento

![Dados do Consentimento](./anexos/imagens/index-cardConsentimentoPagamentos.png)

**Exemplos de Campos (PIX):**

- Data do consentimento;
- Identificador;
- Destinatário;
- CPF/CNPJ;
- Solicitante;
- Devedor.

---

### Request Payload

![Request Payload](./anexos/imagens/index-requestPayloadPagamentos.png)

Exibe o payload enviado pela instituição cliente.

Caso não exista, você verá a seguinte mensagem:
> “Request Payload não disponível para este pagamento.”

---

### Response Payload

![Response Payload](./anexos/imagens/index-responsePayloadPagamentos.png)

Exibe o payload retornado pelo sistema.

Caso não exista, você verá a seguinte mensagem:
> “Response Payload não disponível para este pagamento.”

---

### Log de Erro

![Log de Erro](./anexos/imagens/index-logDeErroPagamentos.png)

Mostra o motivo da falha no pagamento.

Exibido apenas para status:

- `CANC` (cancelado);
- `RJCT` (rejeitado).

Caso não exista, você verá a seguinte mensagem:
> “Log de erro não disponível para este pagamento.”
