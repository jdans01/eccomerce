# Estado del proyecto — Tienda RADIANT MX (antes "Nova")

## ⚠️ PIVOTE DE MARCA (2026-09-06) — leer primero
La tienda cambió de negocio por completo. Ya NO vende el soporte magnético
para auto ("Nova"). Ahora es **RADIANT MX**, una marca de herramientas de
belleza/cuidado capilar (alisadores, peines térmicos, masajeador infrarrojo).
El nombre de la tienda en Shopify (`shop.name`) ya es "Radiant-Mx".

## ⚠️ EL TEMA EN VIVO PERDIÓ TODO EL CÓDIGO PERSONALIZADO — CRÍTICO
Durante esta sesión se descubrió que el tema que el usuario publicó
("Aurora - Borrador", `gid://shopify/OnlineStoreTheme/189110583330`, aún
con ese ID y nombre) **ya NO contiene ninguno de nuestros archivos
personalizados** (`sections/hero.liquid`, `assets/base.css`, etc.) — en su
lugar tiene el conjunto de archivos completo del tema genérico de Shopify
**Horizon** (`component-mega-menu.css`, `cart-disclosure-modal.js`, etc.).
Es decir: **la tienda en vivo ahora mismo muestra el tema por defecto de
Shopify, no nuestro diseño**, aunque `settings_data.json` sí conserva nuestra
paleta/copy (pero probablemente sin efecto, porque el `settings_schema.json`
de Horizon usa IDs de ajuste distintos).
- **Causa muy probable**: el tema duplicado seguía "vinculado" a su origen
  (Horizon), y Shopify ofrece un aviso de "actualizar tema" para temas
  derivados de temas de la tienda de temas. Si se acepta esa actualización,
  Shopify **reemplaza todo el código** por la versión más reciente del tema
  base, conservando como mucho `settings_data.json`.
- **Instrucción crítica para el usuario, a repetir siempre que se le pida
  publicar un borrador**: en Shopify admin → Tienda online → Temas, al lado
  del tema borrador puede aparecer un botón/aviso de "Actualizar" además del
  de "Publicar" — **debe usar solo "Publicar", nunca "Actualizar"**, o se
  perderá todo el código de nuevo.
- **Buena noticia**: el tema `Aurora` original (`gid://shopify/OnlineStoreTheme/188794273826`,
  role `UNPUBLISHED`) seguía intacto con todo el código personalizado. Se
  usó como base para reconstruir todo lo demás (ver abajo).

## Tienda
- Dominio: `nova-284120.myshopify.com` (el nombre visible ya es "Radiant-Mx",
  el dominio myshopify no cambió)
