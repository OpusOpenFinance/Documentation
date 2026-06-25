---
layout: default
title: "Plataforma Opus Open Finance"
nav_order: 1
has_children: true
lang: "pt-br"
alternate_lang: 
    - path: "/Documentation/en/index/"
      lang: "en"
    - path: "/Documentation/es/index/"
      lang: "es"
---

# Documentação da Plataforma Opus Open Finance

Bem-vindo à documentação da **Plataforma Opus Open Finance**!

Aqui você encontrará detalhes sobre a solução ideal para sua instituição se homologar no ecossistema do *Open Finance Brasil*. O produto da **Opus Software** é responsável por garantir a boa operação da sua instituição com as demandas exigidas pelo regulador, além de garantir a atualização de novas versões e evoluções de funcionalidades definidas pelas normas regulatórias.

A plataforma foi projetada para elucidar toda a complexidade regulatória do *Open Finance Brasil*, a camada que não traz o diferencial para sua empresa. Dessa forma, você pode focar em **seus objetivos estratégicos**.

Ao mesmo tempo, em que oferece cobertura completa das exigências regulatórias para todos os perfis de participação no *Open Finance Brasil*, a **Plataforma Opus Open Finance** dispõe também de módulos opcionais que permitem ir além do regulatório, estabelecendo uma base para implementar estratégias que maximizem o retorno sobre o investimento das instituições financeiras e possibilitem extrair o melhor valor possível de sua participação no ecossistema.

---

## Introdução à Plataforma Opus Open Finance

A **Plataforma Opus Open Finance** é uma solução de software projetada para atender integralmente às exigências regulatórias estabelecidas pelo Banco Central do Brasil. Este documento oferece uma visão geral de como nossa plataforma pode ajudar sua instituição financeira a se integrar e operar eficientemente dentro do Open Finance.

A plataforma atua como um *middleware* essencial que permite à sua instituição operar dentro dos quatro perfis do Open Finance:

- **Detentor de Conta**
- **Transmissor de Dados**
- **Iniciador de Transação de Pagamento**
- **Receptor de Dados**

---

## Estrutura deste Documento

Este documento está organizado para fornecer uma visão geral sobre os conceitos envolvidos no Open Finance e sobre os detalhes técnicos necessários para adoção da **Plataforma Opus Open Finance**. Também são abordados os aspectos de implantação para cada perfil de participante do *Open Finance Brasil*. Para um detalhamento técnico, a documentação também contempla diagramas de sequência e a descrição de APIs no padrão *Open API Specification*.

---

## Guia de leitura
 
Esta seção foi criada para orientar novos clientes que estão avaliando ou iniciando a adoção da **Plataforma Opus Open Finance** nos perfis de **Iniciador de Transação de Pagamento (ITP)** e **Receptor de Dados**. Para cada perfil, os links abaixo estão organizados na ordem recomendada de leitura — do entendimento regulatório até os detalhes técnicos de operação.
 
---
 
### Iniciador de Transação de Pagamento (ITP)
 
O ITP é o perfil que permite à sua instituição iniciar pagamentos em nome de seus clientes. É o perfil central para casos de uso como carteiras digitais, plataformas de pagamento e agregadores financeiros.
 
#### 1. Entendendo o perfil e o ecossistema
 
- [O que é o perfil ITP e como ele se encaixa no Open Finance](openFinance/openFinanceBrasil/perfisParticipacao/itp/index.html) — visão geral do papel do ITP, meios de pagamento e roadmap regulatório.
- [O ecossistema do Open Finance Brasil](openFinance/openFinanceBrasil/ecossistema/index.html) — como o ecossistema funciona e quais são os perfis participantes.
- [Jornada de Consentimento para Pagamentos](openFinance/openFinanceBrasil/jornadaConsentimento/index.html) — como o usuário autoriza um pagamento e como essa jornada se conecta ao papel do ITP.

#### 2. Requisitos regulatórios e certificações
 
- [Certificações e Certificados](openFinance/openFinanceBrasil/certificacoesECertificados.html) — o ITP precisa da **certificação OpenID RP** (*Relying Parties*) e do **Certificado de Autenticação**. A página detalha o que cada um exige, como obtê-los e quais autoridades certificadoras são homologadas.

#### 3. Licença própria vs. licença compartilhada
 
