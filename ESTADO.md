# Estado del proyecto — Tienda Nova

## Tienda
- Dominio: `nova-284120.myshopify.com`
- Panel: https://admin.shopify.com/store/nova-284120
- Tema: **Aurora** — `gid://shopify/OnlineStoreTheme/188759638050` (sin publicar)
- Vista previa: `https://nova-284120.myshopify.com/?preview_theme_id=188759638050`
- Editor: `https://admin.shopify.com/store/nova-284120/themes/188759638050/editor`

## Entorno de trabajo (importante)
Esta sesión corre en un entorno remoto en la nube (Claude Code Remote), no en
el ordenador del usuario. No hay Shopify CLI local ni `shopify store auth`.
En su lugar se usa directamente el conector oficial de Shopify (Admin GraphQL
API vía MCP) para leer/escribir productos y subir archivos del tema
(`themeFilesUpsert`, `themeDuplicate`). El repositorio de código vive en
GitHub: `jdans01/eccomerce`, rama `claude/shopify-ecommerce-design-9baf9g`.
La descarga directa de imágenes externas (p. ej. `cdn.shopify.com`) está
bloqueada por política de red del entorno — no se pueden inspeccionar fotos
de producto ni subir imágenes nuevas por esa vía en esta sesión.

## Producto leído
- Título: "Soporte Magnético para Teléfono en Auto - Agarre Firme 360°"
- ID: `gid://shopify/Product/8563793854498`
- Handle: `soporte-magnetico-para-telefono-en-auto-agarre-firme-360`
- Precio: 12.00 MXN
- 3 imágenes cargadas por el usuario (fotos de proveedor, decisión: **mantenerlas
  tal cual**, sin generación de fotos IA)
- Descripción original conservada (buena calidad, formato de bullets)

## Decisiones de diseño (brief)
- Producto: accesorio tecnológico para auto (soporte magnético de teléfono)
- Estilo: técnico y confiable — fondo claro grafito/gris frío, header y footer
  oscuros, acento azul eléctrico `#2563EB`
- Tipografía: títulos `poppins_n7` (bold, impacto), cuerpo `inter_n4`
- Esquinas: `6px` (más rectas, look tech)
- Estructura de portada: hero enlazando directo al producto → franja de
  confianza (iconos) → producto destacado → 3 pasos de instalación → tabla de
  especificaciones → testimonios → FAQ → newsletter

## Secciones creadas (además de las base)
`hero`, `icon-row`, `featured-collection`, `steps` (nueva), `specs-table`
(nueva), `testimonials`, `faq`, `newsletter`, `announcement-bar`, `header`,
`footer`, `contact-form`, y todas las de `main-*` (producto, colección,
carrito, búsqueda, 404, página, blog, artículo, lista de colecciones).

## Pendiente / no hecho en esta sesión
- [ ] Favicon (bloqueado: no se pueden subir imágenes por restricción de red)
- [ ] Fotos IA del producto (el usuario decidió mantener las del proveedor)
- [ ] Título/descripción del catálogo: se dejaron los del usuario, no se
      reescribieron (ya eran de buena calidad)
- [ ] Páginas legales: el footer ya enlaza automáticamente `shop.policies`;
      falta que el usuario las redacte en Shopify Admin → Configuración →
      Políticas (se mostrarán solas en el footer en cuanto existan)
- [ ] Revisión visual con navegador/capturas (no disponible en este entorno)
- [ ] Publicar el tema como activo (queda sin publicar a la espera del visto
      bueno del usuario)

## Última actualización
2026-07-28 — commit `013733d` + subida de assets/base.css, config/settings_data.json
y templates/index.json actualizados directamente al tema vía Admin API.
