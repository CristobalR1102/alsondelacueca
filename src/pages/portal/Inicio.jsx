import { useAuth } from "../../context/AuthContext";
import InicioAlumno from "./alumno/InicioAlumno";
import InicioProfe from "./profe/InicioProfe";

export default function Inicio() {
  const { profile } = useAuth();
  return profile?.rol === "profe" ? <InicioProfe /> : <InicioAlumno />;
}
