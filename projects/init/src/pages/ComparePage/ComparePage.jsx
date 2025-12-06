import { useSearchParams } from "react-router-dom";
import "./ComparePageStyle.css";
import useNormalizeKi from "./Hooks/useNormalizeKi.jsx";
import CharacterCard from "./Components/CharacterCard.jsx";
import { useState } from "react";
import { useContext } from "react";
import { ComparisonContext } from "../../context/ComparisonContext.jsx";

export default function ComparePage() {
  const { characters, removeCharacter } = useContext(ComparisonContext);
  const [indices, setIndices] = useState(
    Object.fromEntries(characters.map(c => [c.id, 0]))
  );

  const handleIndexChange = (id, newIndex) => {
    setIndices(prev => ({ ...prev, [id]: newIndex }));
  };

  const handleRemoveCharacter = (idToRemove) => {
    removeCharacter(idToRemove); 
    setIndices(prev => {
      const { [idToRemove]: _, ...rest } = prev; // elimina también el índice
      return rest;
    });
  };

  const powers = characters.map(c => {
    const transformations = [
      { id: c.id, name: c.name, image: c.image, ki: c.ki },
      ...(c.transformations || [])
    ];
    const current = transformations[indices[c.id] || 0];
    return { id: c.id, name: c.name, ki: useNormalizeKi(current.ki) };
  });

  const globalMax = Math.max(...powers.map(p => p.ki));
  const winner = powers.find(p => p.ki === globalMax);

  if (characters.length === 0) return <p className="welcome no-hay">No hay personajes para comparar.</p>;

  return (
    <div className="compare-page">
      <h1 className="welcome">Comparación de personajes</h1>

      <div className="compare-container">
        {characters.map((p, i) => (
          <div key={p.id} className="card-wrapper">
            <CharacterCard
              character={p}
              globalMax={globalMax}
              isWinner={winner?.id === p.id}
              index={indices[p.id]}
              onIndexChange={(newIndex) => handleIndexChange(p.id, newIndex)}
              onRemove={handleRemoveCharacter}
            />
            {i < characters.length - 1 && <div className="vs-label">VS</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
