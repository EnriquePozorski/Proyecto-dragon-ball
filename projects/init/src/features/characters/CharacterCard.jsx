import React from "react";
import "./CharacterCardStyle.css";

function CharacterCard({ name, description, image }) {
  return (
    <div className="card-content">
      <h3 className="card-title">{name}</h3>
      <img src={image} alt={name} className="card-img" />
      <div className="card-footer">
      <p className="card-description">{description}</p>
      </div>
    </div>
  );
}

export default CharacterCard;
