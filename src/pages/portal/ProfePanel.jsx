import { useState } from "react";
import { QrCode, NotebookText, Users } from "lucide-react";
import TomarAsistencia from "./profe/TomarAsistencia";
import Bitacoras from "./profe/Bitacoras";
import Alumnos from "./profe/Alumnos";

const TABS = [
  { id: "asistencia", label: "Tomar asistencia", icon: QrCode },
  { id: "bitacoras", label: "Bitácoras", icon: NotebookText },
  { id: "alumnos", label: "Alumnos", icon: Users },
];

export default function ProfePanel() {
  const [tab, setTab] = useState("asistencia");

  return (
    <div className="space-y-8">
      <div className="flex gap-2 flex-wrap">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-body transition-colors ${
              tab === id ? "bg-carbon text-crema" : "bg-crema text-carbon/60 border border-carbon/10"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>

      {tab === "asistencia" && <TomarAsistencia />}
      {tab === "bitacoras" && <Bitacoras />}
      {tab === "alumnos" && <Alumnos />}
    </div>
  );
}
