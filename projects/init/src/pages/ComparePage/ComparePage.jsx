import { useSearchParams } from "react-router-dom";
import "./ComparePageStyle.css";
import useNormalizeKi from "./Hooks/useNormalizeKi.jsx";
import CharacterCard from "./Components/CharacterCard.jsx";
import { useState } from "react";

export default function ComparePage() {
  const [searchsParams] = useSearchParams();
  const ids = searchsParams.getAll("id");
  const cart = JSON.parse(localStorage.getItem("personajes")) || [];

  const [selectedCharacters, setSelectedCharacters] = useState(
    cart.filter((c) => ids.includes(String(c.id)))
  );

  const [indices, setIndices] = useState(
    Object.fromEntries(selectedCharacters.map(c => [c.id, 0]))
  );

  const handleIndexChange = (id, newIndex) => {
    setIndices(prev => ({ ...prev, [id]: newIndex }));
  };

  const handleRemoveCharacter = (idToRemove) => {
    setSelectedCharacters(prev => prev.filter(c => c.id !== idToRemove));
  };

  const powers = selectedCharacters.map(c => {
    const transformations = [
      { id: c.id, name: c.name, image: c.image, ki: c.ki },
      ...(c.transformations || [])
    ];
    const current = transformations[indices[c.id] || 0];
    return { id: c.id, name: c.name, ki: useNormalizeKi(current.ki) };
  });

  const globalMax = Math.max(...powers.map(p => p.ki));
  const winner = powers.find(p => p.ki === globalMax);

  return (
    <div className="compare-page">
      <h1>Comparación de personajes</h1>

      {/* ARRIBA: Cards de personajes */}
      <div className="compare-container">
        {selectedCharacters.map((p, i) => (
          <div key={p.id} className="card-wrapper">
            <CharacterCard
              character={p}
              globalMax={globalMax}
              isWinner={winner?.id === p.id}
              index={indices[p.id]}
              onIndexChange={(newIndex) => handleIndexChange(p.id, newIndex)}
              onRemove={handleRemoveCharacter}
            />
            {i < selectedCharacters.length - 1 && <div className="vs-label">VS</div>}
          </div>
        ))}
      </div>

      {/* HISTORIA */}
      <h2>Historia</h2>
      <div className="history-section">
        {selectedCharacters.map((char) => (
          <div className="history-block" key={char.id}>
            <img src={char.image} alt={char.name} />
            <div>
              <h3>{char.name}</h3>
              <p>{char.description || "Sin historia disponible"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* PLANETAS */}
      <h2>Planetas</h2>
      <div className="planet-section">
        {selectedCharacters.map((char) => (
          <div className="planet-block" key={char.id}>
            <div className="planet-info">
              <img src={char.image} alt={char.name} />
              <div>
                <h3>{char.name}</h3>
                <p>{char.planet?.description}</p>
                <p>Estado: {char.planet?.destroyed ? "Destruido" : "Existente"}</p>
              </div>
            </div>
            {char.planet?.image && (
              <img src={char.planet.image} alt={char.planet.name} className="planet-img" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
