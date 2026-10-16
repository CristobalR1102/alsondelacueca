import { Clock, MapPin } from "lucide-react";
import { cuentaRegresiva, fechaLarga, HORA_FIN, HORA_INICIO, LUGAR, proximasClases } from "../../lib/clases";

export default function ProximaClase({ children }) {
  const [clase] = proximasClases(1);

  return (
    <section className="portal-card p-5 border-l-4 border-l-dorado">
      <p className="portal-eyebrow mb-3">Lo próximo</p>
      <p className="font-body text-rojo text-sm font-bold">
        {cuentaRegresiva(clase)} · {String(HORA_INICIO).padStart(2, "0")}:00 hrs
      </p>
      <h2 className="font-display text-crema text-2xl font-bold mt-1">Clase de cueca</h2>
      <p className="font-body text-crema/60 text-sm mt-1">{fechaLarga(clase.inicio)}</p>
      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-crema/50 text-xs font-body">
        <span className="flex items-center gap-1.5">
          <Clock size={14} className="text-dorado" />
          {HORA_INICIO}:00 – {HORA_FIN}:00 hrs
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={14} className="text-dorado" />
          {LUGAR}
        </span>
      </div>
      {children}
    </section>
  );
}
