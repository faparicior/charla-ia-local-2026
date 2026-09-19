# Referencia: precios de alquiler de H200 por hora en Europa (verificación de la slide 9)

> **Uso:** ficha de verificación y **colección de enlaces fuente** por si la slide 9 («Alquilar GPUs a terceros para Open Weights») necesita links de citas.
> **Última verificación:** 19 sep 2026 (búsqueda web en vivo; los precios de cloud se mueven — re-verificar antes de una charla).

## 1. Lo que dice la charla (slide 9, parte 1)

Fuente interna: `script/index.md` líneas 76-79 (precios USD de mercado convertidos a EUR con **1 USD = 0,92 €**, tipo mid-2026 — misma tasa que usa lecompute.fr).

| Nivel | Config | VRAM | Precio charla (€/h) | Equivalente USD |
|---|---|---|---|---|
| 1 | 1× H200 | 141 GB | 3,22 – 4,22 | $3.50 – $4.59 |
| 2 | 2× H200 (NVLink) | 282 GB | 6,44 – 8,45 | $7.00 – $9.18 |
| 3 | 4× H200 (SXM5) | 564 GB | 12,88 – 16,89 | $14.00 – $18.36 |
| 4 | 8× H200 (DGX) | 1.128 GB | 25,76 – 33,12 | $28.00 – $36.00 |

## 2. Mercado UE on-demand medido (USD/h por GPU, salvo indicación)

Snapshot de **gpufinder.dev** (agregador con chequeo horario de stock; listings con región europea):

| Proveedor | Región UE | 1× | 2× | 4× | 8× (nodo) |
|---|---|---|---|---|---|
| PrimeIntellect (hosts Datacrunch) | FI, IS | **$2.00** | — | $7.98 | **$15.97** (suelo UE) |
| Seeweb | IT/FR | $2.60 | $5.20 | — | — |
| RunPod (pool global) | global | $3.59 | $7.18 | $14.36 | $28.72 |
| Vast.ai (marketplace) | BG, CZ, FR, IS | $3.60 ($2.40 interr.) | $7.20 | $14.74 | $43.70 |
| Lium | FI, FR | $4.23 | — | — | $33.81 |
| Verda (ex-UpCloud GPU) | FIN | $4.37 ($2.19 interr.) | $8.00 | — | — |
| Nebius | eu-north1, eu-west1 | $4.50 | — | — | $36.00 |
| AWS | eu-north-1 (p5en.48xlarge) | — | — | — | $67.73 (~$8.47/GPU) |

Contrastes de otras fuentes (mayo-jun 2026):

- **RunPod página oficial de precios:** H200 141 GB = **$4.39/h** (Pods) — klymentiev.com, verificado 2026-05-20.
- **Vast.ai mediana 30 días:** H200 = **$3.95/h** — klymentiev.com.
- **Nebius:** H200 ≈ **4,14 €/h** on-demand; ≈ 2,70 €/h reservado multi-mes; spot ≈ 2,25 €/h — lecompute.fr (relevé 20 jun 2026).
- **FluidStack:** H200 ≈ **2,10 €/h** — lecompute.fr.
- **Rango global H200 on-demand 2026:** ≈ **2,10 – 4,60 €/h**; AWS p5e ≈ 4,60 €/GPU-h (+15% ene 2026) — lecompute.fr.

## 3. Veredicto por nivel

| Nivel | Charla | Mercado UE observado | ¿Realista? |
|---|---|---|---|
| 1× | 3,22–4,22 € | 1,84–4,14 € ($2.00–$4.50); RunPod oficial $4.39≈4,04 € | ✅ banda media-alta (clase RunPod/Nebius/Verda con SLA); el suelo marketplace (Vast/PrimeIntellect) está por debajo |
| 2× | 6,44–8,45 € | $7.18–$8.00 (RunPod/Vast/Verda); Seeweb $5.20 | ✅ en rango; NVLink/SXM justifica la parte alta |
| 4× | 12,88–16,89 € | $14.36–$14.74 (RunPod/Vast) | ✅ clavado en el mercado |
| 8× | 25,76–33,12 € | **$28.72 (RunPod) / $33.81 (Lium) / $36.00 (Nebius)** | ✅✅ casi exacto al tramo RunPod→Nebius; PI más barato ($15.97), AWS mucho más caro ($67.73) |

