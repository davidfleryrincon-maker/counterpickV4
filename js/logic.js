import { HERO_DATABASE, HERO_LANES } from "./data.js";

export function normalizeHeroName(value) {
  return value.toLowerCase().replace(/[''.\-\s]/g, "").trim();
}

function levenshtein(first, second) {
  const matrix = [];
  for (let row = 0; row <= first.length; row++) matrix[row] = [row];
  for (let column = 0; column <= second.length; column++) matrix[0][column] = column;

  for (let row = 1; row <= first.length; row++) {
    for (let column = 1; column <= second.length; column++) {
      matrix[row][column] = first[row - 1] === second[column - 1]
        ? matrix[row - 1][column - 1]
        : Math.min(
          matrix[row - 1][column - 1] + 1,
          matrix[row][column - 1] + 1,
          matrix[row - 1][column] + 1
        );
    }
  }
  return matrix[first.length][second.length];
}

export function identifyHero(input) {
  if (!input) return input;
  const normalizedInput = normalizeHeroName(input);
  const exactMatch = HERO_DATABASE.find(hero => normalizeHeroName(hero) === normalizedInput);
  if (exactMatch) return exactMatch;

  let bestMatch = input;
  let smallestDistance = Infinity;
  HERO_DATABASE.forEach(hero => {
    const distance = levenshtein(normalizedInput, normalizeHeroName(hero));
    if (distance < smallestDistance) {
      smallestDistance = distance;
      bestMatch = hero;
    }
  });

  return smallestDistance <= 2 && normalizedInput.length >= 3 ? bestMatch : input;
}

export function isHeroInLane(heroName, lane) {
  const laneHeroes = HERO_LANES[lane];
  if (!laneHeroes) return true;
  if (laneHeroes.some(hero => normalizeHeroName(hero) === normalizeHeroName(heroName))) return true;

  const mappedSomewhere = Object.values(HERO_LANES).some(heroes =>
    heroes.some(hero => normalizeHeroName(hero) === normalizeHeroName(heroName))
  );
  return !mappedSomewhere;
}

export function parseWinRate(value) {
  if (!value) return 0;
  const parsed = parseFloat(value.replace("%", ""));
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function getPoolCounters(pool, counters) {
  return pool
    .map(hero => {
      const counter = counters.find(item => normalizeHeroName(item.name) === normalizeHeroName(hero));
      if (!counter) return null;
      return {
        name: hero,
        winRate: counter.winRate,
        wrValue: parseWinRate(counter.winRate),
        reason: counter.reason || null
      };
    })
    .filter(Boolean)
    .sort((first, second) => second.wrValue - first.wrValue);
}