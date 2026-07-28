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

## Bugs corregidos tras feedback del usuario
- El filtro `font_face` de Shopify devuelve CSS crudo, no una etiqueta
  `<style>` completa — sin envolverlo, el texto de las declaraciones
  `@font-face` se filtraba como contenido visible al inicio de la página
  (el navegador reubica texto suelto inválido dentro de `<head>` hacia el
  `<body>`). Corregido envolviendo ambas llamadas en un único `<style>`.
- La sección "spotlight" de la portada no mostraba ninguna foto real del
  producto (usaba `image-with-text` con un `image_picker` vacío). Se creó
  `sections/featured-product.liquid`, que en vez de una imagen estática usa
  un selector de producto (`type: product`) y renderiza
  `featured_product.featured_image` en vivo desde Shopify — esto no requiere
  que el asistente descargue ninguna imagen, el navegador del cliente la pide
  directamente al CDN de Shopify.

## Video del producto
El producto tiene, además de las 3 fotos, un video de demostración nativo
(`gid://shopify/Video/31633354948642`). Se integró en:
- **Galería de producto**: las miniaturas ahora recorren `product.media`
  (no solo `product.images`); la del video muestra el fotograma de vista
  previa con una insignia de "reproducir" y, al hacer clic, sustituye el
  visor principal por un `<video>` real con controles.
- **Nueva sección `video-showcase`** en la portada, justo después del hero:
  video en autoplay/mudo/loop de fondo con texto superpuesto y botón de
  compra — usa un selector de producto y toma su video en vivo (o su foto
  si no tuviera video), sin necesitar que el asistente descargue nada.

## Galería de las 3 imágenes reales + animaciones (última ronda)
El usuario pidió mostrar las 3 fotos reales del producto en la portada (no
solo una) y hacer la tienda "más estética y animada":
- **Nueva sección `feature-grid.liquid`**: reemplaza al antiguo spotlight de
  una sola imagen (`featured-product`) en la portada. Recorre
  `feature_product.images limit: 3` en vivo (selector de producto), así que
  muestra las 3 infografías reales del proveedor sin que el asistente tenga
  que descargar nada. `templates/index.json` cambió la sección `spotlight`
  por `features` (tipo `feature-grid`) y actualizó el `order`.
- **Corrección de recorte**: `.image-with-text__media img` pasó de
  `aspect-ratio: 4/3; object-fit: cover` a `aspect-ratio: 1/1; object-fit:
  contain`, y `card_image_ratio` pasó de `portrait` a `square`, para que las
  imágenes cuadradas (1254×1254) del proveedor no corten el texto de las
  infografías. `.feature-grid__item img` usa el mismo `object-fit: contain`.
- **Sistema de animación** añadido en `assets/base.css` y `assets/theme.js`:
  - Aparición al hacer scroll (`.reveal` + `IntersectionObserver` en
    `theme.js`) sobre tarjetas de producto, testimonios, pasos, specs, FAQ,
    galería de detalles, etc., con `prefers-reduced-motion` respetado.
  - Animación de entrada del hero y del video-showcase (`@keyframes
    heroFadeUp`).
  - Efectos hover de elevación (`translateY` + sombra) en tarjetas de
    producto, testimonios, pasos, colecciones y la nueva galería de detalles.
- Subido a Shopify vía `themeFilesUpsert`: `sections/feature-grid.liquid`,
  `assets/theme.js`, `assets/base.css`, `templates/index.json`. Tema
  verificado sin errores (`processing: false, processingFailed: false`).

## Pendiente / no hecho en esta sesión
- [ ] Favicon (bloqueado: no se pueden subir imágenes por restricción de red)
- [ ] Fotos IA del producto (el usuario decidió mantener las del proveedor)
- [ ] Título/descripción del catálogo: se dejaron los del usuario, no se
      reescribieron (ya eran de buena calidad)
- [ ] Revisión visual con navegador/capturas (no disponible en este entorno)
- [ ] Publicar el tema como activo (queda sin publicar a la espera del visto
      bueno del usuario)

## Última actualización
2026-07-28 — Galería de las 3 imágenes reales del producto en portada
(`feature-grid`) + sistema de animaciones (scroll-reveal, hover, entrada del
hero). Subido y verificado en el tema `188794273826` sin errores.
