import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import CharacterList from "../features/characters/CharacterList";
import "./CharacterStyle.css";

function Characters({ filters, setFilters }) {
  const location = useLocation();

  // Obtenemos filtros desde query params
  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    const queryFilters = {
      name: query.get("name") || "",
      gender: query.get("gender") || "",
      race: query.get("race") || "",
      affiliation: query.get("affiliation") || "",
    };

    // Solo aplicamos filtros de la URL si existen (para no pisar los del aside)
    if (query.get("name") || query.get("gender") || query.get("race") || query.get("affiliation")) {
      setFilters((prev) => ({ ...prev, ...queryFilters }));
    }
  }, [query, setFilters]);

  return (
    <div className="characters-wrapper">
      <div className="divider">
        <h1 className="title-character">Personajes</h1>
        <CharacterList filters={filters} />
      </div>
    </div>
  );
}

export default Characters;


