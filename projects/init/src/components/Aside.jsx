import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./aside.css";

function Aside({ filters, setFilters, open, setOpen, hideOnDesktop = false }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearchClick = () => {
    setOpen(false); // Cierra el aside si está abierto
    navigate("/characters"); // Redirige a la página de personajes
  };

  return (
    <>
      

      {/* Overlay */}
      {open && <div className="aside-overlay" onClick={() => setOpen(false)}></div>}

      {/* Aside */}
      <aside className={`aside ${open ? "open" : ""} ${hideOnDesktop ? "hide-desktop" : ""}`} onClick={(e) => e.stopPropagation()}>
        <h2 className="aside-title">Búsqueda</h2>

        <div className="aside-search">
          <input
            type="text"
            name="name"
            placeholder="Buscar personaje..."
            value={filters.name}
            onChange={handleChange}
          />
           <button className="search-button" onClick={handleSearchClick}>
              <span className="material-icons">search</span>
            </button>
        </div>

        <div className="filter-group">
          <label htmlFor="gender">Género:</label>
          <select id="gender" name="gender" value={filters.gender} onChange={handleChange}>
            <option value="">Todos</option>
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
            <option value="Unknown">Desconocido</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="race">Raza:</label>
          <select id="race" name="race" value={filters.race} onChange={handleChange}>
            <option value="">Todas</option>
            <option value="Human">Humano</option>
            <option value="Saiyan">Saiyan</option>
            <option value="Namekian">Namekiano</option>
            <option value="Majin">Majin</option>
            <option value="Frieza Race">Raza de Freezer</option>
            <option value="Android">Android</option>
            <option value="Jiren Race">Raza de Jiren</option>
            <option value="God">Dios</option>
            <option value="Angel">Ángel</option>
            <option value="Evil">Maligno</option>
            <option value="Nucleico">Nucleico</option>
            <option value="Nucleico benigno">Nucleico benigno</option>
            <option value="Unknown">Desconocido</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="affiliation">Afiliación:</label>
          <select id="affiliation" name="affiliation" value={filters.affiliation} onChange={handleChange}>
            <option value="">Todas</option>
            <option value="Z Fighter">Guerrero Z</option>
            <option value="Red Ribbon Army">Ejército Red Ribbon</option>
            <option value="Namekian Warrior">Guerrero Namekiano</option>
            <option value="Freelancer">Mercenario</option>
            <option value="Army of Frieza">Ejército de Freezer</option>
            <option value="Pride Troopers">Tropa del Orgullo</option>
            <option value="Assistant of Vermoud">Asistente de Vermoud</option>
            <option value="God">Dios</option>
            <option value="Assistant of Beerus">Asistente de Beerus</option>
            <option value="Villain">Villano</option>
            <option value="Other">Otro</option>
          </select>
        </div>
      </aside>
    </>
  );
}

export default Aside;
