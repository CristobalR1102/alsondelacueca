import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Inicio",    href: "#inicio" },
  { label: "Clases",    href: "#clases" },
  { label: "El Profe",  href: "#profe" },
  { label: "Galería",   href: "#galeria" },
  { label: "Playlist",  href: "#playlist" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto",  href: "#contacto" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? "bg-carbon/95 backdrop-blur shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex flex-col leading-none">
          <span className="font-display text-dorado text-lg font-bold italic">Al Son</span>
          <span className="font-display text-crema text-xs tracking-widest uppercase">de la Cueca</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-crema/80 hover:text-dorado text-sm tracking-wide transition-colors font-body"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/56991555287?text=Hola!%20Me%20interesa%20inscribirme%20en%20la%20academia."
            target="_blank"
            rel="noreferrer"
            className="bg-rojo hover:bg-red-700 text-white text-sm font-bold px-4 py-2 rounded transition-colors"
          >
            Inscríbete
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-crema"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-carbon/97 px-4 pb-4 flex flex-col gap-3 mt-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-crema/80 hover:text-dorado py-1 border-b border-white/10 text-sm"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://wa.me/56912345678?text=Hola!%20Me%20interesa%20inscribirme%20en%20la%20academia."
            target="_blank"
            rel="noreferrer"
            className="bg-rojo text-white text-center py-2 rounded font-bold text-sm mt-1"
          >
            Inscríbete
          </a>
        </div>
      )}
    </header>
  );
}
