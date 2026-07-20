# Documentación del proyecto — Pnube

## Estado del proyecto

**Backend**: ✅ Spring Boot 4.1.0 + PostgreSQL (via Railway)
**Frontend**: ✅ Angular 21 standalone (via Vercel)
**Deploy**: ✅ Railway (backend Docker) + Vercel (frontend SPA)
**Tests**: ✅ 95 backend (JUnit 5 + Mockito) + 41 frontend (Angular TestBed) = 136 total
**Cobertura**: ✅ JaCoCo 90%+ por paquete
**GitHub**: ✅ https://github.com/DualDjinn/TiendaPequenaNube

---

## Estructura del proyecto

```
PequenaNube/
├── .env.example
├── .gitignore
├── vercel.json                              # Root directory → PequenaNube/
├── backend/                                 # Spring Boot 4.1.0 + PostgreSQL
│   ├── pom.xml                              # Dependencias (PostgreSQL, JWT, MP, Cloudinary)
│   ├── Dockerfile                           # Multi-stage JDK 21 + TZ Argentina
│   ├── system.properties                    # Java 21
│   ├── src/main/resources/
│   │   └── application.yml                  # Config con env vars (sin defaults)
│   └── src/main/java/com/pnube/
│       ├── PnubeApplication.java
│       ├── config/
│       │   ├── SecurityConfig.java          # JWT filter chain + CORS + rutas públicas
│       │   ├── DataInitializer.java         # Seed: admin + 2 Líneas + 8 Cats + 25 prods
│       │   ├── GlobalExceptionHandler.java  # Manejo global de errores
│       │   └── ResourceNotFoundException.java
│       ├── entity/
│       │   ├── Product.java                 # + @Transient getProductLine (lowercase)
│       │   ├── User.java
│       │   ├── Linea.java
│       │   ├── Categoria.java
│       │   ├── Venta.java
│       │   └── DetalleVenta.java
│       ├── repository/
│       │   ├── ProductRepository.java
│       │   ├── UserRepository.java
│       │   ├── LineaRepository.java
│       │   ├── CategoriaRepository.java
│       │   ├── VentaRepository.java         # + findVentasDelDia
│       │   └── DetalleVentaRepository.java
│       ├── security/
│       │   ├── JwtTokenProvider.java        # Valida JWT_SECRET configurado
│       │   └── JwtAuthenticationFilter.java # Verifica usuario + rol real en BD
│       ├── controller/
│       │   ├── AuthController.java
│       │   ├── ProductController.java       # + GET /api/products/by-slug/{slug}
│       │   ├── LineaController.java
│       │   ├── CategoriaController.java
│       │   ├── VentaController.java         # + GET /api/admin/ventas/ranking + del-dia
│       │   ├── MercadoPagoController.java
│       │   └── UploadController.java        # POST /api/upload → Cloudinary (seguro)
│       ├── service/
│       │   ├── AuthService.java
│       │   ├── ProductService.java
│       │   ├── LineaService.java
│       │   ├── CategoriaService.java
│       │   ├── VentaService.java
│       │   └── MercadoPagoService.java
│       └── dto/
│           ├── LoginRequest.java / LoginResponse.java
│           ├── CheckoutRequest.java / CheckoutResponse.java
│           ├── RankingResponse.java
│           └── VentaDelDiaResponse.java
├── PequenaNube/                             # Angular 21 standalone
│   ├── vitest.config.ts                     # Coverage thresholds 90%
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   ├── cart.service.ts
│   │   │   │   ├── cart-drawer.service.ts
│   │   │   │   ├── product.service.ts       # mapProduct normaliza productLine a inglés
│   │   │   │   ├── linea.service.ts
│   │   │   │   ├── categoria.service.ts
│   │   │   │   ├── venta.service.ts
│   │   │   │   ├── cart-persistence.ts
│   │   │   │   └── local-storage-cart-persistence.ts
│   │   │   ├── shared/models/
│   │   │   │   ├── product.ts
│   │   │   │   ├── cart-item.ts
│   │   │   │   ├── linea.ts
│   │   │   │   ├── categoria.ts
│   │   │   │   └── venta.ts
│   │   │   ├── shared/ui/
│   │   │   │   ├── badge.ts / skeleton.ts
│   │   │   │   ├── quantity-selector.ts     # Colores coral (#9e3fff)
│   │   │   │   ├── product-card.ts          # Instagram-style: avatar, action bar, CTA
│   │   │   │   ├── quick-view.ts
│   │   │   │   └── whatsapp-bubble.ts
│   │   │   ├── shared/directives/
│   │   │   │   └── scroll-reveal.directive.ts
│   │   │   ├── layout/
│   │   │   │   ├── header.ts
│   │   │   │   └── footer.ts
│   │   │   ├── features/
│   │   │   │   ├── home/home.ts
│   │   │   │   ├── catalog/catalog.ts
│   │   │   │   ├── product-detail/product-detail.ts  # Computed reactivo (sin effect)
│   │   │   │   ├── cart/cart.ts
│   │   │   │   ├── admin/
│   │   │   │   │   ├── admin.ts
│   │   │   │   │   ├── admin-login.ts
│   │   │   │   │   ├── admin.guard.ts
│   │   │   │   │   ├── product-list.ts
│   │   │   │   │   ├── product-form.ts       # Upload seguro sin widget Cloudinary
│   │   │   │   │   ├── lineas.ts
│   │   │   │   │   ├── categorias.ts
│   │   │   │   │   └── dashboard.ts          # + tabla Ventas del día
│   │   │   │   ├── checkout/
│   │   │   │   │   ├── success.ts            # Auto-redirect 10s, carrito se limpia
│   │   │   │   │   ├── failure.ts
│   │   │   │   │   └── pending.ts
│   │   │   │   └── not-found/not-found.ts
│   │   │   ├── app.routes.ts
│   │   │   ├── app.config.ts               # IMAGE_LOADER con Cloudinary transforms
│   │   │   └── app.ts
│   │   ├── index.html                       # Sin script Cloudinary (subida segura)
│   │   └── styles.css
│   ├── angular.json
│   ├── proxy.conf.mjs                       # Proxy :4200 → :8080 (desarrollo)
│   ├── vercel.json                          # Build, CSP headers, rewrites /api/* → Railway
│   ├── tailwind.config.js / postcss.config.js
│   └── package.json
├── documentacion.md
├── prompt-seccion-admin-segura.md
├── prompt-panel-administracion.md
├── prompt-mercadopago.md
└── backGroundWeb.png / logo.ico / logo.png
```

