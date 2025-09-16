export class PlanetService{

    constructor(){
        this.URL = "https://dragonball-api.com/api/planets";
    }

    async getAll(page = 1, limit = 10) {
      try {
        const url = `${this.URL}?page=${page}&limit=${limit}`;
        const res = await fetch(url);
        return await res.json(); // devuelve { items, meta, links }
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }

    async getPlanetById(id) {
        try {
            const url = `${this.URL}/${id}`;
            const data = await fetch(url);
            return data;
        } 
        catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async getFiltered(filters) {
        try {
            const query = new URLSearchParams(filters).toString();
            const url = `${this.URL}?${query}`;
            
            const res = await fetch(url);
            return await res.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}

export const planetService = new PlanetService();