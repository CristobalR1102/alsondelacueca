const testimonios = [
  {
    nombre: "María José S.",
    nivel: "Principiantes",
    texto:
      "Llegué sin saber nada de cueca y en tres meses ya bailé en las Fiestas Patrias del trabajo. El profe tiene una paciencia increíble y explica todo muy bien.",
  },
  {
    nombre: "Carlos A.",
    nivel: "Intermedio",
    texto:
      "Lo que más me gusta es que no es solo aprender los pasos, uno entiende la historia detrás del baile. La cueca chora, la campesina... un mundo que no conocía.",
  },
  {
    nombre: "Valentina R.",
    nivel: "Avanzado",
    texto:
      "Llevo dos años en la academia y sigo aprendiendo cosas nuevas. El grupo es como una familia y los eventos que hacemos son increíbles.",
  },
];

export default function Testimonios() {
  return (
    <section id="testimonios" className="py-24 bg-hueso">
      <div className="max-w-6xl mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <p className="font-body text-dorado tracking-[0.25em] text-xs uppercase mb-3">
            Lo que dicen nuestros alumnos
          </p>
          <h2 className="font-display text-carbon text-4xl md:text-5xl font-bold mb-4">
            Testimonios
          </h2>
          <div className="linea-cueca max-w-xs mx-auto">
            <span className="text-dorado">✦</span>
          </div>
        </div>

        {/* Tarjetas */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonios.map((t) => (
            <div
              key={t.nombre}
              className="bg-crema rounded-lg p-6 shadow-sm border border-carbon/5 flex flex-col gap-4"
            >
              {/* Comillas decorativas */}
              <span className="font-display text-dorado text-5xl leading-none select-none">"</span>

              <p className="font-body text-carbon/70 text-sm leading-relaxed flex-1 -mt-4">
                {t.texto}
              </p>

              <div className="border-t border-carbon/10 pt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-dorado/20 flex items-center justify-center">
                  <span className="font-display text-dorado font-bold text-sm">
                    {t.nombre[0]}
                  </span>
                </div>
                <div>
                  <p className="font-body font-bold text-carbon text-sm">{t.nombre}</p>
                  <p className="font-body text-carbon/50 text-xs">Nivel {t.nivel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