---

## Stack técnico

- **Backend**: Spring Boot 4.1.0 + Spring Security 7 + Spring Data JPA + PostgreSQL
- **Auth**: JWT (jjwt 0.12.6) + BCrypt, sesión stateless
- **Pagos**: Mercado Pago Checkout Pro (SDK Java 2.1.28)
- **Imágenes**: Cloudinary (subida server-side, API key nunca expuesta)
- **Frontend**: Angular 21 standalone + signals + Tailwind CSS v3
- **Paleta**: Coral `#9e3fff`, Sage `#05cf5b`, Mustard `#ff9a37`, Ink `#3A3532`, Stone `#8C8378`, Cream `#FAF6F1`
- **Gráficos**: ApexCharts (ng-apexcharts)
- **Testing**: JUnit 5 + Mockito (backend), Vitest (frontend), JaCoCo 0.8.15
- **Infra**: Railway (backend Docker) + Vercel (frontend SPA)
- **Repositorio**: https://github.com/DualDjinn/TiendaPequenaNube

---

## Despliegue

### Railway (Backend)

- **URL**: https://tiendapequenanube-production.up.railway.app
- **Build**: Dockerfile multi-stage (JDK 21 + TZ America/Argentina/Cordoba)
- **Base de datos**: PostgreSQL (servicio vinculado)

Variables de entorno requeridas:

