import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import BitacoraItem from "../../../components/portal/BitacoraItem";

export default function BitacoraAlumno() {
  const [bitacoras, setBitacoras] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    supabase
      .from("bitacoras")
      .select("*")
      .order("fecha", { ascending: false })
      .limit(30)
      .then(({ data }) => {
        setBitacoras(data ?? []);
        setCargando(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <section>
        <p className="portal-eyebrow mb-2">Diario de clases</p>
        <h1 className="font-display text-crema text-3xl font-bold">Bitácora</h1>
        <p className="font-body text-crema/50 text-sm mt-1">Lo que se trabajó en cada clase.</p>
      </section>

      {cargando ? (
        <p className="font-body text-crema/50 text-sm">Cargando...</p>
      ) : bitacoras.length === 0 ? (
        <p className="font-body text-crema/50 text-sm">El profe aún no ha publicado bitácoras.</p>
      ) : (
        <div className="space-y-3">
          {bitacoras.map((b) => (
            <BitacoraItem key={b.id} bitacora={b} />
          ))}
        </div>
      )}
    </div>
  );
}
