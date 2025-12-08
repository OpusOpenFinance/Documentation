window.onload = () => {
  // Obter o parâmetro "api" da URL
  const urlParams = new URLSearchParams(window.location.search);
  const apiName = urlParams.get("api");

  // Lista de APIs disponíveis
  const apis = {
    // APIs em português.
    // -----------------
    "Dados-cadastrais": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/customers-2-2-0.yml",
    "Cartão-de-crédito": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/credit-cards-2-3-1.yml",
    "Contas": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/accounts-2-4-1.yml",
    "Empréstimo": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/loans-2-4-0.yml",
    "Câmbio": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/exchange-1-0-0.yml",
    "Financiamento": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/financings-2-3-0.yml",
    "Adiantamento": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/overdraft-2-4-0.yml",
    "Direitos-Creditórios": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/invoice-financings-2-3-0.yml",
    "Opus-Commons": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/opus-commons-1-0-0.yml",
    "OAS-Receptor": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-dados.yml",
    "OAS-ITP-pagamentos": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-pagamentos.yml",
    "OAS-ITP-pagamentos-automaticos": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-pagamentos-automaticos.yml",
    "OAS-back-dados": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-oof-dados.yml",
    "Mobile": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-webapp2as.yml",
    "open-data-acquiring": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-acquiring-services.yml",
    "open-data-accounts": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-accounts.yml",
    "open-data-capitalization": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-capitalization-bonds.yml",
    "open-data-channels": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-channels.yml",
    "open-data-credit-cards": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-credit-cards.yml",
    "open-data-exchange": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-exchange.yml",
    "open-data-financings": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-financings.yml",
    "open-data-insurance": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-insurance.yml",
    "open-data-investments": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-investments.yml",
    "open-data-invoice-financings": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-invoice-financings.yml",
    "open-data-loans": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-loans.yml",
    "open-data-pension": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-pension.yml",
    "open-data-unarranged": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-unarranged-account-overdraft.yml",
    "data-funds": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-funds.yml",
    "data-bank-fixed-incomes": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-bank-fixed-incomes.yml",
    "data-credit-fixed-incomes": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-credit-fixed-incomes.yml",
    "data-treasury-bonds": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-treasury-bonds.yml",
    "data-variable-incomes": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-variable-incomes.yml",
    "payment-integration": "../pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/payment-integration-0.1.0.yml",

    // -----------------
    // APIs em inglês.
    // -----------------
    "en-Dados-cadastrais": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-customers-2-2-0.yml",
    "en-Cartão-de-crédito": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-credit-cards-2-3-1.yml",
    "en-Contas": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-accounts-2-4-1.yml",
    "en-Empréstimo": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-loans-2-4-0.yml",
    "en-Câmbio": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-exchange-1-0-0.yml",
    "en-Financiamento": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-financings-2-3-0.yml",
    "en-Adiantamento": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-overdraft-2-4-0.yml",
    "en-Direitos-Creditórios": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-invoice-financings-2-3-0.yml",
    "en-Opus-Commons": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-opus-commons-1-0-0.yml",
    "en-OAS-Receptor": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-dados.yml",
    "en-OAS-ITP-pagamentos": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-pagamentos.yml",
    "en-OAS-ITP-pagamentos-automaticos": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-pagamentos-automaticos.yml",
    "en-OAS-back-dados": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-oas-oof-dados.yml",
    "en-Mobile": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-webapp2as.yml",
    "en-open-data-acquiring": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-acquiring-services.yml",
    "en-open-data-accounts": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-accounts.yml",
    "en-open-data-capitalization": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-capitalization-bonds.yml",
    "en-open-data-channels": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-channels.yml",
    "en-open-data-credit-cards": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-credit-cards.yml",
    "en-open-data-exchange": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-exchange.yml",
    "en-open-data-financings": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-financings.yml",
    "en-open-data-insurance": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-insurance.yml",
    "en-open-data-investments": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-investments.yml",
    "en-open-data-invoice-financings": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-invoice-financings.yml",
    "en-open-data-loans": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-loans.yml",
    "en-open-data-pension": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-pension.yml",
    "en-open-data-unarranged": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-unarranged-account-overdraft.yml",
    "en-data-funds": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-funds.yml",
    "en-data-bank-fixed-incomes": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-bank-fixed-incomes.yml",
    "en-data-credit-fixed-incomes": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-credit-fixed-incomes.yml",
    "en-data-treasury-bonds": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-treasury-bonds.yml",
    "en-data-variable-incomes": "../en/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-variable-incomes.yml",
    // Adicione outras APIs aqui. As linhas são terminadas por "," mesmo qdo é o último item...*/

    // -----------------
    // APIs em espanhol
    // -----------------
    "es-Dados-cadastrais": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/es-customers-2-2-0.yml",
    "es-Cartão-de-crédito": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/credit-cards-2-3-1.yml",
    "es-Contas": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/es-accounts-2-4-1.yml",
    "es-Empréstimo": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/loans-2-4-0.yml",
    "es-Câmbio": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/exchange-1-0-0.yml",
    "es-Financiamento": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/financings-2-3-0.yml",
    "es-Adiantamento": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/overdraft-2-4-0.yml",
    "es-Direitos-Creditórios": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/invoice-financings-2-3-0.yml",
    "es-Opus-Commons": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/opus-commons-1-0-0.yml",
    "es-OAS-Receptor": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/es-oas-opustpp-dados.yml",
    "es-OAS-ITP-pagamentos": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-pagamentos.yml",
    "es-OAS-ITP-pagamentos-automaticos": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-pagamentos-automaticos.yml",
    "es-OAS-back-dados": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-oof-dados.yml",
    "es-Mobile": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-webapp2as.yml",
    "es-open-data-acquiring": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-acquiring-services.yml",
    "es-open-data-accounts": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-accounts.yml",
    "es-open-data-capitalization": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-capitalization-bonds.yml",
    "es-open-data-channels": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-channels.yml",
    "es-open-data-credit-cards": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-credit-cards.yml",
    "es-open-data-exchange": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-exchange.yml",
    "es-open-data-financings": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-financings.yml",
    "es-open-data-insurance": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-insurance.yml",
    "es-open-data-investments": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-investments.yml",
    "es-open-data-invoice-financings": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-invoice-financings.yml",
    "es-open-data-loans": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-loans.yml",
    "es-open-data-pension": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-pension.yml",
    "es-open-data-unarranged": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-unarranged-account-overdraft.yml",
    "es-data-funds": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-funds.yml",
    "es-data-bank-fixed-incomes": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-bank-fixed-incomes.yml",
    "es-data-credit-fixed-incomes": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-credit-fixed-incomes.yml",
    "es-data-treasury-bonds": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-treasury-bonds.yml",
    "es-data-variable-incomes": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-variable-incomes.yml",
    "es-payment-integration": "../es/Open-Finance/Plataforma-OpusOpenFinance/apis/payment-integration-0.1.0.yml",
  };

  // Determinar qual API carregar
  const apiUrl = apis[apiName] || apis["Dados-cadastrais"]; // Carrega "Dados Cadastrais" por padrão

  // Inicializar o Swagger UI
  const ui = SwaggerUIBundle({
    url: apiUrl,
    dom_id: "#swagger-ui",
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    layout: "BaseLayout",
    supportedSubmitMethods: [] // Remove o botão "Try it out"
  });
  window.ui = ui;
};
