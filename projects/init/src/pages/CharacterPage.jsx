// src/pages/CharacterPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./characterPageStyle.css";
import { characterService } from "../services/characterService.js";
import { FaShareAlt, FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import { useContext } from "react";
import { ComparisonContext } from "../../src/context/ComparisonContext.jsx";

export default function CharacterPage() {
  const { characters, addCharacter, removeCharacter } = useContext(ComparisonContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const [character, setCharacter] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);


  useEffect(() => {
    characterService.getCharacterById(id).then(setCharacter);
  }, [id]);


  useEffect(() => {
    if (!character) return; 

    const visited = JSON.parse(localStorage.getItem("recentCharacters")) || [];

    const newEntry = {
      id: character.id,
      name: character.name,
      image: character.image,
    };

    const filtered = visited.filter((item) => item.id !== character.id);
    const updated = [newEntry, ...filtered];

    if (updated.length > 10) updated.pop();

    localStorage.setItem("recentCharacters", JSON.stringify(updated));
  }, [character]);

 
  useEffect(() => {
    setActiveIndex(0);
  }, [character]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

   const isSelected = characters.some(c => c.id === id);
    const handleToggle = (e) => {
    e.stopPropagation();
    if (isSelected) {
      removeCharacter(id);
    } else {
      addCharacter(character);
    }
  };
  return (
    <div className="character-page">
      <div className="top-page">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> <span className="back-text">Regresar</span>
        </button>
        <h1 className="character-title">{character.name}</h1>
      </div>

      <div className="character-layout">
    
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
            onClick={() =>
              navigate("/share", { state: { result: activeItem } })
            }
          >
            <FaShareAlt />
          </button>
          <button className="vs-btn" onClick={handleToggle}>
            <FaPlusCircle />
          </button>
        </div>

        
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