Um ponto decisivo para novos clientes é a escolha entre usar sua própria licença ou utilizar a licença de um fornecedor.

Caso utilize a licença própria, o cliente deve realizar o [Onboarding do ITP](openFinance/openFinanceBrasil/perfisParticipacao/itp/onboardingITP.html), composto por:

- Autorização pelo Banco Central;
- Etapa pré-homologatória;
- Etapa homologatória do Open Finance.

Caso o cliente utilize a licença de um fornecedor, o processo é mais simples, bastando a integração a Plataforma Opus Open Finance.

#### 4. Tipos de pagamento suportados
 
- [Iniciação de Pagamento Pix](openFinance/opusOpenFinance/opusTPP/funcionamento/iniciacaoDePagamento.html) — pagamento imediato e agendado. Detalha os endpoints de consentimento e de pagamento, o comportamento esperado em caso de sucesso e erro, e os códigos de erro mais comuns.
- [Pagamento Automático (Pix Automático)](openFinance/opusOpenFinance/opusTPP/funcionamento/pagamentoAutomatico.html) — consentimentos recorrentes para débitos periódicos (assinaturas, mensalidades, parcelas). Suporta as versões v1 e v2 da API regulatória.
- [Cenários de pagamento](openFinance/opusOpenFinance/integracaoDaPlataforma/pagamentos/cenariosPagamentos.html) — casos de uso práticos e combinações de tipos de pagamento.

#### 5. Fluxos técnicos e redirecionamento
 
- [Funcionamento geral do OpusTPP](openFinance/opusOpenFinance/opusTPP/funcionamento/index.html) — visão dos fluxos de negócio: listagem de participantes, criação de consentimento, redirecionamento e consulta de status.
- [Redirecionamento App-to-App e Web](openFinance/opusOpenFinance/opusTPP/funcionamento/redirecionamento.html) — como o usuário é enviado à Detentora de Conta para autorizar o pagamento e retorna ao ambiente do ITP.
- [Webhooks de pagamentos](openFinance/opusOpenFinance/opusTPP/funcionamento/webhooks.html) — como receber notificações assíncronas sobre mudanças de status dos pagamentos.

#### 6. Implantação e integração
 
- [Implantação da Plataforma](openFinance/opusOpenFinance/implantacaoDaPlataforma/index.html) — o roadmap de implantação conduzido pela Opus: kickoff, configuração de ambientes, certificação OpenID, integração das telas da jornada de consentimento e layer de integração.
- [Integração de Pagamentos](openFinance/opusOpenFinance/integracaoDaPlataforma/pagamentos/index.html) — detalhes técnicos da integração da camada de pagamentos com os sistemas de retaguarda.
---
 
### Receptor de Dados
 
O Receptor de Dados é o perfil que permite à sua instituição solicitar e obter dados financeiros de clientes de outras instituições (Transmissoras de Dados), com o consentimento do próprio cliente. Casos de uso típicos incluem agregadores financeiros, plataformas de crédito e gestão de patrimônio.
 
#### 1. Entendendo o perfil e os dados disponíveis
 
- [O que é o perfil Receptor de Dados](openFinance/openFinanceBrasil/perfisParticipacao/receptorDeDados.html) — visão geral do papel do Receptor, os dados que podem ser compartilhados (cadastrais, conta corrente, cartão, crédito, câmbio e investimentos) e os pré-requisitos de utilização.
- [O ecossistema do Open Finance Brasil](openFinance/openFinanceBrasil/ecossistema/index.html) — como Receptor e Transmissor se complementam dentro do ecossistema.
- [Jornada de Consentimento para Compartilhamento de Dados](openFinance/openFinanceBrasil/jornadaConsentimento/index.html) — como o usuário autoriza o compartilhamento e as diferenças em relação à jornada de pagamento (prazo do consentimento, escopos, renovação).

#### 2. Requisitos regulatórios e certificações
 
- [Certificações e Certificados](openFinance/openFinanceBrasil/certificacoesECertificados.html) — assim como o ITP, o Receptor precisa da **certificação OpenID RP** (*Relying Parties*) e do **Certificado de Autenticação**. A tabela de necessidade de certificados por perfil ajuda a identificar exatamente o que contratar.

#### 3. Licença própria vs. licença compartilhada
 
