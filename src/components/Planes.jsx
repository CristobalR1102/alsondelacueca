import { Check } from "lucide-react";

const planes = [
  {
    nombre: "4 clases al mes",
    precio: "$25.000",
    periodo: "/ mes",
    detalle: "Ideal si vas a tu propio ritmo. Se controla por asistencia.",
    beneficios: [
      "4 clases dentro del mes",
      "Asistencia registrada por clase",
      "Acceso a niveles según tu progreso",
    ],
    destacado: false,
  },
  {
    nombre: "Mes completo",
    precio: "$33.000",
    periodo: "/ mes",
    detalle: "Asiste a todas las clases que se dictan durante el mes.",
    beneficios: [
      "Todas las clases del mes (miércoles y viernes)",
      "Seguimiento personalizado de tu progreso",
      "Prioridad en eventos y presentaciones",
    ],
    destacado: true,
  },
];

export default function Planes() {
  return (
    <section id="planes" className="py-24 bg-crema">
      <div className="max-w-5xl mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <p className="font-body text-dorado tracking-[0.25em] text-xs uppercase mb-3">
            Valores 2025
          </p>
          <h2 className="font-display text-carbon text-4xl md:text-5xl font-bold mb-4">
            Planes y precios
          </h2>
          <div className="linea-cueca max-w-xs mx-auto">
            <span className="text-dorado">✦</span>
          </div>
          <p className="font-body text-carbon/60 mt-4 max-w-md mx-auto">
            Elige el plan que mejor se ajuste a tu ritmo de aprendizaje.
          </p>
        </div>

        {/* Tarjetas de planes */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {planes.map((p) => (
            <div
              key={p.nombre}
              className={`relative rounded-lg p-8 flex flex-col ${
                p.destacado
                  ? "bg-carbon border-2 border-dorado shadow-lg"
                  : "bg-hueso border border-carbon/10"
              }`}
            >
              {p.destacado && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dorado text-carbon text-xs font-bold px-4 py-1 rounded-full">
                  Más elegido
                </span>
              )}

              <h3
                className={`font-display text-2xl font-bold mb-1 ${
                  p.destacado ? "text-crema" : "text-carbon"
                }`}
              >
                {p.nombre}
              </h3>
              <p
                className={`font-body text-sm mb-6 ${
                  p.destacado ? "text-crema/60" : "text-carbon/60"
                }`}
              >
                {p.detalle}
              </p>

              <div className="flex items-end gap-1 mb-6">
                <span
                  className={`font-display text-4xl font-bold ${
                    p.destacado ? "text-dorado" : "text-carbon"
                  }`}
                >
                  {p.precio}
                </span>
                <span
                  className={`font-body text-sm mb-1 ${
                    p.destacado ? "text-crema/50" : "text-carbon/50"
                  }`}
                >
                  {p.periodo}
                </span>
              </div>

              <div className="space-y-3 flex-1 mb-8">
                {p.beneficios.map((b) => (
                  <div key={b} className="flex items-center gap-2">
                    <Check
                      size={16}
                      className={p.destacado ? "text-dorado" : "text-dorado"}
                    />
                    <span
                      className={`font-body text-sm ${
                        p.destacado ? "text-crema/80" : "text-carbon/70"
                      }`}
                    >
                      {b}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href={`https://wa.me/56991555287?text=Hola!%20Me%20interesa%20el%20plan%20${encodeURIComponent(
                  p.nombre
                )}%20(${encodeURIComponent(p.precio)}).`}
                target="_blank"
                rel="noreferrer"
                className={`text-center font-bold px-6 py-3 rounded transition-colors text-sm ${
                  p.destacado
                    ? "bg-dorado hover:bg-yellow-600 text-carbon"
                    : "bg-carbon hover:bg-tierra text-crema"
                }`}
              >
                Quiero este plan
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
