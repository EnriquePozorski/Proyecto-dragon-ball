import CharacterList from "../features/characters/CharacterList";
import "./CharacterStyle.css";
//import dragonballImg from "../assets/img/dragon-ball-z-3840x2160.jpg";





function Characters({ filter }) {
    //const [filter, setFilter] = useState("");

  return (

    <div className="characters-wrapper">
      {/* <h1 className="title">Dragon Ball</h1>
      <div className="hero">
        <img src={dragonballImg} className="img-character" alt="Dragon Ball Z" />
        <div className="overlay"></div> 
      </div> */}
      <div className="divider">
        <h1 className="title-character">Personajes</h1>
        {/* 👇 usamos el filtro que viene del Aside */}
        <CharacterList filter={filter} />
      </div>
    </div>
  )
}

export default Characters;
