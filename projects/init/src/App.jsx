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

function Layout({ children, filters, setFilters, showAside = true }) {
  const [menuOpen, setMenuOpen] = useState(false); // 🔹 estado compartido

  return (
    <div className="layout">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="layout-body">
        {showAside && (
          <Aside
            filters={filters}
            setFilters={setFilters}
            open={menuOpen}
            setOpen={setMenuOpen}
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
              <Layout filters={filters} setFilters={setFilters} showAside={false}>
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
        </Routes>
      </ComparisonProvider>
    </BrowserRouter>
  );
}

export default App;

