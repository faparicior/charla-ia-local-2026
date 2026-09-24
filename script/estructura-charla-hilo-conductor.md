# Guion y Estructura de la Charla (Parte 1: 32 diapositivas · deck completo: 68)

> **Actualizado:** 24 sep 2026, tras la normalización de numeración.
> **Convención única:** en ambos decks, **posición = id = número de comentario** (`#slide-N` está en la posición N y su comentario HTML dice `SLIDE N`). La navegación por hash de `slides.js` (`#N`, `#slide-N`) usa posición, así que todo alinea.
> La charla se reparte en dos decks: **Parte 1** (`index.html`, hardware y modelos, 32 slides) y **Parte 2** (`parte2-ciclo-desarrollo.html`, ciclo de desarrollo con IA, 36 slides). Los slides de ecosistema/geopolítica (DeepSeek, hackeo a NVIDIA, timeline 2026, MTP/DFlash/DSpark, código local, cita editorial y Q&A) viven hoy en la **Parte 2, slides 28–36**.

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
│ • Caso especial: Qwen 3.8 Flash Next (el engram: más cerebro, menos RAM).   │
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
│ • Escogiendo los modelos y su arquitectura (dupla, DeltaNet, contexto 1M).  │
├─────────────────────────────────────────────────────────────────────────────┤
│ ACTO 5: EL FUTURO ACELERADO Y CONTROL TOTAL (El Despegue) — en la Parte 2   │
│ • Timeline 2026 de Aceleración Especulativa.                                │
│ • Técnicas: MTP (Multi-Token), DFlash (Asistente+Experto), DSpark (Filtro). │
│ • Inferencia en local: Código real Python/CLI sin salir a internet.         │
│ • Cita editorial, conclusiones y preguntas.                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Inventario Oficial — Parte 1 (`index.html`, 32 slides)

| # | ID | Acto Narrativo | Título de la Diapositiva | Resumen y Objetivo |
| :-: | :--- | :--- | :--- | :--- |
| **1** | `slide-1` | **Apertura** | AI Local Crafters • Keynote | Portada, bienvenida y presentación del ponente. |
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
| **15** | `slide-15` | **Acto 2: IA 101** | Qwen 3.8 Flash Next: más cerebro, menos RAM | **Caso especial (el engram):** 176B parámetros, 6B activos; el engram de n-grams se consulta, no computa, y vive en RAM host o disco. |
| **16** | `slide-16` | **Acto 2: IA 101** | Por dentro: cinco piezas en 48 capas | Anatomía del Flash Next: 48 capas = 12 × (3×(GDN→MoE) → 1×(QSA→MoE)). Fuente: ficha oficial HF. |
| **17** | `slide-17` | **Acto 2: IA 101** | El Peaje de Comprimir: ¿Cuánta Inteligencia se Pierde? | El espectro de cuantización (FP8 99.6%, AutoRound 98.2%, INT3 <90%). |
| **18** | `slide-18` | **Acto 2: IA 101** | La Trampa del Benchmark: El Efecto Dominó | Por qué un 4-bit engaña en 1 token (MMLU) pero sufre en cadenas largas. |
| **19** | `slide-19` | **Acto 3: 4-Bits** | NVIDIA NVFP4: El Secreto de los 4 Bits | Solución Silicio: 16 moldes (FP4) + micro-zoom + Tensor Cores Blackwell. |
| **20** | `slide-20` | **Acto 3: 4-Bits** | AutoRound INT4: El Secreto en Modelos MoE | Solución Abierta: Intel Sign-SGD anulando errores para Qwen 122B en 128 GB. |
| **21** | `slide-21` | **Acto 4: Vivencia** | La Decisión: Las «Calculasiones» | **El Meme de la Compra:** "Conforme a todas las calculasiones que he hecho... me compro el aparato". |
| **22** | `slide-22` | **Acto 4: Vivencia** | ¡Llegó el Aparato!: Alquimia de la buena | **El Meme de la Llegada:** "Me llega el aparato, estoy contento y ya me puedo poner a hacer alquimia de la buena". |
| **23** | `slide-23` | **Acto 4: Vivencia** | El Drama de Blackwell GB10: La odisea en los foros | Titulares de prensa técnica: bugs de energía, fallos de CUDA y promesas rotas. |
| **24** | `slide-24` | **Acto 4: Vivencia** | El Drama de Blackwell GB10: La odisea en los foros | **El Meme de la Promesa:** "Me dijiste que podría ejecutar NVFP4... pero a finales de 2026". |
| **25** | `slide-25` | **Acto 4: Vivencia** | Hackeando el Hierro: La Comunidad al Rescate | Eugr (`spark-vllm-docker`) y Thomas Braun (`avarok/vllm-nvfp4-gb10`) con parches upstream en vLLM/SGLang. |
| **26** | `slide-26` | **Acto 4: Vivencia** | Escogiendo Modelos: Calidad, Memoria y Velocidad | Comparativa de ocupación en los 128 GB del GB10 y throughput (MTP / DFlash 2 / NVFP4 / INT4). |
| **27** | `slide-27` | **Acto 4: Vivencia** | Los 2 Modelos Escogidos: Inteligencia & Código | La dupla final con fichas técnicas de Hugging Face (122B & 35B). |
| **28** | `slide-28` | **Acto 4: Vivencia** | DeltaNet vs. Attention: El Secreto de la Memoria Estable | Arquitectura híbrida: por qué DeltaNet estabiliza la memoria frente a la atención clásica. |
| **29** | `slide-29` | **Acto 4: Vivencia** | El Archivador vs. La Pizarra: ¿Dónde vive la memoria? | Física de la memoria: pesos comprimidos (archivador) vs. KV cache en fresco (pizarra). |
| **30** | `slide-30` | **Acto 4: Vivencia** | Escalando a 1 Mega con YaRN: Contexto Masivo en Local | Extensión de contexto a 1M tokens sin reentrenar desde cero. |
| **31** | `slide-31` | **Acto 4: Vivencia** | Los 3 Niveles de Atención: Juntas, Próximas y Alejadas | Geometría de la atención según la distancia entre tokens. |
| **32** | `slide-32` | **Acto 4: Vivencia** | La Analogía del IBAN Bancario: Un Solo Vector, 3 Escalas | Cierre conceptual: un único vector que direcciona información a 3 escalas. |

