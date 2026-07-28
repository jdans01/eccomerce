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

## Fix del menú + hero más impactante (última ronda)
El usuario reportó (con captura) que el menú se veía roto: el botón de
hamburguesa aparecía siempre visible en escritorio junto al menú de texto,
partiendo el encabezado en dos filas y desplazando los iconos de
búsqueda/cuenta/carrito a una posición extraña debajo.
- **Causa raíz encontrada**: en `assets/base.css`, la regla
  `.site-header__nav-toggle { display: none; }` (pensada para ocultar el
  botón de hamburguesa en escritorio) y la regla `.header-icon-btn { display:
  inline-flex; }` (definida más abajo en el archivo) tenían la misma
  especificidad CSS (una sola clase). Al empatar en especificidad gana la
  que aparece después en el archivo — así que `header-icon-btn` sobreescribía
  el `display: none` y el botón de menú móvil nunca se ocultaba en escritorio,
  rompiendo la cuadrícula de 3 columnas del header (nav, logo, iconos) en dos
  filas. Corregido subiendo la especificidad a `.header-icon-btn.site-header__nav-toggle`
  tanto en la regla base como en la de la media query móvil.
- **Hero más impactante**: la sección `hero.liquid` ahora acepta un selector
  de producto (`type: product`, igual patrón que `video-showcase` y
  `feature-grid`) y usa `product.featured_image` como fondo si no hay una
  imagen manual — así el hero muestra una foto real del producto en vez de
  quedar en fondo plano. Se asignó el producto en `templates/index.json`.
  También se mejoró el scrim (degradado radial + lineal más oscuro y
  cinematográfico) y se añadió `text-shadow` al título para legibilidad, más
  dos manchas de resplandor (`hero__glow`) en color acento para el caso
  `hero--plain` (sin imagen).
- Subido a Shopify vía `themeFilesUpsert`: `assets/base.css`,
  `sections/hero.liquid`, `templates/index.json`. Tema verificado sin
  errores.

## Foto del hero más visible + texto con contorno (última ronda)
El usuario pidió que la foto de fondo del hero se viera con más
transparencia (menos oscurecida) y que el texto resaltara con bordes para
seguir siendo legible sobre la imagen:
- `.hero__scrim` (el degradado oscuro sobre la foto) se aclaró bastante:
  opacidades máximas bajaron de 0.94/0.7/0.6/0.3 a 0.7/0.4/0.36/0.1 — la foto
  real del producto ahora se ve mucho más, especialmente en el lado derecho.
- El título del hero (`h1`) ahora lleva un contorno de texto real
  (`-webkit-text-stroke`) más una sombra en las 4 direcciones (simula borde
  en navegadores sin soporte de `text-stroke`) y una sombra difusa adicional,
  para que siga leyéndose nítido incluso con la foto más visible detrás.
  El `eyebrow` y el párrafo también llevan sombra de texto más marcada.
  En el modo sin imagen (`hero--plain`) estas sombras/contorno se anulan
  para no ensuciar el texto sobre fondo sólido.
- Subido a Shopify vía `themeFilesUpsert`: `assets/base.css`. Tema
  verificado sin errores.

## Corrección de saturación visual del hero (última ronda)
Tras aclarar el scrim en la ronda anterior, el usuario reportó que el hero
"se ve muy saturado". Causa: la foto de fondo elegida (imagen destacada del
producto) es en realidad una de las infografías de marketing del proveedor,
con texto y flechas propias ya impresos en la imagen ("Rotación 360°",
"Rotación 180°", "Gira la perilla para bloquear", etc.). Al aclarar el
scrim, ese texto de la imagen quedó tan visible como el texto real del hero
(título, párrafo), compitiendo entre sí y generando una sensación de
desorden/saturación visual.
- Solución: en vez de mostrar la foto nítida, se le aplicó
  `filter: blur(9px) saturate(0.85) brightness(0.82)` (con `transform:
  scale(1.06)` para tapar los bordes que difumina el blur) — así la imagen
  aporta el ambiente/color del producto sin que sus textos y flechas
  compitan con el texto real del hero.
