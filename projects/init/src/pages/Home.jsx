import { useEffect } from "react";
import Carousel from "../components/Carousel.jsx";
import "./Home.css";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.3 } 
    );

    const elements = document.querySelectorAll(".feature-card, .nostalgia");
    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="home-container">

      <section className="hero-home">
        <h1 className="hero-title">Wiki-Ball Z</h1>
        <p className="hero-subtitle">
          La enciclopedia interactiva del universo Dragon Ball. Explora personajes, 
          transformaciones, planetas y compara el Ki de los guerreros más poderosos.
        </p>
      </section>


      <section className="carousel-section">
        <Carousel />
      </section>


      <section className="features">
        <div className="feature-card">
          <h2>🥋 Personajes</h2>
          <p>
            Biografías, habilidades y técnicas de los héroes y villanos más 
            legendarios del universo Dragon Ball.
          </p>
        </div>

        <div className="feature-card">
          <h2>🔥 Transformaciones</h2>
          <p>
            Desde Super Saiyajin hasta Ultra Instinto. Descubre todas las 
            fases de poder y su historia.
          </p>
        </div>

        <div className="feature-card">
          <h2>🌍 Planetas</h2>
          <p>
            Conoce los mundos más icónicos como Namek, la Tierra y el 
            planeta Vegeta.
          </p>
        </div>

        <div className="feature-card">
          <h2>⚡ Comparador de Ki</h2>
          <p>
            Elige dos luchadores y enfrenta su poder. ¿Quién dominaría 
            la batalla?
          </p>
        </div>
      </section>


      <div className="nostal-container">
        <section className="nostalgia">
          <h2 className="nostalgia-title">✨ La nostalgia que nos une</h2>
          <p className="nostalgia-text">
            Dragon Ball marcó generaciones con sus batallas épicas, momentos emotivos 
            y enseñanzas sobre la amistad, la perseverancia y la superación personal.  
            Esta página nace de esa pasión compartida: un espacio para revivir los recuerdos 
            de la infancia y al mismo tiempo descubrir cada detalle del universo Z.  
            Sumérgete en la aventura y vuelve a sentir la emoción de aquellos días frente a la pantalla.
          </p>
        </section>


        <section className="closing">
          <p>
            🌟 Revive la leyenda de Dragon Ball como nunca antes. ¡Todo el universo Z en un solo lugar!
          </p>
        </section>
      </div>
      
    </div>
  );
}
