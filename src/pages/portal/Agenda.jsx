import { cuentaRegresiva, HORA_FIN, HORA_INICIO, LUGAR, proximasClases } from "../../lib/clases";

const fmtDia = new Intl.DateTimeFormat("es-CL", { day: "numeric" });
const fmtMes = new Intl.DateTimeFormat("es-CL", { month: "short" });
const fmtSemana = new Intl.DateTimeFormat("es-CL", { weekday: "long" });

export default function Agenda() {
  const clases = proximasClases(8);

  return (
    <div className="space-y-6">
      <section>
        <p className="portal-eyebrow mb-2">Agenda</p>
        <h1 className="font-display text-crema text-3xl font-bold">Próximas clases</h1>
        <p className="font-body text-crema/50 text-sm mt-1">
          Miércoles y viernes, {HORA_INICIO}:00 a {HORA_FIN}:00 hrs en {LUGAR}.
        </p>
      </section>

      <ul className="space-y-2">
        {clases.map((clase, i) => (
          <li
            key={clase.inicio.toISOString()}
            className={`portal-card p-4 flex items-center gap-4 ${i === 0 ? "border-l-4 border-l-dorado" : ""}`}
          >
            <div className="w-12 text-center shrink-0">
              <p className="font-display text-dorado text-2xl font-bold leading-none">{fmtDia.format(clase.inicio)}</p>
              <p className="font-body text-crema/50 text-[11px] uppercase tracking-widest mt-1">
                {fmtMes.format(clase.inicio).replace(".", "")}
              </p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body font-bold text-crema text-sm">Clase de cueca</p>
              <p className="font-body text-crema/50 text-xs capitalize">
                {fmtSemana.format(clase.inicio)} · {HORA_INICIO}:00 – {HORA_FIN}:00
              </p>
            </div>
            <span className="bg-white/10 text-crema/70 text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded shrink-0">
              {i === 0 ? cuentaRegresiva(clase) : "Clase"}
            </span>
          </li>
        ))}
      </ul>

      <p className="font-body text-crema/30 text-xs text-center">
        Pronto: presentaciones, peñas y días sin clase en esta misma agenda.
      </p>
    </div>
  );
}
