# El Caso Vercel / Next.js: La Inyección de AGENTS.md y el "Guardrail Tax"

## Resumen Ejecutivo

En la evolución del desarrollo asistido por IA, **Next.js (Vercel)** protagonizó uno de los movimientos arquitectónicos más reveladores de la industria entre finales de 2024 y 2026 (con consolidación formal en Next.js 16.3+ y su rama *canary*).

El problema fundamental era crítico: **la inercia estadística de los Modelos de Lenguaje (LLMs)**. Modelos como Claude, GPT-4 o Cursor habían sido preentrenados con terabytes de código histórico de Next.js (versiones 12 a 14), plagados del antiguo *Pages Router* (`pages/`), métodos sincrónicos obsoletos (`getServerSideProps`, `getStaticProps`), importaciones de `next/router` (en lugar de `next/navigation`) y acceso sincrónico a `params` (que a partir de Next.js 15 se convirtieron en promesas asíncronas `await params`).

Como consecuencia directa, cuando un desarrollador pedía a un agente de IA generar o modificar código en Next.js, el modelo **alucinaba patrones incompatibles con total convicción**, rompiendo el build y generando una enorme frustración en la comunidad.

Para resolverlo, Vercel tomó una decisión drástica: **modificar localmente el entorno del desarrollador** mediante la inyección automatizada de archivos `AGENTS.md` y `CLAUDE.md` durante la ejecución de `next dev` y `create-next-app`, encabezados por una advertencia sin precedentes:

> **«This is NOT the Next.js you know»**

Este caso representa el ejemplo paradigmático del **"Guardrail Tax"** (el peaje de gobernanza que los creadores de software deben pagar para disciplinar la inercia de la IA).

---

## 1. Cronología Oficial y Evolución Técnica

| Versión / Fecha | Hito Técnico | Detalle e Impacto |
|---|---|---|
| **Octubre 2024 (Next.js 15)** | **Breaking Changes Asíncronos** | `params`, `searchParams`, `cookies()` y `headers()` pasan a ser promesas asíncronas (`async/await`). Los LLMs alucinan código sincrónico en masa. |
| **Principios 2025** | **Empaquetado de Docs en Local** | Vercel empieza a empaquetar documentación Markdown de la versión exacta dentro de `node_modules/next/dist/docs/` para evitar que los agentes dependan de internet o conocimiento congelado. |
| **Canary / 2025-2026** | **GitHub Discussion #92197** | Debate comunitario intenso sobre la creación automática de `AGENTS.md`, la sincronización en upgrades y la redacción del aviso: *"This is NOT the Next.js you know"*. |
| **Next.js 16.3+** | **Adopción Oficial de AGENTS.md** | `create-next-app` y `next dev` gestionan automáticamente el bloque `<!-- BEGIN:nextjs-agent-rules -->` cuando detectan un agente de código activo. Se incluye el flag `--no-agents-md` para desactivarlo. |

---

## 2. Anatomía de la Solución de Vercel

### A. El Bloque Gestionado (`<!-- BEGIN:nextjs-agent-rules -->`)
Para no sobreescribir las directrices personalizadas del desarrollador, Vercel implementó en `generate-agent-files.js` un sistema de bloques delimitados:

```markdown
<!-- BEGIN:nextjs-agent-rules -->
# Next.js Agent Rules

> ## CRITICAL: This is NOT the Next.js you know.
> Next.js has evolved significantly. Do NOT assume patterns from older versions.
> Before writing code, YOU MUST READ the documentation bundled in this repository.

Documentation is available at:
`node_modules/next/dist/docs/`

- App Router is required (do not use `pages/`).
- `params` and `searchParams` are Promises: `const { id } = await params;`.
- Use `next/navigation`, never `next/router`.
- Follow Server and Client Component boundaries strictly.
<!-- END:nextjs-agent-rules -->

<!-- El desarrollador puede añadir sus propias reglas de negocio aquí abajo sin que se borren -->
```

