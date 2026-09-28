import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function Checkin() {
  const { token } = useParams();
  const { user, loading } = useAuth();
  const [estado, setEstado] = useState("cargando");
  const [fecha, setFecha] = useState(null);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setEstado("sin-sesion");
      return;
    }

    let activo = true;

    (async () => {
      const { data: sesion, error: errSesion } = await supabase
        .from("sesiones")
        .select("id, fecha")
        .eq("token", token)
        .single();

      if (!activo) return;

      if (errSesion || !sesion) {
        setEstado("invalido");
        return;
      }
      setFecha(sesion.fecha);

      const { error: errInsert } = await supabase
        .from("asistencia")
        .insert({ sesion_id: sesion.id, alumno_id: user.id });

      if (!activo) return;

      if (errInsert) {
        setEstado(errInsert.code === "23505" ? "ya" : "error");
        return;
      }
      setEstado("ok");
    })();

    return () => {
      activo = false;
    };
  }, [token, user, loading]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 text-center"
      style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #2C1810 50%, #1A1A1A 100%)" }}
    >
      <div className="max-w-sm w-full bg-crema rounded-lg p-8 shadow-lg">
        {estado === "cargando" && <p className="font-body text-carbon/60 text-sm">Registrando...</p>}

        {estado === "sin-sesion" && (
          <>
            <p className="font-body text-carbon mb-4">Debes iniciar sesión para marcar tu asistencia.</p>
            <Link
              to="/login"
              className="inline-block bg-carbon hover:bg-tierra text-crema font-bold px-6 py-3 rounded text-sm transition-colors"
            >
              Iniciar sesión
            </Link>
          </>
        )}

        {estado === "ok" && (
          <p className="font-display text-carbon text-xl font-bold">
            ¡Asistencia registrada! 🎉
            <br />
            <span className="font-body text-carbon/60 text-sm font-normal">{fecha}</span>
          </p>
        )}

        {estado === "ya" && (
          <p className="font-display text-carbon text-xl font-bold">
            Ya habías marcado tu asistencia a esta clase ✅
          </p>
        )}

        {estado === "invalido" && (
          <p className="font-body text-carbon">Este código QR no es válido.</p>
        )}

        {estado === "error" && (
          <p className="font-body text-carbon">Ocurrió un error al registrar tu asistencia.</p>
        )}
      </div>
    </div>
  );
}
