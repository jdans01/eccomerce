# Estado del proyecto — Tienda Nova

## Tienda
- Dominio: `nova-284120.myshopify.com`
- Panel: https://admin.shopify.com/store/nova-284120
- Tema: **Aurora** — `gid://shopify/OnlineStoreTheme/188794273826` (sin publicar)
- Vista previa: `https://nova-284120.myshopify.com/?preview_theme_id=188794273826`
- Editor: `https://admin.shopify.com/store/nova-284120/themes/188794273826/editor`
- Nota: el tema se recreó una vez durante esta sesión (el ID anterior,
  `188759638050`, desapareció de la tienda — probablemente eliminado desde el
  panel). Si vuelve a desaparecer, duplicar `Horizon` (tema MAIN) de nuevo con
  `themeDuplicate` y repetir la subida de archivos con `themeFilesUpsert`.

## Entorno de trabajo (importante)
Esta sesión corre en un entorno remoto en la nube (Claude Code Remote), no en
el ordenador del usuario. No hay Shopify CLI local ni `shopify store auth`.
En su lugar se usa directamente el conector oficial de Shopify (Admin GraphQL
API vía MCP) para leer/escribir productos y subir archivos del tema
(`themeFilesUpsert`, `themeDuplicate`). El repositorio de código vive en
GitHub: `jdans01/eccomerce`, rama `claude/shopify-ecommerce-design-9baf9g`.
La descarga directa de imágenes externas (p. ej. `cdn.shopify.com`) está
bloqueada por política de red del entorno — no se pueden inspeccionar fotos
de producto ni subir imágenes nuevas por esa vía en esta sesión. El usuario
sí pudo pegar una captura de un gráfico de marketing del producto directamente
en el chat, lo cual permitió validar/afinar la paleta y enriquecer los textos
con detalles reales (rotación en 3 ejes, diseño plegable, almohadillas
adhesivas).

## Producto leído
- Título: "Soporte Magnético para Teléfono en Auto - Agarre Firme 360°"
- ID: `gid://shopify/Product/8563793854498`
- Handle: `soporte-magnetico-para-telefono-en-auto-agarre-firme-360`
- Precio: 12.00 MXN
- 3 imágenes cargadas por el usuario (fotos de proveedor, decisión: **mantenerlas
  tal cual**, sin generación de fotos IA)
- Descripción original conservada (buena calidad, formato de bullets)
- Detalles confirmados vía captura del usuario: aro magnético con rotación en
  3 ejes independientes (180° / 360° / 180°), diseño plegable/compacto,
  almohadillas adhesivas, bloqueo por perilla. Colores negro/plata.

## Decisiones de diseño (brief) — v2, rediseño completo desde 0
- Producto: accesorio tecnológico para auto (soporte magnético de teléfono)
- Estilo: **modo oscuro premium** — fondo casi negro `#0B0D11`, tarjetas
  `#161920`, texto casi blanco, acento **ámbar/naranja vivo `#FF7A29`**
  (confirmado por los gráficos de marketing reales del producto, que usan
  exactamente ese tono sobre fondo negro)
- Tipografía: títulos `poppins_n7` (bold), cuerpo `inter_n4`
- Esquinas: `0px` (rectas, look técnico/premium)
- Espaciado entre secciones: `72px`
- Estructura de portada (compuesta distinta a la v1, con anclas funcionales
  `#steps` y `#specs`): hero (enlaza directo al producto + botón "Cómo
  funciona") → franja de confianza (iconos) → spotlight producto
  (imagen+texto editorial) → especificaciones (tabla, con ancla) → pasos de
  instalación (con ancla) → testimonios → FAQ → newsletter
- Footer enlaza automáticamente `shop.policies` (páginas legales) en cuanto el
  usuario las redacte en Shopify Admin → Configuración → Políticas

## Secciones creadas (además de las base)
`hero`, `icon-row`, `featured-collection`, `steps` (nueva), `specs-table`
(nueva), `image-with-text`, `testimonials`, `faq`, `newsletter`,
`announcement-bar`, `header`, `footer`, `contact-form`, y todas las de
`main-*` (producto, colección, carrito, búsqueda, 404, página, blog,
artículo, lista de colecciones).

## Pendiente / no hecho en esta sesión
- [ ] Favicon (bloqueado: no se pueden subir imágenes por restricción de red)
- [ ] Fotos IA del producto (el usuario decidió mantener las del proveedor)
- [ ] Título/descripción del catálogo: se dejaron los del usuario, no se
      reescribieron (ya eran de buena calidad)
- [ ] Revisión visual con navegador/capturas (no disponible en este entorno)
- [ ] Publicar el tema como activo (queda sin publicar a la espera del visto
      bueno del usuario)

## Última actualización
2026-07-28 — Rediseño completo (v2): paleta oscura + ámbar, nueva estructura
de portada, textos enriquecidos con detalles reales del producto. Tema
recreado (`188794273826`) tras la desaparición del anterior y repoblado por
completo vía `themeFilesUpsert`.
