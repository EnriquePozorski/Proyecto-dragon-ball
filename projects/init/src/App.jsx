import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Characters from "./pages/Characters.jsx"
import Sagas from "./pages/Sagas.jsx"
import "./app.css"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Aside from "./components/Aside.jsx";

function Layout({ children, filter, setFilter }) {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Aside filter={filter} setFilter={setFilter} />
        <main className="layout-main">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const [filter, setFilter] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout filter={filter} setFilter={setFilter}>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/sagas"
          element={
            <Layout filter={filter} setFilter={setFilter}>
              <Sagas />
            </Layout>
          }
        />
        <Route
          path="/characters"
          element={
            <Layout filter={filter} setFilter={setFilter}>
              <Characters filter={filter} />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
