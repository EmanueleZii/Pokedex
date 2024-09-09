async function getTotalPokemons() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
        if (!response.ok) {
            throw new Error("Errore nella richiesta");
        }
        const data = await response.json();
        return data.results; // Restituisce i risultati
    } catch (error) {
        console.error(error);
        return []; // Restituisce un array vuoto in caso di errore
    }
}

async function getPokemon(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error("Errore nella richiesta");
        }
        const data = await response.json();
        return data; // Restituisce i dati del Pokémon
    } catch (error) {
        console.error(error);
        return null; // Restituisce null in caso di errore
    }
}

// Funzione per visualizzare i dati del Pokémon
function displayPokemon(pokemon) {
    const pokemonContainer = document.getElementById('pokemon-container');
    const card = `
    <div class="col-md-4 mb-4"> 
        <div class="card" style="background: linear-gradient(to bottom right, #ffcc00, #ff6699);">
            <div class="text-center">
                <img class="img-fluid w-50" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            </div>
            <div class="card-body">
                <h5 class="card-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
                <p class="card-text">Altezza: ${pokemon.height} | Peso: ${pokemon.weight}</p>
            </div>
        </div>
    </div>`;
    pokemonContainer.innerHTML += card; // Aggiunge la scheda al contenitore
}

// Funzione principale per ottenere e visualizzare tutti i Pokémon
async function loadAllPokemons() {
    const pokemons = await getTotalPokemons();
    for (let i = 0; i < pokemons.length; i++) {
        const pokemon = await getPokemon(pokemons[i].name);
        if (pokemon) {
            displayPokemon(pokemon); // Mostra il Pokémon solo se i dati sono validi
        }
    }
}

loadAllPokemons(); // Carica tutti i Pokémon
