import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { planetService } from "../services/planetService.js";
import "./Planets.css";

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const observerRef = useRef(null);


  const fetchPlanets = useCallback(async (pageNumber) => {
    setLoading(true);
    try {
      const data = await planetService.getAll(pageNumber, 10);
      setPlanets((prev) => [...prev, ...data.items]); 
      setMeta(data.meta);
    } catch (error) {
      console.error("Error al obtener planetas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlanets(page);
  }, [page, fetchPlanets]);


  useEffect(() => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < meta.totalPages) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (document.querySelector("#sentinel")) {
      observer.observe(document.querySelector("#sentinel"));
    }

    observerRef.current = observer;
  }, [loading, page, meta.totalPages]);

  const truncateDescription = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="planets-page">
      <h2>Planetas</h2>

      <div className="planet-grid">
        {planets.map((planet) => (
          <div
            key={planet.id}
            className="planet-card"
            onClick={() => navigate(`/planet/${planet.id}`)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={planet.image || "https://via.placeholder.com/150"}
              alt={planet.name}
              className="planet-image"
            />
            <h3>{planet.name}</h3>
            <p className="descripcion">{truncateDescription(planet.description, 15)}</p>
            <p className="destruido">Destruido: {planet.isDestroyed ? "Sí" : "No"}</p>
          </div>
        ))}
      </div>


      {loading && <p style={{ marginTop: "1rem" }}>Cargando...</p>}
      <div id="sentinel" style={{ height: "20px" }}></div>
    </div>
  );
}
