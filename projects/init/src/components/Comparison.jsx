import "./Comparison.css";
import versus from "../assets/img/versusCC.jpg";
import { useState, useEffect } from "react";

export default function ComparisionButtonList({ countSelect }) {
  const [personajes, setPersonajes] = useState([]);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem("personajes")) || [];
    setPersonajes(guardados);
  }, [countSelect]); // se actualiza si cambia la cantidad

  return (
    <div className="comparison">
      <div className="comparison-header" onClick={() => setAbierto(!abierto)}>
        <img src={versus} alt="versus" />
        <span className="comparison-header-title">
          {personajes.length} Seleccionados
        </span>
        <span className="material-icons">
          {abierto ? "keyboard_arrow_down" : "keyboard_arrow_up"}
        </span>
      </div>

      {abierto && (
        <div className="comparison-body">
          <ul className="comparison-body-list">
            {personajes.map((p) => (
              <li key={p.id} className="personaje-item">
                <img src={p.image} alt={p.name} className="personaje-img" />
                <div className="personaje-info">
                  <strong>{p.name}</strong>
                  <p>Raza: {p.race}</p>
                  <p>Ki: {p.ki}</p>
                  <p>Max Ki: {p.maxKi}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