**Conclusión:** los precios de la charla son tasas reales on-demand europeas, en la banda media-alta correspondiente a proveedores «managed/secure cloud» (RunPod, Nebius, Verda, Lium). Bajo ese rango quedan los marketplaces (Vast.ai ~2,20 €/h con riesgo de interrupción, PrimeIntellect) y por encima los hyperscalers (AWS ~2×). Nadie con H200 en stock en la UE vende por debajo de ~1,84 €/h ni un nodo DGX de 8× por debajo de ~14,70 €/h.

## 4. Contexto de proveedores UE (para links futuros)

- **OVHcloud:** tiene página de instancia H200 en public cloud pero **el precio no es público** en la web (anunciado; LeCompute no pudo confirmarlo). → https://www.ovhcloud.com/en/public-cloud/gpu/h200/
- **Scaleway:** no lista H200 (su gama va de L4 a H100 y Blackwell B300); L4 desde 0,79 €/h. → https://www.scaleway.com/en/pricing/gpu/
- **Hetzner:** **no ofrece H200**; sus GPU dedicadas son RTX (GEX131 = RTX PRO 6000 Blackwell Max-Q; GEX130 ≈ 838 €/mes ≈ 1,34 €/h). → https://www.hetzner.com/dedicated-rootserver/matrix-gpu
- **OVH vs Scaleway (comparativa 2026):** H100 2,99 $/GPU-h en OVH vs 3,63 $/GPU-h en Scaleway. → https://getdeploying.com/ovh-vs-scaleway

## 5. Fuentes (con URL, listas para `press-footer-link`)

| Fuente | URL | Qué aporta |
|---|---|---|
| GPU Finder — H200 en Europa (live) | https://gpufinder.dev/gpu/h200/europe | tabla por proveedor 1×/2×/4×/8× UE |
| RunPod precios oficiales | https://www.runpod.io/pricing | H200 $4.39/h Pods |
| RunPod catálogo | https://www.runpod.io/product/cloud-gpus | catálogo y regiones |
| Lambda GPU Cloud | https://lambda.ai/service/gpu-cloud | H100/B200 clusters (H200 vía SXM) |
| Vast.ai precios | https://vast.ai/pricing | mediana mercado H200 $3.95 |
| Nebius (docs) | https://docs.nebius.com/ | H200 en eu-north1/eu-west1 |
| Comparativa RunPod vs Lambda vs Vast (may 2026) | https://klymentiev.com/blog/runpod-vs-lambda-vs-vast | snapshot verificado 2026-05-20 |
| LeCompute — GPU cloud Francia/Europa 2026 | https://lecompute.fr/couts/gpu-cloud-france-europe/ | €/h reales, Nebius/FluidStack/OVH/Scaleway |
| GetDeploying — H200 | https://getdeploying.com/gpus/nvidia-h200 | comparativa multi-proveedor |
| OVHcloud instancia H200 | https://www.ovhcloud.com/en/public-cloud/gpu/h200/ | existencia (precio no público) |
| Scaleway GPU pricing | https://www.scaleway.com/en/pricing/gpu/ | gama L4→B300 (sin H200) |
| Hetzner GPU matrix | https://www.hetzner.com/dedicated-rootserver/matrix-gpu | RTX only (sin H200) |

### Caveats
- Precios «à partir de» on-demand, sin descuentos por compromiso salvo indicación; IVA/retorno local puede variar el € final.
- Conversión usada en la charla y en LeCompute: **1 USD = 0,92 €** (mid-2026).
- El stock de H200 en UE es escaso y volátil (gpufinder: solo 4/10 proveedores con stock confirmado en su último chequeo horario).
- Los precios interrumpibles (Vast/Verda ~$2.19–2.40) son la mitad de precio pero pueden ser reclamados por el host.
