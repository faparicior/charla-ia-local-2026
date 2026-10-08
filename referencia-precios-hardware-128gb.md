# Referencia: Evolución de Precios de Hardware Unificado 128 GB+ (2025–2026)

> **Uso:** Datos de mercado recopilados en octubre de 2026 que evidencian la escalada de precios, rotura de stock y la barrera económica de entrada para hardware de IA local de alta capacidad (128 GB – 256 GB).
> **Fecha de corte:** Octubre 2026.

---

## 1. Tabla de Mercado y Evolución de Precios

| Dispositivo / Modelo | Configuración | Fecha | Precio (USD) | Estado / Nota |
|---|---|---|---|---|
| **Framework Desktop** | 128 GB | Ago 2025 | $1,999 | Precio de lanzamiento |
| | 128 GB | Ene 2026 | $2,459 | Primera subida |
| | 128 GB | May–Jun 2026 | — | Subidas escalonadas |
| | 128 GB | 6 Oct 2026 | **$3,449** | **+72.5% vs. salida** · Agotado en tienda oficial |
| **NVIDIA DGX Spark** | GB10 (128 GB) | Feb 2026 | $3,999 | Precio de lanzamiento (previsto inicial ~$3,000) |
| | GB10 (128 GB) | Feb–Sep 2026 | $4,699 | Primera revisión |
| | GB10 (128 GB) | 2–6 Oct 2026 | **$6,950** | **+73.8% vs. salida** · Agotado en canal oficial |
| | GB10 (64 GB) | 23 Oct 2026 (anuncio) | **$4,999** | Modelo recortado (+25% vs. Spark 128 GB original) |
| **ASUS Ascent GX10** | GB10 (128 GB) | Oct 2026 | **$5,999** | Con 1 TB SSD |
| **Bosgame M5** | Strix Halo (128 GB, 2 TB) | Jul 2026 | $2,899 | Lanzamiento inicial |
| | Strix Halo (128 GB, 2 TB) | 6 Oct 2026 | **$3,099** | Mini PC Ryzen AI Max+ 395 |
| **Minisforum MS-S1 Max** | Strix Halo (128 GB) | 6 Oct 2026 | **$3,799** | Mini PC |
| **GMKtec EVO-X2** | Strix Halo (128 GB) | 6 Oct 2026 | — | **Agotado** en todas sus versiones de 128 GB |
| **Apple Mac Studio** | M5 Max (18C CPU, 40C GPU, 128 GB, 512 GB SSD) | 6 Oct 2026 | **$5,099** | El salto de 64 GB a 128 GB suma +$1,600 ($25/GB) |
| **Apple Mac Studio** | M5 Ultra (base) | Oct 2026 | **$5,999** | Configuración base |
| | M5 Ultra (256 GB) | Oct 2026 | **$9,499** | Configuración 256 GB |
| **Gorgon Halo** | Ryzen AI Max+ Pro 495 (192 GB) | Oct 2026 | **$6,799** | Escalón de entrada para 192 GB |

---

## 2. Diagnóstico del Mercado: El Colapso de la Promesa Local Asequible

1. **Hiperinflación de la memoria unificada (+70% a +75% en menos de un año):**
   - El Framework Desktop pasó de $1,999 a $3,449.
   - El DGX Spark de 128 GB pasó de $3,999 a rozar los $7,000 ($6,950), para luego ser canibalizado por un modelo recortado de 64 GB a $4,999.
2. **Escasez y rotura de stock sistemática:**
   - Framework agotado, GMKtec EVO-X2 agotado, DGX Spark 128 GB agotado en tienda oficial.
3. **El peaje abusivo de la memoria:**
   - En Apple, pasar de 64 GB a 128 GB cuesta $1,600 adicionales ($25 por GB de RAM), llevando un Mac Studio M5 Max a $5,099 y un M5 Ultra de 256 GB a $9,499.
4. **Impacto en el argumento de compra (Capex vs. Opex):**
   - La justificación inicial de amortizar una máquina de $2,000 en 1–2 años frente a suscripciones o consumo de API se desmorona cuando el ticket de entrada asciende a $5,000–$7,000.
   - Frente a un alquiler de 1× H200 (141 GB VRAM, 4.8 TB/s de ancho de banda) a ~3,50 € / hora en proveedores cloud dedicados (RunPod, Vast, Nebius):
     - Invertir $6,000 en una máquina local equivale a **más de 1.600 horas de H200 en la nube**.
     - A razón de 3–4 horas de desarrollo diarias, son más de **2 años de GPU datacenter de primer nivel** sin asumir obsolescencia, averías ni bugs de firmware/drivers.
