import { useEffect, useState, useRef } from "react"
import CharacterCard from "./CharacterCard"
import "./CharacterList.css"

export default function CharacterList({ filter }) {
  const [characters, setCharacters] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(null)
  const loaderRef = useRef(null)
  const observerRef = useRef(null)

  // Fetch de personajes
  const fetchCharacters = async () => {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch(`https://dragonball-api.com/api/characters?page=${page}`)
      const data = await res.json()

      if (data.meta && totalPages === null) {
        setTotalPages(data.meta.totalPages)
      }

      setCharacters(prev => [...prev, ...(data.items || [])])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacters()
  }, [page]) // cada vez que cambia la página, cargamos personajes

  // Intersection Observer
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(entries => {
      const entry = entries[0]
      if (entry.isIntersecting && !loading && (totalPages === null || page < totalPages)) {
        setPage(p => p + 1)
      }
    })

    if (loaderRef.current) observerRef.current.observe(loaderRef.current)

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [loading, page, totalPages])

  // Filtrado por nombre
  const filteredCharacters = characters.filter(c =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className="list-wrapper">
      <div className="grid">
        {filteredCharacters.map(c => (
          <CharacterCard
            key={c.id}
            name={c.name}
            image={c.image}
            race={c.race}
            ki={c.ki}
            maxKi={c.maxKi}
          />
        ))}
      </div>

      <div ref={loaderRef} className="loader-trigger">
        {loading && <div className="spinner"></div>}
        {totalPages && page >= totalPages && !loading && (
          <p className="end-message">
            No hay más personajes (página {totalPages} de {totalPages})
          </p>
        )}
      </div>
    </div>
  )
}
