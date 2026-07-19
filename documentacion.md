# Documentación del proyecto — Pnube

## Estado del proyecto

**Backend**: ✅ Spring Boot 4.1.0 + PostgreSQL (via Railway)
**Frontend**: ✅ Angular 21 standalone (via Vercel)
**Deploy**: ✅ Railway (backend) + Vercel (frontend)
**GitHub**: ✅ https://github.com/DualDjinn/TiendaPequenaNube

---

## Estructura del proyecto

```
PequenaNube/
├── .env.example
├── .gitignore
├── vercel.json                              # Root directory → PequenaNube/
├── backend/                                 # Spring Boot 4.1.0 + PostgreSQL
│   ├── pom.xml                              # Dependencias (PostgreSQL, JWT, Mercado Pago)
│   ├── Dockerfile                           # Multi-stage JDK 21
│   ├── system.properties                    # Java 21
│   ├── src/main/resources/
│   │   └── application.yml                  # Config con env vars (sin defaults)
│   └── src/main/java/com/pnube/
│       ├── PnubeApplication.java
│       ├── config/
│       │   ├── SecurityConfig.java          # JWT filter chain + CORS + rutas públicas
│       │   ├── DataInitializer.java         # Seed: admin + 2 Líneas + 8 Categorías + 25 productos
│       │   ├── GlobalExceptionHandler.java  # Manejo global de errores
│       │   └── ResourceNotFoundException.java
│       ├── entity/
│       │   ├── Product.java
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
│       │   ├── VentaRepository.java
│       │   └── DetalleVentaRepository.java
│       ├── security/
│       │   ├── JwtTokenProvider.java        # Valida JWT_SECRET configurado
│       │   └── JwtAuthenticationFilter.java # Verifica usuario + rol real en BD
│       ├── controller/
│       │   ├── AuthController.java
│       │   ├── ProductController.java       # + GET /api/products/by-slug/{slug}
│       │   ├── LineaController.java
│       │   ├── CategoriaController.java
│       │   ├── VentaController.java         # + GET /api/admin/ventas/ranking
│       │   └── MercadoPagoController.java
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
│           └── RankingResponse.java
├── PequenaNube/                             # Angular 21 standalone
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/services/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   ├── cart.service.ts
│   │   │   │   ├── cart-drawer.service.ts
│   │   │   │   ├── product.service.ts
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
│   │   │   │   ├── quantity-selector.ts
│   │   │   │   ├── product-card.ts
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
│   │   │   │   ├── product-detail/product-detail.ts
│   │   │   │   ├── cart/cart.ts
│   │   │   │   ├── admin/
│   │   │   │   │   ├── admin.ts
│   │   │   │   │   ├── admin-login.ts
│   │   │   │   │   ├── admin.guard.ts
│   │   │   │   │   ├── product-list.ts
│   │   │   │   │   ├── product-form.ts
│   │   │   │   │   ├── lineas.ts
│   │   │   │   │   ├── categorias.ts
│   │   │   │   │   └── dashboard.ts
│   │   │   │   ├── checkout/
│   │   │   │   │   ├── success.ts
│   │   │   │   │   ├── failure.ts
│   │   │   │   │   └── pending.ts
│   │   │   │   └── not-found/not-found.ts
│   │   │   ├── app.routes.ts
│   │   │   ├── app.config.ts
│   │   │   └── app.ts
│   │   ├── index.html
│   │   └── styles.css
│   ├── angular.json
│   ├── proxy.conf.mjs                       # Proxy :4200 → :8080 (desarrollo)
│   ├── vercel.json                          # Build, output, rewrites /api/* → Railway
│   ├── tailwind.config.js / postcss.config.js
│   └── package.json
├── documentacion.md
├── prompt-seccion-admin-segura.md
├── prompt-panel-administracion.md
├── prompt-mercadopago.md
└── backGroundWeb.png / logo.ico / logo.png
```

## Stack técnico

- **Backend**: Spring Boot 4.1.0 + Spring Security 7 + Spring Data JPA + PostgreSQL
- **Auth**: JWT (jjwt 0.12.6) + BCrypt, sesión stateless
- **Pagos**: Mercado Pago Checkout Pro (SDK Java 2.1.28)
- **Frontend**: Angular 21 standalone + signals + Tailwind CSS v3
- **Gráficos**: ApexCharts (ng-apexcharts)
- **Testing**: Vitest (frontend) — cobertura pendiente
- **Imágenes**: Cloudinary (subida desde admin con upload widget)
- **Infra**: Railway (backend Docker) + Vercel (frontend SPA)
- **Repositorio**: https://github.com/DualDjinn/TiendaPequenaNube

## Despliegue

### Railway (Backend)

- **URL**: https://tiendapequenanube-production.up.railway.app
- **Build**: Dockerfile multi-stage (JDK 21, Maven build, JRE runtime)
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

Las variables `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD` las inyecta Railway automáticamente al vincular PostgreSQL.

### Vercel (Frontend)

