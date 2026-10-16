import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "../../../context/AuthContext";
import { fechaLarga, parseFecha } from "../../../lib/clases";

export default function MiAsistencia() {
  const { user } = useAuth();
  const [asistencias, setAsistencias] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!user) return;

    supabase
      .from("asistencia")
      .select("id, created_at, sesiones(fecha)")
      .eq("alumno_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setAsistencias(data ?? []);
        setCargando(false);
      });
  }, [user]);

  return (
    <div className="space-y-6">
      <section>
        <p className="portal-eyebrow mb-2">Tu camino</p>
        <h1 className="font-display text-crema text-3xl font-bold">Mi asistencia</h1>
        {!cargando && (
          <p className="font-body text-crema/50 text-sm mt-1">
            {asistencias.length} {asistencias.length === 1 ? "clase asistida" : "clases asistidas"} en total.
          </p>
        )}
      </section>

      {cargando ? (
        <p className="font-body text-crema/50 text-sm">Cargando...</p>
      ) : asistencias.length === 0 ? (
        <p className="font-body text-crema/50 text-sm">
          Aún no tienes asistencias registradas. Escanea el QR del profe al llegar a clase.
        </p>
      ) : (
        <ul className="space-y-2">
          {asistencias.map((a) => (
            <li key={a.id} className="portal-card px-4 py-3 flex items-center gap-3 text-sm font-body text-crema/70">
              <CalendarCheck size={16} className="text-dorado shrink-0" />
              {a.sesiones?.fecha ? fechaLarga(parseFecha(a.sesiones.fecha)) : "Fecha desconocida"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
