import { Music } from "lucide-react";

export default function Playlist() {
  return (
    <section id="playlist" className="py-24 bg-carbon">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="font-body text-dorado tracking-[0.25em] text-xs uppercase mb-3">
          Ambiéntate
        </p>
        <h2 className="font-display text-crema text-4xl md:text-5xl font-bold italic mb-4">
          Nuestra playlist
        </h2>
        <div className="linea-cueca max-w-xs mx-auto mb-6">
          <span className="text-dorado">✦</span>
        </div>
        <p className="font-body text-crema/70 leading-relaxed mb-8 max-w-xl mx-auto">
          Escucha "Al Son de la Cueca" 🤩♥️, la playlist con la que ambientamos
          nuestras clases y eventos.
        </p>

        <div className="rounded-lg overflow-hidden shadow-lg mb-6">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/1rqA1pB9H1Jxt1j2ZFkYsS?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Playlist Al Son de la Cueca en Spotify"
          />
        </div>

        <a
          href="https://open.spotify.com/playlist/1rqA1pB9H1Jxt1j2ZFkYsS?si=0xv2lV3AQgalQGFwVCpMJg"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-dorado/50 hover:border-dorado text-dorado font-body px-6 py-3 rounded transition-all hover:bg-dorado/10 text-sm tracking-wide"
        >
          <Music size={16} />
          Abrir en Spotify
        </a>
      </div>
    </section>
  );
}
