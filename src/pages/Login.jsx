import { useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { session } = useAuth();
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState("idle"); // idle | enviando | enviado | error
  const [errorMsg, setErrorMsg] = useState("");

  if (session) return <Navigate to="/portal" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado("enviando");
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/portal`,
      },
    });

    if (error) {
      setEstado("error");
      setErrorMsg(error.message);
      return;
    }
    setEstado("enviado");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #2C1810 50%, #1A1A1A 100%)" }}
    >
      <div className="w-full max-w-sm bg-crema rounded-lg p-8 shadow-lg">
        <div className="text-center mb-8">
          <span className="font-display text-dorado text-lg font-bold italic block">Al Son</span>
          <span className="font-display text-carbon/70 text-xs tracking-widest uppercase">de la Cueca</span>
        </div>

        <h1 className="font-display text-carbon text-2xl font-bold text-center mb-2">
          Portal de alumnos
        </h1>
        <p className="font-body text-carbon/60 text-sm text-center mb-6">
          Ingresa tu correo y te enviamos un link para entrar, sin contraseña.
        </p>

        {estado === "enviado" ? (
          <div className="text-center py-4">
            <p className="font-body text-carbon text-sm">
              Revisa tu correo <span className="font-bold">{email}</span> y haz clic en el link para
              ingresar.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full px-4 py-3 rounded border border-carbon/20 bg-white text-carbon text-sm focus:outline-none focus:border-dorado"
            />
            {estado === "error" && (
              <p className="text-rojo text-xs">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={estado === "enviando"}
              className="w-full bg-carbon hover:bg-tierra text-crema font-bold py-3 rounded transition-colors text-sm disabled:opacity-50"
            >
              {estado === "enviando" ? "Enviando..." : "Enviarme el link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
