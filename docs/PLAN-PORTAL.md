# Plan del portal

Última revisión: 2026-10-29. Lo que más le interesa al cliente (Bastián):

1. **Tareas**: cosas que el profe publica para que los alumnos corrijan o
   practiquen. Solo se publican y se ven: sin entregas ni "marcar como hecha".
2. **Marcar asistencia** con QR.
3. **Diario de clase** tipo blog, **visible solo para alumnos**.

## Decisiones tomadas

- Los videos de práctica de alumnos para que el profe corrija **no** van en
  la app: eso se resuelve por WhatsApp.
- Los videos de las tareas/diario van como **enlace de YouTube "no listado"**
  (incrustado). Supabase Storage solo para fotos (comprimidas).
- **Sin respaldos**: los datos son fáciles de volver a cargar.
- Hosting en **Cloudflare** (no Vercel). Supabase y Resend en **cuentas del
  cliente**.
- Login con **Google** además del correo.
- Si un alumno de plan `4_clases` usa todas sus clases: **no se bloquea**; se
  muestra en el panel del profe y se envía un **aviso**.
- Página de **privacidad** en `/privacidad` (enlazada en footer y login).
- Notificaciones **push** vía PWA: sí (Android siempre; iPhone solo con la app
  instalada en la pantalla de inicio, iOS 16.4+).

## Fase 0 — Infraestructura en cuentas del cliente (en curso)

1. **Dominio** `alsondelacueca.cl` ✅: comprado en NIC Chile con nameservers
   `grannbo.ns.cloudflare.com` y `yoxall.ns.cloudflare.com`. Agregado en
   Cloudflare (plan Free); esperando que pase a **Active**.
2. **Supabase**: el proyecto ya existe en la cuenta del cliente
   (org "Al Son De La Cueca", ref `diqbgkuesnvusliyfrab`, sa-east-1) con las
   tablas, `create-student` desplegada y usuarios. No se crea uno nuevo. Falta:
   - Authentication → URL Configuration: Site URL = `https://alsondelacueca.cl`
     y redirect URLs `https://alsondelacueca.cl/**` (+ `http://localhost:5173/**`).
     Hoy solo tiene `https://alsondelacueca.vercel.app/portal`.
3. **Resend**: verificar el dominio (registros DNS en Cloudflare) y configurar
   el SMTP de Supabase con remitente `no-responder@<dominio>`.
4. **Cloudflare Workers**: conectar el repo (Workers & Pages → Create →
   Import a repository). Build `npm run build`, deploy `npx wrangler deploy`
   (config en [`wrangler.jsonc`](../wrangler.jsonc)). Variables de **build**:
   `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Agregar el dominio como
   Custom Domain.
5. **Google login**: Google Cloud Console → OAuth consent screen + OAuth
   client (Web). Redirect URI: `https://diqbgkuesnvusliyfrab.supabase.co/auth/v1/callback`.
   Pegar Client ID/Secret en Supabase → Authentication → Providers → Google.
6. Apagar el proyecto de Vercel y borrar `vercel.json`.

## Fase 1 — Portal oscuro con barra inferior ✅

Hecha (commit `8531900`).

## Fase 2 — Acceso: Google + aprobación del profe

- Botón "Entrar con Google" en `/login` (`signInWithOAuth`).
- Con Google cualquiera puede crear cuenta, así que se agrega
  `profiles.estado` (`pendiente` | `activo`). Los alumnos invitados por el
  profe quedan `activo`; los que llegan solos quedan `pendiente` hasta que el
  profe los aprueba desde Alumnos. Si un invitado entra con Google con el
  mismo correo, Supabase une ambas identidades.
- RLS: diario, tareas y asistencia solo para alumnos `activo` (y el profe).
- Opcional: código de 6 dígitos por correo en vez de magic link (el enlace
  se pierde al abrirse en el navegador interno de Gmail).
- Checkin: después de iniciar sesión, volver al `/checkin/<token>`.

## Fase 3 — Asistencia confiable

- El QR solo sirve si la sesión está **activa y es de hoy** (validado en la
  base, no solo en la página). El profe **cierra la clase** al terminar.
- El profe puede **marcar asistencia a mano** (alumno sin batería/datos).
- Alumno que se queda sin clases: aparece destacado en el Inicio del profe
  (ya existe) + aviso (push en Fase 6).

## Fase 4 — Diario de clase (solo alumnos)

- Las bitácoras pasan a publicaciones con título, texto con formato, fotos y
  enlaces de YouTube.
- El componente de "publicación con medios" se reutiliza para tareas.

## Fase 5 — Tareas

- Tabla `tareas` (título, descripción, enlaces/YouTube, fecha). El profe
  publica, edita y borra; los alumnos activos solo las ven.

## Fase 6 — PWA + notificaciones push

- Manifest + service worker (instalable en la pantalla de inicio).
- Claves VAPID, tabla `push_subscriptions` y Edge Function que envía.
- Avisos: nueva tarea, nueva entrada del diario, "se acabaron tus clases"
  (al alumno) y "X usó su última clase" (al profe).

## Después (no prioritario)

- Agenda con eventos (presentaciones, días sin clase) y avisos de ausencia.
- Perfil (foto, apodo, cueca favorita) y cumpleaños.
- Ranking / XP, encuestas.
