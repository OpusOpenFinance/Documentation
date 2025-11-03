---
layout: default
title: "Onboarding ITP"
parent: "ITP"
nav_order: 1
lang: "es"
alternate_lang:
  - path: "/Documentation/pt-br/Open-Finance/Open-Finance-Brasil/PerfisOFB/OnboardingITP/"
    lang: "pt-br"
  - path: "/Documentation/en/Open-Finance/Open-Finance-Brasil/PerfisOFB/OnboardingITP/"
    lang: "en"
---

## Onboarding de un ITP

Para convertirse en una institución apta para realizar **Iniciaciones de Transacción de Pago (ITP)**, es necesario cumplir una serie de pre-requisitos y requisitos organizados en 3 macro-etapas:

1. **Autorización y regulación con el Banco Central**;
2. **Etapa pre-homologatoria de Open Finance**;
3. **Etapa homologatoria de Open Finance**.

Al concluir estas etapas, la institución estará apta para realizar pagos en producción.

---

### Visión General para convertirse en un ITP

| **Etapa**                     | **Descripción**                                                                                     | **Sistemas Involucrados**            | **Observaciones**                                                                                                                                                                |
|-------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **1 - Autorización y Regulación** | Compliance y jurídico                                                                            | Banco Central                      | La institución debe estar autorizada a funcionar por el Banco Central como Institución de Pago.                                                                              |
| **2 - Pre-homologatoria**      | Cumplir pre-requisitos relacionados al Pix y al Open Finance.                                    | Pix y Open Finance                 | Incluye certificaciones, publicaciones en el Portal del Ciudadano y en el PDF de participantes Pix.                                                                                       |
| **3 - Homologatoria**          | Proceso de onboarding en Open Finance para validación final.                                     | Open Finance                       | Realización de pruebas en producción y aprobación mínima exigida para operar en el ecosistema.                                                                                   |

![Etapas para convertirse en ITP](./images/etapas.png)

---

### Detalle de las Etapas

#### **Etapa 1 - Autorización y Regulación**

El propósito de esta documentación no es entrar en el detalle de cómo obtener una autorización del Banco Central, la cual contiene una complejidad extremadamente alta. De esta forma, nos enfocaremos en reglas de negocio para esta etapa. Si usted o su institución tiene interés en convertirse en una autorizada, podemos indicar socios especialistas más enfocados en la realidad jurídica para lograr este objetivo.

Actualmente, el Banco Central incluyó como Institución de Pago una modalidad más, el Iniciador de Transacción de Pago (ITP). Como su propio nombre ya indica, es una modalidad 100% vinculada al Open Finance. En esta perspectiva, se puede entender que dentro de este ecosistema existen dos tipos diferentes de ITPs, los que están autorizados por el Banco Central y los ITPs que ya tienen autorización de la gobernanza de Open Finance para iniciar sus actividades de iniciación de pago.

> Un ITP autorizado para funcionar por el Banco Central aún no puede iniciar llamadas de iniciación de pago, es necesario aún tener éxito en las etapas 2 y 3 en la secuencia.

En general, la autorización del ITP está enfocada para instituciones que buscan una regulación más simplificada, sin embargo, otros tipos de instituciones que ya están autorizadas tienen más facilidad al momento de convertirse en un ITP.

> Para el proceso de autorización, es fundamental que su área de compliance esté involucrada.

#### **Etapa 2 - Pre-homologatoria**

##### Pre-requisitos

Una vez que la institución ya está autorizada para funcionar como ITP, es necesario cumplir con los pre-requisitos que anteceden la etapa homologatoria del ITP en Open Finance. Los pre-requisitos se dividen en 4:

