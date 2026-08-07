import { useState } from "react";
import { ChevronDown } from "lucide-react";

const preguntas = [
  {
    q: "¿Necesito tener experiencia previa para inscribirme?",
    a: "Para nada. El nivel principiantes está diseñado justamente para personas que nunca han bailado cueca. Partimos desde cero y avanzamos a tu ritmo.",
  },
  {
    q: "¿Qué ropa debo usar?",
    a: "Para las primeras clases, cualquier ropa cómoda y zapatillas sirve. A medida que avances, te orientaremos sobre la vestimenta tradicional: huasa para ellas y huaso para ellos.",
  },
  {
    q: "¿Hay clases para niños?",
    a: "Sí, contamos con grupos infantiles en horario diferenciado. Contáctanos por WhatsApp para conocer los horarios disponibles para menores.",
  },
  {
    q: "¿Puedo ir solo o necesito ir en pareja?",
    a: "Puedes venir solo. La cueca se baila en pareja, pero en la academia rotamos parejas entre los alumnos para que todos practiquen por igual.",
  },
  {
    q: "¿Cuánto cuesta el mes de clases?",
    a: "Los valores varían según nivel y frecuencia. Escríbenos por WhatsApp para darte el detalle actualizado y las opciones de pago.",
  },
];

function Item({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-carbon/10">
      <button
        className="w-full flex items-center justify-between py-4 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-body font-bold text-carbon text-sm">{q}</span>
        <ChevronDown
          size={18}
          className={`text-dorado flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="font-body text-carbon/60 text-sm pb-4 leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="py-20 bg-crema">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="font-body text-dorado tracking-[0.25em] text-xs uppercase mb-3">
            Dudas frecuentes
          </p>
          <h2 className="font-display text-carbon text-4xl font-bold mb-4">
            Preguntas frecuentes
          </h2>
          <div className="linea-cueca max-w-xs mx-auto">
            <span className="text-dorado">✦</span>
          </div>
        </div>

        <div>
          {preguntas.map((p) => (
            <Item key={p.q} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
