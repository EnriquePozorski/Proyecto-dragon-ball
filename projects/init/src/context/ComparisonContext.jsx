import { createContext, useState, useEffect } from "react";

export const ComparisonContext = createContext();

export function ComparisonProvider ({ children }){
    const [characters, setCharacters] = useState([]);
    
    //vamos a cargar desde el local storage al inicio
    useEffect(() => { 
        const guardados = JSON.parse(localStorage.getItem("personajes")) || [];
        setCharacters(guardados);    
    }, []);

    //guardar en el localStorage cuando cambie
    useEffect(() => {
        localStorage.setItem("personajes", JSON.stringify(characters))
    },[characters]);

    const addCharacter = (character) => {
        setCharacters((prev)=> {
            if (prev.some((p)=> p.id === character.id))
                return prev;
            return [...prev, character];
        });
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

