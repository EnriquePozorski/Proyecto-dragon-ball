import "./Comparison.css";
import versus from "../assets/img/versus.png";
import { useState, useContext } from "react";
import { ComparisonContext  }  from "../context/ComparisonContext.jsx";
import { useNavigate }  from "react-router-dom";


export default function Comparison() {
  const {characters, removeCharacter} = useContext(ComparisonContext);
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  const handleCompare = () => {
    const params = characters.map(c => `id=${c.id}`).join("&");
    navigate(`/compare?${params}`);
  }

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
                <button onClick={() => removeCharacter(p.id)}><span className="material-symbols-outlined">close</span></button>
                
              </li>
            ))}
          </ul>
          {characters.length > 1 && (
            <button className="comparison-btn" onClick={handleCompare}>Comparar</button>
          )}
        </div>
      )}
    </div>
  );
}

