import { useState, useEffect } from "react";
import db1 from "../assets/img/carrusel/db1.jpeg";
import db2 from "../assets/img/carrusel/db2.jpg";
import db3 from "../assets/img/carrusel/db3.jpeg";
import db4 from "../assets/img/carrusel/db4.jpg";

import "./Carousel.css";

export default function Carousel() {
  const images = [db1, db2, db3, db4];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="carousel-conainer">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="carousel"
          className={`carousel-image ${index === current ? "slide-in" : ""}`}
        />
      ))}
    </div>
  );
}
