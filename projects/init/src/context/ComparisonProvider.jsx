import { useState, useEffect } from "react";
import { ComparisonContext } from "./ComparisonContext.jsx";
import { characterService } from "../services/characterService.js";

//Para manejar estados globales

export function ComparisonProvider ({ children }){
    const [characters, setCharacters] = useState([]);
    //vamos a cargar desde el local storage al inicio
    useEffect(() => { 
        const guardados = JSON.parse(localStorage.getItem("personajes")) || [];
        setCharacters(guardados);    
    }, []);

    //guardar en el localStorage cuando cambie
    useEffect(() => {
        console.log("desde effect");
        localStorage.setItem("personajes", JSON.stringify(characters))


    },[characters]);



/*    const addCharacter  = (character) => {
        console.log("desde addCharacter");
        setCharacters((prev)=> {
            if (prev.some((p)=> p.id === character.id))
                return prev;
            return [...prev, character];
        });
    };*/
    const addCharacter = async (character) => {
  try {
    const charac = await characterService.getCharacterById(character.id); // 👈 acá resolvés
    setCharacters((prev) => {
      if (prev.some((p) => p.id === character.id)) return prev;
      return [...prev, charac];
    });
  } catch (err) {
    console.error("Error trayendo personaje", err);
  }
};


    const removeCharacter = (id) => {
        setCharacters((prev)=> prev.filter((p) =>p.id !== id ));
    }

    const clearAll = () => setCharacters([]);

    return (
        <ComparisonContext.Provider value= {{characters, addCharacter, removeCharacter, clearAll}}>
            {children}
        </ComparisonContext.Provider>
    );





}

