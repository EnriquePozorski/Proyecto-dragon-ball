import "./aside.css";

function Aside({ filters, setFilters }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <aside className="aside">
      <h2 className="aside-title">Búsqueda</h2>

      {/* Barra de búsqueda */}
      <div className="aside-search">
        <input
          type="text"
          name="name"
          placeholder="Buscar personaje..."
          value={filters.name}
          onChange={handleChange}
        />
      </div>

      {/* Filtro por género */}
      <div className="filter-group">
        <label htmlFor="gender">Género:</label>
        <select
          id="gender"
          name="gender"
          value={filters.gender}
          onChange={handleChange}
        >
          <option value="">Todos</option>
          <option value="Male">Masculino</option>
          <option value="Female">Femenino</option>
          <option value="Unknown">Desconocido</option>
        </select>
      </div>

      {/* Filtro por raza */}
      <div className="filter-group">
        <label htmlFor="race">Raza:</label>
        <select
          id="race"
          name="race"
          value={filters.race}
          onChange={handleChange}
        >
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

      {/* Filtro por afiliación */}
      <div className="filter-group">
        <label htmlFor="affiliation">Afiliación:</label>
        <select
          id="affiliation"
          name="affiliation"
          value={filters.affiliation}
          onChange={handleChange}
        >
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
  );
}

export default Aside;
