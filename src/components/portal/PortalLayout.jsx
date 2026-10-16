import { NavLink, Outlet } from "react-router-dom";
import { CalendarDays, Home, ListChecks, LogOut, NotebookText, QrCode, Users } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logoMark from "../../assets/logo-mark.webp";

const TABS = {
  alumno: [
    { to: "/portal", label: "Inicio", icon: Home, end: true },
    { to: "/portal/agenda", label: "Agenda", icon: CalendarDays },
    { to: "/portal/mi-asistencia", label: "Asistencia", icon: ListChecks },
    { to: "/portal/bitacora", label: "Bitácora", icon: NotebookText },
  ],
  profe: [
    { to: "/portal", label: "Inicio", icon: Home, end: true },
    { to: "/portal/agenda", label: "Agenda", icon: CalendarDays },
    { to: "/portal/asistencia", label: "QR", icon: QrCode },
    { to: "/portal/bitacoras", label: "Bitácoras", icon: NotebookText },
    { to: "/portal/alumnos", label: "Alumnos", icon: Users },
  ],
};

export default function PortalLayout() {
  const { profile, loading, signOut } = useAuth();
  const tabs = TABS[profile?.rol] ?? [];

  return (
    <div className="min-h-screen bg-carbon text-crema">
      <header className="sticky top-0 z-30 bg-carbon/95 backdrop-blur border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <NavLink to="/portal" className="flex items-center gap-3 leading-none">
            <img src={logoMark} alt="" width="36" height="36" className="w-9 h-9 rounded-full ring-1 ring-dorado/60" />
            <span className="flex flex-col">
              <span className="font-display text-dorado text-base font-bold italic">Al Son</span>
              <span className="font-display text-crema/60 text-[10px] tracking-widest uppercase">de la Cueca</span>
            </span>
          </NavLink>

          {/* Pestañas en escritorio */}
          <nav className="hidden md:flex gap-1">
            {tabs.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded text-sm font-body transition-colors ${
                    isActive ? "bg-white/10 text-dorado" : "text-crema/60 hover:text-crema"
                  }`
                }
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={signOut}
            className="flex items-center gap-1 text-crema/60 hover:text-dorado text-sm transition-colors"
          >
            <LogOut size={16} />
            Salir
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6 pb-28 md:pb-12">
        {loading || !profile ? (
          <p className="font-body text-crema/60 text-sm">Cargando tu perfil...</p>
        ) : (
          <Outlet />
        )}
      </main>

      {/* Barra inferior en el celular */}
      {tabs.length > 0 && (
        <nav
          className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-carbon/95 backdrop-blur border-t border-white/10"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="flex">
            {tabs.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex-1 flex flex-col items-center gap-1 py-2.5 text-[11px] font-body transition-colors ${
                    isActive ? "text-dorado" : "text-crema/50"
                  }`
                }
              >
                <Icon size={20} />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
