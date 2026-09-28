import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-carbon">
        <p className="font-body text-crema/60 text-sm">Cargando...</p>
      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;

  return children;
}
