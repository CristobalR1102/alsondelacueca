import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Muestra la página solo al rol indicado; al resto lo manda al Inicio del portal.
export default function SoloRol({ rol, children }) {
  const { profile } = useAuth();
  if (profile?.rol !== rol) return <Navigate to="/portal" replace />;
  return children;
}
