import React, { useState } from "react";
import "./modalFormStyle.css";

export default function ModalForm({ onClose }) {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    sexo: "",
    valoracion: "",
    email: "",
    comentarios: "",
  });

  const [errores, setErrores] = useState({});

  const validar = () => {
    const nuevosErrores = {};

    // Campos obligatorios
    for (const [key, value] of Object.entries(form)) {
       if (key !== "comentarios" && !value.trim()) {
    nuevosErrores[key] = "Este campo es obligatorio";
  }
    }

    // Nombre y apellido solo letras
    if (form.nombre && !/^[a-zA-Z]+$/.test(form.nombre)) {
      nuevosErrores.nombre = "Solo letras (a-z / A-Z)";
    }
    if (form.apellido && !/^[a-zA-Z]+$/.test(form.apellido)) {
      nuevosErrores.apellido = "Solo letras (a-z / A-Z)";
    }

    // Fecha dd-mm-aaaa
    if (
      form.fechaNacimiento &&
      !/^\d{2}-\d{2}-\d{4}$/.test(form.fechaNacimiento)
    ) {
      nuevosErrores.fechaNacimiento = "Formato válido: dd-mm-aaaa";
    }

    // Email correcto
    if (form.email && !/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(form.email)) {
      nuevosErrores.email = "Email inválido";
    }

    if (!form.sexo) nuevosErrores.sexo = "Debe seleccionar un sexo";

    if (!form.valoracion)
      nuevosErrores.valoracion = "Debe seleccionar una valoración";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) {
      alert(
        `Datos del formulario:\n
        Nombre: ${form.nombre}
        Apellido: ${form.apellido}
        Fecha de nacimiento: ${form.fechaNacimiento}
        Sexo: ${form.sexo}
        Valoración: ${form.valoracion}
        Email: ${form.email}
        Comentarios: ${form.comentarios}`
      );
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>Califica Nuestra Web</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input name="nombre" value={form.nombre} onChange={handleChange} />
            {errores.nombre && <span className="error">{errores.nombre}</span>}
          </label>

          <label>
            Apellido:
            <input
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
            />
            {errores.apellido && (
              <span className="error">{errores.apellido}</span>
            )}
          </label>

          <label>
            Fecha de nacimiento:
            <input
              name="fechaNacimiento"
              value={form.fechaNacimiento}
              onChange={handleChange}
              placeholder="dd-mm-aaaa"
            />
            {errores.fechaNacimiento && (
              <span className="error">{errores.fechaNacimiento}</span>
            )}
          </label>

          <label>
            Sexo:
            <select
              name="sexo"
              id="sexo"
              value={form.sexo}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
            {errores.sexo && <span className="error">{errores.sexo}</span>}
          </label>

          <label>
            Valoracion:
            <select
              name="valoracion"
              id="valoracion"
              value={form.valoracion}
              onChange={handleChange}
            >
              <option value="">Seleccione</option>
              <option value="1">Lamentable</option>
              <option value="2">Mala</option>
              <option value="3">Podria ser mejor</option>
              <option value="4">Cumple mis espectativas</option>
              <option value="5">Me encanto</option>
            </select>
            {errores.valoracion && (
              <span className="error">{errores.valoracion}</span>
            )}
          </label>

          <label>
            Email:
            <input name="email" value={form.email} onChange={handleChange} />
            {errores.email && <span className="error">{errores.email}</span>}
          </label>

          <label>
            Comentarios:
            <textarea
              name="comentarios"
              value={form.comentarios}
              onChange={handleChange}
            />
          </label>

          <button
            className="reset-btn"
            type="reset"
            onClick={() => {
              setForm({
                nombre: "",
                apellido: "",
                fechaNacimiento: "",
                sexo: "",
                valoracion: "",
                email: "",
                comentarios: "",
              });
              setErrores({});
            }}
          >
            Reestablecer
          </button>
          <button className="cancel-btn" onClick={onClose} type="button">
            Cancelar
          </button>
          <button type="submit" className="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
