import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import { useAuth } from "../../../context/AuthContext";
import BitacoraItem from "../../../components/portal/BitacoraItem";

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
      <form onSubmit={publicar} className="portal-card p-6">
        <label className="font-body font-bold text-crema text-sm block mb-2">Nueva bitácora</label>
        <textarea
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          rows={4}
          placeholder="¿Qué se trabajó en la clase de hoy?"
          className="portal-input w-full resize-none"
        />
        <button
          type="submit"
          disabled={enviando}
          className="portal-btn mt-3"
        >
          {enviando ? "Publicando..." : "Publicar"}
        </button>
      </form>

      <div className="space-y-3">
        {cargando ? (
          <p className="font-body text-crema/50 text-sm">Cargando...</p>
        ) : bitacoras.length === 0 ? (
          <p className="font-body text-crema/50 text-sm">Todavía no has publicado ninguna bitácora.</p>
        ) : (
          bitacoras.map((b) => (
            <BitacoraItem
              key={b.id}
              bitacora={b}
              acciones={
                <button
                  onClick={() => eliminar(b.id)}
                  className="text-crema/30 hover:text-rojo shrink-0 self-start"
                  aria-label="Eliminar bitácora"
                >
                  <Trash2 size={16} />
                </button>
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
