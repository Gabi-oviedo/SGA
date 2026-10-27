import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="sga-header">
            <Link to="/" className="sga-brand" aria-label="SGA, inicio">
                <img src="/sga.svg" alt="" className="sga-brand-logo" />
                <span className="sga-brand-name">SGA</span>
                <span className="sga-brand-caption">Gestión Académica</span>
            </Link>
            <nav className="sga-nav" aria-label="Navegación principal">
                <Link to="/">Inicio</Link>
                <Link to="/alumnos">Alumnos</Link>
                <Link to="/ayuda">Ayuda</Link>
            </nav>
        </header>
    )
}