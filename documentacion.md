# Documentación del proyecto — Pnube

## Estado del proyecto

**Backend**: ✅ Spring Boot 4.1.0 con Maven (compila y corre en :8080)
**Frontend**: ✅ `ng build` exitoso (Angular 21 en :4200)
**Tests**: ✅ 9 tests pasan (2 suites)
**GitHub**: ✅ https://github.com/DualDjinn/TiendaPequenaNube

---

## Estructura del proyecto

```
PequenaNube/
├── .env.example                            # Variables de entorno de ejemplo
├── .gitignore                              # Reglas de git (excluye secrets, build, etc.)
├── backend/                                # Spring Boot 4.1.0 + H2
│   ├── pom.xml                             # Dependencias (incluye SDK Mercado Pago)
│   ├── src/main/resources/
│   │   └── application.yml                 # Config con env vars para secrets
│   └── src/main/java/com/pnube/
│       ├── PnubeApplication.java
│       ├── config/
│       │   ├── SecurityConfig.java         # JWT filter chain + CORS + rutas públicas
│       │   └── DataInitializer.java        # Seed: admin + 2 Líneas + 8 Categorías + 25 productos
│       ├── entity/
│       │   ├── Product.java                # FK a Categoria, activo (soft delete), @Transient productLine/category
│       │   ├── User.java
│       │   ├── Linea.java                  # id, nombre, activo
│       │   ├── Categoria.java              # id, nombre, activo, FK Linea
│       │   ├── Venta.java                  # fecha, estado, mpPreferenceId, mpPaymentId, datos envío
│       │   └── DetalleVenta.java           # FK Venta + Producto, cantidad, precioUnitario
│       ├── repository/
│       │   ├── ProductRepository.java
│       │   ├── UserRepository.java
│       │   ├── LineaRepository.java
│       │   ├── CategoriaRepository.java
│       │   ├── VentaRepository.java        # + consultas ranking
│       │   └── DetalleVentaRepository.java
│       ├── security/
│       │   ├── JwtTokenProvider.java
│       │   └── JwtAuthenticationFilter.java
│       ├── controller/
│       │   ├── AuthController.java         # POST /api/auth/login
│       │   ├── ProductController.java      # CRUD /api/products con soft delete
│       │   ├── LineaController.java        # CRUD /api/lineas (admin)
│       │   ├── CategoriaController.java    # CRUD /api/categorias (admin)
│       │   ├── VentaController.java        # POST /api/ventas (checkout)
│       │   └── MercadoPagoController.java  # POST /api/mercadopago/webhook + /confirm
│       ├── service/
│       │   ├── AuthService.java
│       │   ├── ProductService.java
│       │   ├── LineaService.java
│       │   ├── CategoriaService.java
│       │   ├── VentaService.java           # Checkout + confirmar pago + ranking
│       │   └── MercadoPagoService.java     # Crear preferencia, consultar pago
│       └── dto/
│           ├── LoginRequest.java / LoginResponse.java
│           ├── CheckoutRequest.java / CheckoutResponse.java
│           └── RankingResponse.java
├── PequenaNube/                            # Angular 21 standalone
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/services/
│   │   │   │   ├── auth.service.ts         # Login/logout + JWT sessionStorage
│   │   │   │   ├── auth.interceptor.ts     # Bearer token en cada request
│   │   │   │   ├── cart.service.ts         # Estado del carrito con signals
│   │   │   │   ├── cart-drawer.service.ts
│   │   │   │   ├── product.service.ts      # HTTP + signals + softDelete
│   │   │   │   ├── linea.service.ts        # CRUD líneas
│   │   │   │   ├── categoria.service.ts    # CRUD categorías
│   │   │   │   ├── venta.service.ts        # Checkout + ranking
│   │   │   │   ├── cart-persistence.ts     # Interfaz + InjectionToken
│   │   │   │   └── local-storage-cart-persistence.ts
│   │   │   ├── shared/models/
│   │   │   │   ├── product.ts              # + categoriaId, activo
│   │   │   │   ├── cart-item.ts
│   │   │   │   ├── linea.ts                # Interface Linea
│   │   │   │   ├── categoria.ts            # Interface Categoria
│   │   │   │   └── venta.ts                # CheckoutRequest, CheckoutResponse, RankingResponse
│   │   │   ├── shared/ui/
│   │   │   │   ├── badge.ts / button.ts / skeleton.ts
│   │   │   │   ├── quantity-selector.ts
│   │   │   │   ├── product-card.ts         # 65/35 split, tags apiladas, botón al fondo
│   │   │   │   ├── quick-view.ts           # Bottom sheet mobile con galería + agregar
│   │   │   │   └── whatsapp-bubble.ts      # Botón flotante WhatsApp
│   │   │   ├── shared/directives/
│   │   │   │   └── scroll-reveal.directive.ts
│   │   │   ├── layout/
│   │   │   │   ├── header.ts               # Sin link Admin público
│   │   │   │   └── footer.ts               # Email + Instagram con íconos y links
│   │   │   ├── features/
│   │   │   │   ├── home/home.ts
│   │   │   │   ├── catalog/catalog.ts
│   │   │   │   ├── product-detail/product-detail.ts  # Producto reactivo a cambios de ruta
│   │   │   │   ├── cart/cart.ts            # Checkout con formulario de envío + MP redirección
│   │   │   │   ├── admin/
│   │   │   │   │   ├── admin.ts            # Tabs: Productos/Líneas/Categorías/Dashboard
│   │   │   │   │   ├── admin-login.ts
│   │   │   │   │   ├── admin.guard.ts
│   │   │   │   │   ├── product-list.ts     # Listado de productos
│   │   │   │   │   ├── product-form.ts     # Selects línea/categoría desde API + "Agregar nueva"
│   │   │   │   │   ├── lineas.ts           # CRUD de líneas
│   │   │   │   │   ├── categorias.ts       # CRUD de categorías por línea
│   │   │   │   │   └── dashboard.ts        # Ranking con ApexCharts
│   │   │   │   ├── checkout/
│   │   │   │   │   ├── success.ts          # Verifica pago contra backend
│   │   │   │   │   ├── failure.ts
│   │   │   │   │   └── pending.ts
│   │   │   │   └── not-found/not-found.ts
│   │   │   ├── app.routes.ts               # Admin con children + /checkout/*
│   │   │   ├── app.config.ts               # Scroll restoration + interceptor
│   │   │   └── app.ts / app.html / app.css
│   │   ├── index.html                      # + preconnect Cloudinary
│   │   └── styles.css
│   ├── angular.json / proxy.conf.mjs       # Proxy :4200 → :8080
│   ├── tailwind.config.js / postcss.config.js
│   └── package.json                        # + ng-apexcharts, apexcharts
├── documentacion.md
├── prompt-seccion-admin-segura.md
├── prompt-panel-administracion.md
├── prompt-mercadopago.md
└── backGroundWeb.png / logo.ico / logo.png
```

