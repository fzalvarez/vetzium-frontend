# vetzium-frontend — instrucciones para Claude

Frontend de Vetzium. Todo en **español**: dominio, código, documentación y respuestas.

Antes de trabajar, leer `docs/STATUS.md` y `docs/ARCHITECTURE.md`. No inventar reglas de
negocio: preguntar antes.

- Referencia de estructura y estilo: `hcvet-dev-frontend` (que a su vez sigue a `tms`):
  `features/<feature>/{pages,components,services,mappers,types,validation,store}`.
- Verificar con `pnpm build` y `pnpm lint` antes de dar algo por terminado.
- Claude hace commit al cerrar cada etapa verificada (build + lint en verde).
- Al terminar: actualizar `docs/STATUS.md`.
