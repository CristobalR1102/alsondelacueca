import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, ChevronRight, NotebookText, QrCode, Users } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { primerDiaDelMes } from "../../../lib/clases";
import Bienvenida from "../../../components/portal/Bienvenida";
import ProximaClase from "../../../components/portal/ProximaClase";
import Kpis from "../../../components/portal/Kpis";
import SeccionTitulo from "../../../components/portal/SeccionTitulo";

const ACCESOS = [
  { to: "/portal/asistencia", label: "Tomar asistencia", detalle: "Genera el QR", icon: QrCode },
  { to: "/portal/bitacoras", label: "Bitácoras", detalle: "Publica lo de la clase", icon: NotebookText },
  { to: "/portal/alumnos", label: "Alumnos", detalle: "Planes e invitaciones", icon: Users },
  { to: "/portal/agenda", label: "Agenda", detalle: "Próximas clases", icon: CalendarDays },
];

export default function InicioProfe() {
  const [alumnos, setAlumnos] = useState(null);
  const [asistenciasMes, setAsistenciasMes] = useState(null);

  useEffect(() => {
    Promise.all([
      supabase.from("profiles").select("id, nombre, plan, clases_restantes").eq("rol", "alumno").order("nombre"),
      supabase
        .from("asistencia")
        .select("id", { count: "exact", head: true })
        .gte("created_at", primerDiaDelMes().toISOString()),
    ]).then(([alumnosRes, asistenciaRes]) => {
      setAlumnos(alumnosRes.data ?? []);
      setAsistenciasMes(asistenciaRes.count ?? 0);
    });
  }, []);

  const sinClases = alumnos?.filter((a) => a.plan === "4_clases" && a.clases_restantes === 0) ?? [];
  const sinPlan = alumnos?.filter((a) => !a.plan) ?? [];

  const avisos = [
    sinClases.length > 0 && {
      titulo: `${sinClases.length} ${sinClases.length === 1 ? "alumno sin clases" : "alumnos sin clases"} restantes`,
      detalle: sinClases.map((a) => a.nombre).join(", "),
    },
    sinPlan.length > 0 && {
      titulo: `${sinPlan.length} ${sinPlan.length === 1 ? "alumno sin plan" : "alumnos sin plan"} asignado`,
      detalle: sinPlan.map((a) => a.nombre).join(", "),
    },
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      <Bienvenida />

      <ProximaClase>
        <Link to="/portal/asistencia" className="portal-btn inline-flex items-center gap-2 mt-4">
          <QrCode size={16} />
          Tomar asistencia
        </Link>
      </ProximaClase>

      <Kpis
        items={[
          { label: "Alumnos", valor: alumnos?.length, detalle: "inscritos" },
          { label: "Asistencias", valor: asistenciasMes, detalle: "este mes" },
          { label: "Sin clases", valor: alumnos && sinClases.length, detalle: "por renovar", destacado: sinClases.length > 0 },
        ]}
      />

      {avisos.length > 0 && (
        <section>
          <SeccionTitulo link="/portal/alumnos" linkTexto="Alumnos">
            Para ti
          </SeccionTitulo>
          <div className="space-y-2">
            {avisos.map((a) => (
              <Link
                key={a.titulo}
                to="/portal/alumnos"
                className="portal-card p-4 flex items-center gap-3 hover:border-dorado/40 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-rojo shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block font-body font-bold text-crema text-sm">{a.titulo}</span>
                  <span className="block font-body text-crema/50 text-xs truncate">{a.detalle}</span>
                </span>
                <ChevronRight size={16} className="text-crema/30 shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <SeccionTitulo>Accesos rápidos</SeccionTitulo>
        <div className="grid grid-cols-2 gap-3">
          {ACCESOS.map(({ to, label, detalle, icon: Icon }) => (
            <Link key={to} to={to} className="portal-card p-4 hover:border-dorado/40 transition-colors">
              <Icon size={22} className="text-rojo mb-3" />
              <p className="font-body font-bold text-crema text-sm">{label}</p>
              <p className="font-body text-crema/40 text-xs mt-0.5">{detalle}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
