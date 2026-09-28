import { MessageCircle, MapPin, Link2, Clock } from "lucide-react";

export default function Contacto() {
  return (
    <section id="contacto" className="py-24 bg-carbon">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Info */}
          <div>
            <p className="font-body text-dorado tracking-[0.25em] text-xs uppercase mb-3">
              Contáctanos
            </p>
            <h2 className="font-display text-crema text-4xl md:text-5xl font-bold italic mb-4">
              ¿Listo para bailar?
            </h2>
            <div className="linea-cueca max-w-xs mb-6">
              <span className="text-dorado">✦</span>
            </div>
            <p className="font-body text-crema/60 leading-relaxed mb-8">
              Escríbenos directamente por WhatsApp y te respondemos a la brevedad. 
              También nos encuentras en Instagram con contenido de nuestras clases y eventos.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dorado/10 border border-dorado/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-dorado" />
                </div>
                <div>
                  <p className="font-body text-crema/50 text-xs uppercase tracking-widest">Ubicación</p>
                  <p className="font-body text-crema text-sm">Maipú, Santiago, Chile</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dorado/10 border border-dorado/20 flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-dorado" />
                </div>
                <div>
                  <p className="font-body text-crema/50 text-xs uppercase tracking-widest">Clases</p>
                  <p className="font-body text-crema text-sm">Miércoles y Viernes · 19:00 – 21:00 hrs</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-dorado/10 border border-dorado/20 flex items-center justify-center flex-shrink-0">
                  <Link2 size={16} className="text-dorado" />
                </div>
                <div>
                  <p className="font-body text-crema/50 text-xs uppercase tracking-widest">Instagram</p>
                  <a
                    href="https://www.instagram.com/academia_alsondelacueca/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-body text-crema text-sm hover:text-dorado transition-colors"
                  >
                    @academia_alsondelacueca
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="bg-tierra/20 border border-dorado/20 rounded-lg p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
              <MessageCircle size={28} className="text-green-400" />
            </div>
            <h3 className="font-display text-crema text-2xl font-bold mb-3">
              Escríbenos por WhatsApp
            </h3>
            <p className="font-body text-crema/60 text-sm leading-relaxed mb-6">
              La forma más rápida de inscribirte, consultar horarios o resolver cualquier duda.
              Te respondemos el mismo día.
            </p>
            <a
              href="https://wa.me/56991555287?text=Hola!%20Me%20interesa%20inscribirme%20en%20Al%20Son%20de%20la%20Cueca.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n?"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded transition-colors text-sm"
            >
              <MessageCircle size={16} />
              Abrir WhatsApp
            </a>
            <p className="font-body text-crema/30 text-xs mt-4">
              También puedes llamar al +56 9 9155 5287
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}