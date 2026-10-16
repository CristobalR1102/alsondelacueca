// Grilla de indicadores: [{ label, valor, detalle, destacado }]
export default function Kpis({ items }) {
  return (
    <section className="grid grid-cols-3 gap-3">
      {items.map(({ label, valor, detalle, destacado }) => (
        <div key={label} className="portal-card p-3 sm:p-4">
          <p className="font-body text-crema/50 text-[10px] sm:text-[11px] tracking-widest uppercase font-bold">
            {label}
          </p>
          <p className={`font-display text-3xl font-bold mt-1 ${destacado ? "text-rojo" : "text-dorado"}`}>
            {valor ?? "–"}
          </p>
          <p className="font-body text-crema/40 text-xs mt-0.5">{detalle}</p>
        </div>
      ))}
    </section>
  );
}
