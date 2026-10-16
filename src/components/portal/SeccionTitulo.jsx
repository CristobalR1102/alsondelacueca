import { Link } from "react-router-dom";

export default function SeccionTitulo({ children, link, linkTexto }) {
  return (
    <div className="flex items-baseline justify-between mb-3">
      <h2 className="portal-titulo">{children}</h2>
      {link && (
        <Link to={link} className="portal-eyebrow hover:text-crema transition-colors">
          {linkTexto} →
        </Link>
      )}
    </div>
  );
}
