import React, { useState } from "react";
import "./FiltersAside.css";

const FiltersAside = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    isDestroyed: "",
    race: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters); // callback al padre
  };

  return (
    <aside className="filters-aside">
      <h2>Filtros</h2>

      <div className="filter-group">
        <label htmlFor="isDestroyed">Estado del planeta</label>
        <select
          id="isDestroyed"
          name="isDestroyed"
          value={filters.isDestroyed}
          onChange={handleChange}
        >
          <option value="">Todos</option>
          <option value="true">Destruido</option>
          <option value="false">Activo</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="race">Raza</label>
        <select
          id="race"
          name="race"
          value={filters.race}
          onChange={handleChange}
        >
          <option value="">Todas</option>
          <option value="Saiyan">Saiyan</option>
          <option value="Namekian">Namekiano</option>
          <option value="Human">Humano</option>
        </select>
      </div>
    </aside>
  );
};

export default FiltersAside;
