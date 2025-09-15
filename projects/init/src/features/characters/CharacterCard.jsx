import "./CharacterCardStyle.css"


export default function CharacterCard({ character, onSelectCharacter }) {
   if (!character) return null;
  const { name, image, race, ki, maxKi } = character


  return (
    <div className={`card ${race || "default"}`} onClick={() => onSelectCharacter(character.id)}>

    
      <img src={image} alt={name} className="card-img" />
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-subtitle">{race}</p>
        <p className="card-ki">Ki: {ki}</p>
        <p className="card-max-ki">Max Ki: {maxKi}</p>
      </div>
    </div>
  )
}
