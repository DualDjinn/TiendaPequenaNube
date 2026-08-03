# Prompt: Rediseño visual de "Pequeña Nube"

Copiá y pegá todo este prompt en cualquier IA (ChatGPT, Claude, Gemini, etc.) para que implemente el diseño.

---

Necesito que implementes el frontend de **Pequeña Nube**, un e-commerce que vende dos líneas de producto: **amigurumis tejidos a crochet** y **joyería de fantasía** (bijouterie), dirigida a un público joven (10-20 años en la línea de joyería). Es una única marca con identidad híbrida, no dos tiendas separadas.

Stack: Angular, TypeScript, Tailwind CSS, HTML/CSS. Adaptá los tokens de diseño de abajo a clases/utilidades de Tailwind o a un archivo de variables CSS, como corresponda al proyecto.

## Dirección visual

Estilo: **pastel tierno / kawaii**, redondeado, cálido, hecho a mano. Nada de bordes rectos ni paletas frías o corporativas. Las dos líneas de producto comparten la misma base visual pero cada una tiene su color de acento propio.

### Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#FFF8F4` | Fondo general (crema cálido, no blanco puro) |
| `--bg-soft` | `#FFF1EC` | Fondo alterno de secciones |
| `--text` | `#4A3A50` | Texto principal (ciruela oscuro, no negro) |
| `--text-soft` | `#8A7690` | Texto secundario |
| `--coral` | `#FF9E8B` | Acento línea Amigurumis |
| `--coral-dark` | `#FF7A61` | Coral hover/énfasis |
| `--coral-bg` | `#FFE7E1` | Fondo suave para tarjetas de Amigurumis |
| `--lilac` | `#B994E8` | Acento línea Joyería |
| `--lilac-dark` | `#9C6FD8` | Lila hover/énfasis |
| `--lilac-bg` | `#F0E5FC` | Fondo suave para tarjetas de Joyería |
| `--grad` | `linear-gradient(120deg, #FF9E8B 0%, #C9A9E9 100%)` | Degradé de marca compartido: usar en CTA principal, botones de agregar al carrito destacados, sección de newsletter |

### Tipografía

- **Display / títulos**: "Baloo 2" (Google Fonts) — redondeada, amigable, kawaii. Pesos 600-800.
- **Cuerpo de texto**: "Quicksand" (Google Fonts) — sans-serif suave y geométrica. Pesos 400-600.
- Nada de serif ni tipografías corporativas rígidas.

### Formas y componentes

- Border-radius grande en todo: tarjetas `~28-32px`, botones e inputs siempre en píldora (`border-radius: 999px`).
- Sombras suaves y difusas con tinte cálido (no gris puro), ej: `0 12px 30px -12px rgba(150,100,130,0.25)`.
- Usar "blobs" orgánicos (formas tipo nube/gota, `border-radius` asimétrico) como elementos decorativos de fondo en el hero, en vez de rectángulos o círculos perfectos.
- El logo y los divisores entre secciones deben referenciar el nombre de la marca con una forma de **nube**: un ícono de nube con degradé coral→lila, y un divisor de sección recortado con forma ondulada (efecto "nube") en vez de una línea recta.
- Micro-interacciones sutiles: las tarjetas de producto se elevan levemente al hover (`translateY(-6px)`), los botones de acción escalan un poco.

## Estructura de página (Home)

1. **Header sticky**: logo (ícono de nube + "Pequeña Nube"), nav en forma de píldora con los links Inicio / Amigurumis / Joyería / Todo / Sobre nosotras, ícono de carrito circular a la derecha.
2. **Hero**: eyebrow tipo píldora ("✨ Hecho a mano, con amor"), título grande con una palabra/frase en degradé coral-lila, texto de apoyo, dos botones (CTA principal a Amigurumis con degradé, CTA secundario a Joyería), y a la derecha una composición ilustrativa con blobs orgánicos + emoji/ilustración de producto + 2 "chips" flotantes con datos sociales (ej. "🔥 +20 me gusta").
3. **Sección Amigurumis** (fondo `--bg-soft`, acento coral): encabezado centrado con eyebrow + título + bajada, grilla de 4 tarjetas de producto (categoría en tag, nombre, descripción corta, precio, botón circular "+").
4. **Sección Joyería** (fondo `--bg`, acento lila): misma estructura de tarjetas que Amigurumis pero con la paleta lila.
5. **Franja de confianza**: 3 tarjetas centradas (Hecho a mano / Materiales de calidad / Envío cuidado), cada una con un ícono circular en degradé de marca.
6. **Newsletter**: sección con fondo en degradé de marca completo, texto en blanco, formulario de email en píldora.
7. **Footer**: fondo oscuro ciruela (`#3A2C40`), texto en tonos lilas claros, 4 columnas (marca+descripción, Explorar, Contacto, Métodos de pago).

## Contenido/copy de referencia

- Header hero: "Cositas tiernas para abrazar y brillar" (con "abrazar y brillar" en degradé).
- Bajada: "Amigurumis tejidos a crochet y joyería de fantasía, pensados para acompañarte todos los días."
- CTAs: "Ver Amigurumis 🧸" / "Ver Joyería 💎"
- Tono de copy en general: cercano, cálido, con algún emoji puntual — nunca corporativo ni vendedor agresivo.

## Responsive

- Desktop: grilla de 4 columnas en productos, hero a 2 columnas.
- Mobile (`<900px`): grilla de 2 columnas, hero apilado a 1 columna, footer a 2 columnas.

## Qué NO hacer

- No uses paleta fría, grises corporativos, ni bordes duros a 0px.
- No repitas el layout "cream + serif + acento terracota" genérico de IA — la propuesta acá es explícitamente pastel/kawaii/redondeada.
- No mezcles las dos líneas de producto en una sola paleta: cada línea necesita su acento diferenciado dentro de la misma base visual.
