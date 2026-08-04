# Pequeña Nube — Frontend (Angular)

> Documentación detallada y canónica del proyecto completo: [`../documentacion.md`](../documentacion.md).

## Descripción

Frontend del e-commerce **Pequeña Nube** (amigurumis tejidos a crochet + joyería de fantasía). Angular 21 standalone + Signals + Tailwind CSS v3. El backend real es Spring Boot + PostgreSQL (Railway); ya **no** usa json-server.

## Stack técnico

| Tecnología | Versión |
|------------|---------|
| Angular | 21 (standalone components, Signals) |
| Tailwind CSS | 3.4 (vía PostCSS) |
| TypeScript | ~5.9 |
| Vitest | 4.x (tests unitarios vía `ng test`) |
| Cloudinary | Subida server-side (endpoint `POST /api/upload` del backend) |
| Build | `@angular/build:application` (Vite) |

## Arrancar el proyecto

```bash
# Terminal 1 — Backend (Spring Boot + PostgreSQL)
cd ../backend
$env:JWT_SECRET="..."          # y demás env vars (ver documentacion.md)
mvn spring-boot:run            # http://localhost:8080

# Terminal 2 — Frontend
ng serve                       # http://localhost:4200 (proxy /api → :8080)
```

## Rutas

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | Home | Rediseño kawaii/pastel: hero, secciones Amigurumis/Joyería, trust strip, newsletter |
| `/catalogo` | Catalog | Filtros por línea, categoría y precio (query params) |
| `/producto/:slug` | ProductDetail | Detalle + galería con flechas y swipe |
| `/admin/*` | Admin | Login, productos, líneas, categorías, dashboard |
| `/checkout/{success,failure,pending}` | Checkout | Pantallas post-pago |
| `**` | NotFound | 404 |

## Funcionalidades clave

- **Home rediseñado**: hero con imagen adaptada, eyebrow, título con degradé coral-lila, 2 CTAs, chips flotantes; secciones de producto por línea (Amigurumis acento coral, Joyería acento lila); franja de confianza; newsletter con degradé de marca.
- **Cards estilo Instagram** (`product-card`): avatar con anillo animado, like/share/bookmark, descripción expandible, CTA "¡Lo quiero!" — estructura conservada, acentos por línea.
- **Carrito lateral** con persistencia en localStorage y checkout con Mercado Pago.
- **Panel admin**: CRUD de productos/líneas/categorías, dashboard con ApexCharts, ventas del día.
- **Auto-logout** al expirar el token JWT: ante 401/403 redirige a `/admin/login`.
- **Seguridad**: JWT stateless, subida de imágenes solo server-side (API key de Cloudinary nunca expuesta).

## Paleta y fuentes

- **Paleta**: Coral `#FF9E8B` (Amigurumis), Lila `#B994E8` (Joyería), Fondo `#FFF8F4`, Texto `#4A3A50`, Ciruela `#3A2C40` (footer).
- **Fuentes**: `Baloo 2` (títulos, `font-heading`) + `Quicksand` (cuerpo, `font-sans`).

## Tests

```bash
ng test          # 46 tests (25 archivos) — ver ../documentacion.md para detalle y cobertura
```

## Deploy

- **Frontend**: Vercel (SPA) — `vercel.json` con rewrites `/api/*` → Railway.
- **Backend**: Railway (Docker + PostgreSQL).