- Panel: https://admin.shopify.com/store/nova-284120
- Tema **PUBLICADO/en vivo ahora mismo**: `gid://shopify/OnlineStoreTheme/189110583330`
  ("Aurora - Borrador") — **corrupto, es el tema Horizon genérico** (ver
  aviso arriba). El usuario intentó publicar el correcto pero **republicó
  este mismo tema corrupto por segunda vez** (ver ronda "Segunda
  republicación equivocada" más abajo) — sigue siendo el que está en vivo.
- **Tema borrador correcto, listo para publicar** (con todo el rediseño de
  RADIANT MX): `gid://shopify/OnlineStoreTheme/190280695842`, **renombrado
  a "✅ RADIANT MX - PUBLICAR ESTE"** (antes se llamaba solo "RADIANT MX",
  lo que causó la confusión) — duplicado desde el `Aurora` original intacto
  (`188794273826`).
  Vista previa: `https://nova-284120.myshopify.com/?preview_theme_id=190280695842`
  Editor: `https://admin.shopify.com/store/nova-284120/themes/190280695842/editor`
- Existe además un borrador **inútil y fácil de confundir**:
  `gid://shopify/OnlineStoreTheme/190280630306`, **renombrado a
  "❌ NO USAR - tema corrupto"** — es un duplicado hecho por error a partir
  del tema `189110583330` ya corrupto (Horizon genérico), no tiene ningún
  archivo personalizado. No usar bajo ningún concepto.
- El `Aurora` original (`188794273826`, UNPUBLISHED) se conserva intacto
  como respaldo — es la última copia 100% funcional con todos los archivos
  personalizados, aunque con contenido viejo (Nova/soporte de auto).
- **Flujo de trabajo** (sigue igual que antes): el tema en vivo nunca se
  puede editar directamente (`themeFilesUpsert` lo rechaza). Todo cambio se
  sube a un tema borrador, y el usuario debe publicarlo manualmente desde el
  panel — **usando el botón "Publicar", nunca "Actualizar"**, y buscando el
  tema exactamente por el nombre **"✅ RADIANT MX - PUBLICAR ESTE"**.

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

## Catálogo actual — RADIANT MX (vigente desde el pivote)
3 productos reales y activos, todos vendor "RADIANT MX", en la colección
`bestsellers-radiant` y `belleza-y-cuidado-personal` (ambas estaban vacías,
se les agregaron los 3 productos durante esta ronda):
1. **Cepillo Alisador Profesional con Tecnología Iónica** — $280.00 MXN —
   `gid://shopify/Product/8622996062242` — handle
   `cepillo-alisador-profesional-con-tecnologia-ionica` — 2 imágenes —
   descripción con lista `<ul><li>` real (no emoji ✅).
2. **Peine Térmico Profesional** — $200.00 MXN —
   `gid://shopify/Product/8622996095010` — handle `peine-termico-profesional`
   — 1 imagen.
3. **Peine Masajeador Infrarrojo** — $572.00 MXN (el más caro, "flagship") —
   `gid://shopify/Product/8622996160546` — handle
   `peine-masajeador-infrarrojo` — 3 imágenes (usado en el spotlight y en la
   galería `feature-grid` de la portada).
- **OJO**: al buscar productos con `search_products` aparecían otros 3
  productos (alisador de "Beauty At You", peine de "Eqwh Store", peine con
  luz roja de "dropi") pero **no existen realmente** — fallan con
  "Product not found" al consultarlos por ID directo o vía GraphQL
  `products(...)`, y no tienen imágenes. Probablemente sobras de una
  herramienta de importación que no se completó. Se excluyeron del sitio.
  Si el usuario de verdad quiere venderlos, hay que crearlos/completarlos
  primero.
- Todos los productos tienen `inventoryItem.tracked: false` y
  `availableForSale: true` — el checkout no está bloqueado por inventario.
- Tarifas de envío reales configuradas en Shopify (`deliveryProfiles`):
  Estándar $150 MXN, Exprés $195 MXN, envío gratis automático desde $1,050
  MXN. El ajuste `cart_free_shipping_threshold` del tema ya se corrigió a
  `"1050"` para que coincida.

## Producto leído (HISTÓRICO — ya no aplica, ver arriba)
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

## Error de Liquid en el footer + logo pendiente (última ronda)
El usuario reportó el error visible al final de la página: `Liquid error
(sections/footer line 56): input to image_tag must be an image_url`.
- **Causa**: `sections/footer.liquid` línea 56 encadenaba
  `{{ type | payment_type_img_url | image_tag: alt: type }}`. El filtro
  `payment_type_img_url` devuelve una URL como texto plano, no el objeto
  especial "image_url drop" que el filtro `image_tag` exige — de ahí el
  error. Corregido construyendo la etiqueta `<img>` a mano con esa URL en
  vez de encadenar `image_tag`.
- Subido a Shopify vía `themeFilesUpsert`: `sections/footer.liquid`. Tema
  verificado sin errores.
- **Logo "NOVA-MX"**: el usuario pegó una imagen del logo en el chat y pidió
  usarla. El ajuste `logo` (selector de imagen) ya existe en
  `sections/header.liquid`, listo para recibirla — pero en este entorno
  remoto no tengo forma de tomar el archivo que el usuario pegó en el chat
  (no queda guardado como archivo accesible para mí, y no hay una vía de red
  disponible para subir bytes de imagen directamente al CDN de Shopify desde
  aquí). Le pedí que la suba él mismo desde el editor de Shopify (2 clics),
  ya que es la única vía posible en este caso.

## Testimonios como carrusel + más opiniones (última ronda)
El usuario pidió que la sección "Opiniones" se viera como carrusel y con más
reseñas.
- `sections/testimonials.liquid`: la cuadrícula fija de 3 columnas se
  reemplazó por un carrusel horizontal con scroll-snap (`.testimonials-carousel`
  + `.testimonials-carousel__track`), con flechas de navegación
  (prev/next) junto al título de la sección. Sin librerías externas, mismo
  patrón "vanilla JS" del resto del tema.
- `assets/theme.js`: nuevo bloque `[data-carousel]` que localiza las
  flechas dentro de la misma `.shopify-section` y hace scroll suave por el
  ancho de una tarjeta.
- `assets/base.css`: nuevos estilos `.carousel-nav`, `.carousel-arrow`,
  `.testimonials-carousel(__track)`; `.testimonial-card` pasó de ser un
  ítem de grid a un ítem flex con `scroll-snap-align`. Se quitó la regla
  `.testimonials { grid-template-columns: 1fr; }` (obsoleta, el layout
  responsivo ahora lo maneja el ancho `min(360px, 82vw)` de cada tarjeta).
- `templates/index.json`: de 3 a 7 testimonios (t1–t7), variados y
  relacionados con features reales (imán en baches, instalación rápida,
  compatibilidad con teléfonos grandes, diseño plegable).
- Nuevas claves de idioma `general.accessibility.previous_slide` /
  `next_slide` en `locales/es.json` y `en.default.json` para las flechas.
- Subido a Shopify vía `themeFilesUpsert`: `sections/testimonials.liquid`,
  `assets/theme.js`, `assets/base.css`, `templates/index.json`,
  `locales/es.json`, `locales/en.default.json`. Tema verificado sin
  errores.

## Foto "COOL BLACK" a un costado en portada (última ronda)
El usuario pegó en el chat una foto limpia del producto sobre fondo blanco
("COOL BLACK — Strong Magnetic Car Phone Holder") y pidió agregarla a un
costado en la portada.
- Antes de intentar nada con el archivo pegado (que en este entorno no
  puedo tomar, ver ronda anterior sobre el logo), consulté el producto en
  Shopify con `get-product` y confirmé que ahora tiene **4 imágenes** (antes
  eran 3) — la última (`image_012.webp`) se subió después del último
  catálogo registrado aquí, casi con certeza es la misma foto que el
  usuario compartió. Así que no hizo falta subir nada: se referenció en
  vivo desde el producto.
- `sections/image-with-text.liquid` (ya existía, con layout imagen-a-un-lado
  + texto-al-otro) ahora acepta opcionalmente un selector de producto +
  índice de foto (`image_index`), igual patrón que `hero`/`video-showcase`/
  `feature-grid`. Si no se elige una imagen manual, usa
  `product.images[image_index - 1]`.
- Se agregó una nueva instancia de esta sección ("spotlight") a
  `templates/index.json`, justo después de la franja de confianza y antes
  de la galería de detalles, mostrando la 4ª foto del producto (`image_index: 4`)
  con texto sobre el acabado "Cool Black" y los imanes N52.
- Subido a Shopify vía `themeFilesUpsert`: `sections/image-with-text.liquid`,
  `templates/index.json`. Tema verificado sin errores.

## Carrusel de opiniones con reproducción automática (última ronda)
El usuario pidió que las reseñas se desplazaran solas, con animación.
- `sections/testimonials.liquid`: se agregaron ajustes de sección
  `autoplay` (casilla, default activado) y `autoplay_speed` (segundos,
  default 5), pasados al carrusel como `data-carousel-autoplay` /
  `data-carousel-speed`.
- `assets/theme.js`: el manejador de `[data-carousel]` ahora arranca un
  `setInterval` que avanza una tarjeta cada X segundos (scroll suave, misma
  animación que las flechas), y al llegar al final vuelve al inicio
  también con scroll suave (loop continuo). Se pausa automáticamente al
  pasar el mouse, tocar la pantalla o enfocar con teclado dentro del
  carrusel, y se reanuda al salir — para que el usuario pueda leer con
  calma sin pelear contra el autoplay. Respeta `prefers-reduced-motion`
  (no se activa si el usuario tiene animaciones reducidas en su sistema).
- `templates/index.json`: valores explícitos `autoplay: true`,
  `autoplay_speed: 5` en la sección de testimonios de la portada.
- Subido a Shopify vía `themeFilesUpsert`: `sections/testimonials.liquid`,
  `assets/theme.js`, `templates/index.json`. Tema verificado sin errores.

## Diagnóstico de conversión (visitas sin compras) — última ronda
El usuario reportó tráfico real sin ventas. Se investigó con datos reales
(no genéricos) vía Shopify Analytics/Admin API:
- **99 sesiones en 30 días, 0% en cada paso del embudo** (0 agregados al
  carrito, 0 checkouts iniciados, 0 completados) — el problema está ANTES
  del checkout, no es abandono de carrito.
- 91% del tráfico es "direct" y se concentra justo en los días en que se
  trabajó en la tienda — probablemente gran parte es tráfico de prueba del
  propio usuario, no clientes reales.
- **Causa raíz más probable encontrada**: el precio del producto era
  **$12.00 MXN** (~$0.65 USD) — un precio que parece un error de captura,
  no un precio real de mercado. El usuario lo confirmó y lo corrigió a
  **$250.00 MXN**.
- Se verificó que el inventario NO estaba bloqueando las compras:
  `inventoryItem.tracked: false` y `availableForSale: true` — el checkout
  sí es funcional, el precio roto era el problema real.
- **Bug real encontrado y corregido**: el umbral de envío gratis mostrado
  en el carrito (`cart_free_shipping_threshold`) estaba en `"75"`, pero la
  tarifa de envío gratis REAL configurada en Shopify (consultada vía
  `deliveryProfiles`) requiere **$1,050 MXN**. Es decir, el carrito le
  prometía envío gratis a cualquiera que llegara a $75 (casi cualquier
  compra), pero al llegar al checkout real se le cobraban $150 MXN de
  envío — una promesa falsa que genera abandono justo en el último paso.
  Corregido a `"1050"` para que coincida con la tarifa real.
- **Pendiente de decisión del usuario**: las 7 reseñas de "Opiniones" en la
  portada son testimonios ficticios que el asistente escribió como
  contenido de ejemplo/diseño. Con 0 pedidos reales hasta ahora, mostrarlos
  como si fueran clientes reales es publicidad engañosa (riesgo legal y de
  confianza). Se le preguntó al usuario qué hacer (quitarlos vs. dejarlos
  genéricos) — aún no respondió esa parte.
- **Cambio de flujo de trabajo**: como el tema ahora está publicado en
  vivo, ya no se puede subir código directamente a él. Se duplicó a un
  tema borrador (`189110583330`) y ahí se subió el fix del envío gratis.
  El usuario debe publicar ese borrador manualmente para que el fix quede
  en vivo (ver sección "Tienda" arriba).

## Segunda republicación equivocada + nombre de marca literal (última ronda)
El usuario avisó "Ya publiqué, pero dale RADIANT MX tal cual". Al revisar
`themes(first: 10)`, el tema en vivo (`role: MAIN`) seguía siendo
`189110583330` ("Aurora - Borrador"), el mismo tema **corrupto** (Horizon
genérico) de antes — es decir, el usuario volvió a publicar el tema
equivocado por segunda vez, probablemente por la confusión de tener dos
borradores con nombres parecidos ("RADIANT MX" y "RADIANT MX - Borrador",
este último resultó ser un duplicado inútil hecho por error a partir del
tema ya corrupto).
- **Fix de causa raíz (confusión de nombres)**: se renombraron ambos temas
  vía `themeUpdate` para que sea imposible confundirlos:
  - `190280630306` → `"❌ NO USAR - tema corrupto"` (el duplicado malo)
  - `190280695842` → `"✅ RADIANT MX - PUBLICAR ESTE"` (el correcto, con
    todo el rediseño)
- **Nombre de marca literal en el encabezado**: el usuario pidió que se
  muestre "RADIANT MX" tal cual (no depender de `shop.name`, que en
  Shopify es literalmente "Radiant-Mx", con guion y minúsculas distintas).
  - `sections/header.liquid`: nuevo ajuste de texto `brand_wordmark`
    (default `"RADIANT MX"`), usado como `{{ section.settings.brand_wordmark
    | default: shop.name }}` en el logo de texto (cuando no hay imagen de
    logo cargada).
  - `config/settings_data.json`: agregado `"brand_wordmark": "RADIANT MX"`
    dentro de `sections.header.settings`.
- Subido a Shopify vía `themeFilesUpsert` al tema correcto
  (`190280695842` / "✅ RADIANT MX - PUBLICAR ESTE"): `sections/header.liquid`,
  `config/settings_data.json`. Tema verificado sin errores
  (`processing: false, processingFailed: false`).

## Caja de regalo + galería horizontal con scroll (última ronda)
El usuario intentó invocar un comando de skill inexistente
(`/frontend-design:frontend-design`) y pegó accidentalmente un spec técnico
completo (React 19 + Vite + GSAP/Framer Motion) para un sitio de lujo
distinto (bolsos/tacones/perfume ficticios, marca "RADIANT-MX" de moda, no
la tienda real de cuidado capilar). Se le preguntó qué hacer con ese spec:
confirmó **usar solo el estilo/efecto, aplicado a los productos reales de su
tienda**, y que reemplace el inicio actual (hero + franja de confianza +
spotlight) manteniendo el resto (testimonios, FAQ, newsletter).
- El sitio sigue siendo el tema Shopify Liquid (no se creó ningún proyecto
  React aparte, conforme a la decisión previa de reconstruir el tema
  existente). Los efectos del spec (caja de regalo que se abre y dispersa
  productos al hacer scroll + galería horizontal con "scroll-jacking") se
  reimplementaron con **JS vanilla + CSS** (mismo patrón que el resto del
  tema: sin GSAP, sin React, sin librerías externas) para no introducir una
  dependencia y un stack ajenos al resto de la tienda.
- **Nuevas secciones** (100% editables desde el editor de Shopify, con
  selector de producto por bloque, igual patrón que el resto del tema):
  - `sections/gift-box-scroll.liquid`: escena con scroll sticky (300vh+) —
    una caja de regalo construida en CSS puro (sin imágenes externas) cuya
    tapa se levanta y desvanece según el progreso de scroll, mientras los 3
    productos reales se dispersan hacia afuera con su foto, nombre y precio
    en vivo desde Shopify.
  - `sections/gift-gallery-scroll.liquid`: galería horizontal con "scroll
    jacking" en escritorio (la sección se fija con `position: sticky` y la
    fila de tarjetas se traduce horizontalmente según el progreso de scroll
    de la sección, sin pin real de altura dinámica al estilo GSAP
    ScrollTrigger, pero con el mismo efecto visual). En móvil (<769px) se
    desactiva el JS y queda como scroll horizontal nativo con
    `scroll-snap`, cero JS de "jacking" — igual estrategia de fallback que
    pedía el spec original.
  - Ambas usan solo los 3 productos reales (no se duplicó ningún producto
    para "rellenar" la galería, a diferencia del spec original que
    duplicaba productos ficticios).
