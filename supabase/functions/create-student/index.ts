// Edge Function: create-student
// Invitada solo por el profe desde el panel. Crea la cuenta del alumno (magic link)
// y su fila en profiles con el plan indicado.
//
// Supabase inyecta automáticamente SUPABASE_URL, SUPABASE_ANON_KEY y
// SUPABASE_SERVICE_ROLE_KEY como variables de entorno: no hay que configurarlas.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return jsonResponse({ error: "Método no permitido" }, 405);
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return jsonResponse({ error: "No autorizado" }, 401);
  }

  // Cliente con el token del que llama, solo para saber quién es
  const callerClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });
  const {
    data: { user },
  } = await callerClient.auth.getUser();

  if (!user) {
    return jsonResponse({ error: "No autorizado" }, 401);
  }

  // Cliente admin (service role) para verificar el rol y crear al alumno
  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const { data: perfilLlamador } = await admin
    .from("profiles")
    .select("rol")
    .eq("id", user.id)
    .single();

  if (perfilLlamador?.rol !== "profe") {
    return jsonResponse({ error: "Solo el profe puede crear alumnos" }, 403);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "JSON inválido" }, 400);
  }

  const { email, nombre, plan } = body ?? {};
  if (!email || !nombre || !plan) {
    return jsonResponse({ error: "Faltan datos: email, nombre y plan son obligatorios" }, 400);
  }
  if (!["4_clases", "mensual"].includes(plan)) {
    return jsonResponse({ error: "Plan inválido" }, 400);
  }

  const { data: invitado, error: errorInvitar } = await admin.auth.admin.inviteUserByEmail(email, {
    data: { nombre },
  });

  if (errorInvitar) {
    return jsonResponse({ error: errorInvitar.message }, 400);
  }

  const clasesIniciales = plan === "4_clases" ? 4 : 0;

  const { error: errorPerfil } = await admin
    .from("profiles")
    .update({ nombre, plan, clases_restantes: clasesIniciales })
    .eq("id", invitado.user.id);

  if (errorPerfil) {
    return jsonResponse({ error: errorPerfil.message }, 400);
  }

  return jsonResponse({ ok: true, id: invitado.user.id });
});
