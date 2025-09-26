// src/pages/HomeUser.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomeUser.css";


function HomeUser() {

  const favoritos = [
    { id: 1, name: "Goku", image: "https://dragonball-api.com/characters/goku.jpg" },
    { id: 2, name: "Vegeta", image: "https://dragonball-api.com/characters/vegeta.jpg" },
  ];

  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const visited = JSON.parse(localStorage.getItem("recentCharacters")) || [];
    setRecent(visited);
  }, []);

  return (
    <div className="home-user">
      <h1 className="welcome">¡Bienvenido Saiyajin!</h1>

      {/* Favoritos */}
      <section className="section">
        <h2>⭐ Tus favoritos</h2>
        <div className="card-grid">
          {recent.length > 0 ? (
            recent.map((char) => (
              <Link key={char.id} to={`/character/${char.id}`} className="char-card">
                <img src={char.image} alt={char.name} />
                <p>{char.name}</p>
              </Link>
            ))
          ) : (
            <p>Aún no has visitado ningún personaje.</p>
          )}
        </div>
      </section>


      <section className="section">
        <h2>🕓 Últimos visitados</h2>
        <div className="card-grid">
          {recent.length > 0 ? (
            recent.map((char) => (
              <Link key={char.id} to={`/character/${char.id}`} className="char-card">
                <img src={char.image} alt={char.name} />
                <p>{char.name}</p>
              </Link>
            ))
          ) : (
            <p>Aún no has visitado ningún personaje.</p>
          )}
        </div>
      </section>

      {/* Accesos rápidos */}
        <section className="section">
        <h2>⚡ Accesos rápidos</h2>
        <div className="quick-links">
            {/* Guerreros Z */}
            <Link to="/characters?affiliation=Z Fighter" className="quick-btn guerrero-z">
            <span>Guerreros Z</span>
            </Link>

            {/* Villanos */}
            <Link to="/characters?affiliation=Villain" className="quick-btn villano">
            <span>Villanos</span>
            </Link>

            {/* Humanos */}
            <Link to="/characters?race=Human" className="quick-btn humano">
            <span>Humanos</span>
            </Link>

            {/* Androides */}
            <Link to="/characters?race=Android" className="quick-btn androide">
            <span>Androides</span>
            </Link>

            {/* Saiyajins */}
            <Link to="/characters?race=Saiyan" className="quick-btn saiyajin">
            <span>Saiyajins</span>
            </Link>
        </div>
        </section>


      {/* Dos Cards grandes */}
      <section className="section big-cards">
        <Link to="/characters" className="big-card character">
          <h3>Personajes</h3>
          <p>Explora todos los héroes y villanos del universo Dragon Ball</p>
        </Link>
        <Link to="/planets" className="big-card planet">
          <h3>Planetas</h3>
          <p>Descubre Namek, la Tierra y muchos más</p>
        </Link>
      </section>
    </div>
  );
}

export default HomeUser;
