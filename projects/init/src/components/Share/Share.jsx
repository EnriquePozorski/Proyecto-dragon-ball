import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./ShareStyle.css";

export default function SharePage() {
  const location = useLocation();
  const resultData = location.state?.result || {};

  const [form, setForm] = useState({
    sender: "",
    recipient: "",
    message: "",
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const nuevosErrores = {};

  
    for (const [key, value] of Object.entries(form)) {
      if (key !== "message" && !value.trim()) {
        nuevosErrores[key] = "Este campo es obligatorio";
      }
    }


    const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
    if (form.sender && !emailRegex.test(form.sender)) {
      nuevosErrores.sender = "Email inválido";
    }
    if (form.recipient && !emailRegex.test(form.recipient)) {
      nuevosErrores.recipient = "Email inválido";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleEnviarMail = (e) => {
    e.preventDefault();
    if (!validar()) return;

    const subject = encodeURIComponent(`Te compartieron un resultado: ${resultData.name}`);
    const body = encodeURIComponent(`
Buenassss,

Te comparto este personaje de Dragon Ball:

Nombre: ${resultData.name}
Ki:${resultData.ki}
${resultData.image ? `Imagen: ${resultData.image}` : ""}
Mensaje: ${form.message || ""}

Enviado por: ${form.sender}
`);

    // Abre el cliente de correo predeterminado
    window.location.href = `mailto:${form.recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="share-container">
      <h2>Compartir con un amigo</h2>
      <form onSubmit={handleEnviarMail}>
        <div className="result-preview">
          <input
            className="result-input"
            type="text"
            value={resultData.name || ""}
            readOnly
          />
          {resultData.image && (
            <img src={resultData.image} alt={resultData.name} className="result-image" />
          )}
        </div>

        <div>
          <label>Tu correo</label>
          <input
            type="email"
            name="sender"
            value={form.sender}
            onChange={handleChange}
            placeholder="ejemplo@gmail.com"
          />
          {errores.sender && <span className="error">{errores.sender}</span>}
        </div>

        <div>
          <label>Correo destinatario</label>
          <input
            type="email"
            name="recipient"
            value={form.recipient}
            onChange={handleChange}
            placeholder="ejemplo@gmail.com"
          />
          {errores.recipient && <span className="error">{errores.recipient}</span>}
        </div>

        <div>
          <label>Mensaje</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Escribe un mensaje (opcional)"
          />
        </div>

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