| Variable | Descripción |
|----------|-------------|
| `JWT_SECRET` | Clave HMAC-SHA256 (mín. 32 caracteres) |
| `ADMIN_PASSWORD` | Contraseña del panel admin |
| `MP_ACCESS_TOKEN` | Token de Mercado Pago (producción o test) |
| `CORS_ORIGIN` | Origen permitido CORS (ej: https://tienda-pequena-nube.vercel.app) |
| `MP_SUCCESS_URL` | URL de retorno post-pago exitoso |
| `MP_FAILURE_URL` | URL de retorno post-pago fallido |
| `MP_PENDING_URL` | URL de retorno post-pago pendiente |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key (server-side, nunca expuesta) |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret (server-side) |

Las variables `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD` las inyecta Railway automáticamente al vincular PostgreSQL.

### Vercel (Frontend)

- **URL**: https://tienda-pequena-nube.vercel.app
- **Build**: `ng build` → output `dist/pnube/browser`
- **Rewrite**: `/api/*` → Railway backend (sin CORS del lado del browser)
- **CSP**: Content-Security-Policy con directivas para MP, Cloudinary, estilos inline
- **SPA**: todas las rutas sirven `index.html`

---

## Historial de cambios

### v1 → v2
- Agregados estados de UI: loading (skeleton), empty, error, 404
- Definida paleta de colores con hex y Tailwind theme extend
- SEO/Meta tags, breakpoints responsive, animaciones CSS nativas
- Estructurada sección "Sobre Pnube" y ruta 404

### v2 → v3
- Framework de testing cambiado a Vitest
- Interfaz de persistencia del carrito (CartPersistence)
- ngOptimizedImage, Angular 21 target

### v3 — Implementación inicial
- Scaffolding Angular CLI 21 + Tailwind v3 + PostCSS
- 12 productos mock, drawer carrito slide-in, scroll reveal
- 9 tests Vitest

### v4 — Migración a Spring Boot + Auth JWT
- Backend migrado a Spring Boot 4.1.0 + H2
- JWT + BCrypt + Spring Security, panel admin protegido
- 25 productos seedeados desde DataInitializer

### v5 — UI/UX, responsive, quick-view
- WhatsApp bubble, seguridad, fix imágenes, responsive audit
- Quick-view modal mobile, isNew automático

### v6 — Panel admin + Checkout + Mercado Pago
- CRUD Líneas/Categorías, Dashboard ApexCharts
- Checkout + Mercado Pago Checkout Pro

### v7 — Deploy Railway + Vercel + Auditoría de seguridad
- Migración H2 → PostgreSQL, Railway + Vercel deploy
- Auditoría de seguridad: anyRequest→hasRole ADMIN, JWT_SECRET sin default, @ControllerAdvice
- Bug fix: confirmarPago columna incorrecta, ranking endpoint
- Fix: product-detail race condition, loading state

### v8 — Instagram cards + testing 90% + Cloudinary seguro
- **Rediseño product-card** estilo Instagram:
  - Header con avatar (💎 Joyería / 🧶 Amigurumi) y anillo conic-gradient animado
  - Action bar: ❤️ like con contador, ↗️ compartir (Web Share API), 🔖 bookmark
  - Descripción con line-clamp + "ver más"
  - "¡Lo quiero!" agrega al carrito directo desde la card
  - `productLine` normalizado a inglés via `mapProduct` (solución Unicode con NFC)
- **Checkout mejorado**:
  - Carrito se limpia automáticamente al llegar a `/checkout/success`
  - Auto-redirect a home con contador de 10 segundos
  - Confirmación de pago en segundo plano (sin pantalla de carga)
- **Nueva paleta de colores**:
  - coral: `#F4A6A0` → `#9e3fff` (púrpura)
  - sage: `#B7D9C4` → `#05cf5b` (verde)
  - mustard: `#FFD36E` → `#ff9a37` (naranja)
  - Body background: `#F5D6D6` → `#ffc4f9` (rosa pastel)
- **Quantity selector** con bordes y texto en coral
- **Cards más redondeadas** (`rounded-lg` → `rounded-2xl`)
- **Subida de imágenes segura**:
  - Eliminado widget de Cloudinary del frontend (exponía cloudName + uploadPreset)
  - Nuevo endpoint `POST /api/upload` → backend sube a Cloudinary con SDK
  - API key y secret solo existen como env vars en Railway
- **Testing masivo**:
  - 95 tests backend (JUnit 5 + Mockito + MockMvcBuilders)
  - 41 tests frontend (Angular TestBed)
  - JaCoCo 0.8.15 con threshold 90% por paquete
- **Fix zona horaria**: JVM `-Duser.timezone=America/Argentina/Cordoba` + Jackson
- **Fix SEO**: `h4` → `h3` en sección "Sobre Pequeña Nube"
- **CSP**: `connect-src`, `style-src`, `upload-widget.cloudinary.com` en Vercel
- **Ventas del día**: tabla en dashboard con datos del comprador y # comprobante MP

---

## Cómo correr el proyecto

### Desarrollo local

```bash
# Terminal 1 — Backend (Spring Boot + PostgreSQL)
cd backend
$env:JWT_SECRET="mi-secreto-de-256-bits-para-desarrollo-local"
$env:ADMIN_PASSWORD="admin123"
$env:MP_ACCESS_TOKEN="TEST-..."
$env:CLOUDINARY_CLOUD_NAME="tu-cloud-name"
$env:CLOUDINARY_API_KEY="tu-api-key"
$env:CLOUDINARY_API_SECRET="tu-api-secret"
mvn spring-boot:run                       # http://localhost:8080

# Terminal 2 — Frontend (Angular)
cd PequenaNube
ng serve                                  # http://localhost:4200
ng test                                   # Tests unitarios (41 frontend)
npx vitest run --coverage                 # Coverage frontend
ng build                                  # Build de producción en dist/pnube/browser
```

### Tests backend

```bash
cd backend
mvn test                                   # Ejecuta 95 tests
mvn verify                                 # Tests + JaCoCo coverage check (90%+)
```

### Credenciales por defecto (desarrollo)

- **Admin**: `admin` / `admin123`
- Configurar vía variables de entorno: `ADMIN_PASSWORD`, `JWT_SECRET`

---

## API — Endpoints públicos

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/auth/login` | POST | Login admin → devuelve JWT |
| `/api/products` | GET | Catálogo público (solo activos) |
| `/api/products/by-slug/{slug}` | GET | Producto por slug |
| `/api/products/{id}` | GET | Detalle de producto |
| `/api/ventas` | POST | Checkout (crea preferencia MP + redirige) |
| `/api/categorias` | GET | Categorías (públicas) |
| `/api/categorias/linea/{lineaId}` | GET | Categorías por línea |
| `/api/lineas` | GET | Líneas (públicas) |
| `/api/mercadopago/webhook` | POST | Webhook IPN de MP |
| `/api/mercadopago/notifications` | POST | Webhook IPN de MP |
| `/api/upload` | POST | Subir imagen (multipart) → Cloudinary |

## API — Endpoints de admin (requieren JWT + rol ADMIN)

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/products` | POST | Crear producto (?categoriaId=N) |
| `/api/products/{id}` | PUT | Editar producto |
| `/api/products/{id}` | DELETE | Soft delete producto |
| `/api/lineas` | POST | Crear línea |
| `/api/lineas/{id}` | PUT/DELETE | Editar/desactivar línea |
| `/api/categorias` | POST | Crear categoría |
| `/api/categorias/{id}` | PUT/DELETE | Editar/desactivar categoría |
| `/api/admin/ventas/ranking` | GET | Ranking de ventas (?mes=&anio=) |
| `/api/admin/ventas/del-dia` | GET | Ventas del día con datos del comprador |
| `/api/mercadopago/confirm` | POST | Confirmar pago desde frontend |

---

## Flujo de checkout

```
1. Usuario agrega productos al carrito
2. Abre el carrito → "Finalizar compra"
3. Completa formulario: Nombre, Dirección, Teléfono
4. POST /api/ventas → crea preferencia en MP
5. Redirige a Mercado Pago Checkout Pro
6. Paga en MP (tarjeta, transferencia, efectivo)
7. MP redirige a /checkout/success?payment_id=XXX
8. Frontend: limpia carrito, muestra éxito inmediato
9. POST /api/mercadopago/confirm (en segundo plano)
10. Backend consulta API de MP, confirma, descuenta stock
11. Auto-redirect a home a los 10 segundos
12. MP envía webhook a /api/mercadopago/webhook (notificación adicional)
```

---

## Flujo de subida de imágenes

```
Admin selecciona archivo (input file)
  → Frontend: POST /api/upload (multipart/form-data)
    → Backend: Cloudinary SDK (api-key/secret de env vars)
      → Cloudinary procesa y devuelve secure_url
    → Backend devuelve { "url": "https://res.cloudinary.com/..." }
  → Frontend: agrega URL a la lista de imágenes del producto
  → Al guardar producto, las URLs se envían como string CSV
```

**Seguridad:** la API key de Cloudinary nunca sale del servidor. Solo existe como variable de entorno en Railway.

---

## Cards estilo Instagram

Las cards de producto (`product-card.ts`) tienen un diseño similar a publicaciones de Instagram:

```
┌────────────────────────────────┐
│ 💎 Joyería: Anillo Sol         │ ← Avatar con conic-gradient animado
│    Anillos                     │    (anillo tipo historias Instagram)
├────────────────────────────────┤
│         [IMAGEN]               │ ← Click → navega a producto
│      Badge Nuevo/Oferta        │
├────────────────────────────────┤
│ ❤️ 5   ↗️ Compartir     🔖    │ ← Like, compartir, bookmark
├────────────────────────────────┤
│ Descripción...                 │
│ [ver más]                      │ ← line-clamp-2 expandible
│                                │
│ $ 15.000                       │ ← Precio destacado
│ [      ¡Lo quiero!       ]    │ ← Agrega al carrito directo
└────────────────────────────────┘
```

- Los íconos se asignan según la línea: 💎 Joyería, 🧶 Amigurumi
- El anillo del avatar usa `conic-gradient` con rotación 4s
- El icono interior contrarresta la rotación (no gira)
- La línea se detecta por `productLine` normalizado a inglés (`'jewelry'` / `'amigurumi'`)
- Para agregar una nueva línea: solo agregar entrada en `lineConfigs`

---

## Seguridad

- Spring Security + JWT stateless.
- Endpoints GET públicos: `/api/products`, `/api/categorias`, `/api/lineas`.
- POST / PUT / DELETE requieren rol ADMIN y JWT en header `Authorization: Bearer <token>`.
- Contraseñas hasheadas con BCrypt.
- CORS con orígenes específicos vía `CORS_ORIGIN` (no `*`).
- JWT filter verifica que el usuario exista en BD y use su rol real.
- `JWT_SECRET` y `ADMIN_PASSWORD` sin defaults — obligatorios en producción.
- Expiración JWT configurable vía `JWT_EXPIRATION_MS` (default 1h).
- Manejo global de errores con `@RestControllerAdvice` (no filtra stack traces).
- Mercado Pago: validaciones server-side, webhook con logging.
- Subida de imágenes: Cloudinary API key solo en backend (nunca expuesta al frontend).
- CSP: Content-Security-Policy en Vercel con directivas restringidas.

---

## Testing

### Backend — 95 tests (JUnit 5 + Mockito + MockMvcBuilders)

| Paquete | Tests | Cobertura |
|---------|-------|-----------|
| `security` | 13 | 100% |
| `service` | 33 | 90%+ |
| `controller` | 18 | 90%+ |
| `config` | 3 | 94.7% |
| `entity` | 4 | 92.7% |
| `dto` | 5 | 92% |
| **Total** | **95** | **90%+ bundle** |

Ejecutar:
```bash
cd backend
mvn test        # Tests
mvn verify      # Tests + JaCoCo coverage check
```

### Frontend — 41 tests (Angular TestBed + Vitest)

| Tipo | Archivos | Tests |
|------|----------|-------|
| Services | 10 | 13 |
| Pages | 8 | 8 |
| Admin | 6 | 6 |
| UI Components | 7 | 7 |
| Layout | 2 | 2 |
| Guards | 1 | 1 |
| Config | 1 | 3 |
| **Total** | **35** | **41** |

Ejecutar:
```bash
cd PequenaNube
ng test                    # Tests
npx vitest run --coverage  # Coverage
```

---

## Resultados de auditoría de seguridad (Julio 2026)

| Prioridad | Hallazgo | Estado |
|-----------|----------|--------|
| 🔴 Crítico | `anyRequest().permitAll()` | ✅ Corregido → `hasRole(ADMIN)` |
| 🔴 Crítico | JWT_SECRET con default hardcodeado | ✅ Corregido → sin default |
| 🔴 Crítico | ADMIN_PASSWORD con default | ✅ Corregido → sin default |
| 🔴 Crítico | Bug: confirmarPago columna incorrecta | ✅ Corregido |
| 🟠 Alto | Sin @ControllerAdvice global | ✅ Agregado |
| 🟠 Alto | JWT filter no verificaba usuario en BD | ✅ Corregido |
| 🟠 Alto | Ranking endpoint no expuesto | ✅ Agregado |
| 🟠 Alto | Sin tests (backend y frontend) | ✅ 136 tests, 90%+ coverage |
| 🟠 Alto | Upload widget exponía cloudName + preset | ✅ Subida server-side con SDK |
| 🟡 Medio | Expiración JWT 24h | ✅ Reducido a 1h |
| 🟡 Medio | console.log datos personales | ✅ Eliminado |
| 🟡 Medio | button.ts componente no usado | ✅ Eliminado |
| 🔵 Info | app.css vacío | ✅ Eliminado |

---

## Limitaciones actuales

- El JWT se almacena en `sessionStorage` (se pierde al cerrar pestaña). No hay refresh token.
- No hay rate limiting ni 2FA en el admin.
- Stock: no hay manejo de race conditions para compras simultáneas (falta optimistic locking).
- Las entities se exponen directamente en los endpoints REST (sin DTOs en todos los casos).
- No hay validación de firma HMAC en webhook de Mercado Pago.
- Tests de integración con `@SpringBootTest` pendientes (incompatibilidad JaCoCo + Hibernate 7 parcialmente resuelta con JaCoCo 0.8.15).
- Las imágenes de seed usan placehold.co (no tienen relación real con los productos).
