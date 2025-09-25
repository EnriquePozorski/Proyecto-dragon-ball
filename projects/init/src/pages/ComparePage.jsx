import "./ComparePageStyle.css"
import { useSearchParams } from "react-router-dom";

export default function ComparePage(){
    const [searchsParams] = useSearchParams();
    const ids = searchsParams.getAll("id"); //obtenemos todos los id
    const cart = JSON.parse(localStorage.getItem("personajes")) || [];

    const selectedCharacters = cart.filter(c=> ids.includes(String(c.id)));

  return (
    <div>
      <h1>Comparación de personajes</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        {selectedCharacters.map(c => (
          <div key={c.id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img src={c.image} alt={c.name} width="120" />
            <h3>{c.name}</h3>
            <p>Poder: {c.power}</p>
            <p>Raza: {c.race}</p>
          </div>
        ))}
      </div>
    </div>
  );
}