import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "../../../context/AuthContext";
import { primerDiaDelMes } from "../../../lib/clases";
import Bienvenida from "../../../components/portal/Bienvenida";
import ProximaClase from "../../../components/portal/ProximaClase";
import Kpis from "../../../components/portal/Kpis";
import SeccionTitulo from "../../../components/portal/SeccionTitulo";
import BitacoraItem from "../../../components/portal/BitacoraItem";

export default function InicioAlumno() {
  const { profile, user } = useAuth();
  const [asistencias, setAsistencias] = useState(null);
  const [ultimaBitacora, setUltimaBitacora] = useState(null);

  useEffect(() => {
    if (!user) return;

    Promise.all([
      supabase.from("asistencia").select("created_at").eq("alumno_id", user.id),
      supabase.from("bitacoras").select("*").order("fecha", { ascending: false }).limit(1),
    ]).then(([asistenciaRes, bitacorasRes]) => {
      setAsistencias(asistenciaRes.data ?? []);
      setUltimaBitacora(bitacorasRes.data?.[0] ?? null);
    });
  }, [user]);

  const inicioMes = primerDiaDelMes();
  const esteMes = asistencias?.filter((a) => new Date(a.created_at) >= inicioMes).length;
  const sinClases = profile.plan === "4_clases" && profile.clases_restantes === 0;

  const kpiPlan =
    profile.plan === "4_clases"
      ? { label: "Te quedan", valor: profile.clases_restantes, detalle: "clases este mes", destacado: sinClases }
      : profile.plan === "mensual"
        ? { label: "Tu plan", valor: "Mes", detalle: "completo" }
        : { label: "Tu plan", valor: "–", detalle: "sin asignar" };

  return (
    <div className="space-y-6">
      <Bienvenida />

      {sinClases && (
        <div className="flex items-start gap-3 bg-rojo/15 border border-rojo/40 rounded-xl p-4">
          <AlertCircle size={18} className="text-rojo shrink-0 mt-0.5" />
          <p className="font-body text-crema/80 text-sm">
            Ya usaste tus 4 clases de este mes. Habla con el profe para renovar tu plan.
          </p>
        </div>
      )}

      <ProximaClase />

      <Kpis
        items={[
          kpiPlan,
          { label: "Este mes", valor: esteMes, detalle: "clases asistidas" },
          { label: "En total", valor: asistencias?.length, detalle: "clases asistidas" },
        ]}
      />

      <section>
        <SeccionTitulo link="/portal/bitacora" linkTexto="Ver todas">
          Última bitácora
        </SeccionTitulo>
        {ultimaBitacora ? (
          <BitacoraItem bitacora={ultimaBitacora} recortar />
        ) : (
          <p className="font-body text-crema/40 text-sm">El profe aún no ha publicado bitácoras.</p>
        )}
      </section>
    </div>
  );
}
