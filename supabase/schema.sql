-- Al Son de la Cueca — esquema de base de datos
-- Ejecutar completo en Supabase: Dashboard > SQL Editor > New query > pegar y correr

create extension if not exists pgcrypto;

-- ============================================================
-- TABLAS
-- ============================================================

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null default '',
  rol text not null default 'alumno' check (rol in ('alumno', 'profe')),
  plan text check (plan in ('4_clases', 'mensual')),
  clases_restantes integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.sesiones (
  id uuid primary key default gen_random_uuid(),
  fecha date not null default current_date,
  token uuid not null default gen_random_uuid(),
  creado_por uuid not null references public.profiles(id),
  activa boolean not null default true,
  created_at timestamptz not null default now(),
  unique (token)
);

create table public.asistencia (
  id uuid primary key default gen_random_uuid(),
  sesion_id uuid not null references public.sesiones(id) on delete cascade,
  alumno_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (sesion_id, alumno_id)
);

create table public.bitacoras (
  id uuid primary key default gen_random_uuid(),
  fecha date not null default current_date,
  contenido text not null,
  autor_id uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

-- ============================================================
-- FUNCIONES DE APOYO
-- ============================================================

-- ¿El usuario autenticado actual es el profe? (security definer evita recursión de RLS)
create or replace function public.is_profe()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and rol = 'profe'
  );
$$;

-- Crea automáticamente el perfil al crearse un usuario de auth (invitación por email)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nombre, rol, clases_restantes)
  values (new.id, coalesce(new.raw_user_meta_data->>'nombre', ''), 'alumno', 0)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Descuenta una clase al alumno de plan "4_clases" cuando marca asistencia
create or replace function public.descontar_clase()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set clases_restantes = greatest(clases_restantes - 1, 0)
  where id = new.alumno_id
    and plan = '4_clases';
  return new;
end;
$$;

create trigger on_asistencia_creada
  after insert on public.asistencia
  for each row execute function public.descontar_clase();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;
alter table public.sesiones enable row level security;
alter table public.asistencia enable row level security;
alter table public.bitacoras enable row level security;

-- profiles: cada alumno ve/edita su propia fila; el profe ve y edita todas
create policy "profiles_select_propio_o_profe"
  on public.profiles for select
  using (id = auth.uid() or public.is_profe());

create policy "profiles_update_propio_o_profe"
  on public.profiles for update
  using (id = auth.uid() or public.is_profe());

create policy "profiles_insert_profe"
  on public.profiles for insert
  with check (public.is_profe());

-- sesiones: cualquier usuario autenticado puede leer (necesario para validar el QR);
-- solo el profe crea/edita
create policy "sesiones_select_autenticado"
  on public.sesiones for select
  using (auth.uid() is not null);

create policy "sesiones_insert_profe"
  on public.sesiones for insert
  with check (public.is_profe());

create policy "sesiones_update_profe"
  on public.sesiones for update
  using (public.is_profe());

-- asistencia: el alumno solo ve/crea su propia asistencia; el profe ve/edita todo
create policy "asistencia_select_propia_o_profe"
  on public.asistencia for select
  using (alumno_id = auth.uid() or public.is_profe());

create policy "asistencia_insert_propia"
  on public.asistencia for insert
  with check (alumno_id = auth.uid());

create policy "asistencia_update_profe"
  on public.asistencia for update
  using (public.is_profe());

create policy "asistencia_delete_profe"
  on public.asistencia for delete
  using (public.is_profe());

-- bitacoras: cualquier autenticado puede leer; solo el profe escribe
create policy "bitacoras_select_autenticado"
  on public.bitacoras for select
  using (auth.uid() is not null);

create policy "bitacoras_insert_profe"
  on public.bitacoras for insert
  with check (public.is_profe());

create policy "bitacoras_update_profe"
  on public.bitacoras for update
  using (public.is_profe());

create policy "bitacoras_delete_profe"
  on public.bitacoras for delete
  using (public.is_profe());

-- ============================================================
-- REALTIME (para ver los asistentes en vivo en el panel del profe)
-- ============================================================

alter publication supabase_realtime add table public.asistencia;
