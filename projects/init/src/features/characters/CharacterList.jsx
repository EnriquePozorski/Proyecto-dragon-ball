import { useEffect, useState } from "react"
import { fetchCharacters } from "../../services/characterService"
import CharacterCard from "./CharacterCard.jsx"

function CharacterList() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadCharacters() {
      try {
        const data = await fetchCharacters()
        setCharacters(data.items || data) // depende cómo responda la API
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadCharacters()
  }, [])

  if (loading) return <p>Cargando personajes...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="grid grid-cols-3 gap-4">
      {characters.map((c) => (
        <CharacterCard
          key={c.id}
          name={c.name}
          race={c.race}
          image={c.image}
        />
      ))}
    </div>
  )
}

export default CharacterList
