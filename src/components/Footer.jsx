export default function Footer() {
  return (
    <footer className="bg-carbon border-t border-dorado/10 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-display text-dorado text-base font-bold italic">Al Son </span>
          <span className="font-display text-crema/50 text-sm tracking-widest">de la Cueca</span>
        </div>
        <p className="font-body text-crema/30 text-xs text-center">
          © {new Date().getFullYear()} Academia de Cueca Chilena · Maipú, Santiago
        </p>
        <p className="font-body text-crema/20 text-xs">
          Hecho con ❤️ en Chile
        </p>
      </div>
    </footer>
  );
}
