import "./CharacterCardStyle.css";
import { useContext } from "react";
import { ComparisonContext } from "../../context/ComparisonContext.jsx";

export default function CharacterCard({ character, onSelectCharacter }) {
  const { characters, addCharacter, removeCharacter } = useContext(ComparisonContext);

  if (!character) return null;
  const { name, image, race, ki, maxKi, id } = character;

  const isSelected = characters.some(c => c.id === id);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (isSelected) {
      removeCharacter(id);
    } else {
      addCharacter(character);
    }
  };

  const handleOpenModal = () => {
    onSelectCharacter(id);
  };

  return (
    <div
      className={`card ${race || "default"} ${isSelected ? "selected" : ""}`} onClick={handleOpenModal}>
      <button className="card-add-btn" onClick={handleToggle}>
        {isSelected ? "✕" : "+"}
      </button>

      <img src={image} alt={name} className="card-img" />
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-subtitle">{race}</p>
        <p className="card-ki">Ki: {ki}</p>
        <p className="card-max-ki">Max Ki: {maxKi}</p>
      </div>
    </div>
  );
}
