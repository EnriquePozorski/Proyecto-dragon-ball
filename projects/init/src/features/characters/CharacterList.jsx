import { useEffect, useState } from "react"
import { fetchCharacters } from "../../services/characterService"
import CharacterCard from "./CharacterCard.jsx"
import "./CharacterCardStyle.css"

function CharacterList() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    async function loadCharacters() {
      if (!hasMore) return
      setLoading(true)
      try {
        const data = await fetchCharacters(page) // 👈 pasamos la página
        setCharacters((prev) => [...prev, ...data.items]) // acumulamos
        setHasMore(!!data.links.next) // si hay siguiente página
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadCharacters()
  }, [page])

  // Detecta cuando se scrollea al final de la ventana
  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 200 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, hasMore])

  if (error) return <p>Error: {error}</p>

  return (
    <>
      <div className="card-wrapper">
        {characters.map((c) => (
          <CharacterCard
            key={c.id}
            name={c.name}
            description={c.description}
            image={c.image}
          />
        ))}
      </div>
      {loading && <p>Cargando más personajes...</p>}
      
    </>
  )
}

export default CharacterList
