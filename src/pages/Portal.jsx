import { useAuth } from "../context/AuthContext";
import PortalLayout from "../components/portal/PortalLayout";
import AlumnoDashboard from "./portal/AlumnoDashboard";
import ProfePanel from "./portal/ProfePanel";

export default function Portal() {
  const { profile, loading } = useAuth();

  if (loading || !profile) {
    return (
      <PortalLayout>
        <p className="font-body text-carbon/60 text-sm">Cargando tu perfil...</p>
      </PortalLayout>
    );
  }

  return <PortalLayout>{profile.rol === "profe" ? <ProfePanel /> : <AlumnoDashboard />}</PortalLayout>;
}
