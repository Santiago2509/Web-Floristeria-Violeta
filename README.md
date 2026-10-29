# Floristería Violeta

Sitio web de **Floristería Violeta** (Cali, Colombia): catálogo de arreglos florales, servicios, galería, historia de la tienda y contacto directo por WhatsApp. Incluye un panel de administración para gestionar el catálogo y la galería.

## Tecnologías

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion y Lenis (animaciones y scroll suave)
- Supabase (base de datos de productos, galería y ocasiones)
- Cloudinary (subida y alojamiento de fotos)

## Puesta en marcha

```bash
pnpm install
cp .env.example .env.local   # y rellena los valores
pnpm dev
```

Abre <http://localhost:3000>.

| Comando      | Qué hace                         |
|--------------|----------------------------------|
| `pnpm dev`   | Servidor de desarrollo           |
| `pnpm build` | Compilación de producción        |
| `pnpm start` | Sirve la compilación             |
| `pnpm lint`  | Revisión de código con ESLint    |

## Variables de entorno

Todas están documentadas en [`.env.example`](.env.example). Las imprescindibles son las de Supabase, Cloudinary y las del panel (`ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`). Si faltan las del panel, `/admin` queda bloqueado.

## Estructura

```
app/                 Páginas (inicio, catálogo, servicios, galería, nosotros, contacto…)
app/admin/login      Acceso al panel
app/admin/(panel)    Panel de administración (protegido)
components/layout    Navbar y Footer
components/sections  Secciones de cada página
components/ui        Componentes reutilizables y efectos visuales
lib/site-config.ts   Datos del negocio (teléfono, dirección, horario, redes) — fuente única
lib/db.ts            Acceso a datos en Supabase
lib/actions.ts       Server Actions del panel (verifican la sesión)
lib/auth.ts          Sesión del administrador
proxy.ts             Protección de las rutas /admin
```

## Panel de administración

Entra en `/admin` con la contraseña de `ADMIN_PASSWORD`. La sesión dura 7 días y se cierra con «Cerrar sesión».

**Seguridad en Supabase:** configura `SUPABASE_SERVICE_ROLE_KEY` y activa Row Level Security en las tablas `products`, `gallery` y `ocasiones_guardadas`, permitiendo a la clave pública (`anon`) **solo lectura**. Así nadie puede modificar datos desde fuera del panel.

## Datos del negocio

Teléfono, correo, dirección, horario, redes y mapa se editan en un único lugar: `lib/site-config.ts`.
