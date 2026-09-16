# El Caso Vercel / Next.js: Empaquetado de Documentación, AGENTS.md y Gobernanza de Agentes

## Resumen Ejecutivo

En las versiones **Next.js 16.2 y 16.3+ (2026)**, el equipo de Vercel introdujo cambios arquitectónicos específicos dirigidos a agentes de código (Claude Code, Cursor, GitHub Copilot, Codex, etc.).

El motivo técnico es concreto: **el desfase temporal del entrenamiento de los modelos**. Los LLMs han sido entrenados con millones de repositorios que utilizan versiones anteriores de Next.js (Pages Router con `pages/`, métodos sincrónicos como `getServerSideProps` o `getStaticProps`, el paquete de enrutamiento legacy `next/router` en vez de `next/navigation`, o el acceso síncrono a `params`, que a partir de Next.js 15 pasó a ser una promesa asíncrona `await params`).

Debido a esto, los agentes tienden a generar código obsoleto con alta confianza estadística si dependen únicamente de sus pesos preentrenados.

Para solventar este problema de forma determinista y sin requerir conexión a internet durante la codificación, Next.js implementó tres mecanismos:
1. **Documentación empaquetada en local:** Cada instalación de Next.js incluye su documentación exacta dentro de `node_modules/next/dist/docs/`.
2. **Inyección condicional de `AGENTS.md` / `CLAUDE.md`:** A partir de Next.js 16.3, el comando `next dev` detecta si se está ejecutando en el entorno de un agente y, si no existe el archivo, genera o actualiza un bloque gestionado delimitado.
3. **El aviso de divergencia:** El encabezado del bloque advierte explícitamente al modelo: `# This is NOT the Next.js you know`, instruyéndole a leer la documentación local antes de generar código.

---

## 1. Cronología de la Funcionalidad en Next.js

| Versión | Estado de la Documentación para Agentes | Mecanismo de Configuración |
|---|---|---|
| **≤ Next.js 16.1** | La documentación no venía empaquetada en el paquete npm. | Se requería ejecutar un codemod externo (`npx @next/codemod@canary agents-md`) que descargaba una copia a `.next-docs/`. |
| **Next.js 16.2** | Se comienza a empaquetar la documentación en `node_modules/next/dist/docs/`. | El archivo `AGENTS.md` no se generaba automáticamente. El texto inicial propuesto era: `## Next.js: ALWAYS read docs before coding`. |
| **Next.js 16.3+** | Documentación empaquetada por defecto en todos los proyectos. | `create-next-app` genera `AGENTS.md` (con opción `--no-agents-md`). `next dev` detecta agentes y auto-inyecta el bloque gestionado. El texto pasa a `# This is NOT the Next.js you know`. |

---

## 2. Detalles Técnicos de la Implementación

### A. Estructura de la Documentación en `node_modules`
La carpeta `node_modules/next/dist/docs/` replica exactamente la estructura del sitio oficial de documentación:
```txt
node_modules/next/dist/docs/
├── 01-app/
│   ├── 01-getting-started/
│   ├── 02-guides/
│   └── 03-api-reference/
├── 02-pages/
├── 03-architecture/
└── index.mdx
```
Esto permite que cualquier agente con capacidad de lectura de ficheros locales acceda a las especificaciones exactas de la versión instalada sin realizar peticiones HTTP externas.

### B. El Bloque Gestionado (`generate-agent-files.js`)
El script responsable de esta gestión se localiza en `node_modules/next/dist/server/lib/generate-agent-files.js`. El bloque inyectado utiliza marcadores HTML para respetar las instrucciones propias del repositorio:

```markdown
<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
```

En el caso de Claude Code, se genera adicionalmente un archivo `CLAUDE.md` que apunta al archivo principal:
```markdown
@AGENTS.md
```

### C. Mecanismos de Exclusión (Opt-out)
* Al inicializar: `npx create-next-app --no-agents-md`
* En configuración de proyecto (`next.config.ts`):
  ```typescript
  import type { NextConfig } from 'next'

  const nextConfig: NextConfig = {
    agentRules: false,
  }

  export default nextConfig
  ```