- El scrim volvió a subir a un punto intermedio (ni tan oscuro como el
  original ni tan claro como la ronda anterior) para reforzar el contraste.
- Subido a Shopify vía `themeFilesUpsert`: `assets/base.css`. Tema
  verificado sin errores.

## Título de producto apareciendo cortado bajo el header (última ronda)
El usuario envió una captura de la página de producto donde el título se veía
cortado en la parte superior, sin el encabezado visible encima — se veía
desordenado. Intenté cargar la página en vivo con un navegador (Playwright)
para diagnosticarlo con precisión, pero el acceso de red desde este entorno
a la tienda real está bloqueado por la política del sandbox (confirmado con
`ERR_TUNNEL_CONNECTION_FAILED` al intentar salir por el proxy configurado);
no insistí en rodear esa restricción, como indican las reglas del entorno.
Revisé el código estáticamente: no encontré overflow en los ancestros del
header que rompiera su `position: sticky`, así que apliqué las correcciones
defensivas estándar para esta clase de síntoma (contenido que parece
saltar/recortarse justo debajo del header tras la carga):
- `overflow-anchor: none;` en `html` — desactiva el "scroll anchoring" de
  Chrome, que puede reajustar automáticamente la posición de scroll cuando
  hay cambios de layout tras la carga (p. ej. al intercambiar la fuente web
  por `font-display: swap`, o al actualizarse el contador del carrito).
- `.site-header__inner` ahora tiene `min-height: 76px` para que el alto del
  header nunca colapse o cambie bruscamente.
- `.product-main` subió su `padding-top` de 40px a 56px para dar más aire
  bajo el header en la página de producto.
- Subido a Shopify vía `themeFilesUpsert`: `assets/base.css`. Tema
  verificado sin errores.
- **Pendiente de confirmación del usuario**: como no pude reproducir la
  vista en vivo yo mismo, conviene que revise la página de producto de nuevo
  tras esta subida y confirme si el problema desapareció.

## Descripción corta del producto como lista real (última ronda)
El usuario mostró una captura de la descripción corta bajo el precio: el
texto del proveedor usa emojis ✅ como separadores de característica, pero
al pasarlo por `strip_html` se perdían los saltos de línea originales y todo
quedaba fundido en un párrafo denso, difícil de leer.
- `sections/main-product.liquid`: ahora se detecta si la descripción tiene
  más de un segmento separado por "✅"; si es así, se renderiza como una
  lista real (`<ul class="product-info__feature-list">`) con un icono de
  check delante de cada punto, en vez del párrafo corrido. Si la descripción
  no sigue ese patrón, se conserva el comportamiento anterior (párrafo con
  `truncatewords`).
- Nuevo estilo `.product-info__feature-list` en `assets/base.css`.
- Subido a Shopify vía `themeFilesUpsert`: `sections/main-product.liquid`,
  `assets/base.css`. Tema verificado sin errores.

## Pendiente / no hecho en esta sesión
- [ ] Favicon (bloqueado: no se pueden subir imágenes por restricción de red)
- [ ] Fotos IA del producto (el usuario decidió mantener las del proveedor)
- [ ] Título/descripción del catálogo: se dejaron los del usuario, no se
      reescribieron (ya eran de buena calidad)
- [ ] Revisión visual con navegador/capturas (no disponible en este entorno)
- [ ] Publicar el tema como activo (queda sin publicar a la espera del visto
      bueno del usuario)

## Última actualización
2026-07-28 — La descripción corta del producto ahora se muestra como una
lista real de viñetas con check en vez de un párrafo denso (detecta el
patrón "✅" del proveedor). Subido y verificado en el tema `188794273826`
sin errores.
