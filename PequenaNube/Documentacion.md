# Pequeña Nube

## Descripción

Tienda e-commerce de amigurumis tejidos a crochet y joyería de fantasía, hecha con Angular 21 standalone + Tailwind CSS v3 + json-server. Marca: **Pequeña Nube**.

## Stack técnico

| Tecnología | Versión |
|------------|---------|
| Angular | 21.2 (standalone components, Signals) |
| Tailwind CSS | 3.4 (vía PostCSS) |
| json-server | 0.17 (API REST mock) |
| TypeScript | 5.9 |
| Vitest | 4.0 (tests unitarios) |
| Cloudinary | Upload widget + fetch (imágenes) |
| Build | `@angular/build:application` (Vite) |

## Arrancar el proyecto

```bash
cd PequenaNube
npm install
# Terminal 1: json-server (API)
npm run api
# Terminal 2: Angular dev server
ng serve
# Abrir http://localhost:4200
```

- `npm run api` → json-server en puerto 3000 con `db.json`
- `ng serve` → Angular en puerto 4200, proxy `/api` → 3000

## Rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Home | Hero, categorías con carrusel, destacados, newsletter |
| `/catalogo` | Catalog | Filtros por línea (todo/amigurumi/jewelry), categoría, precio |
| `/producto/:slug` | ProductDetail | Vista completa + relacionados |
| `/admin` | Admin | Tabla CRUD de productos |
| `/admin/nuevo` | ProductForm | Crear producto |
| `/admin/editar/:id` | ProductForm | Editar producto |
| `**` | NotFound | 404 |

## Arquitectura

```
src/app/
├── core/services/       # ProductService, CartService, CartDrawerService, persistencia
├── features/
│   ├── home/            # Página principal
│   ├── catalog/         # Catálogo con filtros
│   ├── product-detail/  # Detalle de producto
│   ├── cart/            # Carrito lateral (slide-in)
│   ├── admin/           # Admin + formulario de producto
│   └── not-found/       # 404
├── layout/              # Header (sticky + carrito badge) y Footer
├── shared/
│   ├── directives/      # ScrollReveal (fade-in al hacer scroll)
│   ├── models/          # Interfaces Product, CartItem, tipos
│   └── ui/              # ProductCard, QuantitySelector, Badge, Button, Skeleton
```

## Modelo de datos (`db.json`)

```json
{
  "products": [
    {
      "id": number,
      "name": string,
      "slug": string,
      "price": number,
      "images": string[],
      "productLine": "amigurumi" | "jewelry",
      "category": string,
      "description": string,
      "stock": number,
      "isNew": boolean,
      "isSale": boolean,
      "jewelry?": { "material": string, "color": string },
      "amigurumi?": { "yarnType": string, "size": string }
    }
  ]
}
```

25 productos semilla (IDs 1-25): 13 amigurumis (Animales, Personajes, Llaveros, Decoracion) + 12 joyería (Anillos, Aros, Collares, Pulseras).

## Paleta de colores (Tailwind)

| Clase | Hex | Uso |
|-------|-----|-----|
| `cream` | `#FAF6F1` | Fondos claros (header, carrito) |
| `coral` | `#F4A6A0` | Botones primarios, badges joyería |
| `sage` | `#B7D9C4` | Badges amigurumi |
| `mustard` | `#FFD36E` | Badge "Oferta" |
| `ink` | `#3A3532` | Texto principal |
| `stone` | `#8C8378` | Texto secundario, bordes |

## Fuentes

- **Títulos:** `Baloo 2` (clase `font-heading`)
- **Cuerpo:** `Nunito Sans` (clase `font-sans`, default global)

## Funcionalidades clave

- **Hero:** Imagen full-width con overlay degradado, logo + tagline con efecto arcoíris brillante (CSS `animate-rainbow-shine`), CTA "Elegí tu próximo favorito"
- **Carrusel por categoría:** Cada categoría en home muestra imágenes de sus productos rotando cada 5s con fade-in, indicadores de punto
- **Catálogo:** Filtros por línea de producto y categoría, ordenamiento por precio/fecha, query params en URL, loading skeleton, error con retry
- **Detalle:** Atributos específicos por línea (material/color o yarnType/size), selector de cantidad con stock máximo, productos relacionados
- **Carrito lateral:** Slide-in con overlay, persistencia en localStorage, stock validation, quantity selector, total + subtotal
- **Admin:** CRUD completo, formulario con Cloudinary upload widget (unsigned, preset `imagenesNube`), soporte multi-imagen, slugs auto-generados
- **ScrollReveal:** Fade-in con overshoot easing al hacer scroll (IntersectionObserver)
- **Sin stock:** Botón "Sin stock" rojo y deshabilitado en cards y detalle, carrito rechaza agregar si excede stock

## Imágenes

- Cloudinary: cloud name `pjhkswfc`, upload preset `imagenesNube` (subida sin autenticación)
- Image loader en `app.config.ts`: URLs absolutas pasan directo, `images/` pasan directo, todo lo demás via fetch de Cloudinary (`f_auto,q_auto`)
- Widget script global en `index.html`

## Tests

```bash
ng test    # Vitest
```

Test existente: `cart.service.spec.ts` (unit test del carrito).

## Archivos importantes

- `src/styles.css` — Directivas Tailwind + keyframes personalizados
- `tailwind.config.js` — Colores y fuentes custom
- `proxy.conf.mjs` — Proxy `/api` → json-server
- `db.json` — Base de datos json-server
- `src/app/app.config.ts` — Providers globales (HTTP, router, image loader)
- `src/app/core/services/product.service.ts` — CRUD de productos con Signals
- `src/app/core/services/cart.service.ts` — Lógica del carrito con persistencia
- `src/app/features/admin/product-form.ts` — Formulario con Cloudinary upload

## Cloudinary

- Cloud name: `pjhkswfc`
- Upload preset: `imagenesNube` (unsigned)
- Widget: `cloudinary.v2.openUploadWidget` global