- **Nuevos archivos de assets dedicados** (en vez de tocar `base.css` /
  `theme.js` directamente, para minimizar riesgo de una subida completa de
  archivos grandes): `assets/gift-scroll.css` y `assets/gift-scroll.js`,
  enlazados globalmente desde `layout/theme.liquid` junto a `base.css` /
  `theme.js`.
- Paleta: se reutilizan las variables CSS globales del tema
  (`--color-accent`, `--color-background-secondary`, etc.) en vez de
  introducir la paleta negro/dorado del spec original — así la caja y el
  acento italic ("consentirte", "tuya") seguirán la marca RADIANT MX
  (azul) y cualquier cambio de color global del tema los actualiza también.
- `templates/index.json`: se quitaron las secciones `hero`, `trust`
  (icon-row) y `spotlight` (image-with-text) del inicio; en su lugar,
  `order` ahora empieza con `["gift-box", "gift-gallery", "featured",
  "features", "testimonials", "faq", "newsletter"]`.
- **Bug encontrado y corregido durante la subida**: Shopify rechaza el
  `name` del `{% schema %}` de una sección si supera 25 caracteres — el
  nombre inicial "Galería horizontal (scroll)" (27 caracteres) fue
  rechazado; se acortó a "Galería horizontal".
- Subido a Shopify vía `themeFilesUpsert` al tema correcto
  (`190280695842` / "✅ RADIANT MX - PUBLICAR ESTE"): `layout/theme.liquid`,
  `sections/gift-box-scroll.liquid`, `sections/gift-gallery-scroll.liquid`,
  `assets/gift-scroll.css`, `assets/gift-scroll.js`, `templates/index.json`.
  Tema verificado sin errores (`processing: false, processingFailed: false`).
