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
    // Open Finance Brasil
    // Perfis de Participação
    "oas-receptor": `${base}docs/pt-br/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/oasOpusTPPDados.yml`,
    "oas-itp-pagamentos": `${base}/pt-br/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/oasOpusTPPPagamentos.yml`,
    "oas-itp-pagamentos-automaticos": `${base}/pt-br/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/oasOpusTPPPagamentosAutomaticos.yml`,
    "oas-back-dados": `${base}/pt-br/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/oasOOFDados.yml`,
    "oas-pagamentos-jsr": `${base}/pt-br/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/oasPagamentosJSR.yaml`,
    // Opus Open finance
    // Integração -> Compartilhamento de Dados
    "cambio": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/exchange-1-0-0.yml`,
    "dados-cadastrais": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/customers-2-2-0.yml`,
    "cartao-de-credito": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/creditCards-2-3-1.yml`,
    "contas": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/accounts-2-4-1.yml`,
    "opus-commons": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/opusCommons-1-0-0.yml`,
    // Compartilhamento de Dados - Investimentos
    "fundos-investimento": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/funds.yml`,
    "renda-fixa-bancaria": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/bankFixedIncomes.yml`,
    "renda-fixa-credito": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/creditFixedIncomes.yml`,
    "tesouro-direto": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/treasuryBonds.yml`,
    "renda-variavel": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/variableIncomes.yml`,
    // Compartilhamento de Dados - Operações de Crédito
    "emprestimos": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/operacoesDeCredito/loans-2-4-0.yml`,
    "financiamentos": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/operacoesDeCredito/financings-2-3-0.yml`,
    "adiantamentos": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/operacoesDeCredito/overdraft-2-4-0.yml`,
    "direitos-creditorios": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/operacoesDeCredito/invoiceFinancings-2-3-0.yml`,
    // Integração -> Pagamentos
    "payment-integration": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/pagamentos/anexos/yml/paymentIntegration-0.1.0.yml`,
    // Integração -> App e web
    "mobile": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/appEWeb/anexos/yml/mobileWebapp2as.yml`,
    // Integração -> Dados Abertos
    "open-data-acquiring": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/openData-acquiringServices.yml`,
    "open-data-accounts": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/openData-accounts.yml`,
    "open-data-capitalization": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/openData-capitalizationBonds.yml`,
    "open-data-channels": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/openData-channels.yml`,
    "open-data-credit-cards": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/openData-creditCards.yml`,
    "open-data-exchange": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/openData-exchange.yml`,
    "open-data-financings": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/openData-financings.yml`,
    "open-data-insurance": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/openData-insurance.yml`,
    "open-data-investments": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/openData-investments.yml`,
    "open-data-invoice-financings": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/openData-invoiceFinancings.yml`,
    "open-data-loans": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/openData-loans.yml`,
    "open-data-pension": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/openData-pension.yml`,
    "open-data-unarranged": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/openData-unarrangedAccountOverdraft.yml`,
    // Integração -> Portabilidade de Crédito
    "portability": `${base}/pt-br/openFinance/opusOpenFinance/integracaoDaPlataforma/portabilidadeCredito/anexos/yml/portability.yml`,
    // ODR
    "odr-setup": `${base}/pt-br/openFinance/opusOpenFinance/opusDataReceiver/anexos/yml/odr-setup.yml`,
    "odr-accounts": `${base}/pt-br/openFinance/opusOpenFinance/opusDataReceiver/anexos/yml/odr-accounts.yml`,
    "odr-creditcard": `${base}/pt-br/openFinance/opusOpenFinance/opusDataReceiver/anexos/yml/odr-creditCard.yml`,
    "odr-customer": `${base}/pt-br/openFinance/opusOpenFinance/opusDataReceiver/anexos/yml/odr-customer.yml`,
    "odr-credit_financing": `${base}/pt-br/openFinance/opusOpenFinance/opusDataReceiver/anexos/yml/odr-creditFinancing.yml`,
    "odr-credit_loans": `${base}/pt-br/openFinance/opusOpenFinance/opusDataReceiver/anexos/yml/odr-creditLoans.yml`,
    "odr-credit-invoice-financing": `${base}/pt-br/openFinance/opusOpenFinance/opusDataReceiver/anexos/yml/odr-creditInvoiceFinancing.yml`,
    "odr-credit-unarranged-accounts": `${base}/pt-br/openFinance/opusOpenFinance/opusDataReceiver/anexos/yml/odr-creditUnarrangedAccountsOverdraft.yml`,
    "odr-investments_bank_fixed_income": `${base}/pt-br/openFinance/opusOpenFinance/opusDataReceiver/anexos/yml/odr-investmentsBankFixedIncomes.yml`,
    "odr-investments_credit_fixed_income": `${base}/pt-br/openFinance/opusOpenFinance/opusDataReceiver/anexos/yml/odr-investmentsCreditFixedIncomes.yml`,
    "odr-investments_variable_incomes": `${base}/pt-br/openFinance/opusOpenFinance/opusDataReceiver/anexos/yml/odr-investmentsVariableIncomes.yml`,
    "odr-investments_treasure_titles": `${base}/pt-br/openFinance/opusOpenFinance/opusDataReceiver/anexos/yml/odr-investmentsTreasureTitles.yml`,
    "odr-investments_funds": `${base}/pt-br/openFinance/opusOpenFinance/opusDataReceiver/anexos/yml/odr-investmentsFunds.yml`,
    "odr-exchanges": `${base}/pt-br/openFinance/opusOpenFinance/opusDataReceiver/anexos/yml/odr-exchanges.yml`,

    // =====================================================
    // EN
    // =====================================================
    // Open Finance Brasil
    // Perfis de Participação
    "en-oas-receptor": `${base}/en/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/en-oasOpusTPPDados.yml`,
    "en-oas-itp-pagamentos": `${base}/en/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/en-oasOpusTPPPagamentos.yml`,
    "en-oas-itp-pagamentos-automaticos": `${base}/en/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/en-oasOpusTPPPagamentosAutomaticos.yml`,
    "en-oas-back-dados": `${base}/en/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/en-oasOOFDados.yml`,
    "en-oas-pagamentos-jsr": `${base}/en/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/en-oasPagamentosJSR.yaml`,
    // Opus Open Finance
    // Integração -> Compartilhamento de Dados
    "en-dados-cadastrais": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/en-customers-2-2-0.yml`,
    "en-cartao-de-credito": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/en-creditCards-2-3-1.yml`,
    "en-contas": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/en-accounts-2-4-1.yml`,
    "en-cambio": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/en-exchange-1-0-0.yml`,
    "en-opus-commons": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/en-opusCommons-1-0-0.yml`,
    // Compartilhamento de Dados - Investimentos
    "en-data-funds": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/en-funds.yml`,
    "en-data-bank-fixed-incomes": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/en-bankFixedIncomes.yml`,
    "en-data-credit-fixed-incomes": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/en-creditFixedIncomes.yml`,
    "en-data-treasury-bonds": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/en-treasuryBonds.yml`,
    "en-data-variable-incomes": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/en-variableIncomes.yml`,
    // Compartilhamento de Dados - Operações de Crédito
    "en-emprestimos": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/operacoesDeCredito/en-loans-2-4-0.yml`,
    "en-financiamentos": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/operacoesDeCredito/en-financings-2-3-0.yml`,
    "en-adiantamentos": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/operacoesDeCredito/en-overdraft-2-4-0.yml`,
    "en-direitos-creditorios": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/operacoesDeCredito/en-invoiceFinancings-2-3-0.yml`,
    // Integração -> Pagamentos
    "en-payment-integration": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/pagamentos/anexos/yml/en-paymentIntegration-0.1.0.yml`,
    // Integração -> App e web
    "en-mobile": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/appEWeb/anexos/yml/en-mobileWebapp2as.yml`,
    // Integração -> Dados Abertos
    "en-open-data-acquiring": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/en-openData-acquiringServices.yml`,
    "en-open-data-accounts": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/en-openData-accounts.yml`,
    "en-open-data-capitalization": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/en-openData-capitalizationBonds.yml`,
    "en-open-data-channels": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/en-openData-channels.yml`,
    "en-open-data-credit-cards": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/en-openData-creditCards.yml`,
    "en-open-data-exchange": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/en-openData-exchange.yml`,
    "en-open-data-financings": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/en-openData-financings.yml`,
    "en-open-data-insurance": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/en-openData-insurance.yml`,
    "en-open-data-investments": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/en-openData-investments.yml`,
    "en-open-data-invoice-financings": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/en-openData-invoiceFinancings.yml`,
    "en-open-data-loans": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/en-openData-loans.yml`,
    "en-open-data-pension": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/en-openData-pension.yml`,
    "en-open-data-unarranged": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/en-openData-unarrangedAccountOverdraft.yml`,
    // Integração -> Portabilidade de Crédito
    "en-portability": `${base}/en/openFinance/opusOpenFinance/integracaoDaPlataforma/portabilidadeCredito/anexos/yml/en-portability.yml`,
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
    // Open Finance Brasil
    // Perfis de Participação
    "es-oas-receptor": `${base}/es/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/es-oasOpusTPPDados.yml`,
    "es-oas-itp-pagamentos": `${base}/es/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/es-oasOpusTPPPagamentos.yml`,
    "es-oas-itp-pagamentos-automaticos": `${base}/es/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/es-oasOpusTPPPagamentosAutomaticos.yml`,
    "es-oas-back-dados": `${base}/es/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/es-oasOOFDados.yml`,
    "es-oas-pagamentos-jsr": `${base}/es/openFinance/openFinanceBrasil/perfisParticipacao/anexos/yml/es-oasPagamentosJSR.yaml`,
    // Integração -> Compartilhamento de Dados
    "es-dados-cadastrais": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/es-customers-2-2-0.yml`,
    "es-cartao-de-credito": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/es-creditCards-2-3-1.yml`,
    "es-contas": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/es-accounts-2-4-1.yml`,
    "es-cambio": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/es-exchange-1-0-0.yml`,
    "es-opus-commons": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/es-opusCommons-1-0-0.yml`,
    // Compartilhamento de Dados - Investimentos
    "es-data-funds": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/es-funds.yml`,
    "es-data-bank-fixed-incomes": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/es-bankFixedIncomes.yml`,
    "es-data-credit-fixed-incomes": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/es-creditFixedIncomes.yml`,
    "es-data-treasury-bonds": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/es-treasuryBonds.yml`,
    "es-data-variable-incomes": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/investimentos/es-variableIncomes.yml`,
    // Compartilhamento de Dados - Operações de Crédito
    "es-emprestimos": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/operacoesDeCredito/es-loans-2-4-0.yml`,
    "es-financiamentos": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/operacoesDeCredito/es-financings-2-3-0.yml`,
    "es-adiantamentos": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/operacoesDeCredito/es-overdraft-2-4-0.yml`,
    "es-direitos-creditorios": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/compartilhamentoDeDados/anexos/yml/operacoesDeCredito/es-invoiceFinancings-2-3-0.yml`,
    // Integração -> Pagamentos
    "es-payment-integration": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/pagamentos/anexos/yml/es-paymentIntegration-0.1.0.yml`,
    // Integração -> App e Web
    "es-mobile": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/appEWeb/anexos/yml/es-mobileWebapp2as.yml`,
    // Integração -> Dados Abertos
    "es-open-data-acquiring": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/es-openData-acquiringServices.yml`,
    "es-open-data-accounts": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/es-openData-accounts.yml`,
    "es-open-data-capitalization": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/es-openData-capitalizationBonds.yml`,
    "es-open-data-channels": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/es-openData-channels.yml`,
    "es-open-data-credit-cards": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/es-openData-creditCards.yml`,
    "es-open-data-exchange": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/es-openData-exchange.yml`,
    "es-open-data-financings": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/es-openData-financings.yml`,
    "es-open-data-insurance": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/es-openData-insurance.yml`,
    "es-open-data-investments": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/es-openData-investments.yml`,
    "es-open-data-invoice-financings": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/es-openData-invoiceFinancings.yml`,
    "es-open-data-loans": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/es-openData-loans.yml`,
    "es-open-data-pension": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/es-openData-pension.yml`,
    "es-open-data-unarranged": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/dadosAbertos/anexos/yml/es-openData-unarrangedAccountOverdraft.yml`,
    // Integração -> Portabilidade de Crédito
    "es-portability": `${base}/es/openFinance/opusOpenFinance/integracaoDaPlataforma/portabilidadeCredito/anexos/yml/es-portability.yml`,
    // ODR
    "es-odr-setup": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/es-setup_oas.yml`,
    "es-odr-accounts": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/es-accounts_oas.yml`,
    "es-odr-creditcard": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/es-creditcard_oas.yml`,
    "es-odr-customer": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/es-customer_oas.yml`,
    "es-odr-credit_financing": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/es-credit_financing_oas.yml`,
    "es-odr-credit_loans": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/en-credit_loans_oas.yml`,
    "es-odr-credit-invoice-financing": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/es-credit_invoice_financing_oas.yml`,
    "es-odr-credit-unarranged-accounts": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/es-credit_unarranged_accounts_overdraft_oas.yml`,
    "es-odr-investments_bank_fixed_income": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/es-investments_bank_fixed_income_oas.yml`,
    "es-odr-investments_credit_fixed_income": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/es-investments_credit_fixed_incomes_oas.yml`,
    "es-odr-investments_variable_incomes": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/es-investments_variable_incomes_oas.yml`,
    "es-odr-investments_treasure_titles": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/es-investments_treasure_titles_oas.yml`,
    "es-odr-investments_funds": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/es-investments_funds_oas.yml`,
    "es-odr-exchanges": `${base}/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/anexos/yml/es-exchanges_oas.yml`, 
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
