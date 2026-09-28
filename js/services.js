const API_URL = "https://mlbb-counter-api-five.vercel.app";
const POOL_STORAGE_KEY = "mlbb_user_pool";

export async function fetchHeroes() {
  const response = await fetch(`${API_URL}/?getHeroes=true`);
  if (!response.ok) throw new Error("No se pudo cargar la lista de héroes.");
  return response.json();
}

export async function fetchCounters(hero, lane) {
  const query = `hero=${encodeURIComponent(hero)}&lane=${encodeURIComponent(lane)}`;
  const response = await fetch(`${API_URL}/?${query}`);
  if (!response.ok) throw new Error("No se pudieron consultar los counters.");
  return response.json();
}

export function loadUserPool() {
  const savedPool = JSON.parse(localStorage.getItem(POOL_STORAGE_KEY));
  return savedPool || { exp: [], mid: [], gold: [], jungle: [], roam: [] };
}

export function saveUserPool(pool) {
  localStorage.setItem(POOL_STORAGE_KEY, JSON.stringify(pool));
}