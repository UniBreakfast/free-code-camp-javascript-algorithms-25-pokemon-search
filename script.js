const baseURL = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/';
const randomBtn = document.getElementById('random-button');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const searchResult = document.getElementById('search-result');
const pokemonInfo = document.getElementById('pokemon-info');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const pokemonImageWrapper = document.getElementById('pokemon-image-wrapper');
const sprite = document.getElementById('sprite');
const figCaption = document.getElementById('fig-caption');
const pokemonStats = document.getElementById('pokemon-stats');

const stats = {
  hp: document.getElementById('hp'),
  attack: document.getElementById('attack'),
  defense: document.getElementById('defense'),
  'special-attack': document.getElementById('special-attack'),
  'special-defense': document.getElementById('special-defense'),
  speed: document.getElementById('speed')
}

let pokemonIds = Array(1025).fill(0).map((_, i) => i + 1)
  .concat(Array(277).fill(0).map((_, i) => i + 10001));

randomBtn.addEventListener('click', handleRandom);
searchBtn.addEventListener('click', handleSearch);

function handleRandom(event) {
  event.preventDefault();
  
  const id = pokemonIds.at(Math.random() * pokemonIds.length);

  searchResult.hidden = true;
  searchInput.value = id;
  searchPokemon(id).then(presentPokemon).catch(reportFailure);
}

function handleSearch(event) {
  event.preventDefault();
  searchResult.hidden = true;

  const nameOrId = searchInput.value.toLowerCase();

  searchPokemon(nameOrId).then(presentPokemon).catch(reportFailure);
}

function searchPokemon(nameOrId) {
  return fetch(baseURL + nameOrId).then(response => {
    if (response.ok) return response.json();
    else throw new Error('not found');
  })
}

function reportFailure() {
  searchResult.hidden = true;

  alert('Pokémon not found');
}

function presentPokemon(pokemon) {
  searchResult.hidden = false;

  pokemonName.value = pokemon.name.toUpperCase();
  pokemonId.value = pokemon.id;
  weight.value = pokemon.weight;
  height.value = pokemon.height;
  types.innerHTML = pokemon.types.map(({ type }) => `<li>${type.name.toUpperCase()}</li>`).join(',&nbsp;');
  sprite.src = pokemon.sprites.front_default;
  figCaption.value = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  for (const stat of pokemon.stats) {
    const { stat: { name }, base_stat: value } = stat;

    stats[name].value = value;
  }
}
