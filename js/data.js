export const HERO_DATABASE = [
  "Miya", "Balmond", "Saber", "Alice", "Nana", "Tigreal", "Alucard", "Akai", "Franco", "Bane",
  "Bruno", "Clint", "Rafaela", "Eudora", "Zilong", "Fanny", "Layla", "Minotauro", "Minotaur", "Lolita", "Hayabusa",
  "Freya", "Gord", "Natalia", "Kagura", "Chou", "Sun", "Alpha", "Ruby", "Yi Sun-shin", "Moskov", "Moscov",
  "Johnson", "Cyclops", "Estes", "Hilda", "Aurora", "Lapu-Lapu", "Vexana", "Harley", "Irithel", "Grock",
  "Argus", "Odette", "Lancelot", "Diggie", "Hylos", "Zhask", "Helcurt", "Pharsa", "Lesley", "Jawhead",
  "Angela", "Gusion", "Valir", "Martis", "Uranus", "Hanabi", "Chang'e", "Kaja", "Selena", "Aldous",
  "Claude", "Vale", "Leomord", "Lunox", "Hanzo", "Belerick", "Kimmy", "Thamuz", "Harith", "Minsitthar",
  "Badang", "Khufra", "Granger", "Guinevere", "Esmeralda", "Terizla", "X.Borg", "Ling", "Dyrroth", "Lylia",
  "Baxia", "Masha", "Wanwan", "Silvanna", "Cecilion", "Carmilla", "Atlas", "Popol and Kupa", "Yu Zhong", "Luo Yi",
  "Benedetta", "Khaleed", "Barats", "Brody", "Yve", "Mathilda", "Paquito", "Gloo", "Phoveus", "Natan",
  "Aulus", "Aamon", "Valentina", "Edith", "Yin", "Melissa", "Xavier", "Julian", "Fredrinn", "Joy",
  "Novaria", "Arlott", "Ixia", "Nolan", "Cici", "Chip", "Zhuxin", "Lukas", "Suyu", "Suyou", "Kaela", "Calea",
  "Gatotkaca", "Beatrix", "Karina", "Marcel", "Kadita", "Faramis", "Floryn", "Hirara"
];

export const HERO_LANES = {
  exp: [
    "Balmond", "Zilong", "Chou", "Sun", "Alpha", "Ruby", "Hilda", "Lapu-Lapu", "Argus", "Jawhead",
    "Martis", "Uranus", "Aldous", "Leomord", "Thamuz", "Minsitthar", "Badang", "Guinevere", "Esmeralda",
    "Terizla", "X.Borg", "Dyrroth", "Masha", "Silvanna", "Yu Zhong", "Benedetta", "Khaleed", "Barats",
    "Paquito", "Gloo", "Phoveus", "Aulus", "Edith", "Yin", "Julian", "Fredrinn", "Joy", "Arlott",
    "Cici", "Lukas", "Suyu", "Suyou", "Alice", "Bane", "Gatotkaca"
  ],
  mid: [
    "Alice", "Nana", "Eudora", "Gord", "Kagura", "Cyclops", "Aurora", "Vexana", "Odette", "Pharsa",
    "Valir", "Chang'e", "Vale", "Lunox", "Harith", "Lylia", "Cecilion", "Luo Yi", "Yve", "Valentina",
    "Xavier", "Novaria", "Zhuxin", "Julian", "Zhask", "Kadita", "Faramis"
  ],
  gold: [
    "Miya", "Bruno", "Clint", "Layla", "Moskov", "Moscov", "Irithel", "Lesley", "Hanabi", "Claude", "Kimmy",
    "Granger", "Wanwan", "Brody", "Natan", "Melissa", "Ixia", "Popol and Kupa", "Harith", "Lunox", "Alice", "Beatrix"
  ],
  jungle: [
    "Saber", "Alucard", "Fanny", "Hayabusa", "Freya", "Yi Sun-shin", "Harley", "Lancelot", "Helcurt",
    "Gusion", "Hanzo", "Ling", "Baxia", "Aamon", "Nolan", "Barats", "Martis", "Alpha", "Julian",
    "Balmond", "Bane", "Jawhead", "Paquito", "Fredrinn", "Dyrroth", "Gloo", "Chou", "Popol and Kupa",
    "Karina", "Lukas", "Suyu", "Suyou"
  ],
  roam: [
    "Tigreal", "Akai", "Franco", "Rafaela", "Minotauro", "Minotaur", "Lolita", "Natalia", "Johnson", "Estes",
    "Grock", "Diggie", "Hylos", "Angela", "Kaja", "Selena", "Belerick", "Khufra", "Carmilla",
    "Atlas", "Mathilda", "Chip", "Chou", "Jawhead", "Edith", "Minsitthar", "Hilda", "Valir", "Gatotkaca", "Kadita", "Marcel", "Faramis", "Floryn"
  ]
};

export const translations = {
  es: {
    step1: "1. Configurar tu Pool de Héroes",
    selectLane: "Seleccionar Línea:",
    addHero: "Agregar héroe a esta línea:",
    btnAdd: "Agregar",
    step2: "2. Buscar Counter de Línea",
    yourLane: "Línea que jugarás:",
    enemyPick: "Pick Enemigo en tu línea:",
    btnAnalyze: "Analizar Matchup",
    block1Title: "🥇 TU MEJOR OPCIÓN",
    block1Sub: "Según los héroes que sabes usar en esta línea",
    block2Title: "🌍 OPCIÓN ESTADÍSTICAMENTE FAVORABLE",
    block2Sub: "Según los datos del meta",
    btnReset: "🔄 Analizar Nueva Partida",
    emptyPool: "Tu pool está vacío para esta línea. Agrega héroes arriba.",
    fuzzyFound: "Interpretado como: ",
    enterEnemy: "Por favor, ingresa el nombre del héroe enemigo."
  },
  en: {
    step1: "1. Configure Your Hero Pool",
    selectLane: "Select Lane:",
    addHero: "Add hero to this lane:",
    btnAdd: "Add",
    step2: "2. Search Lane Counter",
    yourLane: "Lane you will play:",
    enemyPick: "Enemy Pick in your lane:",
    btnAnalyze: "Analyze Matchup",
    block1Title: "🥇 YOUR BEST OPTION",
    block1Sub: "Based on the heroes you know how to use in this lane",
    block2Title: "🌍 STATISTICALLY FAVORABLE OPTION",
    block2Sub: "Based on meta data",
    btnReset: "🔄 Analyze New Matchup",
    emptyPool: "Your pool is empty for this lane. Add heroes above.",
    fuzzyFound: "Interpreted as: ",
    enterEnemy: "Please enter the enemy hero's name."
  }
};