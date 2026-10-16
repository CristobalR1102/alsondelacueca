import { useAuth } from "../../context/AuthContext";
import { fechaLarga, saludo } from "../../lib/clases";

const ETIQUETA_ROL = { alumno: "Alumno/a", profe: "Profe" };

export default function Bienvenida() {
  const { profile } = useAuth();
  const ahora = new Date();
  const primerNombre = profile?.nombre?.split(" ")[0];

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <span className="portal-eyebrow">Al Son de la Cueca</span>
        <span className="bg-rojo text-white text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded">
          {ETIQUETA_ROL[profile?.rol] ?? profile?.rol}
        </span>
      </div>
      <h1 className="font-display text-crema text-3xl font-bold leading-tight">
        {saludo(ahora)}
        {primerNombre ? <>, <span className="text-dorado italic">{primerNombre}</span></> : null}
      </h1>
      <p className="font-body text-crema/50 text-sm mt-1">{fechaLarga(ahora)}</p>
    </section>
  );
}
