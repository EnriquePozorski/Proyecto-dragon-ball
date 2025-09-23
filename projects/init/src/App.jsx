import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Characters from "./pages/Characters.jsx"
import Sagas from "./pages/Sagas.jsx"
import "./app.css"
import Header from "./components/Header.jsx"
import Comparison from "./components/Comparison.jsx"
import Footer from "./components/Footer.jsx"
import Aside from "./components/Aside.jsx";
import {ComparisonProvider} from "./context/ComparisonContext.jsx";
import SharePage from "./components/Share/Share.jsx";

import { useLocation } from "react-router-dom";

function Layout({ children, filters, setFilters, showAside = true }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Obtener ruta actual

  const isHome = location.pathname === "/"; // Saber si estamos en home

  return (
    <div className="layout">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} isHome={isHome} />

      <div className="layout-body">
        {showAside && (
          <Aside
            filters={filters}
            setFilters={setFilters}
            open={menuOpen}
            setOpen={setMenuOpen}
            hideOnDesktop={isHome} // Pasamos prop para ocultar en home desktop
          />
        )}

        <main className="layout-main">{children}</main>
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
            path="/sagas"
            element={
              <Layout filters={filters} setFilters={setFilters}>
                <Sagas />
              </Layout>
            }
          />
          <Route
            path="/characters"
            element={
              <Layout filters={filters} setFilters={setFilters}>
                <Characters filters={filters} />
              </Layout>
            }
          />
            <Route
            path="/share"
            element={
              <Layout filters={filters} setFilters={setFilters} showAside={false}>
                <SharePage />
              </Layout>
            }
          />
        </Routes>
      </ComparisonProvider>
    </BrowserRouter>
  );
}

export default App;