## Stack técnico implementado

- **Backend**: Spring Boot 4.1.0 + Spring Security 7 + Spring Data JPA + H2
- **Auth**: JWT (jjwt 0.12.6) + BCrypt, sesión stateless, CORS restrictivo
- **Pagos**: Mercado Pago Checkout Pro (SDK Java 2.1.28)
- **Frontend**: Angular 21 standalone + signals + Tailwind CSS v3
- **Gráficos**: ApexCharts (ng-apexcharts)
- **Testing**: Vitest (frontend)
- **Imágenes**: Cloudinary (subida desde admin con upload widget)
- **Base de datos**: H2 file-based (./data/pnube)
- **Repositorio**: GitHub — https://github.com/DualDjinn/TiendaPequenaNube

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
- **WhatsApp bubble**: Botón flotante con wa.me/5493517543485
- **Seguridad**: Eliminado link "Admin" del header público
- **Fix images**: Backend devuelve string → frontend transforma a array
- **Fix atributos**: Campos planos (material, color, yarnType, size)
- **Modelo Product**: Simplificado sin objetos anidados
- **Responsive audit**: 16 arreglos en 8 componentes
- **Scroll restoration**: `withInMemoryScrolling`
- **Quick-view modal**: Bottom sheet mobile con galería y agregar al carrito
- **Product-card**: Simplificada, altura fija 110px, botón al fondo
- **Tags**: Mismo tamaño, fuente y padding
- **isNew automático**: createdAt + 7 días de vigencia
- **Footer**: Email e Instagram con íconos clickeables
- **Preconnect**: Cloudinary

### v6 — Panel admin completo + Checkout + Mercado Pago + GitHub
- **Líneas y Categorías**: Nuevas entidades JPA con CRUD desde el admin
- **Producto refactor**: FK a Categoria, `productLine`/`category` como @Transient
- **Soft delete**: Productos, líneas y categorías con `activo` booleano
- **Dashboard**: Ranking de ventas con ApexCharts (top productos + evolución mensual)
- **Checkout**: Formulario de envío (nombre, dirección, teléfono)
- **Mercado Pago**: Integración con Checkout Pro (crear preferencia, webhook, confirmación)
- **Páginas de resultado**: /checkout/success, /failure, /pending
- **Errores mejorados**: Logging detallado de API MP + mensajes al usuario
- **Secrets externalizados**: Credenciales MP, JWT y admin password por variables de entorno
- **.gitignore**: Excluye build, data H2, node_modules y secrets
- **Repositorio GitHub**: Inicializado y subido a DualDjinn/TiendaPequenaNube

