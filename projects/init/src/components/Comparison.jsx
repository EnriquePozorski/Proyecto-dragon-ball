import "./Comparison.css";
import versus from "../assets/img/versusCC.jpg";
import { useState, useContext } from "react";
import { ComparisonContext  }  from "../context/ComparisonContext.jsx";


export default function Comparison() {
  const {characters, removeCharacter} = useContext(ComparisonContext);
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="comparison">
      <div className="comparison-header" onClick={() => setAbierto(!abierto)}>
        <img src={versus} alt="versus" />
        <span className="comparison-header-title">
          {characters.length} Seleccionados
        </span>
        <span className="material-icons">
          {abierto ? "keyboard_arrow_down" : "keyboard_arrow_up"}
        </span>
      </div>

      {abierto && (
        <div className="comparison-body">
          <ul className="comparison-body-list">
            {characters.map((p) => (
              <li key={p.id} className="personaje-item">
                <img src={p.image} alt={p.name} className="personaje-img" />
                <div className="personaje-info">
                  <strong>{p.name}</strong>
                  <p>Raza: {p.race}</p>
                  <p>Ki: {p.ki}</p>
                  <p>Max Ki: {p.maxKi}</p>
                </div>
                <button onClick={() => removeCharacter(p.id)}>❌</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

