import "./CharacterCardStyle.css"
import { raceColors } from "../../assets/utils/colorsByRace.js"

export default function CharacterCard({ name, image, race, ki }) {
  const bg = raceColors[race] || raceColors.default

  return (
    <div className="card" style={{ background: bg }}>
      <img src={image} alt={name} className="card-img" />
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-subtitle">{race}</p>
        <p className="card-ki">Ki: {ki}</p>
      </div>
    </div>
  )
}
