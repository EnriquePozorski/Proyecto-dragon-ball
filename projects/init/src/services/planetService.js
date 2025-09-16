export class PlanetService {
  constructor() {
    this.URL = "https://dragonball-api.com/api/planets";
  }

  // Obtener todos los planetas con paginación
  async getAll(page = 1, limit = 10) {
    const url = `${this.URL}?page=${page}&limit=${limit}`;
    const res = await fetch(url);
    return await res.json(); // ya trae { items, meta, links }
  }

  // Obtener un planeta por ID
  async getPlanetById(id) {
    const url = `${this.URL}/${id}`;
    const res = await fetch(url);
    return await res.json();
  }

  // Filtrar planetas
  async getFiltered(filters) {
    const params = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) params[key] = filters[key]; // solo agregamos si hay valor
    });

    const query = new URLSearchParams(params).toString();
    const url = `${this.URL}?${query}`;
    const res = await fetch(url);
    const data = await res.json();

    // Unificar formato para que siempre tenga items + meta
    if (Array.isArray(data)) {
      return {
        items: data,
        meta: { totalItems: data.length, totalPages: 1, currentPage: 1 }
      };
    }

    return data; // si ya viene { items, meta }
  }
}

export const planetService = new PlanetService();
