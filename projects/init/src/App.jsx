import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Characters from "./pages/Characters.jsx"
import Sagas from "./pages/CharacterPage.jsx"
import "./app.css"
import Header from "./components/Header.jsx"
import Comparison from "./components/Comparison.jsx"
import Footer from "./components/Footer.jsx"
import Aside from "./components/Aside.jsx";
import {ComparisonProvider} from "./context/ComparisonProvider.jsx";
import SharePage from "./components/Share/Share.jsx";
import CharacterPage from "./pages/CharacterPage.jsx";
import { useLocation } from "react-router-dom";
import HomeUser from "./pages/HomeUser.jsx";
import Planets from "./pages/Planets.jsx";
import PlanetDetail from "./pages/PlanetDetail.jsx";
import ComparePage from "./pages/ComparePage/ComparePage.jsx"

function Layout({ children, filters, setFilters, showAside = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); 
  
  const [asideOpen, setAsideOpen] = useState(false); // controla el aside

  const isHome = location.pathname === "/"; 

  return (
    <div className="layout">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} isHome={isHome}asideOpen={asideOpen} 
        setAsideOpen={setAsideOpen} />
      

      <div className="layout-body">
        {showAside && (
          <Aside
            filters={filters}
            setFilters={setFilters}
            open={asideOpen}   // ← antes usabas menuOpen
            setOpen={setAsideOpen} // ← ahora controlás con asideOpen
            hideOnDesktop={isHome} 
          />

        )}

        <main className={`layout-main ${isHome ? "home-main" : ""}`}>{children}</main>
      </div>
      <Footer />
    </div>
  );
}


function App() {
  const [filters, setFilters] = useState({
    name: "",
    gender: "",
    race: "",
    affiliation: "",
  });

  return (
    <BrowserRouter>
      <ComparisonProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout filters={filters} setFilters={setFilters} showAside={true}>
                <Home filters={filters} />
              </Layout>
            }
          />
        <Route
          path="/character/:id"
          element={
            <Layout filters={filters} setFilters={setFilters} showAside={true}>
              <CharacterPage />
            </Layout>
          }
        />
          <Route
            path="/characters"
            element={
              <Layout filters={filters} setFilters={setFilters}>
                <Characters filters={filters} setFilters={setFilters} />
              </Layout>
            }
          />
          <Route path="/compare" element={<Layout  filters={filters} setFilters={setFilters} showAside={true}> <ComparePage /></Layout>} />
          <Route
            path="/share"
            element={
              <Layout filters={filters} setFilters={setFilters} showAside={true}>
                <SharePage />
              </Layout>
            }
          />
          <Route
            path="/home"
            element={
              <Layout filters={filters} setFilters={setFilters} showAside={true}>
                <HomeUser />
              </Layout>
            }
          />
          <Route
            path="/planets"
            element={
              <Layout filters={filters} setFilters={setFilters}>
                <Planets />
              </Layout>
            }
          />
          <Route
            path="/planet/:id"
            element={
              <Layout filters={filters} setFilters={setFilters} >
                <PlanetDetail />
              </Layout>
            }
          />
          
        </Routes>
      </ComparisonProvider>
    </BrowserRouter>
  );
}

export default App;

