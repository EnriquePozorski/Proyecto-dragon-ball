import { Link } from "react-router-dom";
import logo from "../assets/Dragon-Ball-Emblema.png";
import "./Header.css";
import Comparison from "./Comparison.jsx";

export default function Header({ menuOpen, setMenuOpen, asideOpen, setAsideOpen, isHome }) {
  return (
    <header className="header">
      <Link to="/" onClick={() => setMenuOpen(false)}>
        <img src={logo} alt="logo-dragon-ball" id="hd-logo" width="200" />
      </Link>

      {/* Nav con clase condicional para mobile */}
      <nav className={`hd-nav ${menuOpen ? "open" : ""}`}>
        <ul className="hd-nav-links">
          <li>
            <Link to="/home" onClick={() => setMenuOpen(false)}>Inicio</Link>
          </li>
          <li>
            <Link to="/characters" onClick={() => setMenuOpen(false)}>Personajes</Link>
          </li>
          <li>
            <Link to="/planets" onClick={() => setMenuOpen(false)}>Planetas</Link>
          </li>
        </ul>
      </nav>

      {/* Comparison solo en desktop */}
      {!isHome && <Comparison />}

      {/* Botones solo visibles en responsive */}
      <div className="hd-buttons">
        

        {/* Lupa -> abre/cierra aside */}
        <button
          className="hd-search"
          onClick={() => setAsideOpen(!asideOpen)}
          aria-label="Toggle search"
        >
          🔍
        </button>

        {/* Hamburguesa -> abre/cierra nav */}
        <button
          className="hd-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>
    </header>
  );
}
