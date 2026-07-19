# Prompt: Integración de Mercado Pago para las Compras

Copiá y pegá el siguiente prompt en cualquier IA para que te ayude a implementarlo.

---

## PROMPT

```
Actuá como un desarrollador full-stack senior con experiencia en integraciones de pago.

CONTEXTO DEL PROYECTO:
- Nombre del proyecto: Pnube (e-commerce de amigurumis y joyería de fantasía).
- Frontend: Angular 21 con TypeScript y Tailwind CSS.
- Backend: Java con Spring Boot.
- Ya existen las entidades de Producto, Categoria, Linea y un sistema de
  autenticación con Spring Security + JWT (no lo repitas).
- Necesito integrar Mercado Pago como método de pago para las compras de
  los clientes.

OBJETIVO:
Implementar el flujo de pago con Mercado Pago de punta a punta, usando el
SDK oficial de Java para el backend, siguiendo las prácticas de seguridad
recomendadas por Mercado Pago (nunca confiar en el estado de pago que
reporte el frontend).

DECISIÓN A EVALUAR PRIMERO:
Explicame brevemente la diferencia entre "Checkout Pro" (redirección a un
formulario alojado por Mercado Pago) y "Checkout API / Checkout Bricks"
(formulario embebido en mi propio sitio), y recomendame cuál conviene para
un e-commerce chico como este, considerando tiempo de desarrollo y nivel de
personalización visual.

REQUISITOS TÉCNICOS:

1. Backend (Spring Boot):
   - Integración con el SDK de Mercado Pago para Java (mercadopago-sdk-java).
   - Endpoint para crear una "preferencia de pago" (Preference) a partir del
     carrito del cliente: tomar los productos y precios desde la base de
     datos del backend, NUNCA desde lo que mande el frontend (para evitar
     que alguien manipule precios desde el navegador).
   - Configurar `back_urls` (éxito, fallo, pendiente) para redirigir al
     cliente de vuelta al sitio según el resultado.
   - Endpoint de Webhook / IPN (Instant Payment Notification) que reciba
     las notificaciones de Mercado Pago sobre cambios de estado del pago
     (aprobado, rechazado, pendiente, reembolsado).
   - Verificación de la notificación: al recibir el webhook, consultar el
     pago directamente contra la API de Mercado Pago (con el Payment ID
     recibido) en vez de confiar en el contenido del webhook por sí solo,
     para evitar notificaciones falsas.
   - Idempotencia: manejar el caso de que Mercado Pago reenvíe la misma
     notificación varias veces, sin duplicar la orden ni descontar stock
     dos veces.
   - Actualizar el estado de la orden/venta en la base de datos solo cuando
     el pago sea confirmado como "approved" por la API de Mercado Pago,
     nunca antes.
   - Manejo de las credenciales (Access Token, Public Key) vía variables de
     entorno, nunca hardcodeadas ni en el repositorio. Usar credenciales de
     prueba (sandbox) durante el desarrollo.
   - Actualizar el stock del producto solo tras confirmación de pago exitosa.

2. Frontend (Angular 21):
   - Pantalla de carrito con botón "Pagar con Mercado Pago" que llama al
     endpoint de creación de preferencia y redirige al Checkout de
     Mercado Pago (o embebe el formulario, según lo que se recomiende).
   - Pantallas de resultado (éxito / pendiente / fallo) que consulten el
     estado real de la orden contra el backend (no solo mostrar el
     parámetro que venga en la URL de vuelta, porque puede manipularse).

3. Seguridad:
   - Nunca marcar una orden como pagada desde el frontend.
   - Nunca confiar en query params de la URL de retorno para dar por
     confirmado un pago; siempre validar contra el backend/webhook.
   - Loggear todas las notificaciones de pago recibidas para poder auditar
     discrepancias.

ENTREGAME:
1. Recomendación de Checkout Pro vs. Checkout API/Bricks para este caso.
2. El endpoint de creación de preferencia de pago (con el carrito armado
   desde la base de datos).
3. El endpoint de webhook con la verificación contra la API de Mercado Pago.
4. El modelo de datos necesario para relacionar una Orden/Venta con su
   estado de pago y el Payment ID de Mercado Pago.
5. El componente Angular del botón de pago y las pantallas de resultado.
6. Una checklist de seguridad específica para pagos (qué NO hay que confiar
   nunca del cliente/frontend).
```

---

## Notas rápidas (para vos)

- Vas a necesitar una cuenta de Mercado Pago (puede ser de prueba/sandbox
  al principio) para obtener el Access Token y Public Key de test.
- Probá primero todo el flujo con las tarjetas de prueba que da Mercado Pago
  en su documentación, antes de pasar a credenciales de producción.
- Si ya tenés armada la entidad de "Venta" (la que usás para el ranking de
  productos más vendidos), pegásela en el prompt para que la integración de
  pago quede conectada a esa misma tabla y no se dupliquen conceptos.
