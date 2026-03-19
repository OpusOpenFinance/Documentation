---
layout: default
title: Opus Data Receiver
parent: "Opus Open Finance Brazil"
nav_order: 6
lang: "en"
alternate_lang:
    - path: "/Documentation/pt-br/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/index/"
      lang: "pt-br"
    - path: "/Documentation/es/Open-Finance/Plataforma-OpusOpenFinance/opusDataReceiver/index/"
      lang: "es"
---

## Opus Data Receiver

Opus Data Receiver (ODR) is a platform specialized in receiving, organizing, and keeping financial data shared through Open Finance Brazil updated. It was created to solve a central challenge for those who operate with regulated information: how to guarantee continuous, reliable, and rule-compliant access to data that is constantly changing and depends on multiple financial institutions?

### The problem ODR solves

The Opus Open Finance ecosystem offers access to a wide variety of data but imposes significant technical challenges:

- Rigorous call limits per Institution, Product, and End Customer;
- Difficulty in controlling when and how to update data without exceeding these limits;
- Latency and occasional unavailability of Data Transmitting Institutions;
- Complexity in knowing which resources are still valid, have been changed, or no longer exist;
- High costs to maintain proprietary synchronization and storage infrastructure;

The result: Without a specialized intermediary, it usually leads to instability, disorderly spending of regulatory credits, outdated data, and friction in the end-user experience.

ODR was created to eliminate this problem.

### What ODR does

ODR functions as an intelligent layer between your system and Open Finance. It:

- Maintains an organized and updated copy of data authorized via consent;
- Performs configurable periodic updates per Product and Subproduct;
- Responds quickly with stored data, even when the Transmitter is unavailable;
- Allows on-demand queries (*hot*) when an immediate update is necessary;
- Handles all the complexity of consent management, resource validation, and operational flow;
- Exposes a unified and stable API, regardless of the Data Transmitting Institution;
- With this, your systems start consuming Open Finance data in a simple, predictable, and reliable manner.

### What ODR does not do

To avoid incorrect expectations, it is important to understand what ODR does not propose to do:

- **Does not** create end-user experiences for consent collection;
- **Does not** replace the Data Transmitting Institution — it depends on the information provided by it;
- **Does not** ignore regulatory operational limits and does not force updates beyond what is allowed;
- **Does not** alter, interpret, or transform financial data — it replicates and keeps it updated;
- **Does not** execute financial recommendations, risk analyses, or credit decisions;
- **Does not** trigger infinite automatic searches; it strictly follows the schedule configured by the client.

ODR's focus is data governance, updating, and availability — not the application of business logic on it.

### The core proposition

In essence, ODR transforms Open Finance into a stable, continuous, and predictable data source.

It allows your system to rely on this information without needing to handle:

- Regulatory limits;
- Synchronization;
- Error handling from Transmitters;
- Downtime and instability;
- Update logic;
- Organization of Products and Subproducts.

ODR takes care of all this so you can focus on your product's strategy and perform the best analyses on the obtained data.
