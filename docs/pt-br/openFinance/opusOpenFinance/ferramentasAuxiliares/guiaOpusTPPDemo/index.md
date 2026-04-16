---
layout: default
title: Guia OpusTPP Demo
parent: "Ferramentas Auxiliares"
nav_order: 1
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/ferramentasAuxiliares/guiaOpusTPPDemo/index/"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/ferramentasAuxiliares/guiaOpusTPPDemo/index/"
      lang: "es"
---

## Introdução

Este guia fornece explicações acerca da ferramenta **OpusTPP** e instruções detalhadas para:

- ✔ Navegar pela interface intuitiva da ferramenta;
- ✔ Preencher campos obrigatórios com precisão;
- ✔ Validar transações com segurança;
- ✔ Solucionar erros comuns.

Ao seguir as orientações apresentadas, você poderá aproveitar todas as funcionalidades do **OpusTPP** de maneira simples e eficaz.

## O que é o OpusTPP?

O Opus TPP é uma plataforma avançada desenvolvida para simplificar a **simulação** e **execução** de operações no ecossistema de Open Finance, abrangendo:

- Pagamentos instantâneos:
  - Imediato;
  - Agendado;
  - Agendado recorrente;
  - Transferências inteligentes;
  - Pix Automático.
- Compartilhamento de dados (consentimento de informações financeiras).

## Termos e Definições

Antes de iniciarmos as instruções para o uso, aqui vai uma explicação de termos técnicos ou específicos utilizados no site:

- **DICT:** Documento de Iniciação de Cobrança via PIX (padrão BACEN).
- **QRDN/QRES:** QR Code Dinâmico (QRDN) ou Estático (QRES) para pagamentos via PIX.
- **INIC:** Iniciação de Pagamento por meio de códigos específicos.
- **Consentimento:** Autorização formal para compartilhamento de dados entre instituições.

## Instruções

O primeiro passo é selecionar qual categoria de serviço deseja testar. Escolha entre **Pagamentos** e **Compartilhamento de Dados**.

### **Pagamentos**

1) Conta de origem
Nesta etapa, você deve selecionar a instituição financeira de onde o valor deve ser transferido. Você pode escolher entre uma instituição pré-definida na tela ou pode optar por buscar a instituição que deseja, através da barra de pesquisa que se encontra logo no início da página:

<!--Inserir foto-->

{:.exemplo}
_Digite "Digio" para filtrar._
2) Validação inicial
Aqui você deve escolher como será identificado:

- Pessoa Física;
- Pessoa Jurídica.

Caso opte por Pessoa Física, você deve informar o CPF do pagamento, caso opte por Pessoa Jurídica, deve adicionar também o CNPJ.
Após o preenchimento correto dos campos obrigatórios, você poderá prosseguir para a próxima etapa.
3) Modalidade de pagamento
Aqui, realize a seleção da modalidade do pagamento a ser realizado. A escolha pode ser feita entre:

- Imediato;
- Agendado;
- Agendado recorrente;
- Transferência inteligente;
- Pix automático.

| Modalidade | Campos Adicionais |
| :--------: | :---------------: |
| **Pix Automático** | Frequência (semanal/mensal/trimestral/semestral/anual), prazo de validade |
| **Agendado Recorrente** | Data final e intervalo de repetição |
| **Transferência Inteligente** | Frequência (diária/semanal/mensal/anual), prazo de validade (horas/dias) |

{:.observação}
_Campos dinâmicos serão exibidos conforme a modalidade._
4) Método de Inserção
Aqui você deve selecionar entre as cinco opções dispostas, como os dados do recebedor do pagamento serão inseridos, para Pessoa Física ou Jurídica.

Preencha os campos editáveis de cada método (os cinco) e selecione quase ao fim da página o tipo de conta do recebedor:

<!--Adicionar imagem-->

- **INIC e DICT:** Após o preenchimento, por fim, insira a chave pix do recebedor.
- **QRDN:** Após o preenchimento, por fim, insira a chave pix do recebedor e o código do QR Code Dinâmico.
- **QRES:** Após o preenchimento, por fim, insira a chave pix do recebedor e o código do QR Code Estático.

5) Redirecionamento para o banco
Aguarde o redirecionamento para confirmar a operação. Ao receber a confirmação do banco emissor terá chegado ao fim do processo!  

{:.tempo médio}
_Cerca de 5-15 segundos para PIX._

### Compartilhamento de Dados
