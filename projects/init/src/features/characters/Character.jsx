import { useState } from "react"
import CharacterList from "../features/characters/CharacterList"

function Characters() {
  const [filter, setFilter] = useState("")

  return (
    <div>
      <h1 className="title-character">Personajes</h1>

      {/* Barra de búsqueda */}
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
  )
}

export default Characters
