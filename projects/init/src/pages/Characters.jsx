import { useState } from "react";
import CharacterList from "../features/characters/CharacterList";
import "./CharacterStyle.css";
import dragonballImg from "../assets/img/dragon-ball-z-3840x2160.jpg";


function Characters() {
  const [filter, setFilter] = useState("");
 return (
    <div className="characters-wrapper">
      
      <h1 className="title">Dragon Ball</h1>
      <div className="hero">
        <img src={dragonballImg} className="img-character" alt="Dragon Ball Z" />
        <div className="overlay"></div> {/* 👈 el degradado */}
      </div>
      <div className="divider">
        <nav></nav>
        <h1 className="title-character">Personajes</h1>
           {/* Input de búsqueda */}
        <div className="filters">
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
           <CharacterList filter={filter} />
      </div>
    </div>
  )
}

export default Characters
