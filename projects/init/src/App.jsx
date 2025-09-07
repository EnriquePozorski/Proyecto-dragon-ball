import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Characters from "./pages/Characters.jsx"
import Sagas from "./pages/Sagas.jsx"

function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Inicio</Link>
        <Link to="/characters">Personajes</Link>
        <Link to="/sagas">Sagas</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/sagas" element={<Sagas />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
