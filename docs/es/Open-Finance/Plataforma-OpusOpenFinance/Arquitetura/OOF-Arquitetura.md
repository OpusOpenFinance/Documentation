---
layout: default
title: Arquitectura de la Plataforma
parent: "Opus Open Finance"
nav_order: 1
lang: "es"
alternate_lang:
  - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Arquitetura/OOF-Arquitetura/"
    lang: "pt-br"
  - path: "/Documentation/en/Open-Finance/Plataforma-OpusOpenFinance/Arquitetura/OOF-Arquitetura/"
    lang: "en"
---

## Visión General de la Arquitectura

La arquitectura de la solución está basada en **microservicios**, diseñada para soportar escalabilidad horizontal automática, e implementada en contenedores (**Docker**) ejecutándose en un entorno de ejecución clusterizado Kubernetes.

La plataforma se ofrece en tres modalidades:

- En la nube del cliente, con entorno administrado por el equipo del cliente;
- En la nube del cliente, como una subcuenta, con el entorno siendo administrado por el equipo de Opus Software;
- En el modelo de Software as a Service (SaaS).

La solución ha sido utilizada con éxito por los clientes en los siguientes entornos:

- **Entornos Kubernetes como servicios gestionados**:
  - Google GKE;
  - AWS AKS;
  - Azure EKS.
- **Clusters Kubernetes on-premise gestionados manualmente**.

---

![Arquitectura general](./images/visão_geral.png)

## Componentes y Herramientas

Para su ejecución, la plataforma necesita los siguientes componentes:

- Base de datos *PostgreSQL* (típicamente utilizada como servicio gestionado);
- Cola de mensajes:
  - Diferentes mecanismos de cola han sido usados por nuestros clientes, incluyendo SQS/SNS, GCP Pub/Sub y Kafka;
  - La plataforma utiliza un componente de abstracción que soporta los principales mecanismos de colas de mensajes del mercado.
- Sistema gestor de logs distribuidos:
  - La solución estándar empaquetada con la plataforma es *Grafana Loki*, pero otras soluciones han sido usadas por nuestros clientes como *Datadog* y *Elastic Stack*;

  La plataforma además incluye un API Gateway empaquetado con el producto, que puede funcionar detrás del producto estándar utilizado por el cliente, si es el caso.

  La solución también requiere un *Web Application Firewall* (*WAF*) proporcionado por el cliente, y debe soportar el protocolo *Mutual TLS* (*mTLS*).

  Finalmente, en entornos gestionados por el equipo de Opus, utilizamos la combinación *Prometheus/Grafana* para visibilidad y monitoreo de la solución en ejecución. Otras soluciones como *Dynatrace* han sido utilizadas con éxito por nuestros clientes.

---

## Escalabilidad horizontal

La arquitectura basada en microservicios adoptada por la solución, ejecutando en contenedores gestionados por Kubernetes, es ideal para manejar la demanda variable del ecosistema de Open Finance Brasil, pues permite escalabilidad horizontal de manera eficiente. Cada microservicio puede ser dimensionado independientemente, garantizando que solo los componentes necesarios reciban más recursos en momentos de alta demanda. Kubernetes facilita este proceso al monitorear automáticamente el uso de recursos y escalar instancias de ejecución según sea necesario, manteniendo la disponibilidad y el rendimiento del sistema sin desperdicio de recursos.

![Arquitectura orientada a la escalabilidad](./images/arquitetura_pods.png)

## Infraestructura y configuración

- **Configuración de Autoscaling**:
  - Todos los módulos del sistema soportan autoscaling, permitiendo a Kubernetes ajustar el número de instancias con base en el uso de CPU y memoria.

- **Distribución y Gestión**:
  - Utiliza **Helm charts** para:
    - Definición;
    - Instalación;
    - Actualización de la aplicación;
    - Selección de recursos para ejecución en el cluster.

- **Scripts Terraform**:
  - Disponibilizados para instalación y configuración de los componentes de infraestructura.
  