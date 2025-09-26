import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CharacterCard from "./CharacterCard";
import "./CharacterList.css";
import { characterService } from "../../services/characterService.js";

export default function CharacterList({ filters }) {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const observerRef = useRef(null);

  const navigate = useNavigate();




  const loadCharacters = async () => {
    try {
      let data;

      if (filters && Object.values(filters).some((val) => val)) {
    
        data = await characterService.getFiltered({ ...filters });
        setCharacters(data.items || []);
      } else {

        data = await characterService.getAll(page, 10);
        setCharacters((prev) => [...prev, ...(data.items || [])]);
      }
    } catch (error) {
      console.error("Error al cargar personajes:", error);
    }
  };




  useEffect(() => {
    setPage(1);
    setCharacters([]);
    setHasMore(true);
  }, [filters]);


  useEffect(() => {
    loadCharacters(page === 1);
  }, [page, filters]);


  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loading && hasMore) {
        setPage((p) => p + 1);
      }
    });

    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loading, hasMore]);

  const handleSelectCharacter = async (id) => {
    try {
      const character = await characterService.getCharacterById(id);
      navigate(`/character/${id}`, { state: { character } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="list-wrapper">
      <div className="grid">
        {characters.length > 0 ? (
          characters.map((c) => (
            <CharacterCard
              key={c.id}
              character={c}
              onSelectCharacter={handleSelectCharacter}
            />
          ))
        ) : (
          !loading && <p className="no-results">No se encontraron personajes</p>
        )}
      </div>

      <div ref={loaderRef} className="loader-trigger">
        {loading && <div className="spinner"></div>}
        {!hasMore && !loading && characters.length > 0 && (
          <p className="end-message">No hay más personajes para mostrar</p>
        )}
      </div>
    </div>
  );
}