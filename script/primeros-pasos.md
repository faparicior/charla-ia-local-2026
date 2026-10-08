# La Odisea del Hardware: NVIDIA Blackwell GB10 (128 GB)

Documentación técnica, enlaces a foros oficiales de NVIDIA, incidencias en GitHub, bugs de firmware y roadmap de soporte para la charla **AI Local Crafters**.

---

## 1. La Idea Inicial (La Promesa Comercial)

- **Hardware**: NVIDIA Blackwell GB10 (NVIDIA DGX Spark / ASUS Ascent GX10) con **128 GB LPDDR5x de memoria unificada**.
- **Promesa**: 
  - Inferencia out-of-the-box con Ollama / vLLM.
  - Soporte nativo de cuantización en coma flotante de 4 bits (**NVFP4** en unidades Tensor `tcgen05`).
  - Capacidad para correr modelos masivos de 70B–72B y MoE densos sin necesidad de clusters SXM multitarjeta.
- **La Burbuja de Precios (Octubre 2026)**:
  - Ver detalle en [`referencia-precios-hardware-128gb.md`](../referencia-precios-hardware-128gb.md).
  - La DGX Spark pasó de $3,999 a $6,950 (+73.8%, agotada), el Framework Desktop de $1,999 a $3,449 (+72.5%, agotado) y un Mac Studio M5 Max de 128 GB se sitúa en $5,099.
  - La compra de hardware local de 128 GB deja de ser una alternativa accesible frente al cloud, obligando a replantear el retorno de inversión y virar hacia el alquiler on-demand de GPUs dedicadas (H200).

---

## 2. La Cruda Realidad (Documentación de Fallos y Bugs)

### A. El Bloqueo de Energía: USB-C PD Controller Firmware Wedge
- **Síntoma**: La GPU se queda bloqueada a **611 MHz** y consumiendo solo **~13 W** (estado de estrangulamiento térmico/potencia fantasma).
- **Causa**: Fallo en la negociación del controlador Power Delivery (PD) entre la fuente/adaptador y la placa ASUS/NVIDIA tras reinicios o cuelgues del sistema.
- **El Ritual de Recuperación ("Cold Drain")**:
  - Desconectar físicamente el conector de corriente de la pared **y** de la propia unidad.
  - Dejar reposar la máquina (descarga de condensadores, el famoso *"desenchufar y contar hasta 10"* o varios minutos).
  - Reconectar y arrancar.
  - Actualización obligatoria de firmware mediante cápsulas ASUS `.cap` o `fwupdmgr` (`lvfs-testing`).
- **Referencias y Foros**:
  - [NVIDIA Developer Forums: DGX Spark / ASUS GX10 Power Delivery Throttle](https://forums.developer.nvidia.com/)
  - [ASUS Ascent GX10 Support: Firmware Capsule Updates (.cap)](https://www.asus.com/support/)
  - [GitHub Community: Power Delivery Controller firmware recovery & live USB staging](https://github.com/vllm-project/vllm/issues)

---

### B. El Conflicto de Microarquitectura: `sm_121` vs `sm_100` vs `sm_120`
- **Problema de Arquitectura**: 
  - Blackwell Datacenter = **`sm_100`**
  - Blackwell Workstation / RTX = **`sm_120`**
  - Blackwell GB10 (DGX Spark / Asus Ascent) = **`sm_121` (SM 12.1a)**
- **Consecuencia**: Los contenedores y binarios oficiales de NVIDIA para Datacenter **no son compatibles directamente** con `sm_121`. Cualquier imagen estándar falla o cae en fallbacks por software lentísimos.
- **Referencias**:
  - [NVIDIA Developer Forums: Architecture SM 12.1 compatibility differences](https://forums.developer.nvidia.com/)
  - [vLLM Documentation: CUDA Compute Capability 12.1 support](https://docs.vllm.ai/)

---

### C. El Drama de NVFP4: "Te dije que lo ejecutarías, pero no cuándo"
- **El Fallo**: Las instrucciones de Tensor Core para FP4 (`tcgen05`) en `sm_121` no disponían de kernels optimizados en las primeras versiones de TensorRT-LLM y CUTLASS, provocando que NVFP4 rindiera **peor que INT4 AWQ estándar** o directamente fallara la compilación.
- **Roadmap Oficial de NVIDIA**: Soporte completo y maduro de drivers oficiales planificado para la **segunda mitad / finales de 2026**.
- **Referencias**:
  - [NVIDIA Developer Forums: NVFP4 Kernel performance on SM121](https://forums.developer.nvidia.com/)
  - [CUTLASS Repository: Tensor Core FP4 matrix multiplication kernels for Blackwell](https://github.com/NVIDIA/cutlass)

---

## 3. El Rescate Open Source: La Comunidad al Rescate

Ante la lentitud de los vendors, desarrolladores artesanos crearon parches y contenedores propios para saltarse los bloqueos:

1. **`avarok/vllm-nvfp4-gb10` (Avarok Cybersecurity)**:
   - Imágenes Docker optimizadas con recompilación explícita de kernels CUTLASS para `sm_120` y `sm_121`.
   - Permite servir modelos en FP4 aprovechando la memoria de la GB10.
   - [DockerHub / GitHub: Avarok vLLM NVFP4 for GB10](https://github.com/avarok-cybersecurity)

2. **`eugr/spark-vllm-docker` (Eugr)**:
   - Build recipes y contenedores Docker para desplegar modelos como *Nvidia Nemotron* y *Qwen 2.5* en estaciones DGX Spark / GB10.
   - [GitHub / Hugging Face: Eugr spark-vllm-docker](https://github.com/eugr)

3. **vLLM & SGLang Upstream**:
   - Soporte upstream de FlashInfer y parches comunitarios para habilitar inferencia acelerada en SM 12.1.
