# Guion y Estructura Definitiva de la Charla (29 Diapositivas)

Este documento define la narrativa paso a paso basada en la **experiencia personal del ponente**, organizada en **5 Actos** limpios, con un hilo conductor continuo desde el problema de costes en Cloud hasta la soberanía técnica en hardware local.

---

## 🎭 La Historia en 5 Actos (El Viaje del Speaker)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ACTO 1: EL DETONANTE (¿Por qué me embarqué en esta historia?)               │
│ • El fin del bufé libre y la subida de precios en APIs.                     │
│ • Mi vivencia con GitHub Copilot y los refunds (la gota que colmó el vaso). │
│ • Buscando alternativas: Modelos asiáticos (el dilema de la privacidad).    │
│ • Mi decisión: Comprar hierro local (Capex vs Opex en aquel momento).       │
│ • La opción que hoy tiene mucho sentido: Alquilar GPUs para Open Weights.   │
├─────────────────────────────────────────────────────────────────────────────┤
│ ACTO 2: IA LOCAL 101 (Decido comprar hardware... ¿pero cómo funciona?)      │
│ • EL MARCO MENTAL: El Trilema de la IA Local (Memoria, Calidad, Velocidad). │
│ • Pilar 1 (Memoria): ¿En qué se gasta la VRAM? Pesos vs. KV Cache.          │
│ • Pilar 3 (Velocidad/Arquitectura): Modelos Densos vs. MoE (El hospital).   │
│ • Sizing en la práctica: Matriz de Pesos Qwen y Zona Ricitos de Oro.        │
│ • Pilar 2 (Calidad): El peaje de comprimir (FP8 vs INT4 vs INT3).           │
│ • Pilar 2 (Peligro): La trampa del benchmark y el efecto dominó.            │
├─────────────────────────────────────────────────────────────────────────────┤
│ ACTO 3: LAS SOLUCIONES DE 4 BITS (Cómo meter gigantes en 128 GB)            │
│ • NVIDIA NVFP4: El Secreto de los 4 bits (La solución en silicio Blackwell).│
│ • AutoRound INT4: La alternativa abierta y universal para MoE (Qwen 122B).  │
├─────────────────────────────────────────────────────────────────────────────┤
│ ACTO 4: LA VIVENCIA REAL (La cruda realidad del hardware y el hackeo)       │
│ • NVIDIA Blackwell GB10: 128 GB en papel vs. la cruda realidad de los bugs. │
│ • El drama en los foros: La odisea compartida con la comunidad.             │
│ • Hackeando el hierro: La comunidad al rescate con scripts y kernels libres.│
│ • El Caso DeepSeek (Sputnik) y el "Hackeo" a NVIDIA con parches PTX.        │
├─────────────────────────────────────────────────────────────────────────────┤
│ ACTO 5: EL FUTURO ACELERADO Y CONTROL TOTAL (El Despegue)                   │
│ • Timeline 2026 de Aceleración Especulativa.                                │
│ • Técnicas: MTP (Multi-Token), DFlash (Asistente+Experto), DSpark (Filtro). │
│ • Inferencia en local: Código real Python/CLI sin salir a internet.         │
│ • Cita editorial, conclusiones y preguntas.                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Inventario Oficial de Diapositivas (30 Slides)