---

## 3. Discusión Técnica en GitHub: Sincronización en Upgrades (#92197)

En la discusión técnica [vercel/next.js Discussion #92197](https://github.com/vercel/next.js/discussions/92197), un desarrollador planteó el problema de la persistencia de reglas al actualizar dependencias:
* **Problema reportado:** Al actualizar Next.js mediante `npm i next@latest`, el archivo `AGENTS.md` ya existente no se actualizaba, manteniendo versiones antiguas de las directrices o del texto preliminar (`## Next.js: ALWAYS read docs before coding`).
* **Respuesta del equipo de Vercel:** Se aclaró que el texto definitivo `# This is NOT the Next.js you know` se consolidó en la release 16.2.0, y que el comando oficial de actualización del framework (`next upgrade`) es el encargado de refrescar el contenido del bloque gestionado para mantener la coherencia con la versión recién instalada.

---

## 4. Análisis Arquitectónico y Psicológico del Prompting

### A. El fallo de las advertencias suaves
Cuando las directrices usan frases amables o condicionales (*"Please make sure to check the latest docs"*, *"Be aware that some APIs might have changed"*), los LLMs tienden a tratarlas como sugerencias de baja prioridad frente a los millones de ejemplos de código de versiones anteriores que dominan sus pesos de entrenamiento.

### B. Técnica de *pattern interruption*
El encabezado `# This is NOT the Next.js you know` funciona como una instrucción de parada abrupta. Al contradecir de forma tan categórica la premisa previa del modelo, eleva la probabilidad de que el LLM ejecute la llamada a herramienta (*tool use* para leer `node_modules/next/dist/docs/`) antes de generar sintaxis obsoleta.

### C. El problema de Next.js en particular
Pocos frameworks han acumulado tantas capas de paradigmas divergentes en tan poco tiempo:
* **Pages Router** (`getStaticProps`, `getServerSideProps`, `next/router`).
* **App Router v13/v14** con `fetch` cacheado agresivo por defecto.
* **Server Components y Server Actions en v15 y v16** (con `await params`, `connection()`, APIs asíncronas).

La única forma de evitar que la IA mezcle 2021 con 2026 era forzarla a ignorar su memoria base y obligarla a consultar la documentación empaquetada.

### D. Relevancia para la Arquitectura de Software
1. **La inercia del modelo es un hecho objetivo:** Incluso en frameworks con millones de descargas, los modelos continúan proponiendo APIs obsoletas si no se acota su contexto con documentación local vinculada a la versión instalada.
2. **Las directrices en el repositorio son necesarias:** La estrategia de Vercel confirma que delegar código en agentes requiere "raíles" explícitos (en su caso, `AGENTS.md` y `node_modules/next/dist/docs/`; en el ciclo artesano, **ADRs inmutables y contratos de dominio**).
3. **Mantenimiento sin drift:** La sincronización de las reglas debe formar parte del ciclo de vida del proyecto para evitar que la documentación de gobierno diverja del código real.

---

## 5. Fuentes Primarias y Enlaces

1. **Guía Oficial de Next.js:** [Next.js Documentation: AI Coding Agents](https://nextjs.org/docs/app/guides/ai-agents) (versión 16.3.5, septiembre 2026).
2. **Discusión en GitHub:** [vercel/next.js Discussion #92197: Next.js should update AGENTS.md on upgrade](https://github.com/vercel/next.js/discussions/92197).
3. **Monorepo Oficial de Next.js:** [packages/next/AGENTS.md en rama canary](https://github.com/vercel/next.js/blob/canary/packages/next/AGENTS.md).
4. **Ejemplo en Repositorio Público:** [Vercel Labs: openai-agents-api-v0-clone / AGENTS.md](https://github.com/vercel-labs/openai-agents-api-v0-clone/blob/main/AGENTS.md).
5. **Análisis de Arquitectura:** [Blode.co: scaffold-nextjs (Agent Skills)](https://blode.co/agent-skills/architecture/scaffold-nextjs).
