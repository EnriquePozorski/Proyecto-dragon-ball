// src/features/ComparePage/Components/CharacterKiChart.jsx
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useNormalizeKi } from "../Hooks/useNormalizeKi.jsx";
import "../StyledComponents/CharacterKiChart.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function CharacterKiChart({ character, globalMax }) {
  const { normalizeKi } = useNormalizeKi();

  // Labels: nombres de transformaciones
  const labels = character.transformations?.map((t) => t.name) || [];

  // Valores normalizados
  const values = character.transformations?.map((t) => normalizeKi(t.ki)) || [];
  const dataValues = values.map((v) => v / globalMax); // normalización global

  const data = {
    labels,
    datasets: [
      {
        label: `KI de ${character.name} (normalizado global)`,
        data: dataValues,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
      },
    ],
  };

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.raw.toExponential(2)} KI`,
      },
    },
  },
  scales: {
    y: {
      type: "logarithmic", // 👈 escala logarítmica
      beginAtZero: false,
      title: { display: true, text: "KI (escala log)" },
      ticks: {
        callback: (value) => Number(value).toExponential(1),
      },
    },
  },
};


  return (
    <div className="chart-card">
      <div className="chart-header">
        <img
          className="chart-avatar"
          src={character.image}
          alt={character.name}
        />
        <div className="chart-title">
          <h2>{character.name}</h2>
          <span className="chart-subtitle">{character.race}</span>
        </div>
      </div>

      <div className="chart-wrapper">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