### B. Documentación "Air-Gapped" en `node_modules/next/dist/docs/`
Los agentes a menudo no tienen acceso a internet en entornos locales aislados o consumen tokens innecesarios consultando webs externas. Vercel resolvió esto distribuyendo las especificaciones canónicas de cada release dentro del propio paquete npm, garantizando que el agente consulte **la verdad exacta de la versión instalada**.

### C. Detección Inteligente del Agente
En lugar de saturar a desarrolladores tradicionales, `next dev` analiza variables de entorno e inspectores de procesos para identificar si herramientas como Claude Code, Cursor, Windsurf, GitHub Copilot o Cline están operando en el workspace, activando la inyección sólo cuando es necesario.

---

## 3. Debate Comunitario y Controversia (GitHub #92197)

La discusión en GitHub #92197 reflejó las tensiones entre desarrolladores y el auge de los agentes:
1. **Invasión del Workspace:** Desarrolladores cuestionaban que un comando de desarrollo (`next dev`) creara o modificara archivos rastreados por git sin autorización explícita.
2. **Evolución del Mensaje:** La frase *"This is NOT the Next.js you know"* fue debatida frente a fórmulas más asépticas. Vercel mantuvo el tono enérgico porque los benchmarks demostraron que los LLMs ignoraban advertencias suaves o genéricas.
3. **Drift entre Versiones:** Cuando un usuario actualizaba de versión (`npm update next`), `AGENTS.md` quedaba desincronizado si no se regeneraba, obligando a vincular la actualización del archivo al ciclo de vida del CLI.

---

## 4. La Lección para el Artesano de Software (AI Local Crafters)

El caso Next.js 16.3 / Vercel es la confirmación definitiva de la tesis de nuestra charla:

> **«Si el framework web más popular del planeta tiene que hackear su CLI e inyectar archivos markdown para gritarle a la IA y evitar que destruya el código... ¿cómo pretendes que un modelo respete la arquitectura de tu empresa sin ADRs inmutables ni contratos explícitos?»**

### Conclusiones Clave:
1. **Los LLMs no tienen buen juicio arquitectónico espontáneo:** Operan por probabilidad estadística sobre datos antiguos.
2. **El "Guardrail Tax" es real e inevitable:** Quien no invierte en gobernar el contexto del agente (ADRs, reglas de capas, invariantes) acaba pagando el impuesto en bugs y refactorizaciones infinitas.
3. **Las Living Specs son el futuro:** Documentación estructurada dentro del repo (`docs/adr/`, `docs/product/`, `AGENTS.md`) es la única interfaz confiable para un agente autónomo.

---

## 5. Enlaces y Fuentes de Referencia

### Documentación y Repositorios Oficiales
- **Next.js Official Documentation**: [AI Coding Agents Guide](https://nextjs.org/docs/app/guides/ai-agents)  
  *Explica la adopción de AGENTS.md / CLAUDE.md, node_modules/next/dist/docs/, la opción `--no-agents-md` y los marcadores de bloque.*
- **GitHub Discussions (Vercel)**: [Discussion #92197: Next.js should update AGENTS.md on upgrade](https://github.com/vercel/next.js/discussions/92197)  
  *Debate sobre el texto "This is NOT the Next.js you know", la sincronización en upgrades y la gestión del bloque.*
- **Next.js Monorepo (Canary)**: [packages/next/AGENTS.md](https://github.com/vercel/next.js/blob/canary/packages/next/AGENTS.md)  
  *Archivo oficial de directrices que el equipo de Vercel mantiene para los agentes que colaboran en el monorepo.*
- **Vercel Labs (Ejemplo en Producción)**: [openai-agents-api-v0-clone / AGENTS.md](https://github.com/vercel-labs/openai-agents-api-v0-clone/blob/main/AGENTS.md)  
  *Repositorio oficial donde se aprecia el bloque inyectado por `generate-agent-files.js`.*

### Análisis Técnico Externo
- **Blode.co Agent Skills**: [Análisis de arquitectura: scaffold-nextjs](https://blode.co/agent-skills/architecture/scaffold-nextjs)  
  *Desglose de cómo `next dev` comprueba el entorno para inyectar este bloque gestionado únicamente ante agentes activos.*
