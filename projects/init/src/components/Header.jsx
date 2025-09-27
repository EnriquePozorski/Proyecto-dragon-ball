import { Link } from "react-router-dom";
import logo from "../assets/Dragon-Ball-Emblema.png";
import "./Header.css";
import Comparison from "./Comparison.jsx";
import { useEffect, useRef } from "react";

export default function Header({ menuOpen, setMenuOpen, asideOpen, setAsideOpen, isHome }) {
  const headerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setMenuOpen(false);
        setAsideOpen(false); 
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setMenuOpen, setAsideOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) setAsideOpen(false); 
  };

  const toggleAside = () => {
    setAsideOpen(!asideOpen);
    if (!asideOpen) setMenuOpen(false); 
  };

  return (
    <header className="header" ref={headerRef}>
      <Link to="/" onClick={() => { setMenuOpen(false); setAsideOpen(false); }}>
        <img src={logo} alt="logo-dragon-ball" id="hd-logo" width="200" />
      </Link>

      
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

    
      {!isHome && <Comparison />}

      
      <div className="hd-buttons">
        

        <button
          className="hd-search"
          onClick={toggleAside}
          aria-label="Toggle search"
        >
          🔍
        </button>

       
        <button
          className="hd-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
      </div>
    </header>
  );
}
