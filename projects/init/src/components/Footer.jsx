import React, { useState } from "react";
import "./Footer.css";
import MapComponent from "./map/map.jsx";
import ModalForm from "./modalForm/modalForm.jsx";

const Footer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-container">
   
        <MapComponent
          latitud={-34.9227408045059}
          longitud={-57.95626086708341}
          nombre="Innovatech"
        />

   
        <div className="footer-content">
          <div className="top-info">
            <div className="location-info">
              <p>
                <strong>Dirección:</strong> Calle 14, 1900
              </p>
              <p>
                <strong>Localidad:</strong> La Plata
              </p>
              <p>
                <strong>Provincia:</strong> Buenos Aires
              </p>
              <p>
                <strong>País:</strong> Argentina
              </p>
            </div>
            <div className="enterprise-info">
              <h2>Innovatech</h2>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-text">
              © {new Date().getFullYear()} Wiki-Ball Z. Todos los derechos
              reservados.
            </p>
            <ul className="footer-links">
              <li>
                <button
                  onClick={() => setShowModal(true)}
                  className="link-button"
                >
                  Califica Nuestra Web
                </button>
              </li>
              <li>
                <a href="/contact">Contacto</a>
              </li>
              <li>
                <a href="/privacy">Privacidad</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showModal && <ModalForm onClose={() => setShowModal(false)} />}
    </footer>
  );
};

export default Footer;
