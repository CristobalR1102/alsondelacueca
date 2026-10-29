import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ACTUALIZADO = "29 de octubre de 2026";
const WHATSAPP = "https://wa.me/56991555287";

function Seccion({ titulo, children }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-carbon text-xl font-bold">{titulo}</h2>
      <div className="font-body text-carbon/75 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-crema">
      <header className="bg-carbon py-4 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-crema/70 hover:text-dorado text-sm font-body">
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 space-y-10">
        <div>
          <p className="font-body text-dorado text-xs tracking-[0.3em] uppercase font-bold mb-3">
            Academia Al Son de la Cueca
          </p>
          <h1 className="font-display text-carbon text-4xl font-bold">Política de privacidad</h1>
          <p className="font-body text-carbon/50 text-sm mt-2">Última actualización: {ACTUALIZADO}</p>
        </div>

        <Seccion titulo="Quiénes somos">
          <p>
            La Academia Al Son de la Cueca (Maipú, Santiago) es responsable de los datos personales que se
            recogen en este sitio y en su portal de alumnos. Para cualquier consulta sobre tus datos puedes
            escribirnos por{" "}
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="text-rojo underline">
              WhatsApp
            </a>
            .
          </p>
        </Seccion>

        <Seccion titulo="Qué datos guardamos">
          <ul className="list-disc pl-5 space-y-1">
            <li>Tu nombre y correo electrónico, para crear tu cuenta en el portal.</li>
            <li>
              Si entras con Google: el nombre, correo y foto de perfil que Google nos entrega. No recibimos tu
              contraseña.
            </li>
            <li>Tu plan contratado y las clases que te quedan en el mes.</li>
            <li>Tu registro de asistencia (qué días marcaste asistencia con el código QR).</li>
          </ul>
          <p>No pedimos datos de pago ni datos sensibles, y no usamos cookies de publicidad o seguimiento.</p>
        </Seccion>

        <Seccion titulo="Para qué los usamos">
          <ul className="list-disc pl-5 space-y-1">
            <li>Darte acceso al portal de alumnos.</li>
            <li>Llevar el control de asistencia y de las clases de tu plan.</li>
            <li>Mostrarte el diario de clases y las tareas que publica el profesor.</li>
            <li>Enviarte avisos relacionados con las clases (por ejemplo, cuando se te acaban las clases del mes).</li>
          </ul>
          <p>No vendemos ni compartimos tus datos con terceros para fines comerciales.</p>
        </Seccion>

        <Seccion titulo="Quién más los procesa">
          <p>Para que el sitio funcione usamos estos servicios, que procesan datos por cuenta nuestra:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Supabase</strong>: base de datos e inicio de sesión.
            </li>
            <li>
              <strong>Cloudflare</strong>: alojamiento del sitio web.
            </li>
            <li>
              <strong>Resend</strong>: envío de correos de acceso.
            </li>
            <li>
              <strong>Google</strong>: solo si eliges entrar con tu cuenta de Google.
            </li>
          </ul>
          <p>
            La página de inicio incluye contenido de Spotify y los videos del portal pueden estar alojados en
            YouTube; al reproducirlos, esos servicios aplican sus propias políticas.
          </p>
        </Seccion>

        <Seccion titulo="Fotos y menores de edad">
          <p>
            No publicamos fotos donde se reconozca a alumnos sin su autorización. Si el alumno es menor de 18
            años, la cuenta debe crearse con el consentimiento de su madre, padre o tutor.
          </p>
        </Seccion>

        <Seccion titulo="Cuánto tiempo los guardamos">
          <p>
            Mientras seas alumno de la academia. Si dejas de serlo o nos pides eliminar tu cuenta, borramos tus
            datos del portal.
          </p>
        </Seccion>

        <Seccion titulo="Tus derechos">
          <p>
            Puedes pedir en cualquier momento acceder a tus datos, corregirlos, eliminarlos, oponerte a su uso o
            recibir una copia de ellos, conforme a la ley chilena de protección de datos personales. Basta con
            escribirnos por{" "}
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="text-rojo underline">
              WhatsApp
            </a>{" "}
            y te responderemos a la brevedad.
          </p>
        </Seccion>

        <Seccion titulo="Cambios a esta política">
          <p>
            Si cambiamos cómo usamos tus datos, actualizaremos esta página e indicaremos la fecha de la última
            modificación arriba.
          </p>
        </Seccion>
      </main>
    </div>
  );
}
