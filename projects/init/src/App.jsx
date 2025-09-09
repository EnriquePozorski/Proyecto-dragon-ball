import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Characters from "./pages/Characters.jsx"
import Sagas from "./pages/Sagas.jsx"
import "./app.css"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"

function LayoutWithNav({ children }) {
  return (
    <div>
      
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
      <Header />
      <Routes>
        <Route path="/" element={<LayoutWithNav><Home /></LayoutWithNav>} />
        <Route path="/sagas" element={<LayoutWithNav><Sagas /></LayoutWithNav>} />
        <Route path="/characters" element={<LayoutWithoutNav><Characters /></LayoutWithoutNav>} />
      </Routes>
      <Footer />
    </BrowserRouter>
    
  )
}

export default App
