export async function fetchCharacters(page = 1, limit = 10) {
  const URL = `https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`
  try {
    const response = await fetch(URL)
    if (!response.ok) throw new Error("Network response was not ok")
    return await response.json()
  } catch (error) {
    console.error("Error fetching characters:", error)
    throw error
  }
}

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