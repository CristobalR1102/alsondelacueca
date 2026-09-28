# Configuración de Supabase — Al Son de la Cueca

Pasos a seguir en el dashboard de Supabase (supabase.com/dashboard) para dejar
el portal de alumnos y el panel del profe funcionando.

## 1. Crear las tablas y políticas de seguridad

1. Entra a tu proyecto → **SQL Editor** → **New query**.
2. Pega todo el contenido de [`schema.sql`](./schema.sql) y ejecútalo.
3. Debería crear 4 tablas (`profiles`, `sesiones`, `asistencia`, `bitacoras`),
   sus políticas de seguridad y activar Realtime para `asistencia`.

## 2. Configurar el login (magic link)

1. **Authentication → URL Configuration**:
   - **Site URL**: la URL de tu sitio en producción (ej. `https://alsondelacueca.cl`).
     Mientras desarrollas puedes dejar `http://localhost:5173`.
   - **Redirect URLs**: agrega las URLs que puede usar el magic link, mínimo:
     - `http://localhost:5173/portal`
     - `https://tu-dominio-real.cl/portal` (cuando tengas el dominio final)
2. **Authentication → Providers → Email**: confirma que el proveedor de Email
   esté habilitado (viene activado por defecto). No hace falta configurar
   contraseñas, usamos "magic link" (OTP por email).

## 3. Crear tu propia cuenta de profe

Como el profe también entra por el portal, necesitas una cuenta tuya marcada
con `rol = 'profe'`:

1. Ve a **Authentication → Users → Add user** y crea tu usuario (con tu email).
   Esto dispara el trigger que crea tu fila en `profiles` con `rol = 'alumno'`
   por defecto.
2. Ve a **Table Editor → profiles**, busca tu fila (por tu email lo identificas
   por el `id`, que coincide con el de Authentication → Users) y cambia:
   - `rol` → `profe`
   - `nombre` → tu nombre
3. Ahora puedes entrar al portal (`/login`) con tu email y usar el link mágico.
   Vas a ver el **panel del profe** en vez del dashboard de alumno.

## 4. Desplegar la función para crear alumnos

El profe crea alumnos desde el panel (pestaña "Alumnos"), lo que llama a una
Edge Function (`supabase/functions/create-student`). Para desplegarla:

```bash
npm install -g supabase
supabase login
supabase link --project-ref diqbgkuesnvusliyfrab
supabase functions deploy create-student
```

No necesitas configurar ningún secreto manualmente: Supabase inyecta
automáticamente `SUPABASE_URL`, `SUPABASE_ANON_KEY` y
`SUPABASE_SERVICE_ROLE_KEY` dentro de las Edge Functions.

`supabase login` abre el navegador para autenticarte con tu cuenta de
Supabase — es un paso que debes hacer tú mismo, no lo compartas por chat.

## 5. Probar el flujo completo

1. Entra a `/login` con tu cuenta de profe → deberías ver el panel del profe.
2. En la pestaña **Alumnos**, invita a un alumno de prueba con tu propio
   correo secundario (o el de alguien que te ayude a probar).
3. Esa persona recibe un email de invitación, hace clic, y entra al portal
   como alumno.
4. En la pestaña **Tomar asistencia**, genera un QR y pide al alumno de
   prueba que lo escanee con su celular (ya con sesión iniciada) — debería
   aparecer en la lista de asistentes en tiempo real.
5. Revisa que las clases restantes del alumno (si su plan es "4 clases")
   bajen en 1 después de escanear.

## Notas de mantenimiento

- **Renovar el plan cada mes**: no hay reseteo automático. El profe debe
  entrar a la pestaña "Alumnos" y volver a poner `clases_restantes` en 4 (o
  cambiar el plan) cuando el alumno paga de nuevo.
- **Corregir asistencia**: si alguien marcó mal su asistencia, se puede
  borrar la fila directamente desde **Table Editor → asistencia** en Supabase.