| # | ID | Acto Narrativo | Título de la Diapositiva | Resumen y Objetivo |
| :-: | :--- | :--- | :--- | :--- |
| **1** | `slide-1` | **Acto 1: Detonante** | AI Local Crafters • Keynote | Portada, bienvenida y presentación del ponente. |
| **2** | `slide-2` | **Acto 1: Detonante** | El Fin del Bufé Libre | El cambio de modelo de negocio en las grandes empresas de IA. |
| **3** | `slide-3` | **Acto 1: Detonante** | El choque de precios en los medios | Titulares de prensa que reflejan el encarecimiento global. |
| **4** | `slide-4` | **Acto 1: Detonante** | Especial GitHub Copilot: La crisis de los Refunds | Mi vivencia personal: la degradación del servicio y cancelaciones. |
| **5** | `slide-5` | **Acto 1: Detonante** | Modelos Cloud: Occidentales vs. Asiáticos | Buscando alternativas baratas (DeepSeek/Qwen)... y el muro de la privacidad. |
| **6** | `slide-6` | **Acto 1: Detonante** | Tu Infraestructura: GPUs Cloud vs. Local | Mi decisión de apostar por hardware propio (Capex vs Opex). |
| **7** | `slide-7` | **Acto 1: Detonante** | Evaluación Radar de las 4 Alternativas | Análisis pentagonal de Privacidad, Coste, Control, Mantenimiento y Latencia. |
| **8** | `slide-8` | **Acto 1: Detonante** | Costes de Inferencia por 1M de Tokens | La matemática económica que justificaba la inversión en local. |
| **9** | `slide-9` | **Acto 1: Detonante** | Alquilar GPUs a terceros para Open Weights | La vía que no contemplé al inicio pero que hoy es una alternativa muy válida. |
| **10** | `slide-10` | **Acto 2: IA 101** | El Trilema de la IA Local: Memoria, Calidad y Velocidad | **El marco mental:** Diagrama triangular minimalista con el Sweet Spot en el centro. |
| **11** | `slide-11` | **Acto 2: IA 101** | ¿En qué se gasta la Memoria? Pesos vs. KV Cache | Anatomía de la VRAM: la fórmula Pesos + (KV Cache × Usuarios). |
| **12** | `slide-12` | **Acto 2: IA 101** | Modelos Densos: La Junta Médica Completa | **Storytelling Visual 1:** Ilustración de 30 médicos debatiendo sobre una simple tos (100% activo). |
| **13** | `slide-13` | **Acto 2: IA 101** | Modelos MoE: El Servicio de Triaje Inteligente | **Storytelling Visual 2:** Ilustración del Router derivando a 2 especialistas de guardia (10B activos). |
| **14** | `slide-14` | **Acto 2: IA 101** | Matriz de Pesos: La Zona Ricitos de Oro | Aplicar números: tabla de Qwen (27B Dense, 35B MoE, 122B MoE en 128 GB). |
| **15** | `slide-15` | **Acto 2: IA 101** | El Peaje de Comprimir: ¿Cuánta Inteligencia se Pierde? | El espectro de cuantización (FP8 99.6%, AutoRound 98.2%, INT3 <90%). |
| **16** | `slide-16` | **Acto 2: IA 101** | La Trampa del Benchmark: El Efecto Dominó | Por qué un 4-bit engaña en 1 token (MMLU) pero sufre en cadenas largas. |
| **17** | `slide-17` | **Acto 3: 4-Bits** | NVIDIA NVFP4: El Secreto de los 4 Bits | Solución Silicio: 16 moldes (FP4) + micro-zoom + Tensor Cores Blackwell. |
| **18** | `slide-18` | **Acto 3: 4-Bits** | AutoRound INT4: El Secreto en Modelos MoE | Solución Abierta: Intel Sign-SGD anulando errores para Qwen 122B en 128 GB. |
| **19** | `slide-19` | **Acto 4: Vivencia** | La Decisión: Las «Calculasiones» | **El Meme de la Compra:** "Conforme a todas las calculasiones que he hecho... me compro el aparato". |
| **20** | `slide-20` | **Acto 4: Vivencia** | El Drama de Blackwell GB10: La odisea en los foros | Titulares de prensa técnica: bugs de energía, fallos de CUDA y promesas rotas. |
| **21** | `slide-21` | **Acto 4: Vivencia** | El Drama de Blackwell GB10: La odisea en los foros | **El Meme de la Promesa:** "Me dijiste que podría ejecutar NVFP4... pero a finales de 2026". |
| **22** | `slide-22` | **Acto 4: Vivencia** | Hackeando el Hierro: La Comunidad al Rescate | Eugr (`spark-vllm-docker`) y Thomas Braun (`avarok/vllm-nvfp4-gb10`) con parches upstream en vLLM/SGLang. |
| **23** | `slide-23` | **Acto 4: Vivencia** | Caso DeepSeek: Cronología de una Revolución | El terremoto del Momento Sputnik y la democratización del razonamiento. |
| **24** | `slide-24` | **Acto 4: Vivencia** | El "Hackeo" a NVIDIA: De parches PTX a integración nativa | La comunidad reescribiendo ensamblador PTX y forzando a los fabricantes. |
| **25** | `slide-25` | **Acto 5: Futuro** | 2026: Timeline de Modelos & Aceleración | Mapa cronológico de cómo la inferencia se multiplicó por 5x. |
| **26** | `slide-26` | **Acto 5: Futuro** | ¿Cómo funciona MTP? Predecir el futuro en un solo paso | Multi-Token Prediction: generar $N$ palabras simultáneas con cabezales extra. |
| **27** | `slide-27` | **Acto 5: Futuro** | ¿Cómo funciona DFlash? El Asistente Rápido + El Experto | Especulación con modelo borrador ultra-rápido (400 t/s) y validador. |
| **28** | `slide-28` | **Acto 5: Futuro** | Estrategia DSpark: Borradores con Filtro de Confianza | Descarte temprano de tokens de baja confianza. |
| **29** | `slide-29` | **Acto 5: Futuro** | Invocación directa sin salir a internet | Código Python y terminal ejecutando modelos en local. |
| **30** | `slide-30` | **Acto 5: Futuro** | Cita Editorial | "La verdadera maestría artesanal consiste en entender y controlar las herramientas que moldean nuestro código." |
| **31** | `slide-31` | **Acto 5: Futuro** | Preguntas & Debate | Conclusiones, recursos, enlaces comunitarios y turno de preguntas. |