- **No verificado visualmente**: como en rondas anteriores, este entorno no
  tiene acceso de red para cargar la tienda real en un navegador — la
  verificación es solo por ausencia de errores de Shopify y revisión
  estática del código. Conviene que el usuario confirme visualmente el
  efecto de scroll una vez publicado.

## Pendiente / no hecho en esta sesión
- [ ] **URGENTE**: el usuario debe publicar el tema llamado exactamente
      **"✅ RADIANT MX - PUBLICAR ESTE"** (`190280695842`) desde el panel —
      usando "Publicar", NUNCA "Actualizar" (ver aviso al inicio del
      documento). Ya publicó dos veces el tema equivocado por confusión de
      nombres; los temas se renombraron para evitar un tercer error.
      Mientras no lo haga, la tienda en vivo sigue mostrando el tema
      Horizon genérico, sin ningún diseño personalizado.
- [ ] Favicon (bloqueado: no se pueden subir imágenes por restricción de red
      de este entorno)
- [ ] Logo: pendiente desde antes del pivote (el usuario mostró un logo
      "NOVA-MX" que ya no aplica — con la marca ahora siendo "RADIANT MX",
      probablemente quiera un logo nuevo). El campo de logo del header sigue
      vacío (usa el texto "Radiant-Mx" por defecto vía `shop.name`).
