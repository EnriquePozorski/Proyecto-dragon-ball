import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Characters from "./pages/Characters.jsx"
import Sagas from "./pages/Sagas.jsx"
import "./app.css"
function LayoutWithNav({ children }) {
  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Inicio</Link>
        <Link to="/characters">Personajes</Link>
        <Link to="/sagas">Sagas</Link>
      </nav>
      {children}
    </div>
  )
}

function LayoutWithoutNav({ children }) {
  return <div>{children}</div>
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutWithNav><Home /></LayoutWithNav>} />
        <Route path="/sagas" element={<LayoutWithNav><Sagas /></LayoutWithNav>} />
        <Route path="/characters" element={<LayoutWithoutNav><Characters /></LayoutWithoutNav>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
