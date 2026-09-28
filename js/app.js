import { HERO_DATABASE, translations } from "./data.js";
import { identifyHero, isHeroInLane, normalizeHeroName, getPoolCounters } from "./logic.js";
import { fetchHeroes, fetchCounters, loadUserPool, saveUserPool } from "./services.js";

const language = navigator.language.startsWith("es") ? "es" : "en";
const text = translations[language];
let userPool = loadUserPool();

const elements = {
  poolLane: document.getElementById("poolLinea"),
  poolInput: document.getElementById("nuevoHeroePool"),
  poolTags: document.getElementById("poolTags"),
  gameLane: document.getElementById("partidaLinea"),
  enemyPick: document.getElementById("enemigoPick"),
  results: document.getElementById("resultadosCounter"),
  poolResult: document.getElementById("poolResult"),
  generalResult: document.getElementById("generalResult")
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

function applyTranslations() {
  const labels = {
    "t-step1": "step1", "t-selectLane": "selectLane", "t-addHero": "addHero",
    "t-btnAdd": "btnAdd", "t-step2": "step2", "t-yourLane": "yourLane",
    "t-enemyPick": "enemyPick", "t-btnAnalyze": "btnAnalyze", "t-block1Title": "block1Title",
    "t-block1Sub": "block1Sub", "t-block2Title": "block2Title", "t-block2Sub": "block2Sub",
    "t-btnReset": "btnReset"
  };
  Object.entries(labels).forEach(([id, key]) => {
    document.getElementById(id).textContent = text[key];
  });
}

function renderPool() {
  const lane = elements.poolLane.value;
  const heroes = userPool[lane] || [];
  if (heroes.length === 0) {
    elements.poolTags.innerHTML = `<span class="empty-msg pool-empty">${text.emptyPool}</span>`;
    return;
  }

  elements.poolTags.innerHTML = heroes.map((hero, index) => `
    <div class="tag"><span class="tag-name">${escapeHtml(hero)}</span>
      <button class="tag-remove" type="button" data-remove-index="${index}" aria-label="Eliminar ${escapeHtml(hero)}">&times;</button>
    </div>`).join("");
}

function addHeroToPool() {
  const lane = elements.poolLane.value;
  const rawName = elements.poolInput.value.trim();
  if (!rawName) return;

  const heroName = identifyHero(rawName);
  if (!userPool[lane]) userPool[lane] = [];
  if (!userPool[lane].includes(heroName)) {
    userPool[lane].push(heroName);
    saveUserPool(userPool);
  }
  elements.poolInput.value = "";
  renderPool();
}

function renderCounterItems(counters) {
  return counters.slice(0, 6).map((counter, index) => `
    <div class="item-badge">
      ${index + 1}. <strong>${escapeHtml(counter.name)}</strong> - Ventaja: ${escapeHtml(counter.winRate)}
      ${counter.reason ? `<div class="hero-reason">💡 ${escapeHtml(counter.reason)}</div>` : ""}
    </div>`).join("");
}

function renderPoolResults(pool, counters, fuzzyNotice, enemyName) {
  if (pool.length === 0) {
    elements.poolResult.innerHTML = `<p class="empty-msg">${text.emptyPool}</p>`;
    return;
  }

  const matchingCounters = getPoolCounters(pool, counters);
  if (matchingCounters.length > 0) {
    const badges = matchingCounters.map(counter => `
      <div class="item-badge item-badge-success">
        🥇 <strong>${escapeHtml(counter.name)}</strong> (Ventaja en MLBB Hub: ${escapeHtml(counter.winRate)})
        ${counter.reason ? `<div class="hero-reason">💡 ${escapeHtml(counter.reason)}</div>` : ""}
      </div>`).join("");
    elements.poolResult.innerHTML = `${fuzzyNotice}${badges}
      <p class="result-note text-small text-success">¡Opción recomendada! Este personaje de tu pool figura en el meta actual contra ${escapeHtml(enemyName)}.</p>`;
    return;
  }

  elements.poolResult.innerHTML = `${fuzzyNotice}
    <div class="fallback-result">
      <span class="text-muted text-small">Ningún personaje de tu pool tiene un counter directo registrado en MLBB Hub. Tu mejor opción principal guardada para esta línea es:</span><br>
      <strong class="text-gold text-large fallback-hero">${escapeHtml(pool[0])}</strong>
    </div>`;
}

async function searchCounter() {
  const lane = elements.gameLane.value;
  const enemyInput = elements.enemyPick.value.trim();
  if (!enemyInput) {
    alert(text.enterEnemy);
    return;
  }

  const enemyName = identifyHero(enemyInput);
  const pool = userPool[lane] || [];
  elements.poolResult.innerHTML = '<p class="text-muted text-small">Analizando matchup...</p>';
  elements.generalResult.innerHTML = '<p class="text-accent text-small-accent">Consultando counters en vivo en MLBB Hub...</p>';
  elements.results.style.display = "block";
  const fuzzyNotice = normalizeHeroName(enemyName) !== normalizeHeroName(enemyInput)
    ? `<div class="fuzzy-notice">${text.fuzzyFound}<strong>${escapeHtml(enemyName)}</strong></div>`
    : "";

  try {
    const data = await fetchCounters(enemyName, lane);
    const counters = data.counters || [];
    if (counters.length > 0) {
      const laneCounters = counters.filter(counter => isHeroInLane(counter.name, lane));
      elements.generalResult.innerHTML = renderCounterItems(laneCounters.length >= 3 ? laneCounters : counters);
    } else {
      elements.generalResult.innerHTML = `<p class="text-gold text-small">No se encontraron counters específicos registrados para <strong>${escapeHtml(enemyName)}</strong>.</p>`;
    }
    renderPoolResults(pool, counters, fuzzyNotice, enemyName);
  } catch (error) {
    elements.generalResult.innerHTML = '<p class="text-danger text-small">Error al conectar con el servidor de Vercel.</p>';
    elements.poolResult.innerHTML = '<p class="text-danger text-small">No se pudo procesar la consulta.</p>';
  }
}

function resetSearch() {
  elements.enemyPick.value = "";
  elements.results.style.display = "none";
}

function syncHeroes() {
  fetchHeroes()
    .then(data => {
      if (Array.isArray(data.heroes)) {
        const knownHeroes = new Set(HERO_DATABASE);
        data.heroes.forEach(hero => {
          if (!knownHeroes.has(hero)) {
            HERO_DATABASE.push(hero);
            knownHeroes.add(hero);
          }
        });
      }
    })
    .catch(() => console.warn("Usando base de datos local de reserva."));
}

applyTranslations();
elements.poolLane.addEventListener("change", renderPool);
elements.poolTags.addEventListener("click", event => {
  const removeButton = event.target.closest("[data-remove-index]");
  if (!removeButton) return;
  const lane = elements.poolLane.value;
  userPool[lane].splice(Number(removeButton.dataset.removeIndex), 1);
  saveUserPool(userPool);
  renderPool();
});
document.getElementById("t-btnAdd").addEventListener("click", addHeroToPool);
elements.poolInput.addEventListener("keydown", event => {
  if (event.key === "Enter") addHeroToPool();
});
document.getElementById("t-btnAnalyze").addEventListener("click", searchCounter);
document.getElementById("t-btnReset").addEventListener("click", resetSearch);
renderPool();
syncHeroes();