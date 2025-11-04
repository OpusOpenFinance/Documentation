---
layout: default
title: "Deploy de la Plataforma"
parent: "Implementación de la Plataforma"
nav_order: 1
lang: "es"
alternate_lang:
   - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Implantação/OOF-Deploy/"
     lang: "en"
   - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Implantação/OOF-Deploy/"
     lang: "pt-br"
---

## Infraestructura de la Plataforma Opus Open Finance

La **Plataforma Opus Open Finance** fue diseñada para ofrecer resiliencia, escalabilidad y seguridad. Para lograr estas características, se basa en componentes de infraestructura de software adecuados para la ejecución en un entorno de *cloud computing*. A continuación, presentamos estos componentes y la configuración necesaria para la ejecución adecuada de la plataforma.

---

## Diagrama de la Arquitectura de la Plataforma Opus Open Finance

![Arquitectura](./images/Arquitetura.png)

---

## Requisitos

Para usar la Plataforma Opus Open Finance, se deben cumplir los siguientes requisitos:

1. **Cluster Kubernetes**:
   - Configurado con una Storage Class para discos usados por componentes que persisten datos;
   - Soporte para versiones de Kubernetes hasta **1.30**.

2. **Base de Datos PostgreSQL**:
   - Versiones recomendadas: >= 14.

