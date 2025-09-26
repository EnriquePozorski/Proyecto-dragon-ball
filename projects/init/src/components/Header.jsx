import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Dragon-Ball-Emblema.png";
import "./Header.css";
import Comparison from "./Comparison.jsx";

export default function Header({ menuOpen, setMenuOpen, isHome }) {
  return (
    <header className="header">
      <Link to="/" onClick={() => setMenuOpen(false)}>
        <img src={logo} alt="logo-dragon-ball" id="hd-logo" width="200" />
      </Link>

      <nav className={`hd-nav`}>
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

      {/* Comparison solo en desktop o si no estamos en Home */}
      {!isHome && <Comparison />}

      <button
        className="hd-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </button>
    </header>
  );
}
