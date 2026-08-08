import { Clock, MapPin, Users } from "lucide-react";

const niveles = [
  {
    nivel: "Principiantes",
    descripcion: "Para quienes nunca han bailado cueca. Aprende los pasos básicos, la postura y el ritmo desde cero.",
    dias: "Miércoles y Jueves",
    horario: "19:00 – 21:00",
    cupos: "Cupos disponibles",
    color: "border-dorado",
    badge: "bg-dorado",
  },
  {
    nivel: "Intermedio",
    descripcion: "Perfecciona tu técnica, mejora el zapateo y aprende las variaciones regionales de la cueca.",
    dias: "Miércoles y Jueves",
    horario: "19:00 – 21:00",
    cupos: "Cupos disponibles",
    color: "border-rojo",
    badge: "bg-rojo",
  },
  {
    nivel: "Avanzado",
    descripcion: "Para bailarines con experiencia. Preparación para presentaciones, concursos y folclore escénico.",
    dias: "Horario a coordinar",
    horario: "Consultar con el profesor",
    cupos: "Clase personalizada",
    color: "border-tierra",
    badge: "bg-tierra",
  },
];

export default function Clases() {
  return (
    <section id="clases" className="py-24 bg-hueso">
      <div className="max-w-6xl mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <p className="font-body text-dorado tracking-[0.25em] text-xs uppercase mb-3">
            Horarios 2025
          </p>
          <h2 className="font-display text-carbon text-4xl md:text-5xl font-bold mb-4">
            Elige tu nivel
          </h2>
          <div className="linea-cueca max-w-xs mx-auto">
            <span className="text-dorado">✦</span>
          </div>
          <p className="font-body text-carbon/60 mt-4 max-w-md mx-auto">
            Clases presenciales en Maipú. Miércoles y Jueves de 19:00 a 21:00 hrs.
          </p>
        </div>

        {/* Tarjetas */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {niveles.map((n) => (
            <div
              key={n.nivel}
              className={`bg-crema rounded-lg border-t-4 ${n.color} shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col`}
            >
              <span className={`self-start ${n.badge} text-white text-xs font-bold px-3 py-1 rounded-full mb-4`}>
                {n.nivel}
              </span>
              <p className="font-body text-carbon/70 text-sm leading-relaxed mb-6 flex-1">
                {n.descripcion}
              </p>
              <div className="space-y-2 border-t border-carbon/10 pt-4">
                <div className="flex items-center gap-2 text-sm text-carbon/70">
                  <Clock size={14} className="text-dorado flex-shrink-0" />
                  <span>{n.dias} · {n.horario}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-carbon/70">
                  <MapPin size={14} className="text-dorado flex-shrink-0" />
                  <span>Maipú, Santiago</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-carbon/70">
                  <Users size={14} className="text-dorado flex-shrink-0" />
                  <span>{n.cupos}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="font-body text-carbon/60 text-sm mb-4">
            ¿Tienes dudas sobre qué nivel elegir?
          </p>
          <a
            href="https://wa.me/56912345678?text=Hola!%20Quisiera%20saber%20qu%C3%A9%20nivel%20de%20cueca%20me%20conviene."
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-carbon hover:bg-tierra text-crema font-bold px-8 py-3 rounded transition-colors text-sm"
          >
            Consúltanos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}