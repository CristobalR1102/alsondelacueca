import { fechaLarga, parseFecha } from "../../lib/clases";

export default function BitacoraItem({ bitacora, acciones, recortar = false }) {
  return (
    <article className="portal-card p-4 flex justify-between gap-4">
      <div className="min-w-0">
        <p className="font-body text-dorado text-xs font-bold mb-1">{fechaLarga(parseFecha(bitacora.fecha))}</p>
        <p
          className={`font-body text-crema/70 text-sm leading-relaxed whitespace-pre-wrap ${
            recortar ? "line-clamp-3" : ""
          }`}
        >
          {bitacora.contenido}
        </p>
      </div>
      {acciones}
    </article>
  );
}
