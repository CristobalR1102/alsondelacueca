import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { RefreshCw } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "../../../context/AuthContext";

export default function TomarAsistencia() {
  const { user } = useAuth();
  const [sesion, setSesion] = useState(null);
  const [asistentes, setAsistentes] = useState([]);
  const [generando, setGenerando] = useState(false);

  const generarQR = async () => {
    setGenerando(true);
    setAsistentes([]);
    const { data, error } = await supabase
      .from("sesiones")
      .insert({ creado_por: user.id })
      .select()
      .single();
    setGenerando(false);
    if (error) {
      alert("No se pudo generar el QR: " + error.message);
      return;
    }
    setSesion(data);
  };

  useEffect(() => {
    if (!sesion) return;

    supabase
      .from("asistencia")
      .select("id, created_at, profiles(nombre)")
      .eq("sesion_id", sesion.id)
      .then(({ data }) => setAsistentes(data ?? []));

    const canal = supabase
      .channel(`asistencia-${sesion.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "asistencia", filter: `sesion_id=eq.${sesion.id}` },
        async (payload) => {
          const { data: alumno } = await supabase
            .from("profiles")
            .select("nombre")
            .eq("id", payload.new.alumno_id)
            .single();
          setAsistentes((prev) => [
            ...prev,
            { id: payload.new.id, created_at: payload.new.created_at, profiles: alumno },
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, [sesion?.id]);

  const urlCheckin = sesion ? `${window.location.origin}/checkin/${sesion.token}` : "";

  return (
    <div className="portal-card p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="portal-titulo">Clase de hoy</h2>
          <p className="font-body text-crema/50 text-sm">
            {sesion
              ? `Sesión generada — ${sesion.fecha}`
              : "Genera el QR para que los alumnos marquen su asistencia"}
          </p>
        </div>
        <button
          onClick={generarQR}
          disabled={generando}
          className="portal-btn flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} />
          {sesion ? "Generar nuevo QR" : "Generar QR"}
        </button>
      </div>

      {sesion && (
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white p-4 rounded-lg">
              <QRCodeSVG value={urlCheckin} size={200} />
            </div>
            <p className="font-body text-crema/40 text-xs text-center break-all">{urlCheckin}</p>
          </div>

          <div>
            <h3 className="font-body font-bold text-crema text-sm mb-3">
              Asistentes ({asistentes.length})
            </h3>
            {asistentes.length === 0 ? (
              <p className="font-body text-crema/50 text-sm">Aún nadie ha escaneado el QR.</p>
            ) : (
              <ul className="space-y-2">
                {asistentes.map((a) => (
                  <li key={a.id} className="bg-white/5 rounded px-3 py-2 text-sm font-body text-crema/70">
                    {a.profiles?.nombre || "Alumno"}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
