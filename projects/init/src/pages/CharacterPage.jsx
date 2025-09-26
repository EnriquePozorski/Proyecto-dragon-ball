import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./characterPageStyle.css";
import { characterService } from "../services/characterService.js";
import { FaShareAlt, FaArrowLeft, FaPlus, FaPlusCircle } from "react-icons/fa";

export default function CharacterPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Inicializamos bien los estados
  const [character, setCharacter] = useState(location.state?.character || null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!character) {
      // Si no lo recibimos desde state, lo pedimos por la API
      characterService.getCharacterById(id).then(setCharacter);
    }
  }, [id]);

  useEffect(() => {
    setActiveIndex(0); // reinicia el carrusel al cargar nuevo personaje
  }, [character]);

  if (!character) return <p>Cargando personaje...</p>;

  const transformations = [
    {
      id: character.id,
      name: character.name,
      image: character.image,
      ki: character.ki,
    },
    ...(character.transformations?.filter((t) => t.name) || []),
  ];
      console.log(character);

  const activeItem = transformations[activeIndex];

  const prev = () =>
    setActiveIndex(
      (i) => (i - 1 + transformations.length) % transformations.length
    );
  const next = () => setActiveIndex((i) => (i + 1) % transformations.length);

    useEffect(() => {
    window.scrollTo(0, 0); 
  }, [id]);

  return (
    <div className="character-page">
     <div className="top-page">
  <button className="back-btn" onClick={() => navigate(-1)}>
    <FaArrowLeft /> <span className="back-text">Regresar</span>
  </button>
  <h1 className="character-title">{character.name}</h1>
</div>
      <div className="character-layout">
        {/* Carrusel */}
        <div className="carousel">
          <button className="carousel-btn prev" onClick={prev}>
            &lt;
          </button>
          <img
            src={activeItem.image}
            alt={activeItem.name}
            className="carousel-img"
          />
          <button className="carousel-btn next" onClick={next}>
            &gt;
          </button>

          <p className="carousel-title">{activeItem.name}</p>
          <p className="carousel-ki">
            <strong>Ki:</strong> {activeItem.ki}
          </p>
          <button
            className="share-btn"
            onClick={() => navigate("/share", { state: { result: activeItem } })}
          >
            <FaShareAlt />
          </button>
          <button
            className="vs-btn"  
          >
            <FaPlusCircle />
          </button>
        </div>

        {/* Descripción */}
        <div className="character-info">
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
      </div>

      {/* Planeta */}
      {character.originPlanet && (
        <div className="planet-section">
          <h3>Planeta de origen: {character.originPlanet.name}</h3>
          <div className="planet-content">
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
        </div>
      )}
    </div>
  );
}
