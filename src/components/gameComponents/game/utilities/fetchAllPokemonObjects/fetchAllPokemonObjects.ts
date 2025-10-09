const apiUrlPrefix = "https://pokeapi.co/api/v2/pokemon/";

function fetchAllPokemonObjects() {
  const pokemon: Array<object> = [];
  for (let i = 1; i <= 151; i++) {
    // Generate the API URL for each Pokemon
    const pokeUrl = apiUrlPrefix + i;
    // Fetch the Pokemon data from the API
    fetch(pokeUrl, { mode: "cors" })
      .then((response) => response.json())
      // Push the fetched data into the pokemon array
      .then((response) => pokemon.push(response))
      .catch((error) => console.error(error));
  }

  return pokemon;
}

export { fetchAllPokemonObjects };
