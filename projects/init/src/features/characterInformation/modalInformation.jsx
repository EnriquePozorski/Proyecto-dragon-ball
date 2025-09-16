import React, { useState, useEffect } from "react";
import "./modalInformationStyle.css";

export default function CharacterModal({ character, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPlanet, setShowPlanet] = useState(false);

  const transformations = [
    { id: character?.id, name: character?.name, image: character?.image, ki: character?.ki },
    ...(character?.transformations?.filter(t => t.name) || [])
  ];

  useEffect(() => {
    setActiveIndex(0);
    setShowPlanet(false);
  }, [character]);

  if (!character) return null;

  const activeItem = showPlanet
    ? { name: character.originPlanet?.name, image: character.originPlanet?.image, description: character.originPlanet?.description }
    : transformations[activeIndex];

  const prev = () => setActiveIndex(i => (i - 1 + transformations.length) % transformations.length);
  const next = () => setActiveIndex(i => (i + 1) % transformations.length);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>

        <h2>{activeItem.name}</h2>

        <div className="modal-image-container">
          {!showPlanet && <button className="carousel-btn prev" onClick={prev}>&lt;</button>}

          <img
            key={activeItem.id || "planet"}
            src={activeItem.image}
            alt={activeItem.name}
            className="modal-img fade-in"
          />

          {!showPlanet && <button className="carousel-btn next" onClick={next}>&gt;</button>}
        </div>

   

        {/* Información según lo que se muestra */}
        {!showPlanet && (
          <>
            <p><strong>Raza:</strong> {character.race}</p>
            <p><strong>Género:</strong> {character.gender}</p>
            <p><strong>Afiliación:</strong> {character.affiliation}</p>
            <p><strong>Ki:</strong> {activeItem.ki}</p>
            <p><strong>Max Ki:</strong> {character.maxKi}</p>
            <p><strong>Descripción:</strong> {character.description}</p>
          </>
        )}

        {showPlanet && character.originPlanet && (
          <p><strong>Descripción del planeta:</strong> {character.originPlanet.description}</p>
        )}
             {/* Botón para alternar planeta */}
        {character.originPlanet && (
          <button
            className="planet-btn"
            onClick={() => setShowPlanet(prev => !prev)}
          >
            {showPlanet ? "Volver a transformaciones" : "Ver planeta"}
          </button>
        )}
      </div>
    </div>
    
  );
}
