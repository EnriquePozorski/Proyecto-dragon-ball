import { Link } from "react-router-dom";
import logo from "../assets/Dragon-Ball-Emblema.png"
import "./Header.css"

export default function Header() {
  return (
    <header className="header">
      <img src= {logo} alt= "logo-dragon-ball" id= "hd-logo" width="200"/>
      <nav className="hd-nav">
        <ul className="hd-nav-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/characters">Personajes</Link></li>
          <li><Link to="/planets">Planetas</Link></li>
        </ul>
      </nav>
    </header>
  );
}
