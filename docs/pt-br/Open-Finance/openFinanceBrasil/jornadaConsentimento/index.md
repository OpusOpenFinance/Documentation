---
layout: default
title: Jornada de Consentimento
parent: "Open Finance Brasil"
nav_order: 3
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/Open-Finance/openFinanceBrasil/jornadaConsentimento/index/"
      lang: "en"
    - path: "/Documentation/es/Open-Finance/openFinanceBrasil/jornadaConsentimento/index/"
      lang: "es"
---

## Jornada de Consentimento

No Open Finance, qualquer operação só pode ser realizada - seja ela o compartilhamento de dados ou a efetuação de um pagamento - se houver consentimento aprovado pelo usuário (cliente de uma instituição financeira) que iniciou a jornada. Portanto, sempre é necessário realizar uma *jornada de consentimento* para que o usuário possa autorizar a operação.

O **consentimento** é o termo usado para demonstrar que o usuário cliente da instituição financeira concorda com a operação que o **Iniciador de Pagamento** ou a **Receptora de Dados** está solicitando à **Detentora de Conta**, ou à **Transmissora de Dados**.

---

### Jornada de Consentimento para Compartilhamento de Dados

![Jornada de dados](./anexos/imagens/jornada-dados.png)  
Fonte: Banco Central

1. O usuário acessa o ambiente da **Receptora de Dados** e requisita o início de um novo compartilhamento via Open Finance;
2. Após realizar a solicitação e escolher a **Transmissora de Dados**, o usuário é redirecionado automaticamente para o ambiente da Transmissora;
3. No ambiente da Transmissora, o usuário autentica usando biometria ou credenciais cadastradas para acessar sua conta;
4. Após o login, o usuário seleciona e confirma os dados que deseja compartilhar;
5. Por fim, o usuário é redirecionado de volta ao ambiente da Receptora, onde recebe a confirmação do sucesso do compartilhamento.

---

### Jornada de Consentimento para Pagamentos

![Jornada de dados](./anexos/imagens/jornada-pagamentos.png)
[Fonte: Banco Central](https://openfinancebrasil.org.br/conheca-o-open-finance/)

1. O usuário acessa o ambiente do **Iniciador de Pagamento (ITP)** e solicita a iniciação de um novo pagamento via Open Finance;
2. Após realizar a solicitação e escolher a **Detentora de Conta**, o usuário é redirecionado automaticamente para o ambiente da Detentora;
3. No ambiente da Detentora, o usuário autentica usando biometria ou credenciais cadastradas para acessar sua conta;
4. Após o login, o usuário confirma o pagamento, verificando os dados da transação e inserindo suas credenciais;
5. O usuário é redirecionado de volta ao ambiente do ITP, onde recebe a confirmação de que o pagamento foi efetuado com sucesso.

Para mais detalhes sobre os possíveis status do consentimento e a máquina de estados do pagamento, consulte o [portal do desenvolvedor](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/347078805/M+quina+de+Estados+-+v4.0.0+-+SV+Pagamentos).

---

### Diferenças entre as Jornadas de Consentimento

Embora sejam similares, as jornadas possuem particularidades devido às suas finalidades distintas:

| **Aspecto**            | **Dados**                                                                                     | **Pagamentos**                                                                        |
|-------------------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| **Tempo do Consentimento** | Definido pelo usuário durante a jornada, variando de 1 a 12 meses ou tempo indeterminado.    | Consentimento utilizado uma única vez, consumido imediatamente após o pagamento.      |
| **Valor do Pagamento**    | Não se aplica.                                                                              | Definido pelo ITP e exibido ao usuário durante a confirmação do consentimento.        |
| **Variações no Consentimento** | Depende das informações dos produtos que o usuário deseja compartilhar ([veja os possíveis produtos aqui](../perfisParticipacao/transmissorDeDados.html)). | Depende do tipo de pagamento selecionado [(confira o roadmap aqui)](../perfisParticipacao/detentorDeConta.html).              |

Para mais informações sobre a jornada de experiência do usuário definida pelo regulador, [clique aqui](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1477279745/v.19.00.01+Guia+de+Experi+ncia+do+Usu+rio+Open+Finance+Brasil).
