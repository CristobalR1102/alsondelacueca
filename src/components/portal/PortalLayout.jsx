import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function PortalLayout({ children }) {
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-hueso">
      <header className="bg-carbon py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex flex-col leading-none">
            <span className="font-display text-dorado text-base font-bold italic">Al Son</span>
            <span className="font-display text-crema/60 text-[10px] tracking-widest uppercase">
              de la Cueca
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-body text-crema/70 text-sm hidden sm:inline">
              {profile?.nombre || "..."}
            </span>
            <button
              onClick={signOut}
              className="flex items-center gap-1 text-crema/60 hover:text-dorado text-sm transition-colors"
            >
              <LogOut size={16} />
              Salir
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-10">{children}</main>
    </div>
  );
}
