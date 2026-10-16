import logo from "../assets/logo.webp";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-carbon pt-24 pb-20"
    >
      {/* Patrón decorativo fondo */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #D4A23A 0px,
            #D4A23A 1px,
            transparent 1px,
            transparent 40px
          )`,
        }}
      />

      {/* Círculo decorativo dorado */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-dorado/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute w-[700px] h-[700px] rounded-full border border-dorado/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo (su fondo es el mismo azul marino de la sección; "lighten" deja pasar el patrón) */}
        <h1 className="mb-6">
          <img
            src={logo}
            alt="Academia Al Son de la Cueca — Tradición, Técnica, Excelencia"
            width="900"
            height="900"
            className="w-72 sm:w-80 md:w-[26rem] h-auto mx-auto mix-blend-lighten"
          />
        </h1>

        {/* Bajada */}
        <p className="font-body text-crema/70 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Aprende el baile nacional de Chile con clases para todos los niveles.
          Tradición, ritmo y cultura en cada paso.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/56991555287?text=Hola!%20Quiero%20inscribirme%20en%20la%20academia%20Al%20Son%20de%20la%20Cueca."
            target="_blank"
            rel="noreferrer"
            className="bg-rojo hover:bg-granate text-white font-bold px-8 py-3 rounded transition-all hover:scale-105 shadow-lg text-sm tracking-wide"
          >
            Quiero inscribirme
          </a>
          <a
            href="#clases"
            className="border border-dorado/50 hover:border-dorado text-dorado font-body px-8 py-3 rounded transition-all hover:bg-dorado/10 text-sm tracking-wide"
          >
            Ver horarios
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border-2 border-dorado/40 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-dorado/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
