# Prompt: Sección de Administrador Segura

Copiá y pegá el siguiente prompt en cualquier IA (ChatGPT, Claude, Gemini, etc.) para que te ayude a implementar la sección de administrador.

---

## PROMPT

```
Actuá como un desarrollador full-stack senior especializado en seguridad de aplicaciones web.

CONTEXTO DEL PROYECTO:
- Frontend: Angular 21 con TypeScript y Tailwind CSS
- Backend: Java con Spring Boot
- Es un sitio de e-commerce con catálogo de productos visible al público, y necesito
  una sección de administrador donde se puedan cargar, editar y eliminar productos,
  pero que NO sea accesible ni visible para clientes/usuarios comunes.

OBJETIVO:
Implementar un sistema de autenticación y autorización siguiendo los estándares
de seguridad actuales (OWASP Top 10, OWASP ASVS) para que el panel de administrador
esté completamente protegido, incluso ante intentos de acceso directo a la API
(sin pasar por la interfaz).

REQUISITOS TÉCNICOS:

1. Backend (Spring Boot):
   - Autenticación con Spring Security, usando JWT para las sesiones.
   - Hasheo de contraseñas con BCryptPasswordEncoder (nunca texto plano ni
     hashes débiles como MD5 o SHA1).
   - Autorización basada en roles con @PreAuthorize("hasRole('ADMIN')") o
     configuración de SecurityFilterChain, en cada endpoint sensible
     (crear, editar, eliminar productos).
   - JWT de corta duración (15-60 min) + refresh token con rotación y
     posibilidad de revocación (tabla de tokens revocados o whitelist).
   - Almacenar el JWT idealmente en cookie httpOnly + Secure + SameSite=Strict
     (evitar localStorage si es posible, por riesgo de XSS).
   - Validar y sanear todo input del lado del servidor con Bean Validation
     (@Valid, @NotBlank, etc.) — nunca confiar en validaciones del frontend.
   - Rate limiting / bloqueo temporal tras varios intentos de login fallidos
     (protección contra fuerza bruta) — por ejemplo con Bucket4j o lógica propia.
   - CORS configurado de forma restrictiva (solo el dominio del frontend real),
     vía CorsConfigurationSource.
   - HTTPS obligatorio en todo el sitio.
   - Logging y auditoría de acciones administrativas (quién cargó/editó/borró
     qué producto y cuándo) — por ejemplo con Spring Data Envers o logs propios.
   - Manejo de secretos (credenciales de base de datos, clave firmante del JWT)
     vía variables de entorno o un secret manager, nunca hardcodeados en
     application.properties ni en el repositorio.

2. Frontend (Angular 21):
   - Route Guards con la API funcional (CanActivateFn) para ocultar la UI de
     administrador a quien no tenga el rol correspondiente (esto es solo UX,
     no seguridad real).
   - HTTP Interceptor funcional (HttpInterceptorFn) para adjuntar el token en
     cada request y manejar renovación de token o redirección al expirar.
   - No mostrar en el DOM ni en el bundle público ninguna lógica ni dato
     sensible de administrador.

3. Consideraciones extra a evaluar y sugerirme si aplican a este proyecto:
   - Autenticación de dos factores (2FA) para la cuenta de administrador.
   - Principio de menor privilegio (si en el futuro hay más de un rol,
     por ejemplo "EDITOR" vs "ADMIN").
   - Protección CSRF si se usa cookies para el token (Spring Security trae
     soporte built-in, hay que configurarlo bien si se usan cookies).
   - Content Security Policy (CSP) en el frontend.

ENTREGAME:
1. El modelo de datos necesario (entidades JPA de usuario/rol).
2. La configuración de SecurityFilterChain y el endpoint de login con
   emisión de JWT.
3. Un ejemplo de endpoint protegido de creación de producto (@RestController
   con @PreAuthorize).
4. El Route Guard y el Interceptor en Angular 21 (API funcional).
5. Una checklist final de seguridad para verificar antes de deployar a producción.

Explicame también qué partes son seguridad real (backend) y cuáles son solo
mejoras de experiencia de usuario (frontend), para que quede claro qué es
lo irreemplazable.
```

---

## Notas rápidas (fuera del prompt, para vos)

- Cuanta más información le des a la IA sobre tu proyecto real (nombre del sitio, si ya tenés base de datos armada, si ya tenés algo de auth hecho), mejor va a ser la respuesta.
- Si ya tenés la entidad "Producto" definida en tu backend, pegásela antes de mandar el prompt para que la IA no invente una estructura distinta a la tuya.
- Pedile siempre el código completo, no solo fragmentos, para evitar tener que adivinar cómo conectar las piezas.
