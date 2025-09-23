import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./ShareStyle.css";

export default function SharePage() {
  const location = useLocation();
  const resultData = location.state?.result || {}; // datos enviados desde el carrusel

  const [form, setForm] = useState({
    sender: "",
    recipient: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el mail
    console.log("Enviando:", { ...form, resultData });
    alert("El mail se envió correctamente ✅");
  };

  return (
    <div className="share-container">
      <h2>Compartir con un amigo</h2>
      <form onSubmit={handleSubmit}>
        {/* Resultado compartido */}
        <div className="result-preview">
          <label>Resultado</label>
          <input
          className="result-input"
            type="text"
            value={resultData.name || ""}
            readOnly
            required
          />
          {resultData.image && (
            <img
              src={resultData.image}
              alt={resultData.name}
              className="result-image"
            />
          )}
        </div>

        {/* Correo emisor */}
        <div>
          <label>Tu correo</label>
          <input
            type="email"
            name="sender"
            value={form.sender}
            onChange={handleChange}
            required
          />
        </div>

        {/* Correo destinatario */}
        <div>
          <label>Correo destinatario</label>
          <input
            type="email"
            name="recipient"
            value={form.recipient}
            onChange={handleChange}
            required
          />
        </div>

        {/* Mensaje opcional */}
        <div>
          <label>Mensaje (opcional)</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
          />
        </div>

        {/* Botones */}
        <div className="buttons">
          <button type="submit">Enviar mail</button>
          <button type="button" onClick={() => window.history.back()}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
