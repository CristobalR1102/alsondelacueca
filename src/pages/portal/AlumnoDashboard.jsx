import { useEffect, useState } from "react";
import { CalendarCheck, NotebookText } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";

const nombrePlan = {
  "4_clases": "4 clases al mes",
  mensual: "Mes completo",
};

export default function AlumnoDashboard() {
  const { profile, user } = useAuth();
  const [asistencias, setAsistencias] = useState([]);
  const [bitacoras, setBitacoras] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!user) return;

    Promise.all([
      supabase
        .from("asistencia")
        .select("id, created_at, sesiones(fecha)")
        .eq("alumno_id", user.id)
        .order("created_at", { ascending: false }),
      supabase.from("bitacoras").select("*").order("fecha", { ascending: false }).limit(20),
    ]).then(([asistenciaRes, bitacorasRes]) => {
      setAsistencias(asistenciaRes.data ?? []);
      setBitacoras(bitacorasRes.data ?? []);
      setCargando(false);
    });
  }, [user]);

  return (
    <div className="space-y-10">
      {/* Estado del alumno */}
      <section className="bg-crema rounded-lg p-6 shadow-sm border border-carbon/5">
        <h1 className="font-display text-carbon text-2xl font-bold mb-1">
          Hola, {profile?.nombre || "alumno/a"}
        </h1>
        <p className="font-body text-carbon/60 text-sm mb-4">
          Plan actual: <span className="font-bold">{nombrePlan[profile?.plan] || "sin asignar"}</span>
        </p>

        {profile?.plan === "4_clases" && (
          <div className="inline-flex items-center gap-2 bg-dorado/10 border border-dorado/30 rounded-full px-4 py-2">
            <CalendarCheck size={16} className="text-dorado" />
            <span className="font-body text-carbon text-sm">
              Te quedan <span className="font-bold">{profile?.clases_restantes ?? 0}</span> clases este mes
            </span>
          </div>
        )}
      </section>

      {/* Historial de asistencia */}
      <section>
        <h2 className="font-display text-carbon text-xl font-bold mb-4 flex items-center gap-2">
          <CalendarCheck size={18} className="text-dorado" />
          Mi asistencia
        </h2>
        {cargando ? (
          <p className="font-body text-carbon/50 text-sm">Cargando...</p>
        ) : asistencias.length === 0 ? (
          <p className="font-body text-carbon/50 text-sm">Aún no tienes asistencias registradas.</p>
        ) : (
          <ul className="space-y-2">
            {asistencias.map((a) => (
              <li
                key={a.id}
                className="bg-crema rounded px-4 py-3 text-sm font-body text-carbon/70 border border-carbon/5"
              >
                {a.sesiones?.fecha ?? "Fecha desconocida"}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Bitácoras */}
      <section>
        <h2 className="font-display text-carbon text-xl font-bold mb-4 flex items-center gap-2">
          <NotebookText size={18} className="text-dorado" />
          Bitácora de clases
        </h2>
        {cargando ? (
          <p className="font-body text-carbon/50 text-sm">Cargando...</p>
        ) : bitacoras.length === 0 ? (
          <p className="font-body text-carbon/50 text-sm">El profe aún no ha publicado bitácoras.</p>
        ) : (
          <div className="space-y-3">
            {bitacoras.map((b) => (
              <div key={b.id} className="bg-crema rounded-lg p-4 border border-carbon/5">
                <p className="font-body text-dorado text-xs font-bold mb-1">{b.fecha}</p>
                <p className="font-body text-carbon/70 text-sm leading-relaxed whitespace-pre-wrap">
                  {b.contenido}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
