export class PlanetService {
  constructor() {
    this.URL = "https://dragonball-api.com/api/planets";
  }


  async getAll(page = 1, limit = 10) {
    const url = `${this.URL}?page=${page}&limit=${limit}`;
    const res = await fetch(url);
    return await res.json(); 
  }

  
  async getPlanetById(id) {
    const url = `${this.URL}/${id}`;
    const res = await fetch(url);
    return await res.json();
  }


  async getFiltered(filters) {
    const params = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) params[key] = filters[key]; 
    });

    const query = new URLSearchParams(params).toString();
    const url = `${this.URL}?${query}`;
    const res = await fetch(url);
    const data = await res.json();

  
    if (Array.isArray(data)) {
      return {
        items: data,
        meta: { totalItems: data.length, totalPages: 1, currentPage: 1 }
      };
    }

    return data; 
  }
}

export const planetService = new PlanetService();
