# Prompt: Panel de Administración con Ranking de Ventas

Copiá y pegá el siguiente prompt en cualquier IA para que te ayude a implementar el panel.

---

## PROMPT

```
Actuá como un desarrollador full-stack senior.

CONTEXTO DEL PROYECTO:
- Nombre del proyecto: Pnube (e-commerce de amigurumis y joyería de fantasía).
- Frontend: Angular 21 con TypeScript y Tailwind CSS.
- Backend: Java con Spring Boot.
- Ya existe un sistema de autenticación con Spring Security + JWT que protege
  las rutas de administrador (asumí que ya está resuelto, no lo repitas).

OBJETIVO:
Implementar el panel de administración de productos con la siguiente lógica de negocio:

1. LÍNEAS DE PRODUCTO (ej: "Amigurumi", "Joyería"):
   - Deben poder crearse dinámicamente desde el panel (no hardcodeadas), para
     poder agregar líneas nuevas a futuro sin tocar código.
   - Cada línea tiene un nombre y puede tener categorías propias.

2. CATEGORÍAS (dependientes de una línea, ej: dentro de "Joyería" → "Aro",
   "Anillo", "Collar"):
   - Deben poder crearse dinámicamente asociadas a una línea existente.
   - Al cargar un producto nuevo, el admin elige primero la línea y después
     la categoría correspondiente a esa línea (relación 1 a muchos:
     Línea → Categorías).

3. PRODUCTOS:
   - Alta de producto nuevo, asociado obligatoriamente a una línea y una categoría.
   - Baja lógica (soft delete): nunca eliminar físicamente el registro, usar
     un campo tipo "activo" (boolean) o "fechaBaja" (nullable). Los productos
     dados de baja no deben aparecer en el catálogo público ni en nuevas ventas,
     pero sí deben conservarse para mantener el historial de ventas intacto.
   - Lo mismo aplica para categorías y líneas: baja lógica, no física (si se da
     de baja una categoría con productos asociados, avisar o impedir la baja
     hasta reasignar esos productos).

4. RANKING Y ESTADÍSTICAS DE VENTAS:
   - Vista de productos más vendidos y menos vendidos.
   - Filtros por mes, por año y por producto individual.
   - Debe soportar comparar períodos (ej: ventas de este mes vs. mes anterior).
   - Pensar la consulta para que sea eficiente incluso con productos dados de
     baja (deben seguir apareciendo en el histórico de ventas).

REQUISITOS TÉCNICOS A ENTREGAR:

1. Modelo de datos (entidades JPA):
   - Linea (id, nombre, activo)
   - Categoria (id, nombre, activo, linea_id → FK)
   - Producto (id, nombre, descripcion, precio, categoria_id → FK, activo, stock)
   - Venta / DetalleVenta (para poder calcular el ranking; incluir fecha,
     cantidad, producto_id)

2. Backend (Spring Boot):
   - Endpoints REST protegidos con @PreAuthorize("hasRole('ADMIN')") para:
     CRUD de líneas, CRUD de categorías (filtradas por línea), CRUD de
     productos (con baja lógica).
   - Endpoint de ranking de ventas con parámetros de filtro (mes, año,
     producto), devolviendo datos ya agregados y listos para graficar
     (ej: [{ producto: "X", cantidadVendida: 120, mes: "2026-06" }]).
   - Validaciones: no permitir eliminar (ni lógicamente) una línea/categoría
     que tenga productos activos sin antes reasignarlos o confirmarlo
     explícitamente.

3. Frontend (Angular 21):
   - Formulario de alta de producto con selects encadenados: al elegir la
     línea, el select de categoría se actualiza dinámicamente con las
     categorías de esa línea.
   - Modal o formulario rápido para crear una línea o categoría nueva sin
     salir del flujo de carga de producto (ej: opción "+ Agregar línea nueva"
     dentro del mismo select).
   - Vista de listado de productos con acción de baja lógica (con confirmación).
   - Dashboard de ranking de ventas con gráficos de barras (más/menos vendidos)
     y gráfico de líneas o barras por evolución mensual/anual.
   - Selector de filtros (mes, año, producto) que actualice los gráficos
     dinámicamente.

4. Sugerime la mejor librería de gráficos para Angular 21 para que el
   dashboard sea fácil de leer para alguien sin conocimientos técnicos
   (el dueño del negocio, no un desarrollador), con buenos tooltips,
   leyendas claras y que soporte gráficos de barras y líneas con
   comparación de períodos.

ENTREGAME:
1. Las entidades JPA con sus relaciones.
2. Los endpoints REST principales (líneas, categorías, productos, ranking).
3. El componente Angular del formulario de alta de producto con selects
   encadenados y opción de crear línea/categoría al vuelo.
4. Un ejemplo de componente de dashboard con al menos un gráfico de barras
   (top productos) y uno de líneas (evolución mensual), usando la librería
   de gráficos que recomiendes.
```

---

## Sugerencia de herramienta de gráficos

Para Angular 21, la mejor opción para un dashboard fácil de entender (pensado
para el dueño del negocio, no para un desarrollador) es:

**ApexCharts** (con el wrapper `ng-apexcharts`)
- Tooltips interactivos y leyendas claras out-of-the-box, sin tener que
  configurar mucho.
- Soporta muy bien comparación de series (ej: ventas este mes vs. mes
  anterior, o varios productos en el mismo gráfico).
- Zoom, exportar como imagen, y animaciones suaves que ayudan a que los
  datos "se entiendan" de un vistazo.
- Buena curva de aprendizaje: la configuración es más declarativa que Chart.js.

Alternativa nativa de Angular: **ngx-charts** (de Swimlane), basada en D3,
también con muy buena estética por defecto y pensada específicamente para
Angular, aunque tiene menos tipos de gráficos combinados que ApexCharts.

Para este caso (ranking con comparación de períodos y varios filtros),
ApexCharts va a darte más flexibilidad con menos código.

---

## Notas rápidas (para vos)

- Si ya tenés armadas las entidades de Producto o Categoría, pegáselas antes
  del prompt para que la IA no invente una estructura distinta.
- Pedile que primero te muestre el modelo de datos y lo confirmes antes de
  generar todo el código, así evitás tener que rehacer cosas si algo no
  encaja con lo que ya tenés.
