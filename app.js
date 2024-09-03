async function getTotalPokemons(){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`)
        if (!response.ok){
            throw new Error("Errore nella richiesta");
        }
        const data = await response.json();
        return data.results;
        console.log(data); // stampa i datoi dei pokemons
    }catch(error){
        console.error(error);
    }
}

async function getpokemon(pokemonName){
    try{
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        if (!response.ok){
            throw new Error("Errore nella richiesta");
        }
        const data = await response.json();
        console.log(data); // stampa i dati dei pokemon
        displayPokemon(data);
    }catch(error){
        console.error(error);
    }
}

// Funzione per visualizzare i dati del Pokémon
function displayPokemon(pokemon){
    const pokemonContainer = document.getElementById('pokemon-container');
    const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
    const card =
    `<div class="col-md-4 mb-4"> 
        <div class="card" style="background: linear-gradient(to bottom right, #ffcc00, #ff6699);">
            <div class="text-center">
                <img class="img-fluid w-50" src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
            </div>
            <div class="card-body">
                <h5 class="card-title">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
                <p class="card-text">Altezza: ${pokemon.height} | Peso: ${pokemon.weight}</p>
            </div>
        </div>
    </div>`;
    pokemonContainer.innerHTML += card;
}

// Funzione principale per ottenere e visualizzare tutti i Pokémon
async function loadAllPokemons(){
    const pokemons = await getTotalPokemons();
    for (const pokemon of pokemons){
        await getpokemon(pokemon.name);
    }
}

loadAllPokemons();
