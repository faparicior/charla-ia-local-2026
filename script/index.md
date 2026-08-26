# Porqué estamos hablando de esto

## La era dorada de la IA subvencionada

- Uso gratuito generoso
- Pago $10/mes y se te daba para un mes

## Creada la necesidad, ahora toca hacerlo sostenible

- De la noche a la mañana te cambian kos planes (incluso los anuales Github me hizo "esa jugada")
- Te quedas con la necesidad y ellos saben que los vas a pagar (es el mercado amigo)

## El fin de la era de suscripción subvencionada

Artículos y reportajes de medios generalistas y tecnológicos de gran difusión que explican por qué se acaba la época de la "IA barata" y cómo las facturas van a subir para usuarios y pymes:

* [Xataka: Las suscripciones de IA son un chollo insostenible (El fin de la tarifa plana)](https://www.xataka.com/robotica-e-ia/suscripciones-ia-chollo-insostenible-200-dolares-al-mes-dan-acceso-a-14-000-dolares-tokens): Explica cómo las tarifas planas actuales funcionan como un "bufé libre" donde las tecnológicas asumen pérdidas masivas, y por qué la llegada de agentes autónomos está obligando a cerrar el grifo del uso ilimitado.
* [The New York Times / TechCrunch: La hoja de ruta de OpenAI para subir ChatGPT hasta los 44 dólares al mes](https://techcrunch.com/2024/09/27/openai-might-raise-the-price-of-chatgpt-to-22-by-2025-44-by-2029/): Reportaje sobre los documentos internos filtrados que detallan cómo OpenAI planea duplicar progresivamente el precio de la suscripción Plus para compensar los miles de millones que cuesta mantener la infraestructura de servidores.
* [Xataka Android: La batalla de las suscripciones de 200 euros al mes (ChatGPT Pro vs. Gemini Ultra)](https://www.xatakandroid.com/inteligencia-artificial/chatgpt-go-llega-a-nuestro-pais-misil-a-gemini-asi-queda-batalla-precios-ia-espana): Repaso a la fragmentación del mercado, donde las funciones verdaderamente potentes (razonamiento profundo, agentes y modelos sin límites) ya no entran en la cuota de 20 € y se han desplazado a escalones de **229 € a 275 € mensuales**.
* [MindStudio: Por qué la era de los 20 $/mes se acaba y llega el choque de precios](https://www.mindstudio.ai/blog/ai-pricing-shock-end-of-cheap-subscriptions): Análisis divulgativo sobre cómo la fase de captación subvencionada por capital riesgo ha terminado, empujando a las empresas a recortar lo que incluye el plan básico y a cobrar suplementos por cada tarea pesada.


## Especial Github

La controversia con **GitHub Copilot** y la eliminación de su modelo de tarifa plana ilimitada provocó una ola masiva de cancelaciones y solicitudes de reembolso (*refunds*):


### Qué ocurrió exactamente

* **Fin del "bufé libre" y llegada de los *AI Credits*:** GitHub eliminó el acceso ilimitado a modelos punteros (como Claude Sonnet o GPT-4o) dentro de la suscripción estándar de 10 $/mes o el plan anual de 100 $.
* **Degradación forzada a modelos básicos:** Los modelos más potentes pasaron a considerarse "Premium" y quedaron sujetos a un sistema de créditos y multiplicadores de consumo agresivos. Una vez agotada la bolsa mensual de créditos (que en tareas de depuración o modo agente se consumía en 2 o 3 días), el sistema degradaba automáticamente al desarrollador a modelos recortados o exigía pagar sobrecostes directos (*overage*).
* **Impacto directo en suscriptores anuales:** Quienes habían pagado por adelantado un año completo con la promesa de acceso fluido a los mejores modelos se encontraron a mitad de contrato con un recorte drástico de capacidad (muchos denunciaron que el valor útil se redujo a menos de un tercio).

---

### La reacción de la comunidad y la crisis de reembolsos

* **Oleada masiva de *refunds* y disputas bancarias:** Ante la acusación de *bait-and-switch* (publicidad engañosa y cambio unilateral de contrato), miles de desarrolladores exigieron la devolución prorrateada de sus suscripciones anuales mediante la opción oficial de cancelación o recurriendo a disputas y *chargebacks* en PayPal y tarjetas de crédito.
* **Rebelión en foros técnicos y redes:** En los foros oficiales de GitHub Community y Reddit (`r/GithubCopilot`), los hilos de quejas acumularon miles de votos negativos y comentarios de protesta, con usuarios organizando peticiones legales y quejas formales por alteración sustancial de las condiciones pactadas.
* **Migración masiva a alternativas:** La imposibilidad de predecir el gasto en entornos de desarrollo empujó a muchos programadores y equipos hacia herramientas nativas con clave de API propia o clientes de código directo (como Claude Code, Cursor o CLI agents de código abierto), donde el control del consumo de tokens es explícito y auditable.

---

### Fuentes y cobertura de la polémica

* [GitHub Community: Formal Complaint Regarding Copilot Pricing Changes and Breach](https://github.com/orgs/community/discussions/198080): Denuncia formal de suscriptores anuales sobre la reducción unilateral de capacidad utilizable y la aplicación de multiplicadores abusivos a mitad de contrato.
* [Medium / Tech Analysis: GitHub Copilot and the End of the Flat Rate Golden Age](https://medium.com/@shahadilh18/github-copilot-just-betrayed-4-7-million-developers-and-nobody-is-surprised-04ba50ee34c0): Análisis del colapso del modelo económico de suscripción fija cuando irrumpieron los agentes autónomos, detallando la frustración de 4,7 millones de desarrolladores.
* [GitHub Blog: Official Changes to Copilot Individual Plans and Refund Clarification](https://github.blog/news-insights/company-news/changes-to-github-copilot-individual-plans/): Publicación oficial de GitHub donde se comunican los límites de uso por créditos y el procedimiento de reembolso prorrateado para suscriptores anuales activos.
* [Reddit (r/GithubCopilot): Backlash, Model Downgrades and Refund Disputes](https://www.reddit.com/r/GithubCopilot/comments/1sy2ka1/github_silently_removed_the_full_refund_text_for/): Hilos de la comunidad documentando cancelaciones, pasos para solicitar reembolsos y comparativas de coste real frente a APIs abiertas.

### Costes de inferencia de LLMs (TODO: REVISAR TABLA , ENTRADAS Y SALIDAS, CACHES)

Proveedor / Familia,Modelo (Última Generación),Entrada ($ / €),Entrada con Caché ($ / €) \vert{} Salida ($ / €)
OpenAI,GPT-5.6 Sol (Frontier Flagship),"$5.00 / 4,60 €","$0.50 / 0,46 €"
OpenAI,GPT-5.6 Terra (Gama Media),"$2.00 / 1,84 €","$0.20 / 0,18 €"
OpenAI,GPT-5.6 Luna (Alta Velocidad / Ligero),"$0.20 / 0,18 €","$0.02 / 0,02 €"
OpenAI,o3 (Razonamiento Complejo),"$2.00 / 1,84 €",—
Anthropic,Claude Opus 5 (Frontier Flagship),"$5.00 / 4,60 €","$0.50 / 0,46 €"
Anthropic,Claude Sonnet 5 (Gama Media / Agentes),"$2.00 / 1,84 €","$0.20 / 0,18 €"
Anthropic,Claude Haiku 4.5 (Ligero / Baja Latencia),"$1.00 / 0,92 €","$0.10 / 0,09 €"
Google,Gemini 3.1 Pro (Frontier / Multimodal),"$2.00 / 1,84 €","$0.20 / 0,18 €"
Google,Gemini 3.6 Flash (Gama Media Equilibrada),"$1.50 / 1,38 €","$0.15 / 0,14 €"
Google,Gemini 3.5 Flash-Lite (Extracción / Ligero),"$0.30 / 0,28 €","$0.03 / 0,03 €"
Google,Gemini 2.5 Flash-Lite (Mínimo Coste),"$0.10 / 0,09 €","$0.01 / 0,01 €"
DeepSeek,DeepSeek V4 Pro (Frontier MoE 1M),"$0.435 / 0,40 €","$0.0036 / 0,003 €"
DeepSeek,DeepSeek V4 Flash (Código / Throughput),"$0.14 / 0,13 €","$0.0028 / 0,003 €"
DeepSeek,DeepSeek R1 / V3.2 (Razonamiento),"$0.55 / 0,51 €","$0.14 / 0,13 €"
Alibaba Qwen,Qwen 3.8 Max (Frontier Propietario),"$1.60 / 1,47 €",50% desc. en Batch
Alibaba Qwen,Qwen 3.8 72B / Plus (Open-Weight Mid),"$0.40 / 0,37 €",50% desc. en Batch
Alibaba Qwen,Qwen 3.8 27B (Open-Weight Eficiente),"$0.20 / 0,18 €",50% desc. en Batch
Alibaba Qwen,Qwen 3.7 Flash (Alto Throughput),"$0.08 / 0,07 €",90% desc. Cache

### Alquilar GPUs a terceros

Configuración,VRAM Total,Rango On-Demand ($/h),Rango On-Demand (€/h),Caso de uso principal
1× H200,141 GB,$3.50 – $4.59,"3,22 € – 4,22 €",Modelos 70B–72B en FP16/FP8 sin sharding
2× H200 (NVLink),282 GB,$7.00 – $9.18,"6,44 € – 8,45 €",Modelos MoE densos (DeepSeek/Qwen 3.8 en FP8)
4× H200 (HGX/SXM5),564 GB,$14.00 – $18.36,"12,88 € – 16,89 €",Inferencia de modelos frontera 230B–405B
8× H200 (Nodo DGX),1.128 GB,$28.00 – $36.00,"25,76 € – 33,12 €",DeepSeek V3/V4 a precisión nativa + alto concurrencia

