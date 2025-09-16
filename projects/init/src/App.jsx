import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Characters from "./pages/Characters.jsx";
import Sagas from "./pages/Sagas.jsx";
import "./app.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Aside from "./components/Aside.jsx";

function Layout({ children, filters, setFilters }) {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Aside filters={filters} setFilters={setFilters} />
        <main className="layout-main">{children}</main>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  // 🔹 Estado centralizado de filtros
  const [filters, setFilters] = useState({
    name: "",
    gender: "",
    race: "",
    affiliation: "",
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout filters={filters} setFilters={setFilters}>
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
    </BrowserRouter>
  );
}

export default App;

