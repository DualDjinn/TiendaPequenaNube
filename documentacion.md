# Documentación del proyecto — Pnube

## Estado del proyecto

**Backend**: ✅ Spring Boot 3 con Maven (compila y corre en :8080)
**Frontend**: ✅ `ng build` exitoso (Angular 21 en :4200)
**Tests**: ✅ 9 tests pasan (2 suites)

---

## Estructura del proyecto

```
PequenaNube/
├── backend/                                # Spring Boot 3 + H2
│   ├── pom.xml
│   └── src/main/java/com/pnube/
│       ├── PnubeApplication.java           # Entry point
│       ├── config/
│       │   ├── SecurityConfig.java         # Spring Security + JWT filter chain
│       │   └── DataInitializer.java        # Seed: admin user + 25 productos
│       ├── entity/
│       │   ├── Product.java                # Entidad JPA con datos de producto
│       │   └── User.java                   # Entidad JPA username/password/role
│       ├── repository/
│       │   ├── ProductRepository.java
│       │   └── UserRepository.java
│       ├── security/
│       │   ├── JwtTokenProvider.java       # Generar/validar JWT
│       │   └── JwtAuthenticationFilter.java # Filtro OncePerRequestFilter
│       ├── controller/
│       │   ├── AuthController.java         # POST /api/auth/login
│       │   └── ProductController.java      # CRUD /api/products
│       ├── service/
│       │   ├── AuthService.java
│       │   └── ProductService.java
│       └── dto/
│           ├── LoginRequest.java
│           └── LoginResponse.java
├── PequenaNube/                            # Angular 21 standalone
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/services/
│   │   │   │   ├── auth.service.ts         # Login/logout + JWT en sessionStorage
│   │   │   │   ├── auth.interceptor.ts     # HttpInterceptorFn (Bearer token)
│   │   │   │   ├── cart-persistence.ts     # Interfaz CartPersistence + InjectionToken
│   │   │   │   ├── local-storage-cart-persistence.ts
│   │   │   │   ├── cart.service.ts         # Estado del carrito con signals
│   │   │   │   ├── cart-drawer.service.ts  # Estado de visibilidad del drawer
│   │   │   │   ├── cart.service.spec.ts    # Tests unitarios (8 tests)
│   │   │   │   └── product.service.ts      # HTTP + signals (loading/error/products)
│   │   │   ├── shared/models/
│   │   │   │   ├── product.ts
│   │   │   │   └── cart-item.ts
│   │   │   ├── shared/ui/
│   │   │   │   ├── button.ts / badge.ts / skeleton.ts
│   │   │   │   ├── quantity-selector.ts / product-card.ts
│   │   │   │   ├── quick-view.ts          # Bottom sheet mobile con galería + agregar al carrito
│   │   │   │   └── whatsapp-bubble.ts      # Botón flotante WhatsApp
│   │   │   ├── shared/directives/
│   │   │   │   └── scroll-reveal.directive.ts
│   │   │   ├── layout/
│   │   │   │   ├── header.ts               # Navbar sticky + carrito + menú mobile
│   │   │   │   └── footer.ts
│   │   │   ├── features/
│   │   │   │   ├── home/home.ts
│   │   │   │   ├── catalog/catalog.ts
│   │   │   │   ├── product-detail/product-detail.ts
│   │   │   │   ├── cart/cart.ts
│   │   │   │   ├── admin/
│   │   │   │   │   ├── admin.ts            # Panel con logout + tabla CRUD
│   │   │   │   │   ├── admin-login.ts      # Login form
│   │   │   │   │   ├── admin.guard.ts      # CanActivateFn
│   │   │   │   │   └── product-form.ts     # Crear/editar con Cloudinary
│   │   │   │   └── not-found/not-found.ts
│   │   │   ├── app.routes.ts               # Rutas con lazy loading + guard
│   │   │   ├── app.config.ts               # Providers (interceptor incluido)
│   │   │   └── app.ts / app.html / app.css
│   │   ├── styles.css                      # @tailwind directives
│   │   └── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── angular.json
│   ├── proxy.conf.mjs                      # Proxy :4200 → :8080
│   └── package.json
└── documentacion.md
```

## Stack técnico implementado

- **Backend**: Spring Boot 4.1.0 + Spring Security 7 + Spring Data JPA + H2
- **Auth**: JWT (jjwt) + BCrypt, sesión stateless, CORS restrictivo
- **Frontend**: Angular 21 standalone + signals + Tailwind CSS v3
- **Testing**: Vitest (frontend), JUnit (backend — pendiente)
- **Imágenes**: Cloudinary (subida desde admin)
- **Base de datos**: H2 file-based (./data/pnube)

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

