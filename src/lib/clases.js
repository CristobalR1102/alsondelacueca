// Horario fijo de la academia: miércoles y viernes, 19:00–21:00 hrs, en Maipú.
// Mientras no exista la tabla de eventos (Fase 2 del plan), las clases se
// calculan con esta regla.
export const DIAS_CLASE = [3, 5]; // 0 = domingo
export const HORA_INICIO = 19;
export const HORA_FIN = 21;
export const LUGAR = "Maipú";

const DIA_MS = 24 * 60 * 60 * 1000;

function inicioDelDia(fecha) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate());
}

// Próximas `cantidad` clases que aún no terminan, desde `ahora`.
export function proximasClases(cantidad = 1, ahora = new Date()) {
  const clases = [];
  const dia = inicioDelDia(ahora);

  while (clases.length < cantidad) {
    if (DIAS_CLASE.includes(dia.getDay())) {
      const inicio = new Date(dia);
      inicio.setHours(HORA_INICIO, 0, 0, 0);
      const fin = new Date(dia);
      fin.setHours(HORA_FIN, 0, 0, 0);
      if (fin > ahora) clases.push({ inicio, fin });
    }
    dia.setDate(dia.getDate() + 1);
  }

  return clases;
}

// "En curso", "Hoy", "Mañana" o "En N días".
export function cuentaRegresiva({ inicio, fin }, ahora = new Date()) {
  if (inicio <= ahora && ahora < fin) return "En curso";
  const dias = Math.round((inicioDelDia(inicio) - inicioDelDia(ahora)) / DIA_MS);
  if (dias === 0) return "Hoy";
  if (dias === 1) return "Mañana";
  return `En ${dias} días`;
}

export function saludo(ahora = new Date()) {
  const h = ahora.getHours();
  if (h < 12) return "Buenos días";
  if (h < 20) return "Buenas tardes";
  return "Buenas noches";
}

const fmtFechaLarga = new Intl.DateTimeFormat("es-CL", { weekday: "long", day: "numeric", month: "long" });

// "miércoles 21 de octubre" → "Miércoles 21 de octubre"
export function fechaLarga(fecha) {
  const texto = fmtFechaLarga.format(fecha);
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Fechas "YYYY-MM-DD" de Postgres sin que se corran un día por la zona horaria.
export function parseFecha(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function primerDiaDelMes(ahora = new Date()) {
  return new Date(ahora.getFullYear(), ahora.getMonth(), 1);
}
