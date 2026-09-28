import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activo = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!activo) return;
      setSession(data.session);
      if (!data.session) setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nuevaSesion) => {
      setSession(nuevaSesion);
      if (!nuevaSesion) {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      activo = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!session?.user) return;

    let activo = true;
    setLoading(true);

    supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single()
      .then(({ data, error }) => {
        if (!activo) return;
        if (error) {
          console.error("Error cargando el perfil:", error.message);
        }
        setProfile(data ?? null);
        setLoading(false);
      });

    return () => {
      activo = false;
    };
  }, [session?.user?.id]);

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
