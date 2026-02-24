---
layout: default
title: "Datos abiertos"
parent: "Perfiles de participación"
nav_order: 1
lang: "es"
alternate_lang:
  - path: "/Documentation/pt-br/Open-Finance/openFinanceBrasil/perfisParticipacao/dadosAbertos/"
    lang: "pt-br"
  - path: "/Documentation/en/Open-Finance/openFinanceBrasil/perfisParticipacao/dadosAbertos/"
    lang: "en"
---

## Datos abiertos

El frente de datos abiertos de Open Finance se refiere a la [fase 1 de Open Finance](../ecossistema/index.html). La Fase 1 permite que las instituciones participantes de Open Finance publiquen sus datos de forma pública y accesible mediante API, para que cualquier solicitud pueda recuperar esta información. Los datos se refieren a información no sensible de las propias instituciones.

### Datos listados

#### Canales de atención

- Dependencias propias, incluyendo la lista de sucursales bancarias mantenidas por la institución;
- Canales de atención electrónica;
- Canales de atención telefónica;
- Corresponsales bancarios de la institución;
- Terminales de autoservicio (propios y compartidos).

#### Productos

- Cuentas;
- Préstamos;
- Financiaciones;
- Anticipación de recibibles;
- Tarjeta de crédito;
- Adelanto a depositantes;
- Inversiones;
- Cambio;
- Acreditación;
- Títulos de capitalización;
- Seguros;
- Previsión.

> - En el caso de los productos financieros, todos deben estar separados entre personas naturales y jurídicas.  
> - Todos los valores monetarios o de tasas representados dentro de las estructuras abajo están separados en diferentes franjas. En total, son 4 franjas de igual proporción que dividen el intervalo del menor hasta el mayor valor. Hay un valor correspondiente para cada franja, el cual es el valor de la mediana de cada una de estas franjas. Acompañando a cada franja, está el porcentaje de clientes en cada una de estas franjas (para el servicio x, 10% de los clientes de ese servicio están en la franja 1, 15% en la franja 2, 20% en la franja 3 y 55% en la franja 4).

### Criterio de obligatoriedad

El perfil de datos abiertos es obligatorio para todas las instituciones que son participantes (obligatorios o voluntarios) del perfil de datos transaccionales (fase 2).

### Plataforma Opus Open Finance

La **Plataforma Opus Open Finance** implementa la API de datos abiertos y sólo se necesita una integración (muy simple) para que la fase 1 esté operativa, además de las siguientes etapas:

1. Haber concluido la [implantación del producto][Implantación].

2. Realizar la integración concomitante a la integración del Transmisor de Datos. (lo ideal es que ambos perfiles entren en producción al mismo tiempo)

> La integración se realiza mediante una estructura en formato JSON generada dinámica o estáticamente para reportar los datos al ecosistema de *Open Finance Brasil*.

[Implantación]: ../../Plataforma-OpusOpenFinance/Implantação/OOF-Implantação.html