- [ ] Los 3 productos "fantasma" (Beauty At You / Eqwh Store / dropi) que
      aparecen en búsquedas pero no existen realmente — confirmar con el
      usuario si los quiere crear de verdad o son basura de una app de
      importación a limpiar.
- [ ] Las reseñas de "Opiniones" siguen siendo contenido de ejemplo escrito
      por el asistente (ahora reescritas para productos de cabello) — no son
      compras reales. Reemplazar por reseñas reales en cuanto existan.
- [ ] Revisión visual con navegador/capturas (no disponible en este entorno,
      restricción de red del sandbox)

## Última actualización
2026-09-07 — El usuario republicó por segunda vez el tema equivocado
(corrupto). Se renombraron los dos borradores en disputa para eliminar la
ambigüedad (`"❌ NO USAR - tema corrupto"` / `"✅ RADIANT MX - PUBLICAR
ESTE"`) y se agregó un ajuste `brand_wordmark` para que el encabezado
muestre "RADIANT MX" literal en vez de `shop.name` ("Radiant-Mx"). Subido y
verificado sin errores en el tema `190280695842`. Sigue pendiente que el
usuario publique ese tema exacto por su nuevo nombre.

2026-09-06 — **Pivote completo de marca**: la tienda pasó de "Nova"
(soporte de teléfono para auto) a "RADIANT MX" (herramientas de belleza y
cuidado capilar). Se descubrió que el tema publicado había perdido todo su
código personalizado (reemplazado por Horizon genérico, probablemente por
una "actualización de tema" aceptada en el panel) — el tema `Aurora`
original seguía intacto y se usó para reconstruir todo. Se pobló las
colecciones vacías con los 3 productos reales, se generalizó la lista de
características del producto para aceptar descripciones con `<ul><li>` real
(no solo el patrón ✅), se rediseñó toda la portada (hero, franja de
confianza, colección destacada, spotlight, galería, testimonios, FAQ) con
copy y paleta de colores (azul marino/vivo) acordes a la nueva marca. Todo
subido y verificado sin errores en el tema borrador `190280695842` — falta
que el usuario lo publique (con "Publicar", no "Actualizar").
