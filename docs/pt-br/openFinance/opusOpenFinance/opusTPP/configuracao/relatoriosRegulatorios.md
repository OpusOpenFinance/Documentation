---
layout: default
title: Relatórios Regulatórios
parent: "Configuração"
grand_parent: "OpusTPP"
nav_order: 8
lang: "pt-br"
alternate_lang:
    - path: "/Documentation/en/openFinance/opusOpenFinance/opusTPP/configuracao/relatoriosRegulatorios"
      lang: "en"
    - path: "/Documentation/es/openFinance/opusOpenFinance/opusTPP/configuracao/relatoriosRegulatorios"
      lang: "es"
---

## Objetivo

A Opus fornece um conjunto de scripts SQL para apoiar a coleta de dados necessária à entrega dos relatórios regulatórios exigidos pelo Open Finance Brasil:

- **Interoperabilidade — Fase 2** (consentimentos);
- **Semanal — Fase 3** (iniciação de pagamento);
- **Semestral** (volume agregado de chamadas).

> **OBS:** Cabe ao cliente executar os scripts e formatar as informações no padrão e período exigidos pelo OFB. Os scripts são apenas uma base de extração — ajustes podem ser necessários conforme alterações regulatórias.

## Relatório de Interoperabilidade — Fase 2

**Banco de execução:** OOD4TPP

| Função | Parâmetros | Propósito |
| :----: | :--------: | :-------: |
| `consent_receptor(dt_start, dt_end, organisation_id?)` | datas (`yyyy-MM-dd`), UUID opcional | Consentimentos receptados por organização |
| `consent_consume(dt_start, dt_end, brand?)` | datas + brand opcional | Consumo efetivo de consentimentos (consultas executadas) |
| `consent_stock(dt_end, organisation_id?)` | data de corte + UUID opcional | Estoque de consentimentos ativos |
| `consent_stock_clients(dt_end, organisation_id?)` | data de corte + UUID opcional | Estoque de clientes únicos com consentimento ativo |

Exemplo de uso:

```sql
SELECT * FROM consent_receptor('2024-01-01', '2024-06-30', NULL);
```

> **Boas práticas:** sempre execute primeiro o `CREATE OR REPLACE FUNCTION` (ou rode com `DROP FUNCTION IF EXISTS` antes) para garantir que sua versão local esteja sincronizada com a fornecida pela Opus.

## Relatório Semanal — Fase 3

**Banco de execução:** PCM

| Função | Parâmetros | Propósito |
| :----: | :--------: | :-------: |
| `payment_initiator(dt_start, dt_end, itp_id?)` | datas + UUID opcional | Iniciações de pagamento por ITP |

Exemplo:

```sql
SELECT * FROM payment_initiator('2024-01-01', '2024-01-07', NULL);
```

## Relatório Semestral

**Banco de execução:** PCM

São fornecidas queries inline (sem function) que agrupam chamadas por mês usando o timezone `America/Sao_Paulo`. Filtros padrão:

- `event_role = 'CLIENT'`
- Exclusão de `/register` e `/token`

### Quantidade de chamadas — Consentimento (Recepção)

```sql
@set initial_date = '<data_inicial> 00:00:00.000 -0300'
@set final_date = '<data_final> 23:59:59.999 -0300'

WITH result_tab AS (
  WITH endpoints_table AS (
    SELECT date_trunc('month', created_at, 'America/Sao_Paulo') AS ano_mes,
           (event_data->>'endpoint')::text AS endpoint
    FROM public.report
    WHERE event_role = 'CLIENT'
      AND created_at BETWEEN :initial_date AND :final_date
      AND (event_data->>'endpoint')::text NOT IN ('/register', '/token')
  )
  SELECT TO_CHAR(ano_mes, 'yyyy-MM') AS ano_mes, COUNT(1) AS qtd_chamadas
  FROM endpoints_table
  WHERE endpoint LIKE '/open-banking/consents%'
  GROUP BY TO_CHAR(ano_mes, 'yyyy-MM')
  ORDER BY TO_CHAR(ano_mes, 'yyyy-MM')
)
SELECT * FROM result_tab;
```

### Quantidade de chamadas — Resources (Recepção)

Idem ao anterior, alterando o filtro:

```sql
  WHERE endpoint LIKE '/open-banking/resources%'
```

## Onde os scripts vivem

Os scripts originais ficam no repositório de documentação Bitbucket (pasta `ferramentas-auxiliares/relatorio-*`).

Recomenda-se versionar localmente cópias auditadas, mantendo `CREATE OR REPLACE FUNCTION` e `DROP FUNCTION IF EXISTS` para idempotência.

## Considerações operacionais

- **Janela de execução:** os relatórios costumam ser executados fora do horário de pico, em réplicas de leitura quando possível.
- **Volume:** para instituições grandes, as queries podem demorar minutos — recomenda-se aumentar `statement_timeout` no PostgreSQL durante a execução.
- **Idempotência:** todas as functions usam `CREATE OR REPLACE`, então podem ser reaplicadas sem efeitos colaterais.
