
export default async function fetchCharacters(){
   const URL="https://dragonball-api.com/api/characters";
   try{
        const response=await fetch(URL);
       if(!response.ok) throw new Error("Network response was not ok");
       const data=await response.json();
       return data;
   }catch(error){
       console.error("Error fetching characters:", error);
   }
}   