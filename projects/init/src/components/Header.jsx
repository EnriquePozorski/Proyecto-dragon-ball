import { Link } from "react-router-dom";
import logo from "../assets/Dragon-Ball-Emblema.png";
import "./Header.css";
import Comparison from "./Comparison.jsx";

export default function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="header">
      {/* Logo que redirige al home */}
      <Link to="/" onClick={() => setMenuOpen(false)}>
        <img src={logo} alt="logo-dragon-ball" id="hd-logo" width="200" />
      </Link>

      <nav className={`hd-nav `}>
        <ul className="hd-nav-links">
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          </li>
          <li>
            <Link to="/characters" onClick={() => setMenuOpen(false)}>Personajes</Link>
          </li>
        </ul>
      </nav>

      <Comparison />

      {/* Botón hamburguesa */}
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
