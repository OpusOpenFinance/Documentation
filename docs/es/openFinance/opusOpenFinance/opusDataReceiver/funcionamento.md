---
layout: default
title: Funcionamiento
parent: "Opus Data Receiver"
nav_order: 3
lang: "es"
alternate_lang:
    - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/funcionamento/"
      lang: "en"
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/funcionamento/"
      lang: "pt-br"
---

## Visión General

El Opus Data Receiver funciona mediante un ciclo que contiene tres componentes principales:

- Registro y creación del consentimiento;
- Recolección y actualización de las Entidades (Productos y Subproductos);
- Disponibilización de los datos mediante búsquedas y consultas.

## Flujo de Registro

Para que el ODR pueda acceder a los datos de un individuo o empresa en el Open Finance, es necesario que exista un consentimiento válido. El flujo de registro es precisamente el proceso de iniciar ese consentimiento y registrar toda la información necesaria para que el ODR pueda operar.

El flujo funciona de la siguiente manera:

1. **El cliente inicia el registro:** El cliente informa al ODR quién es el titular de los datos (persona física o jurídica) y qué información desea acceder (permisos). Este proceso sigue el estándar del Open Finance Brasil;
2. **El ODR crea el consentimiento:** Después de recibir la solicitud, el ODR envía la solicitud de consentimiento a la Institución Transmisora donde los datos están almacenados;
3. **El consentimiento entra en estado *Esperando Autorización*:** En este momento, el registro aún no está activo. El estado indica solamente que la solicitud fue creada con éxito, pero aún depende de la acción del usuario final;
4. **El usuario autoriza el consentimiento directamente en la institución financiera:** El titular de los datos (persona física o jurídica) accede al ambiente de la Institución Transmisora de Datos y autoriza el compartimiento;
5. **El ODR detecta automáticamente la autorización:** Tan pronto como el consentimiento es aprobado, el ODR actualiza el estado a *Autorizado*;
6. **Primera actualización automática de los datos:** Con el consentimiento autorizado, el ODR realiza la primera búsqueda completa de datos para todos los productos permitidos.

Cada Entidad pasa entonces a seguir el calendario de actualizaciones definido en la configuración de búsquedas periódicas automáticas.

### SetupID

Cuando el registro es concluido, el ODR genera un identificador llamado SetupID, que representa toda la información necesaria para el acceso a los datos de ese consentimiento.

El SetupID debe ser enviado en todas las llamadas posteriores, pues identifica:

- El cliente;
- El consentimiento;
- La Institución Transmisora de datos;
- El conjunto de permisos autorizadas.

## Flujo de Obtención de Productos

Con el consentimiento autorizado, el cliente puede consultar los Productos disponibles (Cuentas, Divisas, Inversiones, Operaciones de Crédito, etc.).

Para eso, basta con informar el SetupID, no siendo necesario repetir información del titular ni autorizaciones adicionales.

Si el consentimiento no incluye algún permiso necesario, la Institución Transmisora informará que el acceso no está permitido. En ese caso, los datos no pueden ser obtenidos hasta que un nuevo consentimiento sea creado con los permisos adecuados.

La respuesta del ODR incluye:

- La lista de Productos disponibles;
- Los identificadores de cada Producto;
- Información general como paginación y fecha de actualización.

Estos identificadores son importantes para las próximas etapas.

## Flujo de Obtención de Subproductos

Algunos recursos del Open Finance exigen que el cliente primero consulte el Producto correspondiente para descubrir los IDs necesarios.

Por ejemplo:

- Para acceder al saldo de una cuenta, es necesario primero consultar la lista de cuentas.
- Para consultar pagos de un contrato, es preciso primero obtener los IDs de los contratos.

El proceso sigue esta lógica:

1. El cliente consulta el Producto (como Cuentas);
2. El ODR retorna un conjunto de registros, cada uno con un identificador propio;
3. El cliente elige cuál registro desea detallar;
4. El cliente hace la consulta específica (como Saldo de la Cuenta), informando el ID del ítem seleccionado y el SetupID.

Este mecanismo garantiza seguridad y organización, además de evitar consultas innecesarias.

## Búsquedas

Siempre que el ODR necesita recolectar o retornar datos, realiza una búsqueda. Las búsquedas sirven a tres propósitos:

- Actualizar la base de datos;
- Responder solicitudes REST del cliente;
- Cumplir con la programación de las búsquedas periódicas automáticas.

El ODR opera dos tipos de búsqueda: **En Frío** y **En Caliente**.

### Búsqueda en Frío

Búsqueda en Frío significa buscar solo en los datos ya almacenados en el ODR. Existe para escenarios en los que el cliente solo desea recuperar los datos más recientes ya guardados, sin necesidad de actualizar nada. Es el modelo de búsquedas por defecto del producto.

Ventajas:

- No consume fichas regulatorias;
- No activa a las Instituciones Transmisoras de Datos;
- No activa límites operacionales;
- Es usada cuando **no** hay necesidad de datos nuevos (más allá de los que ya están contenidos en la base de datos);
- Es extremadamente rápida y segura, ya que consume solo los datos locales y no está sujeta al tiempo de respuesta de otras instituciones.

La Búsqueda en Frío es ideal cuando:

- Los datos fueron actualizados recientemente;
- La Transmisora alcanzó los límites operacionales;
- El recurso se volvió inválido (ej.: cuenta cerrada);
- El cliente quiere reducir tráfico y costos.

