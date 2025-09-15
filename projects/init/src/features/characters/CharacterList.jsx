import { useEffect, useState, useRef } from "react";
import CharacterCard from "./CharacterCard";
import "./CharacterList.css";
import CharacterModal from "../characterInformation/modalInformation.jsx";
import { fetchCharacters, fetchCharacterById } from "../../services/characterService.js";

export default function CharacterList({ filter }) {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const loaderRef = useRef(null);
  const observerRef = useRef(null);

  const [selectedCharacter, setSelectedCharacter] = useState(null); 
  
  // Cargar personajes
  const loadCharacters = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await fetchCharacters(page);
      if (data.meta && totalPages === null) {
        setTotalPages(data.meta.totalPages);
      }
      setCharacters(prev => [...prev, ...(data.items || [])]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadCharacters();
  }, [page]);

  // Intersection Observer
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (
        entry.isIntersecting &&
        !loading &&
        (totalPages === null || page < totalPages)
      ) {
        setPage((p) => p + 1);
      }
    });

    if (loaderRef.current) observerRef.current.observe(loaderRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loading, page, totalPages]);

  // Manejar selección de personaje
   const handleSelectCharacter = async (id) => {
    try {
      const character = await fetchCharacterById(id);
      setSelectedCharacter(character);
    } catch (err) {
      console.error(err);
    }
  };

  // Filtrado por nombre
  const filteredCharacters = characters.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="list-wrapper">
      <div className="grid">
        {filteredCharacters.map((c) => (
          <CharacterCard
          key={c.id}
    character={c} 
    onSelectCharacter={handleSelectCharacter}
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

      {/* Modal */}
      <CharacterModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </div>
  );
}
