import fetchCharacters from "../services/GetCharacters.js";

async function renderCharacters() {
    var data = await fetchCharacters();
    var characters = data.items;
    const container = document.querySelector(".card-wrapper");
    container.innerHTML = "";

    characters.forEach(character => {
        const card = document.createElement("div");
        
        card.className = "card";
        
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}" class="card-image"/>
            <h2 class="card-name">${character.name}</h2>
        `;
        container.appendChild(card);
    });
}
export default renderCharacters;