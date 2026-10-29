# Al Son de la Cueca — Academia de baile

🚧 **En desarrollo** para una academia de cueca real en Maipú.

🔗 Preview: https://alsondelacueca.vercel.app

Landing page pública y portal privado para la gestión de la academia.

## Landing
Clases y horarios, planes, el profesor, galería, playlist de Spotify, testimonios, preguntas frecuentes y contacto por WhatsApp.

## Portal (en desarrollo)
- Login sin contraseña con magic link (Supabase Auth)
- Vistas y permisos distintos según el rol (alumno / profesor)
- Registro de asistencia con check-in por código QR
- Bitácora diaria de clases
- Más funcionalidades por definir con la academia

## Stack
React 19 · Vite · Tailwind CSS · React Router 7 · Supabase (Auth, Postgres, Edge Functions, Realtime) · Vercel

## Correr localmente
```bash
npm install
npm run dev
```
