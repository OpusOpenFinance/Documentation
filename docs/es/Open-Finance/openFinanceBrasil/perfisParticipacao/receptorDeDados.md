---
layout: default
title: "Receptor de Datos"
parent: "Perfiles de participación"
nav_order: 4
lang: "es"
alternate_lang:
  - path: "/Documentation/pt-br/Open-Finance/openFinanceBrasil/perfisParticipacao/receptorDeDados/"
    lang: "pt-br"
  - path: "/Documentation/en/Open-Finance/openFinanceBrasil/perfisParticipacao/receptorDeDados/"
    lang: "en"
---

## Receptor de Datos

El Receptor de Datos corresponde a un perfil de Open Finance que tiene autoridad para solicitar datos de otras instituciones que son Transmisoras de Datos. Según la regulación de Open Finance, existen diversos productos listados por las Transmisoras que pueden ser recolectados por el Receptor.

---

### Datos Compartidos

Cuando ocurre un intercambio, el ecosistema está preparado para proporcionar la siguiente información:

#### **Datos de registro del titular de la cuenta**

- Datos de registro.

#### **Cuenta Corriente**

- Extracto;
- Saldo.

#### **Tarjeta de crédito**

- Factura;
- Límites;
- Transacciones.

#### **Operaciones de crédito**

- Préstamos;
- Financiaciones;
- Adelanto a depositantes (descubierto);
- Derechos crediticios descontados (anticipación de recibibles).

#### **Cambio**

- Operaciones de cambio.

#### **Inversiones**

- Renta fija bancaria (CDB, LCI, LCA - protegidos por el FGC);
- Renta fija crédito (CRI, CRA, Debenture);
- Renta variable;
- Títulos del tesoro directo;
- Fondos de inversión.

> Las Transmisoras solo ponen a disposición los productos que ofrecen a sus clientes.

---

### Jornada de Consentimiento

El proceso de autorización para el intercambio de datos sigue una **jornada completa de consentimiento**. Para más información, haga clic [aquí](../jornadaConsentimento/index.html).

> Además, el [diagrama de secuencia][DiagramaSecuencia] ilustra el flujo de consentimiento de acuerdo con cada [API ofrecida por el módulo de recepción][API-Recepción].

---

### Certificación obligatoria

Para que una institución se convierta en Receptor de Datos, es necesario pasar por las pruebas de la certificación OpenID RP - *Relying parties*. Más detalles sobre la certificación pueden ser encontrados [aquí](../certificacoesECertificados.html).

---

### Utilización

Para iniciar el uso del software, existen algunos pre-requisitos:

1. Completar el proceso de [setup (implantación)](../../Plataforma-OpusOpenFinance/Implantação/OOF-Implantação.html).

2. Haber completado todas las homologaciones del perfil de Transmisor de Datos.

3. Crear la experiencia de usuario para que la jornada de consentimiento sea posible para los clientes. La Guía de experiencia del usuario ofrece más detalles sobre esta jornada.

> - Para Recepción, no hay necesidad de construir la capa de integración.  
> - La API del módulo de recepción de datos puede ser [encontrada aquí][API-Recepción].
> - Para evaluar la guía de experiencia del usuario, [haga clic aquí][GuiaUX].

[DiagramaSecuencia]: ./anexos/imagens/es-itp-consentSequence.png
[GuiaUX]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1477279745/v.19.00.01+Guia+de+Experi+ncia+do+Usu+rio+Open+Finance+Brasil
[API-Recepción]: ../../../../swagger-ui/index.html?api=es-oas-receptor