> **Nota (Acto 5 → Parte 2):** los slides de ecosistema y cierre que antes cerraban este deck viven ahora en `parte2-ciclo-desarrollo.html`:
> Caso DeepSeek (s28), Hackeo a NVIDIA (s29), Timeline 2026 (s30), MTP (s31), DFlash (s32), DSpark (s33), Código local (s34), Cita editorial (s35) y Q&A (s36). Las slides 1–27 de la Parte 2 cubren el ciclo de desarrollo con IA (SDLC, Inception, Especificación, DDD, Pilares, TDD y Living Docs).

---

## 🗺️ Mapa rápido de la Parte 2 (`parte2-ciclo-desarrollo.html`, 36 slides)

| # | ID | Bloque |
| :-: | :--- | :--- |
| 1 | `slide-1` | El Embudo del SDLC con IA (reducción de variabilidad) |
| 2 | `slide-pillar-intro` | SPECIAL: Los Tres Pilares del Código con IA |
| 3 | `slide-1-pipeline` | Pipeline SDLC de 5 fases |
| 4–11 | `slide-step1..8-*` | Inception: los 8 pasos (Fronteras, Tradeoffs, Personas, Empatía, Journeys, Brainstorming, Olas, MVP Canvas) |
| 12 | `slide-inception-greenfield-brownfield` | Inception: Greenfield vs. Brownfield |
| 13–15 | `slide-phase2-diagram1..3-*` | Fase 2: Mermaid live (secuencia, flowchart, FSM) |
| 16–18 | `slide-phase2-invariants`, `-br-template`, `-inv-template` | Fase 2: BR vs INV + plantillas |
| 19–26 | `slide-pillar-*` | SPECIALs: Pilares (fricción ADRs, caso Next.js ×2, timeline ADR, gobernanza, timeline SDLC, matriz producto, la conexión) |
| 27 | `slide-tdd-hybrid-evolution` | Fases 4-5+: TDD híbrido y Living Docs |
| 28–36 | DeepSeek → Q&A | Ecosistema, aceleración, código local y cierre |
