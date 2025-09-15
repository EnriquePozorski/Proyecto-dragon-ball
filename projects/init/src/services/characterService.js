export class CharacterService{

  constructor(){
        this.URL = "https://dragonball-api.com/api/characters";
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

    async getCharacterById(id) {
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

export const characterService = new CharacterService();

export async function fetchCharacterById(id) {
  const URL = `https://dragonball-api.com/api/characters/${id}`;
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching character:", error);
    throw error;
  }
}