## Cómo correr el proyecto

### Desarrollo local

```bash
# Terminal 1 — Backend (Spring Boot + H2)
cd backend
$env:MP_ACCESS_TOKEN="APP_USR-3919..."   # Opcional, solo para pagos
mvn spring-boot:run                       # http://localhost:8080

# Terminal 2 — Frontend (Angular)
cd PequenaNube
ng serve                                  # http://localhost:4200
ng test                                   # Tests unitarios
ng build                                  # Build de producción en dist/
```

### Credenciales por defecto (desarrollo)

- **Admin**: `admin` / `admin123`
- Se configuran vía variables de entorno: `ADMIN_PASSWORD`, `JWT_SECRET`

## API — Endpoints públicos

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/auth/login` | POST | Login admin → devuelve JWT |
| `/api/products` | GET | Catálogo público (solo activos) |
| `/api/products/{id}` | GET | Detalle de producto |
| `/api/ventas` | POST | Checkout (crea preferencia MP + redirige) |
| `/api/mercadopago/webhook` | POST | Webhook IPN de MP |
| `/api/mercadopago/confirm` | POST | Confirmar pago desde frontend |

## API — Endpoints de admin (requieren JWT)

| Endpoint | Método | Descripción |
|---|---|---|
| `/api/products` | POST | Crear producto (?categoriaId=N) |
| `/api/products/{id}` | PUT | Editar producto |
| `/api/products/{id}` | DELETE | Soft delete producto |
| `/api/lineas` | GET/POST | Listar/crear líneas |
| `/api/lineas/{id}` | PUT/DELETE | Editar/desactivar línea |
| `/api/categorias/linea/{id}` | GET | Categorías por línea |
| `/api/categorias` | POST | Crear categoría |
| `/api/categorias/{id}` | PUT/DELETE | Editar/desactivar categoría |
| `/api/admin/ventas/ranking` | GET | Ranking de ventas (?mes=&anio=) |

## Flujo de checkout

```
1. Usuario agrega productos al carrito
2. Abre el carrito → "Finalizar compra"
3. Completa formulario: Nombre, Dirección, Teléfono
4. Redirige a Mercado Pago Checkout Pro
5. Paga en MP (tarjeta, transferencia, efectivo)
6. MP redirige a /checkout/success?payment_id=XXX
7. Frontend verifica el pago contra POST /api/mercadopago/confirm
8. Backend consulta API de MP, confirma, descuenta stock
9. Venta queda como APROBADA en la base de datos
```

## Mercado Pago — Configuración

Las credenciales se configuran vía variables de entorno:

```bash
$env:MP_ACCESS_TOKEN="APP_USR-..."       # Producción
# o
$env:MP_ACCESS_TOKEN="TEST-..."           # Sandbox (desarrollo)
```

En `application.yml` las URLs de retorno están fijas para desarrollo local:
- `http://localhost:4200/checkout/success`
- `http://localhost:4200/checkout/failure`
- `http://localhost:4200/checkout/pending`

Para producción, cambiar estas URLs.

## Admin panel

- **URL**: http://localhost:4200/admin/login
- **Pestañas**: Productos / Líneas / Categorías / Dashboard
- **Productos**: Listado con edición, soft delete, creación con línea+categoría dinámicas
- **Líneas**: CRUD, no se puede desactivar si tiene categorías activas
- **Categorías**: CRUD por línea, opción "+ Agregar nueva" al crear producto
- **Dashboard**: Gráficos de ranking de ventas (ApexCharts)

## Seguridad

- Spring Security + JWT. Endpoints GET `/api/products` públicos.
- POST/PUT/DELETE requieren rol ADMIN y token JWT en header `Authorization: Bearer <token>`.
- Contraseñas hasheadas con BCrypt.
- Checkout público (no requiere login para comprar).
- Mercado Pago: nunca se confía en datos del frontend, siempre se verifica contra API de MP.
- Secrets externalizados a variables de entorno (no en el repositorio).

## GitHub

- **URL**: https://github.com/DualDjinn/TiendaPequenaNube
- El repo incluye backend + frontend en un mismo proyecto
- `.env.example` con las variables necesarias para desarrollo
- `.gitignore` excluye build, node_modules, data H2 y secrets

## Limitaciones actuales

- El JWT se almacena en `sessionStorage` (se pierde al cerrar pestaña). No hay refresh token.
- No hay rate limiting ni 2FA en el admin.
- Mercado Pago en desarrollo local requiere HTTPS o flujo manual (sin auto-return).
- No hay checkout con datos de tarjeta embebido (solo redirección a MP).
- Stock: no hay manejo de race conditions para compras simultáneas.
