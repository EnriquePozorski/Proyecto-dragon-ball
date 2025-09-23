import { useEffect, useRef } from "react";
import L from "leaflet";
import "./mapStyle.css";

export default function MapComponent({ latitud, longitud, nombre = "" }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    
    const map = L.map(mapRef.current).setView([latitud, longitud], 15);

  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    
    const marker = L.marker([latitud, longitud]).addTo(map);
    if (nombre) {
      marker.bindPopup(`<strong>${nombre}</strong>`).openPopup();
    }

    
    setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => {
      map.remove(); 
    };
  }, [latitud, longitud, nombre]);

  return (
    <section className="map-container">
      <div
        id="map"
        ref={mapRef}
        
      />
    </section>
  );
}
