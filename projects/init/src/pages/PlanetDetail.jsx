import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { planetService } from "../services/planetService.js";
import "./PlanetDetail.css";

export default function PlanetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanet = async () => {
      try {
        const data = await planetService.getPlanetById(id);
        setPlanet(data);
      } catch (error) {
        console.error("Error al obtener planeta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanet();
  }, [id]);

  

  if (loading) return <p style={{ textAlign: "center" }}>Cargando planeta...</p>;
  if (!planet) return <p style={{ textAlign: "center" }}>Planeta no encontrado</p>;

  return (
    <div className="planet-detail-page">
      <h2>{planet.name}</h2>
      <img
        src={planet.image || "https://via.placeholder.com/300"}
        alt={planet.name}
        className="planet-detail-image"
      />
      <p>{planet.description}</p>
      <div className="planet-info">
        <p><strong>Tipo:</strong> {planet.type || "Desconocido"}</p>
        <p><strong>Población:</strong> {planet.population || "N/A"}</p>
        <p><strong>Dimensión:</strong> {planet.dimension || "Desconocida"}</p>
        <p><strong>Destruido:</strong> {planet.isDestroyed ? "Sí" : "No"}</p>
      </div>

      {planet.characters && planet.characters.length > 0 && (
        <>
          <h3>Personajes del planeta</h3>
          <div className="character-grid">
            {planet.characters.map((char) => (
              <div key={char.id} className="character-card">
                <img
                  src={char.image || "https://via.placeholder.com/100"}
                  alt={char.name}
                  className="character-image"
                />
                <p>{char.name}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <button
        className="scroll-top-btn"
        onClick={() => navigate(-1)} // <-- vuelve a la página anterior
      >
        ← Volver
      </button>
    </div>
  );
}