Um ponto decisivo para novos clientes é a escolha entre usar sua própria licença ou utilizar a licença de um fornecedor.

Caso utilize a licença própria, o cliente deve realizar o [Onboarding do ITP](openFinance/openFinanceBrasil/perfisParticipacao/itp/onboardingITP.html), composto por:

- Autorização pelo Banco Central;
- Etapa pré-homologatória;
- Etapa homologatória do Open Finance.

Caso o cliente utilize a licença de um fornecedor, o processo é mais simples, bastando a integração a Plataforma Opus Open Finance.

#### 4. Dados disponíveis para recepção
 
- [Recepção de Dados — funcionamento e endpoints](openFinance/opusOpenFinance/opusTPP/funcionamento/recepcaoDeDados.html) — endpoints de consentimento (criação, consulta, revogação, renovação) e os aproximadamente 78 proxies regulatórios organizados por família: clientes, contas, cartão de crédito, operações de crédito, câmbio e investimentos.
- [Compartilhamento de Dados — visão de integração](openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/index.html) — como os dados recebidos se organizam, por produto financeiro.
- [Consentimento Compartilhado — Recepção de Dados](openFinance/opusOpenFinance/consentimentoCompartilhado/recepcaoDeDados.html) — gestão do ciclo de vida dos consentimentos de dados na perspectiva do produto.

#### 5. Fluxos técnicos e redirecionamento
 
- [Funcionamento geral do OpusTPP](openFinance/opusOpenFinance/opusTPP/funcionamento/index.html) — os fluxos de consentimento de dados seguem a mesma lógica geral do ITP (listagem de participantes → criação → redirecionamento → consulta), com diferenças nos escopos e na vigência.
- [Redirecionamento App-to-App e Web](openFinance/opusOpenFinance/opusTPP/funcionamento/redirecionamento.html) — como o usuário é enviado à Transmissora para autorizar o compartilhamento e retorna ao ambiente do Receptor.

#### 6. Implantação e integração
 
- [Implantação da Plataforma](openFinance/opusOpenFinance/implantacaoDaPlataforma/index.html) — o processo de implantação é o mesmo descrito para o ITP. Destaca-se que para o perfil Receptor **não é necessário construir uma camada de integração com sistemas de retaguarda** — a integração ocorre apenas nas telas da jornada de consentimento.

---

## Sobre a Opus Software

A Opus Software é uma empresa de desenvolvimento de software que atua há 38 anos no mercado. Ao longo de sua história, a empresa sempre esteve envolvida com projetos de alto valor agregado, grande volume transacional e com requisitos exigentes em termos de desempenho, qualidade e prazos agressivos. O principal segmento de atuação da empresa é o mercado financeiro, atendendo a bancos, instituições de pagamento, empresas de meios de pagamento e seguradoras. A empresa atua também junto a empresas de varejo, especialmente atendendo a demandas de suas áreas financeiras e de atendimento.

Em sua trajetória, a Opus Software também tem desenvolvido soluções próprias. Em sua origem, a empresa desenvolveu protocolos de comunicação e software básico, posteriormente construindo uma oferta de automação bancária que rodou por diversos anos em várias instituições financeiras do mercado nacional. No ano de 2020, a empresa criou uma unidade de negócios voltada para Open Finance, construindo a solução Opus Open Finance, que é utilizada atualmente por diversas instituições financeiras de destaque do cenário brasileiro.

Unindo sua vocação na prestação de serviços de desenvolvimento de software customizado com a capacidade de seu time de construir sistemas distribuídos de alto desempenho, confiabilidade e resiliência, a oferta da **Plataforma Opus Open Finance** agrega a padronização demandada pelas regras regulatórias do *Open Finance Brasil* com a capacidade de adaptação às necessidades específicas das instituições financeiras.

---

## Suporte e Assistência

Sabemos que a implementação de uma nova plataforma de software pode trazer desafios únicos. Por isso, nossa equipe de suporte está pronta para assisti-lo em cada etapa do processo.

Se você tiver dúvidas ou precisar de assistência técnica, **não hesite em entrar em contato com o *Delivery Manager* da Opus Software designado à sua instituição**. Estamos aqui para garantir que sua experiência com a **Plataforma Opus Open Finance** seja tranquila e bem-sucedida.
