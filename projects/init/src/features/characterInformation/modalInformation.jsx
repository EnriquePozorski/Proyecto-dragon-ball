import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./modalInformationStyle.css";
import SharePage from "../../components/Share/Share";

export default function CharacterModal({ character, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
    const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate(); 

  const transformations = [
    {
      id: character?.id,
      name: character?.name,
      image: character?.image,
      ki: character?.ki,
    },
    ...(character?.transformations?.filter((t) => t.name) || []),
  ];

  useEffect(() => {
    setActiveIndex(0);
  }, [character]);

  if (!character) return null;

  const activeItem = transformations[activeIndex];

  const prev = () =>
    setActiveIndex(
      (i) => (i - 1 + transformations.length) % transformations.length
    );
  const next = () => setActiveIndex((i) => (i + 1) % transformations.length);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>

        <div className="character-name">
          <h2>{character.name}</h2>
        </div>

        <div className="modal-image-carousel-area">
          <button onClick={() => setShowModal(true)}>Share</button>

          <button className="carousel-btn prev" onClick={prev}>
            &lt;
          </button>
          <img
            key={activeItem.id}
            src={activeItem.image}
            alt={activeItem.name}
            className="modal-img fade-in"
          />
          <button className="carousel-btn next" onClick={next}>
            &gt;
          </button>

          <p className="title-carousel">{activeItem.name}</p>
          <p className="ki-carousel">
            <strong>Ki:</strong> {activeItem.ki}
          </p>
        </div>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Compartir resultado</h2>
              <p>¿Quieres compartir este resultado con un amigo?</p>
              <button
                onClick={() => {
                  navigate("/share", { state: { result: character } });
                }}
              >    Compartir con un amigo
              </button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        )}
        <div className="character-description-area">
          <p>
            <strong>Raza:</strong> {character.race}
          </p>
          <p>
            <strong>Género:</strong> {character.gender}
          </p>
          <p>
            <strong>Afiliación:</strong> {character.affiliation}
          </p>
          <p>
            <strong>Max Ki:</strong> {character.maxKi}
          </p>
          <p>
            <strong>Descripción:</strong> {character.description}
          </p>
        </div>

        {character.originPlanet && (
          <div className="planet-section">
            <h3>Planeta de origen: {character.originPlanet.name}</h3>
            <img
              src={character.originPlanet.image}
              alt={character.originPlanet.name}
              className="planet-img"
            />
            <p>
              <strong>Descripción del planeta:</strong>{" "}
              {character.originPlanet.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
