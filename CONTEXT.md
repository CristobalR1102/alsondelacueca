# Contexto del proyecto — Al Son de la Cueca

Resumen para retomar el trabajo en una conversación nueva sin tener que
re-explicar todo. Última actualización: 2026-09-28.

## Qué es esto

Landing page + portal web para una academia de cueca chilena en Maipú
(profesor: Bastián Villalobos). Repo: [github.com/CristobalR1102/alsondelacueca](https://github.com/CristobalR1102/alsondelacueca)
Deploy: `https://alsondelacueca.vercel.app` (Vercel, auto-deploy desde `main`).

Stack: React 19 + Vite + Tailwind, React Router 7, Supabase (auth + Postgres +
Edge Functions + Realtime), `qrcode.react` para generar QRs, `lucide-react`
para íconos.

## Negocio (datos reales del cliente)

- Planes: **4 clases al mes $25.000** (con control de asistencia) o
  **mes completo $33.000** (todas las clases del mes, no ilimitadas).
- Clases: miércoles y viernes, 19:00–21:00 hrs, en Maipú.
- El profe (Bastián) no gestiona nada técnico — quien opera Supabase/Vercel/
  GitHub es Cristobal (el hermano).

## Landing pública (`/`)

Componentes en `src/components/`: Navbar, Hero, Clases, Planes (nuevo),
Profe, Galeria (fotos placeholder, pendiente reemplazar), Playlist (embed de
Spotify), Testimonios, FAQ, Contacto, Footer (con link a `/portal`), WspFloat.

## Portal autenticado (`/login`, `/portal`, `/checkin/:token`)

- **Login**: magic link (sin contraseña) vía `supabase.auth.signInWithOtp`.
- **`AuthContext`** (`src/context/AuthContext.jsx`): expone `session`, `user`,
  `profile` (fila de la tabla `profiles`), `loading`, `signOut`.
- **`/portal`** (`src/pages/Portal.jsx`): muestra `AlumnoDashboard` o
  `ProfePanel` según `profile.rol`.
- **Alumno** (`src/pages/portal/AlumnoDashboard.jsx`): ve su plan, clases
  restantes (si es plan `4_clases`), historial de asistencia y las bitácoras
  del profe.
- **Profe** (`src/pages/portal/ProfePanel.jsx`, 3 pestañas):
  - `TomarAsistencia`: genera un QR por sesión de clase (fila en `sesiones`),
    los alumnos lo escanean con su celular y aparecen en vivo (Supabase
    Realtime) en la lista de asistentes.
  - `Bitacoras`: publicar/borrar notas de la clase (visibles para alumnos).
    Funciona bien; pendiente hacerlas "más interactivas" a futuro (idea sin
    definir aún — fotos, reacciones, comentarios, etc.).
  - `Alumnos`: invitar alumnos nuevos (llama a la Edge Function
    `create-student`) y ajustar manualmente plan / clases restantes.
- **`/checkin/:token`** (`src/pages/Checkin.jsx`): a donde cae el alumno al
  escanear el QR. Si no tiene sesión iniciada, pide login (limitación
  conocida: no vuelve automáticamente al checkin después de loguearse, hay
  que volver a escanear).

## Base de datos (Supabase)

Todo el esquema vive en [`supabase/schema.sql`](supabase/schema.sql) (ya
ejecutado en el proyecto real). Tablas: `profiles` (rol, plan,
clases_restantes), `sesiones` (una por clase, con `token` para el QR),
`asistencia` (única por alumno+sesión, con trigger que descuenta
`clases_restantes` si el plan es `4_clases`), `bitacoras`. RLS activado en
las 4 tablas; función `is_profe()` para las políticas. Realtime habilitado
en `asistencia`.

Guía completa de configuración: [`supabase/README.md`](supabase/README.md).

**Cuenta de profe de prueba** (dentro de la app, no confundir con el email
real de Bastián): `cristobalrenato.2005@gmail.com`, rol `profe`.

## Edge Function `create-student`

[`supabase/functions/create-student/index.ts`](supabase/functions/create-student/index.ts) —
invita a un alumno nuevo (usa `service_role` key, que Supabase inyecta
automáticamente, nunca se manejó a mano). Ya desplegada. Tiene headers CORS
(el primer despliegue no los tenía y rompía las llamadas desde el navegador —
si algo similar vuelve a fallar con "Failed to send a request to the Edge
Function", es CORS).

## Envío de emails (SMTP) — estado actual, IMPORTANTE

El servicio de email por defecto de Supabase tiene un límite muy bajo
(error `email rate limit exceeded`), así que se configuró **Resend** como
SMTP personalizado (Authentication → Emails → SMTP Settings en el dashboard
de Supabase), con remitente `onboarding@resend.dev`.

**Limitación activa ahora mismo**: sin verificar un dominio propio en Resend,
solo se puede enviar correo a la dirección con la que se creó la cuenta de
Resend (`cristobalrenato.2005@gmail.com`). Cualquier invitación a otro
correo (ej. un alumno real, o el correo real de Bastián) falla con
`403 validation_error`.

**Pendiente**: cuando Cristobal compre un dominio propio, verificarlo en
Resend (resend.com/domains) y actualizar el remitente del SMTP a un correo
de ese dominio. Recién ahí se puede probar el flujo completo con un alumno
real (escaneo de QR, dashboard de alumno, etc. — todo eso quedó sin probar
end-to-end por este motivo, no por bugs conocidos).

## Variables de entorno

- **Local** (`.env.local`, gitignorado): `VITE_SUPABASE_URL`,
  `VITE_SUPABASE_ANON_KEY`.
- **Vercel**: las mismas dos variables, ya configuradas ahí.
- `.env.example` en el repo documenta los nombres (sin valores reales).

## Pendientes / próximos pasos

1. Comprar dominio propio → verificar en Resend → probar invitación a
   alumnos reales y todo el flujo de alumno (QR, dashboard, bitácoras vistas
   desde el alumno).
2. Reemplazar fotos placeholder de la Galería por fotos reales.
3. Reemplazar la foto placeholder del profe en la sección "El Profe".
4. Idea a futuro: hacer las bitácoras más interactivas (sin definir aún).
5. Recordar: no hay reseteo automático mensual de `clases_restantes` — el
   profe debe ajustarlo a mano cada mes desde la pestaña Alumnos cuando el
   alumno paga de nuevo.
