import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">© {new Date().getFullYear()} Wiki-Ball Z. Todos los derechos reservados.</p>
        <ul className="footer-links">
          <li><a href="/about">Acerca de</a></li>
          <li><a href="/contact">Contacto</a></li>
          <li><a href="/privacy">Privacidad</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
