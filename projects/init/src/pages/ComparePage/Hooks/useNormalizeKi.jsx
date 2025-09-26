// src/pages/ComparePage/Hooks/useNormalizeKi.jsx
/*
export function useNormalizeKi() {
  const units = {
    Billion: 1,
    Trillion: 1_000,
    Quadrillion: 1_000_000,
    Quintillion: 1_000_000_000,
    Sextillion: 1_000_000_000_000,
    Septillion: 1_000_000_000_000_000,
  };

  const normalizeKi = (kiStr) => {
    if (!kiStr) return 0;
    const [value, unit] = kiStr.split(" ");
    return parseFloat(value.replace(/,/g, "")) * (units[unit] || 1);
  };

  return { normalizeKi };
}
*/
export default function useNormalizeKi(ki) {
  if (!ki) return 0;
  const str = ki.toString().toLowerCase().trim();

  // 🔹 Caso 1: valores con sufijos en inglés
  if (str.includes("septillion")) return parseFloat(str) * 1e24;
  if (str.includes("quintillion")) return parseFloat(str) * 1e18;
  if (str.includes("quadrillion")) return parseFloat(str) * 1e15;
  if (str.includes("trillion")) return parseFloat(str) * 1e12;
  if (str.includes("billion")) return parseFloat(str) * 1e9;
  if (str.includes("million")) return parseFloat(str) * 1e6;

  // 🔹 Caso 2: números con separadores de miles (puntos o comas)
  const clean = str.replace(/[.,]/g, "");
  return parseInt(clean, 10) || 0;
}
