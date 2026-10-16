import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";

const PLANES = [
  { value: "4_clases", label: "4 clases al mes ($25.000)" },
  { value: "mensual", label: "Mes completo ($33.000)" },
];

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [form, setForm] = useState({ email: "", nombre: "", plan: "4_clases" });
  const [creando, setCreando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const cargar = () => {
    supabase
      .from("profiles")
      .select("*")
      .eq("rol", "alumno")
      .order("nombre")
      .then(({ data }) => {
        setAlumnos(data ?? []);
        setCargando(false);
      });
  };

  useEffect(cargar, []);

  const crearAlumno = async (e) => {
    e.preventDefault();
    setCreando(true);
    setMensaje(null);
    const { data, error } = await supabase.functions.invoke("create-student", { body: form });
    setCreando(false);
    if (error) {
      let texto = error.message;
      if (error.context) {
        try {
          const cuerpo = await error.context.json();
          if (cuerpo?.error) texto = cuerpo.error;
        } catch {
          // el cuerpo no era JSON, nos quedamos con error.message
        }
      }
      setMensaje({ tipo: "error", texto });
      return;
    }
    if (data?.error) {
      setMensaje({ tipo: "error", texto: data.error });
      return;
    }
    setMensaje({ tipo: "ok", texto: `Invitación enviada a ${form.email}` });
    setForm({ email: "", nombre: "", plan: "4_clases" });
    cargar();
  };

  const actualizarAlumno = async (id, cambios) => {
    await supabase.from("profiles").update(cambios).eq("id", id);
    cargar();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={crearAlumno} className="portal-card p-6">
        <h2 className="font-display text-crema text-lg font-bold mb-4 flex items-center gap-2">
          <UserPlus size={18} className="text-dorado" />
          Invitar alumno nuevo
        </h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <input
            required
            type="text"
            placeholder="Nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="portal-input"
          />
          <input
            required
            type="email"
            placeholder="Correo"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="portal-input"
          />
          <select
            value={form.plan}
            onChange={(e) => setForm({ ...form, plan: e.target.value })}
            className="portal-input"
          >
            {PLANES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={creando}
          className="portal-btn mt-4"
        >
          {creando ? "Enviando..." : "Enviar invitación"}
        </button>
        {mensaje && (
          <p className={`mt-3 text-sm font-body ${mensaje.tipo === "error" ? "text-rojo" : "text-green-400"}`}>
            {mensaje.texto}
          </p>
        )}
      </form>

      <div>
        <h2 className="font-display text-crema text-lg font-bold mb-4">Alumnos ({alumnos.length})</h2>
        {cargando ? (
          <p className="font-body text-crema/50 text-sm">Cargando...</p>
        ) : alumnos.length === 0 ? (
          <p className="font-body text-crema/50 text-sm">Todavía no has invitado alumnos.</p>
        ) : (
          <div className="space-y-2">
            {alumnos.map((a) => (
              <div
                key={a.id}
                className="portal-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between"
              >
                <span className="font-body font-bold text-crema text-sm">{a.nombre}</span>
                <div className="flex items-center gap-3">
                  <select
                    value={a.plan || ""}
                    onChange={(e) => actualizarAlumno(a.id, { plan: e.target.value || null })}
                    className="bg-carbon border border-white/15 rounded px-2 py-1 text-xs font-body text-crema"
                  >
                    <option value="">Sin plan</option>
                    {PLANES.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  {a.plan === "4_clases" && (
                    <input
                      type="number"
                      min={0}
                      value={a.clases_restantes}
                      onChange={(e) => actualizarAlumno(a.id, { clases_restantes: Number(e.target.value) })}
                      className="w-16 bg-carbon border border-white/15 rounded px-2 py-1 text-xs font-body text-crema"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
