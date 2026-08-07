import { Award, Music, Users } from "lucide-react";

const logros = [
  { icon: Award, texto: "Más de 10 años enseñando cueca en Santiago" },
  { icon: Music,  texto: "Participante en Fiestas Patrias y festivales folclóricos" },
  { icon: Users,  texto: "Más de 200 alumnos formados en la academia" },
];

export default function Profe() {
  return (
    <section id="profe" className="py-24 bg-carbon">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Foto placeholder */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-tierra/30 flex items-center justify-center border border-dorado/20">
              {/* Reemplazar con la foto real del profe */}
              <div className="text-center text-crema/30">
                <div className="text-6xl mb-3">🎭</div>
                <p className="font-body text-sm">Foto del profesor</p>
              </div>
            </div>
            {/* Detalle decorativo */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full rounded-lg border border-dorado/20 -z-10"
            />
          </div>

          {/* Texto */}
          <div>
            <p className="font-body text-dorado tracking-[0.25em] text-xs uppercase mb-3">
              Conoce al profe
            </p>
            <h2 className="font-display text-crema text-4xl md:text-5xl font-bold italic mb-2">
              [Nombre del profe]
            </h2>
            <p className="font-display text-dorado text-lg mb-6">
              Cultor y bailarín de cueca chilena
            </p>

            <div className="linea-cueca mb-6">
              <span className="text-dorado text-sm">✦</span>
            </div>

            <p className="font-body text-crema/70 leading-relaxed mb-4">
              Nació con la cueca en la sangre. Desde joven participó en grupos folclóricos de 
              Maipú, donde aprendió de los grandes cultores de la cueca chora y campesina. 
              Hoy lleva más de una década transmitiendo esa pasión a nuevas generaciones.
            </p>
            <p className="font-body text-crema/70 leading-relaxed mb-8">
              En "Al Son de la Cueca" no solo enseñamos pasos: enseñamos la historia, 
              el zapateo, el pañuelo y la picardía que hace grande a nuestro baile nacional.
            </p>

            {/* Logros */}
            <div className="space-y-3">
              {logros.map(({ icon: Icon, texto }) => (
                <div key={texto} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-dorado/10 border border-dorado/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-dorado" />
                  </div>
                  <p className="font-body text-crema/70 text-sm">{texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