A pesar de ser simple, la búsqueda en frío es fundamental para mantener el ODR eficiente, reducir costos operacionales y preservar límites mensuales.

### Búsqueda en Caliente

La Búsqueda en Caliente consulta a las Instituciones Transmisoras de Datos en tiempo real. Esta búsqueda es síncrona, es decir, el ODR consulta a la Transmisora en el momento de la solicitud, procesa los resultados y luego devuelve la respuesta.

La búsqueda en caliente es poderosa porque garantiza que los datos retornados son los más actualizados posibles. Sin embargo, posee riesgos importantes.

#### Riesgos de la Búsqueda en Caliente

Cada consulta hecha en caliente consume fichas, que son limitadas por Recurso, Transmisora, Cliente final y Receptora.

Exceso de búsquedas en caliente puede resultar en:

- Agotamiento de las fichas;
- Bloqueo de actualizaciones;
- Retorno únicamente de datos en frío;
- Percepción incorrecta de error de consentimiento;
- Empeoramiento en la experiencia del usuario final.

Por eso, es importante calibrar bien los intervalos de las búsquedas periódicas automáticas y reservar fichas para operaciones críticas, dejando un margen para llamadas en caliente disparadas por los sistemas clientes.

### Cómo Evitar Consumo Excesivo de Fichas

El ODR recomienda:

- Aumentar los intervalos de actualización automática cuando no haya necesidad de sincronización continua;
- Reservar fichas mensuales para búsquedas en caliente, especialmente en recursos críticos para el negocio;
- Usar búsquedas en frío siempre que datos actualizados recientemente ya estén en la base;
- Configurar intervalos distintos por Entidad, priorizando solo los datos realmente sensibles al tiempo.

Con este equilibrio el cliente garantiza actualización regular, capacidad para llamadas de emergencia y pleno cumplimiento de las reglas operacionales del Open Finance.

### APIs de búsqueda

Las dos modalidades de búsqueda (en caliente y en frío) se realizan a través de llamadas REST al ODR. La diferenciación entre ellas ocurre exclusivamente vía un header enviado por el cliente en la solicitud.

El header utilizado para indicar el tipo de búsqueda es *x-update-data*, donde:

- *True*: Dispara una **Búsqueda en caliente**;
- *False*: Dispara una **Búsqueda en frío**.

Comportamiento por Defecto: En caso de que el header no sea enviado, la búsqueda es tratada como en frío por defecto, garantizando seguridad y evitando consumo accidental de fichas en la Transmisora.

Las siguientes APIs permiten búsquedas para los grupos de recursos:

- [Setup][API-Setup]
- [Cuenta Corriente][API-Cuenta-Corriente]
- [Tarjeta Credito][API-Tarjeta-Credito]
- [Datos Registrales][API-Datos-Registrales]
- Operaciones de crédito:
  - [Financiamientos][API-Financiamientos]
  - [Préstamos][API-Préstamos]
  - [Adelanto][API-Adelanto]
  - [Derechos Creditorios][API-Derechos-Creditorios]
- Inversiones:
  - [Renta Fija Bancaria][API-Renta-Fija-Bancaria]
  - [Renta Fija Credito][API-Renta-Fija-Credito]
  - [Renta Variable][API-Renta-Variable]
  - [Tesoro Directo][API-Tesoro-Directo]
  - [Fondos Inversion][API-Fondos-Inversion]
  - [Divisas][API-Divisas]

## Visión General del Flujo Operacional Completo

1. El cliente crea un consentimiento a través del ODR;
2. El usuario final autoriza el compartimiento en la Institución Transmisora;
3. El ODR identifica la autorización y recolecta los primeros datos;
4. El cliente consulta Productos y Subproductos usando el SetupID;
5. El ODR actualiza los datos automáticamente conforme a la configuración de intervalos;
6. Las búsquedas en frío y en caliente operan conforme a la necesidad, respetando límites regulatorios.

[API-Setup]: ../../../../swagger-ui/index.html?api=es-odr-setup
[API-Cuenta-Corriente]: ../../../../swagger-ui/index.html?api=es-odr-accounts
[API-Tarjeta-Credito]: ../../../../swagger-ui/index.html?api=es-odr-creditcard
[API-Datos-Registrales]: ../../../../swagger-ui/index.html?api=es-odr-customer
[API-Financiamientos]: ../../../../swagger-ui/index.html?api=es-odr-credit_financing
[API-Préstamos]: ../../../../swagger-ui/index.html?api=es-odr-credit_loans
[API-Adelanto]: ../../../../swagger-ui/index.html?api=es-odr-credit-invoice-financing
[API-Derechos-Creditorios]: ../../../../swagger-ui/index.html?api=es-odr-credit-unarranged-accounts
[API-Renta-Fija-Bancaria]: ../../../../swagger-ui/index.html?api=es-odr-investments_bank_fixed_income
[API-Renta-Fija-Credito]: ../../../../swagger-ui/index.html?api=es-odr-investments_credit_fixed_income
[API-Renta-Variable]: ../../../../swagger-ui/index.html?api=es-odr-investments_variable_incomes
[API-Tesoro-Directo]: ../../../../swagger-ui/index.html?api=es-odr-investments_treasure_titles
[API-Fondos-Inversion]: ../../../../swagger-ui/index.html?api=es-odr-investments_funds
[API-Divisas]: ../../../../swagger-ui/index.html?api=es-odr-exchanges