3. **Herramientas en la Máquina de Acceso**:
   - **Kubectl** (Instrucciones de instalación disponibles en la [documentación de Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/));
   - **Terraform** v1.8.x (Instrucciones de instalación disponibles en la [documentación de Terraform](https://developer.hashicorp.com/terraform/install#linux));
   - **Terragrunt** v.0.43.x (Instrucciones de instalación disponibles en la [documentación de Terragrunt](https://terragrunt.gruntwork.io/docs/getting-started/install/));
   - **Age** v1.x.x (Instrucciones de instalación disponibles en la [Documentación de Age](https://github.com/FiloSottile/age?tab=readme-ov-file#installation));
   - **Sops** v3.x.x (Instrucciones de instalación disponibles en la [Documentación de Sops](https://github.com/getsops/sops?tab=readme-ov-file#1download)).

4. **Servicio de Mensajería**:
   - Necesario para la comunicación entre servicios distribuidos.

5. **Colección de Logs**:
   - Para el almacenamiento de logs generados por el producto.

6. **Acceso a Internet**:
   - Requisito regulatorio.

---

## Sobre Terragrunt

Toda la infraestructura de la plataforma Opus Open Finance está construida usando scripts Terraform. Para facilitar la gestión de la infraestructura como código, utilizamos **Terragrunt**, una herramienta que proporciona una capa de abstracción para simplificar tareas comunes de Terraform, como la gestión de configuraciones, dependencias y entornos. Esto hace que el proceso de implementación y mantenimiento sea más sencillo para los usuarios.

Algunas características principales de Terragrunt incluyen su **modelo jerárquico**, donde las configuraciones se heredan de archivos "padre" usando el bloque `include`. Para entender mejor esta funcionalidad, se recomienda leer [este artículo proporcionado por el equipo de Terragrunt](https://terragrunt.gruntwork.io/docs/features/keep-your-terragrunt-architecture-dry/).

La estructura está dividida en dos componentes principales: **Core** y **Client**, descritos en detalle en la sección **Jerarquía**.

---

## Compatibilidad con Microservicios y Contenedores

Nuestros microservicios se empaquetan y ejecutan en contenedores, garantizando portabilidad y consistencia entre los entornos. La infraestructura soporta múltiples plataformas de orquestación basadas en Kubernetes y es compatible con versiones de Kubernetes hasta **1.30**, permitiendo flexibilidad para entornos on-premise o en la nube.

---

## Jerarquía

La jerarquía del código es esencial para garantizar modularidad y reutilización. Terragrunt permite la separación en dos partes: **Core** y **Client**:

### Core

- **Módulos Terraform**: Contienen el código Terraform para los componentes;
- **Templates Terragrunt**: Archivos Terragrunt usados como "plantillas". Estos definen gran parte de la "inteligencia" del código, incluyendo variables predeterminadas para cada contexto y la lógica de dependencia entre componentes. Siempre que quiera entender cómo una variable está configurada, este es el primer lugar a verificar;
- **Scripts**: Scripts auxiliares, como los que manejan la lógica de encriptar y desencriptar los archivos `secrets.tfvars.encrypted`;
- **secrets.hcl**: Contiene los hooks para desencriptar los archivos `secrets.tfvars.encrypted` durante el tiempo de ejecución;
- **opus.hcl**: Contiene configuraciones específicas de Opus usadas por determinados componentes, como la dirección del repositorio de imágenes del producto.

### Client

- **client.hcl**: Configuraciones globales para todos los entornos, como información de la organización y marca;
- **env.hcl**: Configuraciones específicas del entorno, definiendo versiones a usarse (tanto para aplicaciones como para el core), información del directorio de participantes de Open Banking, direcciones de base de datos, modificaciones de URL, entre otros;
- **namespace.hcl**: Configuraciones específicas del namespace en el cluster Kubernetes;
- **Componente**: Un "componente" es cualquier directorio que contenga un archivo `terragrunt.hcl`. Aquí es donde debe ejecutarse la utilidad de Terragrunt, ya que sus includes aplican toda la jerarquía.

---

## Descarga Automática del Core

Antes de ejecutar cada componente, se ejecuta el script `opus_get_core.sh`. Este script es responsable de clonar automáticamente el repositorio Core si aún no existe.

El script determina la versión del Core a utilizar haciendo referencia al archivo `env.hcl` apropiado. Para identificar correctamente el entorno, el nombre del directorio del entorno debe coincidir con la expresión regular `env_path` especificada en el script.

Para bases de código de ejemplo (donde la versión del Core se define como `example`), el Core no se clona. En su lugar, se utiliza una referencia al repositorio local.

---

## Secrets

Todas las configuraciones sensibles se almacenan en un archivo encriptado llamado `secrets.encrypted.tfvars`. Este archivo se desencripta y se lee por Terragrunt durante el tiempo de ejecución. Permite definir variables, así como valores de Helm, usando la variable `values_sensitive_custom`, que funciona igual que la variable `values_custom` explicada anteriormente.

### Editando el Archivo Encriptado

El archivo encriptado solo puede ser editado utilizando **sops**. Antes de editar, la clave privada del cluster debe guardarse localmente ejecutando el siguiente comando:

```shell
export SOPS_AGE_KEY_FILE="$HOME/.config/sops/age/keys.txt" && \
$$(find $$(git rev-parse --show-toplevel) -name 'save_keys.sh' | head -n1)
```

sops `secrets.encrypted.tfvars`: Cuando el archivo se guarda, **sops** lo vuelve a encriptar automáticamente.

---

## Rotación de Claves de Encriptación

**ATENCIÓN**: Los siguientes pasos solo rotan el par de claves utilizado para encriptar los archivos `secrets.encrypted.tfvars`. No alteran el contenido de estos archivos (por ejemplo, las claves de acceso a la base de datos permanecen inalteradas).

**ATENCIÓN**: Es fundamental que la máquina que realiza esta rotación tenga acceso al repositorio Git donde se almacena el código del Cliente. Esto porque todos los archivos deben ser reencriptados y garantizados de guardarse en el repositorio durante este proceso.

### Pasos

1. **Eliminar el archivo local que contiene las claves:**

   ```shell
   rm $HOME/.config/sops/age/keys.txt
   ```

2. Aplicar el código para rotar las claves (genera un nuevo par y re-encripta todos los archivos):

   ```shell
   terragrunt apply -auto-approve \
   --terragrunt-working-dir '06-helm/00-oob-encrypt/01-secret-keys' \
   --terragrunt-config '06-helm/00-oob-encrypt/01-secret-keys/terragrunt.rotate_keys.hcl'
   ```

3. Actualizar los archivos encriptados en el repositorio remoto:

   ```shell
   git add '*secret.encrypted.tfvars' && git commit -m "Encryption keys rotation" && git push
   ```

4. **Hacer backup de las nuevas claves (guardarlas remotamente en un lugar seguro):**

   ```shell
   $(find $(git rev-parse --show-toplevel) -name 'get_keys.sh' | head -n1)
   ```

>**Consejo**: El script `get_keys.sh` devuelve un JSON, lo cual simplifica la automatización del paso 4.

## Base de Datos: PostgreSQL

Utilizamos PostgreSQL como base de datos predeterminada, recomendando la versión 14 o superior. Esta base es ideal para el ecosistema Open Finance debido a su robustez y escalabilidad. Si se utiliza un proveedor de nube, recomendamos aprovechar un servicio de base de datos gestionado.

Nuestras plantillas incluyen scripts para la creación de instancias, usuarios y bases de datos, que pueden personalizarse según sea necesario. Para acceder a la base de datos, la configuración de secretos debe actualizarse en el archivo `secrets.encrypted.tfvars`.

---

## Servicio de Mensajería

Para asegurar la comunicación entre nuestros servicios distribuidos, utilizamos colas de mensajes como parte esencial de la infraestructura. Estas colas permiten procesamiento asíncrono y desacoplamiento entre microservicios, aumentando la escalabilidad y resiliencia del sistema. Tecnologías como Apache Kafka, RabbitMQ o AWS SQS pueden ser utilizadas, dependiendo del entorno y requisitos del cliente.

---

## Colección de Logs

Cualquier solución de colección de logs disponible en el mercado puede utilizarse en el entorno de infraestructura, siempre que sea compatible con las tecnologías empleadas. Esto incluye, pero no se limita a, soluciones como ELK Stack (Elasticsearch, Logstash, Kibana), Fluentd, Prometheus, Grafana Loki, Splunk, entre otras.

La herramienta ideal debe ser elegida con base en las necesidades específicas del cliente respecto al monitoreo, análisis de rendimiento y seguimiento de eventos. Los colectores de logs deben configurarse para asegurar una captura eficiente de datos y mantener la integridad de la información a lo largo del tiempo. OPUS proporciona directrices para la integración de estos sistemas, pero la responsabilidad de la gestión y mantenimiento de los logs recae en el cliente.

---

## WAF (Web Application Firewall)

El Web Application Firewall (WAF) es una capa crítica de seguridad para proteger aplicaciones web contra ataques y vulnerabilidades comunes, como inyección de SQL, cross-site scripting (XSS) y otras amenazas.

Recomendamos que los clientes configuren el WAF de acuerdo con las mejores prácticas de seguridad para asegurar una integración eficaz con el entorno de producción. El Open Finance, que implica el intercambio seguro de datos financieros entre instituciones, exige altos estándares de seguridad, incluyendo el uso de mTLS, una práctica que el WAF debe soportar. OPUS ofrece directrices para cualquier duda, pero la gestión continua, implementación, configuración y mantenimiento del WAF son responsabilidad del cliente.

---

## Dapr

La arquitectura de microservicios se complementa con el uso de **Dapr** (Distributed Application Runtime), que simplifica la comunicación y la gestión de estado entre servicios. Con Dapr, garantizamos la interoperabilidad de nuestras aplicaciones distribuidas de manera eficiente y segura.

---

## Personalizaciones

La instalación de los componentes de Opus Open Banking se realiza a través de **Helm**. Los valores de Helm para cada componente pueden personalizarse usando la variable `values_custom` del lado del Cliente.

Esta variable es análoga a la variable `values_template` en la plantilla. Si tiene dudas, se recomienda consultar el template. Esencialmente, se trata de un YAML indentado en formato heredoc, interpretado por el módulo Terraform como un archivo YAML.

### Nota Importante

Es crucial no definir la variable `values_template` dentro del componente (en el campo inputs del archivo `terragrunt.hcl`). Esta variable es exclusivamente para uso en el template. Definirla a nivel del componente sobrescribirá el template y causará mal funcionamiento en el código. Siempre use la variable `values_custom` en su lugar.

### Ejemplo

```shell
# terragrunt.hcl
inputs = {
  values_custom = <<-YAML
  # The dash before YAML indicates this is an indented heredoc
  #---------------#
  # VALUES CUSTOM #
  #---------------#

  # Here is a normal YAML code, as it would appear in a .yaml file
  # The advantage is that ${} interpolations can be used to call Terragrunt functions/configurations

  foo:
    bar:
      demo: "somestring"
      test:
        user: "usuario-${local.client_vars.client}-${local.env_vars.environment}"
  YAML
}
```

---

## Ejecución

Para simplificar la ejecución de los componentes, proporcionamos el script `apply-all.sh`, que aplica todas las configuraciones necesarias en el orden correcto. Es esencial seguir las instrucciones del script para evitar errores de configuración.

---

## Notas Importantes

Algunas consideraciones importantes al trabajar con un entorno de staging/producción:

### Base de Datos

- La aplicación requiere el uso del componente **PostgreSQL**, pero se recomienda crear una base de datos separada del cluster. Si se utiliza un proveedor de nube, aconsejamos optar por un servicio de base de datos gestionado. La plantilla para este componente incluye las consultas necesarias para crear las bases de datos y los usuarios requeridos por el producto;
- Tras la creación de la instancia, el host debe configurarse en el campo `db_host` del archivo `env.hcl`. Además, los archivos `secrets.encrypted.tfvars` de los componentes que se conectan a la base de datos deben actualizarse con la contraseña del usuario correspondiente;
- Como ejemplo, en el archivo `secrets.encrypted.tfvars` del componente **oob-consent**, debe reemplazar `changeThis` por la contraseña del usuario **oob_consent_user**, y así sucesivamente.

### Componente Cert-manager

- Útil en entornos de staging para generar automáticamente certificados Let's Encrypt;
- En producción, no es necesario, ya que todos los certificados de producción deben obtenerse de una autoridad certificadora de acuerdo con las especificaciones regulatorias del ecosistema.
