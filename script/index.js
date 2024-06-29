const searchbar = document.querySelector('.search .searchbar input');
const search_button = document.querySelector('.search .searchbar button');

const error_element = document.createElement('div');
error_element.className = 'error';
error_element.innerHTML = 
`
    <p>Error - Undefined.</p>
`;
error_element.style.display = 'none';
document.body.appendChild(error_element);

const pokemon_container = document.createElement('div');
pokemon_container.className = 'pokemon-info';
pokemon_container.style.display = 'none';
document.body.appendChild(pokemon_container);

function searchPokemon() {
    error_element.style.display = 'none';

    if (searchbar.value == "") {
        error_element.innerHTML = `
            <p>Please enter a Pokemon</p>
        `;
        error_element.style.display = 'flex';
    } else {
        fetch(`https://pokeapi.co/api/v2/pokemon/${searchbar.value.toLowerCase()}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                error_element.style.display = 'none';
                console.log(data);

                pokemon_container.innerHTML = `
                    <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)} | ID: ${data.id}</h2>
                    <div class="pokemon-info">
                        <div class="pokemon-info__image">
                            <img src="${data.sprites.front_default}" alt="${data.name}">
                        </div>
                        <div class="pokemon-info__details">
                            <p>Height: ${data.height / 10}m</p>
                            <p>Weight: ${data.weight / 10}Kg</p>
                            <p>Type/Types: ${data.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(', ')}</p>
                            <br/>

                            <p>Abilities:</p>
                            <ul>
                                ${data.abilities.map(ability => `<li>${ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}</li>`).join('')}
                            </ul>
                        
                        </div>
                    </div>
                `;
                pokemon_container.style.display = 'flex';
            })
            .catch(error => {
                console.log("ERROR")
                console.log(error);
                error_element.innerHTML = `
                    <p>Sorry, we couldn't find ${searchbar.value.toLowerCase().charAt(0).toUpperCase() + searchbar.value.toLowerCase().slice(1)}. Please try again.</p>
                    <span>${error}</span>
                `;
                error_element.style.display = 'flex';
            });
    }
}

search_button.addEventListener('click', searchPokemon);
searchbar.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        searchPokemon();
    }
});