1. [**Certificación OpenID RP**](../OFB-Certificações.html):
   - Debe estar publicada en el [sitio oficial de OpenID](https://openid.net/certification/#FAPI_RPs).
   - Opus puede ayudar a completar el proceso en pocas semanas.

2. **Publicación en el Portal del Ciudadano**:
   El Portal del Ciudadano presenta todas las instituciones habilitadas en la modalidad de participación de Open Finance. Para poder iniciar el proceso de homologación, es necesario estar listado dentro de este portal en la modalidad institución prestadora de servicio de iniciación de pago.
   Para que la institución sea publicada, es necesario que toda la configuración en el directorio de participantes (en los ambientes de homologación y de producción) esté hecha. Así, automáticamente, la institución será listada en esta categoría.

   > En la implementación del producto, Opus conduce todo el proceso de configuración del directorio, para que usted no se preocupe.

3. **Certificación y publicación de APIs Payment** (si la institución también es Titular de Cuenta):
    Para el caso de que la institución sea participante de Open Finance como Titular de Cuenta también, es necesario estar de acuerdo con toda la regulación de este perfil antes incluso de poder comenzar la homologación como ITP. El perfil de Titular de Cuenta exige la publicación de la [certificación OpenID OP](../OFB-Certificações.html) y que sus APIs estén debidamente publicadas.

4. **Publicación en el PDF de participantes del Pix**:
    Se puede decir que este pre-requisito es el camino crítico, pues es el más largo y está vinculado al arreglo Pix. [El PDF del Pix](https://www.bcb.gov.br/estabilidadefinanceira/participantespix) (acceso a la derecha) es una lista con todas las instituciones participantes del Pix y, para ser homologado como ITP, es necesario que su institución esté presente en ella listada en la columna Iniciación de Transacción de Pago.
    Para hacerlo, su institución necesita demostrar interés para el Banco Central, mediante un formulario de adhesión al Pix. [El proceso está descrito en la página oficial del Banco Central](https://www.bcb.gov.br/estabilidadefinanceira/participantespix). La tabla sintetiza los principales formularios.
    El proceso se divide en tres etapas para registro dentro del arreglo Pix:

##### **Etapa 1 _PIX_- Cadastral**

Consiste en el envío de documentos necesarios para registrar la institución en el arreglo Pix:

| **Modalidad de la Institución**        | **Formulario 1** | **Formulario 2** | **Formulario 3** |
|----------------------------------------|------------------|------------------|------------------|
| **Iniciador sin acceso al DICT**       | [#1](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Formulario_adesao-Iniciadores.docx)               | [#2](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Formulario_produtos_e_servicos-Iniciador.docx)              | [#3](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Adesao_Questionarios/Questionario_autoavaliacao_seguranca-Iniciador-Sem_acesso_DICT.docx)               |
| **Iniciador con acceso indirecto al DICT** | [#1](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Formulario_adesao-Iniciadores.docx)               | [#2](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Formulario_produtos_e_servicos-Iniciador.docx)               | [#3](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Adesao_Questionarios/Questionario_autoavaliacao_seguranca-Iniciador-Com_Acesso_indireto_DICT.docx)               |
| **Iniciador con acceso directo al DICT**  | [#1](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Formulario_adesao-Iniciadores.docx)               | [#2](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Formulario_produtos_e_servicos-Iniciador.docx)               | [#3](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Adesao_Questionarios/Questionario_autoavaliacao_seguranca-Iniciador-Com_Acesso_direto_DICT.docx)               |

- **Envío:** Los formularios deben ser enviados a **<pix-operacional@bcb.gov.br>**.
- **Firma:** Es necesario que los documentos sean firmados por un estatutario de la institución.

---

##### **Etapa 2 _PIX_- Homologatoria**

Es la etapa referente a las pruebas que deben ser ejecutadas para ser incluido como participante Pix. Esta etapa posee varias pruebas, sin embargo, es necesario hacer solo aquellas que son dirigidas para el Iniciador de Transacción de Pagos, caso las demás sean facultativas para la institución.

![Pruebas Pix](./images/etapas_pix.png)

La prueba obligatoria es solo la Validación de la prestación de servicio de iniciación de pago. Además, existen otros dos, caso su institución ofrezca QR Code o tenga acceso al DICT, las pruebas son Validación de QR Codes y Pruebas DICT, respectivamente.

##### **Etapa 3 _PIX_- Etapa de operación restringida**

Para Iniciador, no hay necesidad de operación restringida. Una vez que la etapa cadastral y homologatoria sean concluidas, su institución ya será listada en la lista de participantes pix.

---

#### **Etapa 3 - Onboarding ITP**

Por fin, se llega a la parte 100% relacionada al ecosistema de Open Finance, conocido por Onboarding ITP. Esta etapa está muy bien descrita dentro del portal del desarrollador con el [guía de onboarding ITP](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/17378706/Guia+de+Onboarding+ITP).

En resumen, la nueva Iniciadora tendrá que realizar 6 pagos en producción y obtener 4 éxitos dentro de esos 6. Esto es suficiente para que la institución esté apta para iniciar su operación en producción. De las 6 pruebas, su institución puede elegir quién serán las 6 Titulares de Cuenta para hacer los pagos.

> Opus puede recomendar las 6 Titulares de Cuenta.

Al final del proceso, será divulgado en un [Informa](https://mailchi.mp/afc5cfe5cc93/open-banking-informa-10116651?e=447d7abb9f) que el proceso fue concluido y que su institución está apta para comenzar pagos en producción.

> Durante toda la etapa 3, Opus estará hombro a hombro con su institución para facilitar y conferir celeridad al proceso homologatorio.

Opus estará al lado de la institución durante toda la etapa homologatoria, agilizando el proceso y ofreciendo soporte técnico.

---

### Acceso al DICT

El acceso al DICT no es obligatorio, pero limita los tipos de iniciación de pago permitidos. Sin el acceso, solo el **Pix Manu** es viable, en el cual la institución ya posee la información de cuenta y agencia del titular.

#### **Tipos de Iniciación de Pago Pix**

| **Tipo**       | **Descripción**                                                                 | **¿Necesario Acceso al DICT?** |
|----------------|:-------------------------------------------------------------------------------:|:--------------------------------:|
| **Manu**       | Inserción manual de datos de la cuenta transaccional.                              | No                            |
| **DICT**       | Inserción manual de clave Pix.                                                | Sí                            |
| **QRDN**       | QR Code dinámico.                                                            | Sí                            |
| **QRES**       | QR Code estático.                                                            | Sí                            |
| **INIC**       | Beneficiario previamente conocido por el Iniciador.                           | No                            |

Si su institución desea tener acceso al DICT, Opus puede indicar proveedores que ofrecen el servicio **DICT-as-a-Service**.
