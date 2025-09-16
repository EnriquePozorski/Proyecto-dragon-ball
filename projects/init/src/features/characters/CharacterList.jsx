import { useEffect, useState, useRef } from "react";
import CharacterCard from "./CharacterCard";
import "./CharacterList.css";
import CharacterModal from "../characterInformation/modalInformation.jsx";
import { characterService } from "../../services/characterService.js";

export default function CharacterList({ filters }) {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const observerRef = useRef(null);

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // 👉 Cargar personajes (con o sin filtros)
  const loadCharacters = async () => {
    try {
      let data;

      if (filters && Object.values(filters).some((val) => val)) {
        // 🔹 Con filtros: NO acumulamos, siempre reemplazamos
        data = await characterService.getFiltered({ ...filters });
        setCharacters(data.items || []);
      } else {
        // 🔹 Sin filtros: acumulamos resultados paginados
        data = await characterService.getAll(page, 10);
        setCharacters((prev) => [...prev, ...(data.items || [])]);
      }
    } catch (error) {
      console.error("Error al cargar personajes:", error);
    }
  };



  // 👉 Resetear cuando cambian filtros
  useEffect(() => {
    setPage(1);
    setCharacters([]);
    setHasMore(true);
  }, [filters]);

  // 👉 Recargar personajes cuando cambia page o filtros
  useEffect(() => {
    loadCharacters(page === 1); // reset si es la primera página
  }, [page, filters]);

  // 👉 Scroll infinito con IntersectionObserver
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
      console.log("se abri1o");

  // 👉 Abrir modal con detalle de personaje
  const handleSelectCharacter = async (id) => {
    try {
      console.log("se abrio");
      const character = await characterService.getCharacterById(id);
      setSelectedCharacter(character);
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

      {/* Modal */}
      <CharacterModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </div>
  );
}