### v3 → Implementación
- Scaffolding completo con Angular CLI 21
- Tailwind CSS v3 + PostCSS (se usó v3 en lugar de v4 por compatibilidad con Angular build)
- Google Fonts: Playfair Display + Inter
- 12 productos mock en `assets/data/mock-products.json`
- Todos los componentes, servicios y rutas implementados
- Drawer de carrito con animación slide-in
- Persistencia del carrito en localStorage vía interfaz abstracta
- Scroll reveal con IntersectionObserver nativo
- 9 tests Vitest pasando (CartService + App component)
- Build exitoso, dev server funcional

### v4 — Migración a Spring Boot + Auth JWT
- Backend migrado de json-server a Spring Boot 4.1.0 + H2
- Autenticación con JWT (jjwt) + BCrypt + Spring Security
- Panel admin protegido con login y route guard
- Frontend: auth.service, auth.interceptor, admin-login, admin.guard
- 25 productos seedeados desde DataInitializer
- Proxy de desarrollo apunta a localhost:8080
- Documentación actualizada con estructura y comandos

### v5 — UI/UX, responsive, quick-view y producto automático
- **WhatsApp bubble**: Botón flotante con link a wa.me/5493517543485 y mensaje predeterminado
- **Seguridad**: Eliminado link "Admin" del header público (acceso solo por URL directa)
- **Fix images**: Backend devuelve `images` como string → frontend transforma a `string[]`
- **Fix atributos**: product-detail muestra campos planos (material, color, yarnType, size) en vez de objetos anidados
- **Modelo Product**: Simplificado — sin objetos jewelry/amigurumi anidados
- **Responsive audit**: 16 arreglos en 8 componentes (layout, touch targets, grids, botones)
- **Scroll restoration**: `withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })`
- **Quick-view modal**: Bottom sheet en mobile con galería, detalles, quantity + "Agregar al carrito"
- **Product-card**: Simplificada (nombre + precio + botón), altura fija 110px, botón siempre al fondo
- **Tags**: Mismo tamaño, fuente, padding para product-line y badges
- **isNew automático**: Campo `createdAt`, tag "Nuevo" si tiene < 7 días (seed con 30 días atrás)
- **Footer**: Email e Instagram con íconos SVG, clickeables, actualizados (pequenanube2019@gmail.com / @pequena_n.u.b.e)
- **Preconnect**: Agregado `<link rel="preconnect" href="https://res.cloudinary.com">`
- **Cart image**: Cambiado width/height a `fill` para evitar warning de aspect ratio

### Fix de estilos (Tailwind v4 → v3)
**Problema**: Tailwind v4 usa `@theme` y `@source` en CSS, que requieren PostCSS. Angular's `@angular/build:application` con esbuild no procesaba PostCSS correctamente, por lo que `@tailwind utilities;` nunca se resolvía.

**Solución**: Migrar a Tailwind v3 con:
- `tailwind.config.js` para configuración (colores, fuentes, content paths)
- `postcss.config.js` con plugins `tailwindcss` + `autoprefixer`
- `styles.css` con `@tailwind base/components/utilities`
- Angular 21 tiene soporte nativo para Tailwind v3 (viene incluido en `@angular/build`)

## Cómo correr el proyecto

```bash
# Terminal 1 — Backend (Spring Boot + H2)
cd backend
mvn spring-boot:run    # http://localhost:8080

# Terminal 2 — Frontend (Angular)
cd PequenaNube
ng serve               # http://localhost:4200
ng test                # Tests unitarios
ng build               # Build de producción en dist/
```

## Admin panel

- **URL**: http://localhost:4200/admin/login
- **Credenciales por defecto**: `admin` / `admin123`
- Se configuran en `backend/src/main/resources/application.yml` (variables `admin.username` y `admin.password`)
- El JWT expira a las 24h

## Seguridad

- El backend usa Spring Security con JWT. Todos los endpoints GET `/api/products` son públicos.
- Los endpoints POST/PUT/DELETE requieren rol `ADMIN` y token JWT en header `Authorization: Bearer <token>`.
- Las contraseñas se almacenan hasheadas con BCrypt.
- El panel de admin en Angular usa un `CanActivateFn` que redirige a `/admin/login` si no hay token.

### Limitaciones

- El JWT se almacena en `sessionStorage` (se pierde al cerrar pestaña). No hay refresh token.
- La clave secreta JWT está en `application.yml` — cambiarla para producción.
- No hay rate limiting ni 2FA.
