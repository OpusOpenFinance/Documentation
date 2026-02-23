---
layout: default
title: "Transmisor de Datos"
parent: "Perfiles de participación"
nav_order: 2
lang: "es"
alternate_lang:
  - path: "/Documentation/pt-br/Open-Finance/openFinanceBrasil/perfisParticipacao/transmissorDeDados/"
    lang: "pt-br"
  - path: "/Documentation/en/Open-Finance/openFinanceBrasil/perfisParticipacao/transmissorDeDados/"
    lang: "en"
---

## Transmisor de Datos

El perfil de **Transmisor de Datos** representa a la institución que recibe solicitudes de intercambio de datos de un **Receptor de Datos**. La **Plataforma Opus Open Finance** atiende a todas las exigencias regulatorias establecidas por el regulador del *Open Finance Brasil* para la implementación de este perfil.

---

### Ecosistema Open Finance Brasil - Transmisor de Datos

El perfil de *Transmisor de Datos* se refiere a las instituciones financieras que participan en el intercambio de datos en el *Open Finance Brasil*. Típicamente, es activado cuando los clientes de la institución otorgan consentimientos de intercambio de datos a otras instituciones que, en este contexto, son llamadas *instituciones receptoras de datos*.

Una vez que el cliente ha aceptado compartir sus datos con otras instituciones, estas pasan a tener el derecho de enviar periódicamente solicitudes de datos que pueden incluir datos de registro del cliente, transacciones de cuenta y de tarjetas de crédito, operaciones de crédito, cambio e inversiones (vea más adelante). El perfil de *Transmisor de Datos* es precisamente el responsable de recibir, validar y atender estas solicitudes.

> La norma regulatoria establece límites, llamados *límites operativos*, que establecen cuotas máximas de solicitudes que una institución receptora de datos puede enviar a una institución transmisora de datos. Los límites operativos actualmente vigentes en el *Open Finance Brasil* pueden ser encontrados [aquí][Limites-operacionales].

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
- Fondos de inversión;

**Nota:** Es responsabilidad del **Transmisor de Datos** proporcionar toda la información listada arriba que es ofrecida por la institución.

---

### Jornada de Consentimiento

El proceso de autorización para el intercambio de datos sigue una **jornada completa de consentimiento**. Para más información, haga clic [aquí][JornadaConsentimiento].

---

### Roadmap regulatorio

#### Funcionalidades ya disponibles

- Consulta de todos los datos listados arriba.

#### Funcionalidades previstas

- Sistemática de notificaciones: existe un deseo de aumentar la eficiencia del intercambio de datos. Actualmente, para saber si un cliente realizó nuevas transacciones en un determinado período, es necesario explícitamente realizar una llamada a la institución financiera transmisora de datos periódicamente. La sistemática de notificaciones deberá permitir al receptor de datos indicar al transmisor cuáles clientes - de los cuales ya posee consentimiento de intercambio de datos válidos - le gustaría monitorear. De esta forma, periódicamente - probablemente una vez por día - el transmisor podrá enviar directamente al receptor las eventuales transacciones o alteraciones de datos de registro realizadas por el cliente. Este mecanismo seguramente ahorrará innumerables llamadas innecesarias, reduciendo el costo para todos los participantes del ecosistema.

El [portal del desarrollador][Portal-Desarrollador] también ofrece un calendario con las próximas entregas.

### Plataforma Opus Open Finance

La **Plataforma Opus Open Finance** implementa todas las APIs regulatorias del perfil transmisor de datos. Para operativizar este perfil utilizando la plataforma, es necesario:

1. Completar todo el proceso de [implantación][Implantación].
2. Construir, para la aplicación móvil y Banca por Internet (si aplica), la experiencia de usuario referente a la concesión de consentimientos de intercambio de datos, conforme definido por el regulador del *Open Finance Brasil*. [El guía de experiencia del usuario][GuiaUX] da más detalles sobre el flujo de interacción con el usuario que debe ser implementado.
3. Construir la [capa de integración][Capa-Integración] con los sistemas de respaldo conforme los productos financieros ofrecidos por la institución a sus clientes.

[Limites-operacionales]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17924220/Limites+operacionais
[JornadaConsentimiento]: ../jornadaConsentimento/index.html
[Portal-Desarrollador]: https://openfinancebrasil.atlassian.net/wiki/spaces/DraftOF/calendars
[Implantación]: ../../Plataforma-OpusOpenFinance/Implantação/OOF-Implantação.html
[GuiaUX]: https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1477279745/v.19.00.01+Guia+de+Experi+ncia+do+Usu+rio+Open+Finance+Brasil
[Capa-Integración]: ../../Plataforma-OpusOpenFinance/Integração/index.html