- **URL**: https://tienda-pequena-nube.vercel.app
- **Build**: `ng build` → output `dist/pnube/browser`
- **Rewrite**: `/api/*` → Railway backend (sin CORS del lado del browser)
- **SPA**: todas las rutas sirven `index.html`

---

## Historial de cambios

### v1 → v2
- Agregados estados de UI: loading (skeleton), empty, error, 404
- Definida paleta de colores con hex y Tailwind theme extend
- Agregada sección SEO/Meta tags
- Definidos breakpoints responsive concretos
- Especificadas animaciones: CSS nativas + IntersectionObserver
- Estructurada sección "Sobre Pnube"
- Agregado alcance mínimo de testing
- Agregada ruta 404 con wildcard

### v2 → v3
- Framework de testing cambiado a Vitest
- Agregada interfaz de persistencia del carrito (CartPersistence)
- Agregada optimización de imágenes con ngOptimizedImage
- Confirmado Angular 21 como target intencional

### v3 → Implementación inicial
- Scaffolding completo con Angular CLI 21
- Tailwind CSS v3 + PostCSS
- Google Fonts: Playfair Display + Inter
- 12 productos mock en `assets/data/mock-products.json`
- Todos los componentes, servicios y rutas implementados
- Drawer de carrito con animación slide-in
- Persistencia del carrito en localStorage vía interfaz abstracta
- Scroll reveal con IntersectionObserver nativo
- 9 tests Vitest pasando (CartService + App component)

### v4 — Migración a Spring Boot + Auth JWT
- Backend migrado de json-server a Spring Boot 4.1.0 + H2
- Autenticación con JWT (jjwt) + BCrypt + Spring Security
- Panel admin protegido con login y route guard
- Frontend: auth.service, auth.interceptor, admin-login, admin.guard
- 25 productos seedeados desde DataInitializer
- Proxy de desarrollo apunta a localhost:8080

### v5 — UI/UX, responsive, quick-view
- WhatsApp bubble, seguridad, fix imágenes, responsive audit (16 arreglos)
- Quick-view modal mobile, product-card simplificada
- isNew automático, footer con íconos, preconnect Cloudinary

### v6 — Panel admin completo + Checkout + Mercado Pago
- Líneas y Categorías: CRUD desde el admin
- Soft delete, Dashboard con ApexCharts
- Checkout + Mercado Pago Checkout Pro
- Secrets externalizados a variables de entorno

### v7 — Deploy Railway + Vercel + Auditoría de seguridad
- Migración H2 → PostgreSQL
- Railway deploy con Dockerfile (JDK 21)
- Vercel deploy con vercel.json (rewrite /api/* → Railway)
- Fix race condition en product-detail (effect + loading state)
- Fix mobile double-navigation (preventDefault en product-card)
- Swagger de endpoints protegidos (anyRequest → hasRole ADMIN)
- JWT_SECRET y ADMIN_PASSWORD sin defaults (obligatorios via env)
- @ControllerAdvice global + ResourceNotFoundException
- Validación de usuario y rol real en JwtAuthenticationFilter
- Bug fix: confirmarPago buscaba en columna incorrecta (mpPreferenceId vs ID)
- Endpoint ranking expuesto: GET /api/admin/ventas/ranking
- MercadoPagoController: validación de inputs + logging
- Frontend: eliminado button.ts no usado, app.css vacío, console.log

---

## Cómo correr el proyecto

### Desarrollo local

```bash
# Terminal 1 — Backend (Spring Boot + PostgreSQL)
cd backend
$env:JWT_SECRET="mi-secreto-de-256-bits-para-desarrollo-local"
$env:ADMIN_PASSWORD="admin123"
$env:MP_ACCESS_TOKEN="TEST-..."
mvn spring-boot:run                       # http://localhost:8080

# Terminal 2 — Frontend (Angular)
cd PequenaNube
ng serve                                  # http://localhost:4200
ng test                                   # Tests unitarios
ng build                                  # Build de producción en dist/pnube/browser
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
8. Frontend verifica POST /api/mercadopago/confirm
9. Backend consulta API de MP, confirma, descuenta stock
10. MP envía webhook a /api/mercadopago/webhook (notificación adicional)
```

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
| 🟡 Medio | Expiración JWT 24h | ✅ Reducido a 1h |
| 🟡 Medio | console.log datos personales | ✅ Eliminado |
| 🟡 Medio | button.ts componente no usado | ✅ Eliminado |
| 🔵 Info | app.css vacío | ✅ Eliminado |
| 🔵 Info | Sin tests (backened y frontend) | Pendiente |

---

## Limitaciones actuales

- El JWT se almacena en `sessionStorage` (se pierde al cerrar pestaña). No hay refresh token.
- No hay rate limiting ni 2FA en el admin.
- No hay tests automatizados (backened ni frontend).
- Stock: no hay manejo de race conditions para compras simultáneas (falta optimistic locking).
- Las entities se exponen directamente en los endpoints REST (sin DTOs en todos los casos).
- No hay validación de firma HMAC en webhook de Mercado Pago.
