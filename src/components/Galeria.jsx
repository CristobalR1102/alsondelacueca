// Galería con placeholders — reemplazar los src con fotos reales
// Puedes usar imágenes desde /public/galeria/foto1.jpg, etc.

const fotos = [
  { id: 1, alt: "Clase de cueca principiantes", span: "col-span-2 row-span-2" },
  { id: 2, alt: "Presentación Fiestas Patrias" },
  { id: 3, alt: "Zapateo avanzado" },
  { id: 4, alt: "Alumnos en práctica" },
  { id: 5, alt: "Evento folclórico", span: "col-span-2" },
];

const colores = ["#2C1810", "#3D2B1F", "#1A1A1A", "#4A3728", "#2A1F17", "#35261A"];

export default function Galeria() {
  return (
    <section id="galeria" className="py-24 bg-crema">
      <div className="max-w-6xl mx-auto px-4">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <p className="font-body text-dorado tracking-[0.25em] text-xs uppercase mb-3">
            Nuestra academia
          </p>
          <h2 className="font-display text-carbon text-4xl md:text-5xl font-bold mb-4">
            La cueca en imágenes
          </h2>
          <div className="linea-cueca max-w-xs mx-auto">
            <span className="text-dorado">✦</span>
          </div>
        </div>

        {/* Grid de fotos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[180px]">
          {fotos.map((foto, i) => (
            <div
              key={foto.id}
              className={`${foto.span || ""} rounded-lg overflow-hidden relative group`}
              style={{ backgroundColor: colores[i % colores.length] }}
            >
              {/*
                PARA REEMPLAZAR CON FOTOS REALES:
                <img src={`/galeria/foto${foto.id}.jpg`} alt={foto.alt}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              */}
              <div className="w-full h-full flex flex-col items-center justify-center text-crema/20 gap-2">
                <span className="text-3xl">📷</span>
                <p className="font-body text-xs text-center px-4">{foto.alt}</p>
              </div>
              {/* Overlay hover */}
              <div className="absolute inset-0 bg-dorado/0 group-hover:bg-dorado/10 transition-colors duration-300 rounded-lg" />
            </div>
          ))}
        </div>

        <p className="text-center font-body text-carbon/40 text-xs mt-6">
          * Reemplaza los placeholders con fotos reales de la academia
        </p>
      </div>
    </section>
  );
}
