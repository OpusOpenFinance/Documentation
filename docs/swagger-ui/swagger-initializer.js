window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  let apiName = params.get("api") || "";

  // Normalização defensiva
  apiName = apiName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  const base = "/Documentation";

  const apis = {
    // =====================================================
    // PT-BR
    // =====================================================
    "dados-cadastrais": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/customers-2-2-0.yml`,
    "cartao-de-credito": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/credit-cards-2-3-1.yml`,
    "contas": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/accounts-2-4-1.yml`,
    "emprestimos": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/loans-2-4-0.yml`,
    "cambio": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/exchange-1-0-0.yml`,
    "financiamentos": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/financings-2-3-0.yml`,
    "adiantamentos": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/overdraft-2-4-0.yml`,
    "direitos-creditorios": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/invoice-financings-2-3-0.yml`,
    "opus-commons": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/opus-commons-1-0-0.yml`,
    "payment-integration": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/payment-integration-0.1.0.yml`,
    // OAS / Mobile
    "oas-receptor": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-dados.yml`,
    "oas-itp-pagamentos": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-pagamentos.yml`,
    "oas-itp-pagamentos-automaticos": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-pagamentos-automaticos.yml`,
    "oas-back-dados": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-oof-dados.yml`,
    "mobile": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-webapp2as.yml`,
    // Open Data
    "open-data-acquiring": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-acquiring-services.yml`,
    "open-data-accounts": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-accounts.yml`,
    "open-data-capitalization": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-capitalization-bonds.yml`,
    "open-data-channels": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-channels.yml`,
    "open-data-credit-cards": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-credit-cards.yml`,
    "open-data-exchange": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-exchange.yml`,
    "open-data-financings": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-financings.yml`,
    "open-data-insurance": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-insurance.yml`,
    "open-data-investments": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-investments.yml`,
    "open-data-invoice-financings": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-invoice-financings.yml`,
    "open-data-loans": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-loans.yml`,
    "open-data-pension": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-pension.yml`,
    "open-data-unarranged": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-unarranged-account-overdraft.yml`,
    // Dados de Investimento
    "data-funds": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-funds.yml`,
    "data-bank-fixed-incomes": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-bank-fixed-incomes.yml`,
    "data-credit-fixed-incomes": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-credit-fixed-incomes.yml`,
    "data-treasury-bonds": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-treasury-bonds.yml`,
    "data-variable-incomes": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-variable-incomes.yml`,
    // ODR
    "odr-setup": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/setup_oas.yml`,
    "odr-accounts": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/accounts_oas.yml`,
    "odr-creditcard": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/creditcard_oas.yml`,
    "odr-customer": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/customer_oas.yml`,
    "odr-credit_financing": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/credit_financing_oas.yml`,
    "odr-credit_loans": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/credit_loans_oas.yml`,
    "odr-credit-invoice-financing": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/credit_invoice_financing_oas.yml`,
    "odr-credit-unarranged-accounts": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/credit_unarranged_accounts_overdraft_oas.yml`,
    "odr-investments_bank_fixed_income": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/investments_bank_fixed_income_oas.yml`,
    "odr-investments_credit_fixed_income": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/investments_credit_fixed_incomes_oas.yml`,
    "odr-investments_variable_incomes": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/investments_variable_incomes_oas.yml`,
    "odr-investments_treasure_titles": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/investments_treasure_titles_oas.yml`,
    "odr-investments_funds": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/investments_funds_oas.yml`,
    "odr-exchanges": `${base}/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/exchanges_oas.yml`,    

    // =====================================================
    // EN
    // =====================================================
    "en-dados-cadastrais": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-customers-2-2-0.yml`,
    "en-cartao-de-credito": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-credit-cards-2-3-1.yml`,
    "en-contas": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-accounts-2-4-1.yml`,
    "en-emprestimos": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-loans-2-4-0.yml`,
    "en-cambio": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-exchange-1-0-0.yml`,
    "en-financiamentos": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-financings-2-3-0.yml`,
    "en-adiantamentos": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-overdraft-2-4-0.yml`,
    "en-direitos-creditorios": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-invoice-financings-2-3-0.yml`,
    "en-opus-commons": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-opus-commons-1-0-0.yml`,
    "en-payment-integration": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-payment-integration-0.1.0.yml`,
    // OAS / Mobile
    "en-oas-receptor": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-dados.yml`,
    "en-oas-itp-pagamentos": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-pagamentos.yml`,
    "en-oas-itp-pagamentos-automaticos": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-pagamentos-automaticos.yml`,
    "en-oas-back-dados": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/en-oas-oof-dados.yml`,
    "en-mobile": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-webapp2as.yml`,
    // Open Data
    "en-open-data-acquiring": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/en-open-data-acquiring-services.yml`,
    "en-open-data-accounts": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/en-open-data-accounts.yml`,
    "en-open-data-capitalization": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/en-open-data-capitalization-bonds.yml`,
    "en-open-data-channels": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/en-open-data-channels.yml`,
    "en-open-data-credit-cards": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/en-open-data-credit-cards.yml`,
    "en-open-data-exchange": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/en-open-data-exchange.yml`,
    "en-open-data-financings": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/en-open-data-financings.yml`,
    "en-open-data-insurance": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/en-open-data-insurance.yml`,
    "en-open-data-investments": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/en-open-data-investments.yml`,
    "en-open-data-invoice-financings": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/en-apis-dados-abertos/open-data-invoice-financings.yml`,
    "en-open-data-loans": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/en-open-data-loans.yml`,
    "en-open-data-pension": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/en-open-data-pension.yml`,
    "en-open-data-unarranged": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/en-open-data-unarranged-account-overdraft.yml`,
    // Dados de Investimento
    "en-data-funds": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/en-oas-funds.yml`,
    "en-data-bank-fixed-incomes": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/en-oas-bank-fixed-incomes.yml`,
    "en-data-credit-fixed-incomes": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/en-oas-credit-fixed-incomes.yml`,
    "en-data-treasury-bonds": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/en-oas-treasury-bonds.yml`,
    "en-data-variable-incomes": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/en-oas-variable-incomes.yml`,
    // ODR
    "en-odr-setup": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-setup_oas.yml`,
    "en-odr-accounts": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-accounts_oas.yml`,
    "en-odr-creditcard": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-creditcard_oas.yml`,
    "en-odr-customer": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-customer_oas.yml`,
    "en-odr-credit_financing": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-credit_financing_oas.yml`,
    "en-odr-credit_loans": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-credit_loans_oas.yml`,
    "en-odr-credit-invoice-financing": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-credit_invoice_financing_oas.yml`,
    "en-odr-credit-unarranged-accounts": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-credit_unarranged_accounts_overdraft_oas.yml`,
    "en-odr-investments_bank_fixed_income": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-investments_bank_fixed_income_oas.yml`,
    "en-odr-investments_credit_fixed_income": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-investments_credit_fixed_incomes_oas.yml`,
    "en-odr-investments_variable_incomes": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-investments_variable_incomes_oas.yml`,
    "en-odr-investments_treasure_titles": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-investments_treasure_titles_oas.yml`,
    "en-odr-investments_funds": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-investments_funds_oas.yml`,
    "en-odr-exchanges": `${base}/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-exchanges_oas.yml`, 

    // =====================================================
    // ES
    // =====================================================
    "es-dados-cadastrais": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/es-customers-2-2-0.yml`,
    "es-cartao-de-credito": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/es-credit-cards-2-3-1.yml`,
    "es-contas": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/es-accounts-2-4-1.yml`,
    "es-emprestimos": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/es-loans-2-4-0.yml`,
    "es-cambio": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/es-exchange-1-0-0.yml`,
    "es-financiamentos": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/es-financings-2-3-0.yml`,
    "es-adiantamentos": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/es-overdraft-2-4-0.yml`,
    "es-direitos-creditorios": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/es-invoice-financings-2-3-0.yml`,
    "es-opus-commons": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/es-opus-commons-1-0-0.yml`,
    "es-payment-integration": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/payment-integration-0.1.0.yml`,
    // OAS / Mobile
    "es-oas-receptor": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-dados.yml`,
    "es-oas-itp-pagamentos": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-pagamentos.yml`,
    "es-oas-itp-pagamentos-automaticos": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-opustpp-pagamentos-automaticos.yml`,
    "es-oas-back-dados": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/es-oas-oof-dados.yml`,
    "es-mobile": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/oas-webapp2as.yml`,
    // Open Data
    "es-open-data-acquiring": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-acquiring-services.yml`,
    "es-open-data-accounts": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-accounts.yml`,
    "es-open-data-capitalization": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-capitalization-bonds.yml`,
    "es-open-data-channels": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-channels.yml`,
    "es-open-data-credit-cards": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-credit-cards.yml`,
    "es-open-data-exchange": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-exchange.yml`,
    "es-open-data-financings": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-financings.yml`,
    "es-open-data-insurance": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-insurance.yml`,
    "es-open-data-investments": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-investments.yml`,
    "es-open-data-invoice-financings": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-invoice-financings.yml`,
    "es-open-data-loans": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-loans.yml`,
    "es-open-data-pension": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-pension.yml`,
    "es-open-data-unarranged": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis-dados-abertos/open-data-unarranged-account-overdraft.yml`,
    // Dados de Investimento
    "es-data-funds": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-funds.yml`,
    "es-data-bank-fixed-incomes": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-bank-fixed-incomes.yml`,
    "es-data-credit-fixed-incomes": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-credit-fixed-incomes.yml`,
    "es-data-treasury-bonds": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-treasury-bonds.yml`,
    "es-data-variable-incomes": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/apis/dados-investimento/oas-variable-incomes.yml`,
  };

  const apiUrl =
    apis[apiName] ||
    apis[`en-${apiName}`] ||
    apis[`es-${apiName}`] ||
    apis["dados-cadastrais"];

  SwaggerUIBundle({
    url: apiUrl,
    dom_id: "#swagger-ui",
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    layout: "BaseLayout",
    supportedSubmitMethods: []
  });
};
