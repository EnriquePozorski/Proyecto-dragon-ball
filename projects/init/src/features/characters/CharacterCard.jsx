import "./CharacterCardStyle.css";
import { useContext } from "react";
import { ComparisonContext } from "../../context/ComparisonContext.jsx";

export default function CharacterCard({ character, onSelectCharacter }) {
  const { addCharacter } = useContext(ComparisonContext);

  if (!character) return null;
  const { name, image, race, ki, maxKi } = character;

  const handleAdd = (e) => {
    e.stopPropagation();  
    addCharacter(character);
  };

  const handleOpenModal = () => {
    onSelectCharacter(character.id);
  };

  return (
<div className={`card ${race || "default"}`} onClick={handleOpenModal}>
  {}
  <button 
    className="card-add-btn" 
    onClick={(e) => {
      e.stopPropagation();
      addCharacter(character);
    }}
  >
    +
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
