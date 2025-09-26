import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import CharacterList from "../features/characters/CharacterList";
import "./CharacterStyle.css";

function Characters({ filters, setFilters }) {
  const location = useLocation();

  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);

  useEffect(() => {
    const queryFilters = {
      name: query.get("name") || "",
      gender: query.get("gender") || "",
      race: query.get("race") || "",
      affiliation: query.get("affiliation") || "",
    };

    if (query.get("name") || query.get("gender") || query.get("race") || query.get("affiliation")) {
      setFilters((prev) => ({ ...prev, ...queryFilters }));
    }
  }, [query, setFilters]);

  return (
    <div className="characters-wrapper">
      <div className="divider">
        <h1 className="title-character welcome">Personajes</h1>
        <CharacterList filters={filters} />
      </div>
    </div>
  );
}

export default Characters;


