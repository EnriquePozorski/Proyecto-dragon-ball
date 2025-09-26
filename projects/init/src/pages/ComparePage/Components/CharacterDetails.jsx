import React from "react";
import "../StyledComponents/CharacterDetails.css";


export default function CharacterDetails({ character }) {
  return (
    <div className="character-details">
      {/* Historia */}
      <div className="detail-section">
        <div className="detail-header">
          
          <h3>Historia</h3>
        </div>
        <p>{character.description || "Sin historia disponible"}</p>
      </div>

      {/* Planeta */}
      <div className="detail-section">
        <div className="detail-header">
          
          <h3>Planeta</h3>
        </div>
        <p>{character.planet?.name || "Desconocido"}</p>
        {character.planet?.image && (
          <img src={character.planet.image} alt={character.planet.name} className="planet-image" />
        )}
        <p>{character.planet?.description}</p>
      </div>
    </div>
  );
}
