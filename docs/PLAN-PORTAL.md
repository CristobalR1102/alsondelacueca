# Plan del portal — inspirado en la app de "Lote Chileno"

Referencia: video de la app de Lote Chileno (2026-10-15). Prioridades elegidas:
**Agenda + ausencias** y **Perfil + cumpleaños**. Ranking/XP, tests, anuncios,
directorio, media y notificaciones push quedan para después.

Ojo con una diferencia de fondo: Lote Chileno es un **club** (integrantes,
campeonatos, director). Al Son de la Cueca es una **academia** con alumnos que
pagan un plan (`4_clases` / `mensual`). Por eso algunas ideas se adaptan
(ver Ausencias).

## Comparación rápida

| App del video | Portal actual | Plan |
|---|---|---|
| Asistencia con QR | ✅ `sesiones` + `asistencia` + Realtime | se mantiene |
| Diario de ensayo | ✅ `bitacoras` | se mantiene |
| Roles director / integrante | ✅ `profe` / `alumno` | se mantiene |
| Inicio con "Lo próximo" y KPIs | ❌ | Fase 1 |
| Barra inferior, modo oscuro | ❌ (portal claro, sin navegación) | Fase 1 |
| Agenda de ensayos y eventos | ❌ | Fase 2 |
| Avisos de ausencia | ❌ | Fase 3 |
| Perfil (foto, apodo, comuna, cueca favorita, "¿por qué bailas?") | ❌ (solo `nombre`) | Fase 4 |
| Cumpleaños del mes / aviso del día | ❌ | Fase 4 |
| Ranking "Podio de Garra", XP, tests | ❌ | Más adelante |
| Anuncios, encuestas, directorio, media, push | ❌ | Más adelante |

## Fase 0 — Requisito previo (sin esto nadie real puede entrar)

- **Dominio propio + verificarlo en Resend.** Hoy el SMTP solo envía a
  `cristobalrenato.2005@gmail.com`, así que ningún alumno real recibe el magic
  link. Cualquier función nueva queda sin usar hasta resolver esto.
- **Checkin → volver al QR después de loguearse.** Hoy el alumno sin sesión
  tiene que escanear dos veces. Arreglo chico: pasar `?next=/checkin/<token>`
  al login y redirigir ahí al volver.

## Fase 1 — Base visual del portal (sin tablas nuevas)

El comentario del video ("con menos información se ve más elegante") es la
dirección de diseño: oscuro, limpio y con poco texto.

- Portal en azul marino (`carbon`) con tarjetas `#0F2147`, acentos dorado/rojo.
- Barra inferior fija en el celular: **Inicio · Agenda · Perfil · Más**
  (en escritorio, pestañas arriba). Se convierte en rutas: `/portal`,
  `/portal/agenda`, `/portal/perfil`, `/portal/mas`.
- **Inicio del alumno:** saludo + plan + clases restantes + "Próxima clase:
  miércoles 19:00" (por ahora se calcula con la regla fija mié/vie).
- **Inicio del profe:** KPIs (alumnos activos, asistencias del mes) y accesos
  a Tomar asistencia, Bitácoras y Alumnos.
- Tamaño: chico/mediano. Solo cambia el front.

## Fase 2 — Agenda

Nueva tabla `eventos`:

```
id, tipo ('clase_especial' | 'sin_clase' | 'presentacion' | 'campeonato' | 'peña' | 'otro'),
titulo, fecha, hora_inicio, hora_fin, lugar, descripcion, creado_por, created_at
```

- Las clases normales (mié y vie, 19–21) **no se guardan una por una**: el
  front las genera con la regla fija. En la tabla solo van las excepciones
  (`sin_clase` por feriado, por ejemplo) y los eventos extra.
- RLS: todo usuario autenticado lee; solo el profe crea/edita/borra.
- Profe: formulario para crear/editar eventos. Alumno: lista "Próximos" con
  etiquetas de color por tipo y una cuenta regresiva en el Inicio
  ("En 2 días · 19:00").
- Opcional: vincular `sesiones.evento_id` cuando el QR se genera para un
  evento puntual.

## Fase 3 — Avisos de ausencia

Nueva tabla `ausencias`:

```
id, alumno_id, fecha (o evento_id), motivo, estado ('pendiente' | 'visto'), created_at
```

- El alumno avisa desde la Agenda ("No puedo ir a esta clase") con un motivo
  corto.
- El profe ve en su Inicio "2 avisos de ausencia" y en "Tomar asistencia"
  aparece quién avisó que no viene.
- **Decisión pendiente:** en el club se *aprueba o rechaza*. En una academia
  pagada eso tiene sentido solo si una ausencia avisada se puede
  **recuperar** (ej. con plan de 4 clases, avisar con 24 h devuelve el cupo).
  Si no hay política de recuperación, basta con "visto" (más simple).
  → definir con Bastián.

## Fase 4 — Perfil y cumpleaños

Columnas nuevas en `profiles`:

```
apodo, foto_url, fecha_nacimiento, comuna, cueca_favorita, por_que_bailo,
instagram, whatsapp, mostrar_instagram, mostrar_whatsapp
```

- Foto: bucket `avatars` en Supabase Storage (cada alumno sube solo la suya;
  `capture` en el input permite tomarla con la cámara del celular).
- "Tu camino": clases asistidas (conteo de `asistencia`) y desde cuándo baila
  en la academia (`created_at`).
- Personalización estilo "Chamanto / banda de rosas": dejarlo para después;
  con foto + datos ya se siente propio.
- **Cumpleaños:** sección "Cumpleaños de octubre" en el Inicio y una franja
  "¡Hoy está de cumpleaños X!".
- **Privacidad (importante):** hoy la RLS de `profiles` solo deja ver la
  propia fila (o todas si eres profe). Para que los alumnos vean cumpleaños y
  fotos de los demás **no** se abre la tabla: se crea una función
  `security definer` (o vista) que devuelve solo `apodo`, `foto_url`,
  día/mes de cumpleaños (nunca el año ni el teléfono) y los contactos marcados
  como visibles.

## Más adelante (no prioritario)

- **Ranking / XP** ("Podio de Garra"): puntos por asistencia; se apoya en
  `asistencia`, casi sin tablas nuevas. Buen siguiente paso tras la Fase 4.
- **Tests teóricos** (métrica, estructura de la cueca) que dan XP.
- **Anuncios** (las bitácoras pueden cubrir parte de esto).
- **Notificaciones push**: requiere convertir el sitio en PWA (manifest +
  service worker + Web Push). Es lo más costoso; recién vale la pena con
  alumnos usando el portal de verdad.

## Orden sugerido

0 → 1 → 2 → 4 → 3. Las fases 2 y 4 no tocan los mismos archivos, así que se
pueden trabajar en paralelo una vez lista la Fase 1 (que define rutas y
navegación). La Fase 3 depende de la Agenda.
