import React from "react";
import "../StyledComponents/CharacterCard.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import kiRadar from "../../../assets/img/ki_radar.png";
import useNormalizeKi from "../Hooks/useNormalizeKi.jsx";

export default function CharacterCard({ character, globalMax, isWinner, index, onIndexChange, onRemove }) {
  const transformations = [
    { id: character.id, name: character.name, image: character.image, ki: character.ki },
    ...(character.transformations || [])
  ];

  const current = transformations[index];
  const power = useNormalizeKi(current.ki);
  const logPower = Math.log10(power + 1);
  const logMax = Math.log10(globalMax + 1);
  const percent = (logPower / logMax) * 100;

  const handlePrev = () => {
    if (index > 0) onIndexChange(index - 1);
  };

  const handleNext = () => {
    if (index < transformations.length - 1) onIndexChange(index + 1);
  };

  return (
    <div className="compare-character-card">
      <button className="remove-btn" onClick={() => onRemove(character.id)}>✕</button>

      <div className="compare-character-header">
        <h2>{character.name}</h2>
        <span className="race">{character.race}</span>
      </div>

      <div className="compare-carousel">
        <button className="compare-carousel-btn prev" onClick={handlePrev} disabled={index === 0}>
          <FaArrowLeft />
        </button>

        <div className="compare-carousel-content">
          <div className="compare-img-wrapper">
            <img src={current.image} alt={current.name} className="compare-character-image" />
            {isWinner && <span className="winner-badge">GANADOR</span>}
          </div>

          <p className="transformation-name">{current.name}</p>

          <div className="compare-ki-wrapper">
            <img src={kiRadar} alt="Ki Radar" className="ki-radar" />
            <span className="ki-value">{current.ki}</span>
          </div>

          <p className="counter">{index + 1} / {transformations.length}</p>
        </div>

        <button className="compare-carousel-btn next" onClick={handleNext} disabled={index === transformations.length - 1}>
          <FaArrowRight />
        </button>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}
