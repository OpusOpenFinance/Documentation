---
layout: default
title: Jornada de Consentimiento
parent: "Open Finance Brasil"
nav_order: 3
lang: "es"
alternate_lang:
  - path: "/Documentation/pt-br/Open-Finance/openFinanceBrasil/jornadaConsentimento/index/"
    lang: "pt-br"
  - path: "/Documentation/en/Open-Finance/openFinanceBrasil/jornadaConsentimento/index/"
    lang: "en"
---

## Jornada de Consentimiento

En Open Finance, cualquier operación solo puede realizarse - ya sea el intercambio de datos o la realización de un pago - si hay un consentimiento aprobado por el usuario (cliente de una institución financiera) que inició la jornada. Por lo tanto, siempre es necesario realizar una *jornada de consentimiento* para que el usuario pueda autorizar la operación.

El **consentimiento** es el término utilizado para demostrar que el usuario cliente de la institución financiera está de acuerdo con la operación que el **Iniciador de Pago** o el **Receptor de Datos** está solicitando al **Titular de Cuenta**, o al **Transmisor de Datos**.

---

### Jornada de Consentimiento para Compartir Datos

![Jornada de datos](.//anexos/imagens/es-jornada-dados.png)  
Fuente: Banco Central

1. El usuario accede al entorno del **Receptor de Datos** y solicita el inicio de un nuevo intercambio vía Open Finance;
2. Tras realizar la solicitud y elegir al **Transmisor de Datos**, el usuario es redirigido automáticamente al entorno del Transmisor;
3. En el entorno del Transmisor, el usuario se autentica usando biometría o credenciales registradas para acceder a su cuenta;
4. Después del inicio de sesión, el usuario selecciona y confirma los datos que desea compartir;
5. Finalmente, el usuario es redirigido de vuelta al entorno del Receptor, donde recibe la confirmación del éxito del intercambio.

---

### Jornada de Consentimiento para Pagos

![Jornada de pagos](./anexos/imagens/es-jornada-pagamentos.png)
Fuente: Banco Central

1. El usuario accede al entorno del **Iniciador de Pago (ITP)** y solicita la iniciación de un nuevo pago vía Open Finance;
2. Tras realizar la solicitud y elegir al **Titular de Cuenta**, el usuario es redirigido automáticamente al entorno del Titular;
3. En el entorno del Titular, el usuario se autentica usando biometría o credenciales registradas para acceder a su cuenta;
4. Después del inicio de sesión, el usuario confirma el pago, verificando los datos de la transacción e ingresando sus credenciales;
5. El usuario es redirigido de vuelta al entorno del ITP, donde recibe la confirmación de que el pago se efectuó con éxito.

Para más detalles sobre los posibles estados del consentimiento y la máquina de estados del pago, consulte el [portal del desarrollador](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/347078805/M+quina+de+Estados+-+v4.0.0+-+SV+Pagamentos).

---

### Diferencias entre las Jornadas de Consentimiento

Aunque son similares, las jornadas poseen particularidades debido a sus diferentes finalidades:

| **Aspecto**              | **Datos**                                                                                     | **Pagos**                                                                        |
|-------------------------|----------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| **Tiempo del Consentimiento** | Definido por el usuario durante la jornada, variando de 1 a 12 meses o tiempo indefinido.    | Consentimiento utilizado una sola vez, consumido inmediatamente después del pago.|
| **Valor del Pago**      | No se aplica.                                                                              | Definido por el ITP y exhibido al usuario durante la confirmación del consentimiento.|
| **Variaciones en el Consentimiento** | Depende de la información de los productos que el usuario desea compartir ([vea los posibles productos aquí](../perfisParticipacao/transmissorDeDados.html)). | Depende del tipo de pago seleccionado [(consulte la hoja de ruta aquí)](../perfisParticipacao/detentorDeContas.html). |

Para más información sobre la jornada de experiencia del usuario definida por el regulador, [haga clic aquí](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/1477279745/v.19.00.01+Guia+de+Experi+ncia+do+Usu+rio+Open+Finance+Brasil).
