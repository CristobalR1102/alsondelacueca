import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "../../../context/AuthContext";

export default function Bitacoras() {
  const { user } = useAuth();
  const [contenido, setContenido] = useState("");
  const [bitacoras, setBitacoras] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [cargando, setCargando] = useState(true);

  const cargar = () => {
    supabase
      .from("bitacoras")
      .select("*")
      .order("fecha", { ascending: false })
      .then(({ data }) => {
        setBitacoras(data ?? []);
        setCargando(false);
      });
  };

  useEffect(cargar, []);

  const publicar = async (e) => {
    e.preventDefault();
    if (!contenido.trim()) return;
    setEnviando(true);
    const { error } = await supabase.from("bitacoras").insert({ contenido, autor_id: user.id });
    setEnviando(false);
    if (error) {
      alert("No se pudo publicar: " + error.message);
      return;
    }
    setContenido("");
    cargar();
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar esta bitácora?")) return;
    await supabase.from("bitacoras").delete().eq("id", id);
    cargar();
  };

  return (
    <div className="space-y-6">
      <form onSubmit={publicar} className="bg-crema rounded-lg p-6 shadow-sm border border-carbon/5">
        <label className="font-body font-bold text-carbon text-sm block mb-2">Nueva bitácora</label>
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          rows={4}
          placeholder="¿Qué se trabajó en la clase de hoy?"
          className="w-full px-3 py-2 rounded border border-carbon/20 text-sm font-body focus:outline-none focus:border-dorado resize-none"
        />
        <button
          type="submit"
          disabled={enviando}
          className="mt-3 bg-carbon hover:bg-tierra text-crema font-bold px-5 py-2 rounded text-sm transition-colors disabled:opacity-50"
        >
          {enviando ? "Publicando..." : "Publicar"}
        </button>
      </form>

      <div className="space-y-3">
        {cargando ? (
          <p className="font-body text-carbon/50 text-sm">Cargando...</p>
        ) : bitacoras.length === 0 ? (
          <p className="font-body text-carbon/50 text-sm">Todavía no has publicado ninguna bitácora.</p>
        ) : (
          bitacoras.map((b) => (
            <div
              key={b.id}
              className="bg-crema rounded-lg p-4 border border-carbon/5 flex justify-between gap-4"
            >
              <div>
                <p className="font-body text-dorado text-xs font-bold mb-1">{b.fecha}</p>
                <p className="font-body text-carbon/70 text-sm whitespace-pre-wrap">{b.contenido}</p>
              </div>
              <button
                onClick={() => eliminar(b.id)}
                className="text-carbon/30 hover:text-rojo shrink-0"
                aria-label="Eliminar bitácora"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
