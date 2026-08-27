# Guion y Estructura Definitiva de la Charla (28 Diapositivas)

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
│ • ¿En qué se gasta la memoria? Pesos vs. KV Cache.                          │
│ • ¿Cómo son los modelos por dentro? Modelos Densos vs. MoE (El hospital).   │
│ • La Matriz de Pesos Qwen: La Zona Ricitos de Oro (27B, 35B MoE, 122B MoE). │
│ • El peaje de comprimir: Cuantización y pérdida de precisión.               │
│ • La trampa del benchmark: El efecto dominó en razonamiento largo.          │
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

## 📋 Inventario Oficial de Diapositivas (28 Slides)

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
| **10** | `slide-10` | **Acto 2: IA 101** | ¿En qué se gasta la Memoria? Pesos vs. KV Cache | Anatomía de la VRAM: la fórmula Pesos + (KV Cache × Usuarios). |
| **11** | `slide-11` | **Acto 2: IA 101** | Modelos Densos vs. MoE: La Junta Médica vs. El Triaje | Arquitectura: Junta médica completa (Denso) vs Especialistas de guardia (MoE). |
| **12** | `slide-12` | **Acto 2: IA 101** | Matriz de Pesos: La Zona Ricitos de Oro | Aplicar números: tabla de Qwen (27B Dense, 35B MoE, 122B MoE en 128 GB). |
| **13** | `slide-13` | **Acto 2: IA 101** | El Peaje de Comprimir: ¿Cuánta Inteligencia se Pierde? | El espectro de cuantización (FP8 99.6%, AutoRound 98.2%, INT3 <90%). |
| **14** | `slide-14` | **Acto 2: IA 101** | La Trampa del Benchmark: El Efecto Dominó | Por qué un 4-bit engaña en 1 token (MMLU) pero sufre en cadenas largas. |
| **15** | `slide-15` | **Acto 3: 4-Bits** | NVIDIA NVFP4: El Secreto de los 4 Bits | Solución Silicio: 16 moldes (FP4) + micro-zoom + Tensor Cores Blackwell. |
| **16** | `slide-16` | **Acto 3: 4-Bits** | AutoRound INT4: El Secreto en Modelos MoE | Solución Abierta: Intel Sign-SGD anulando errores para Qwen 122B en 128 GB. |
| **17** | `slide-17` | **Acto 4: Vivencia** | NVIDIA Blackwell GB10: Expectativa vs. Realidad | Mi experiencia real con el hardware: 128 GB en papel vs. bugs y calor. |
| **18** | `slide-18` | **Acto 4: Vivencia** | El Drama de Blackwell: La odisea en los foros | Citas y testimonios reales de Reddit y HackerNews compartiendo el dolor. |
| **19** | `slide-19` | **Acto 4: Vivencia** | Hackeando el Hierro: La Comunidad al Rescate | Cómo la comunidad salvó el hardware con scripts de energía y kernels libres. |
| **20** | `slide-20` | **Acto 4: Vivencia** | Caso DeepSeek: Cronología de una Revolución | El terremoto del Momento Sputnik y la democratización del razonamiento. |
| **21** | `slide-21` | **Acto 4: Vivencia** | El "Hackeo" a NVIDIA: De parches PTX a integración nativa | La comunidad reescribiendo ensamblador PTX y forzando a los fabricantes. |
| **22** | `slide-22` | **Acto 5: Futuro** | 2026: Timeline de Modelos & Aceleración | Mapa cronológico de cómo la inferencia se multiplicó por 5x. |
| **23** | `slide-23` | **Acto 5: Futuro** | ¿Cómo funciona MTP? Predecir el futuro en un solo paso | Multi-Token Prediction: generar $N$ palabras simultáneas con cabezales extra. |
| **24** | `slide-24` | **Acto 5: Futuro** | ¿Cómo funciona DFlash? El Asistente Rápido + El Experto | Especulación con modelo borrador ultra-rápido (400 t/s) y validador. |
| **25** | `slide-25` | **Acto 5: Futuro** | Estrategia DSpark: Borradores con Filtro de Confianza | Descarte temprano de tokens de baja confianza. |
| **26** | `slide-26` | **Acto 5: Futuro** | Invocación directa sin salir a internet | Código Python y terminal ejecutando modelos en local. |
| **27** | `slide-27` | **Acto 5: Futuro** | Cita Editorial | "La verdadera soberanía no es poseer un modelo, sino poseer el hierro..." |
| **28** | `slide-28` | **Acto 5: Futuro** | Preguntas & Debate | Conclusiones, recursos, enlaces comunitarios y turno de preguntas. |
