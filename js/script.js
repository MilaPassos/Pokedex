const pokeName = document.querySelector('.poke_name');
const pokeNumber = document.querySelector('.poke_number');
const pokeImg = document.querySelector('.poke_img');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnNext = document.querySelector('.btn_next');
const btnPrev = document.querySelector('.btn_prev');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }

};

const renderPokemon = async (pokemon) => {

    pokeName.innerHTML = 'Carregando...';
    pokeNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    
    if (data) {
        pokeName.innerHTML = data.name;
        pokeNumber.innerHTML = data.id;
        searchPokemon = data.id;
        pokeImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        
    } else {
        pokeName.innerHTML = 'Não encontrado';
        pokeNumber.innerHTML = '';
        pokeImg.src = "./images/notFound.png";
    }
}

form.addEventListener('submit', (event) => {
    
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = '';

});

btnPrev.addEventListener('click', () =>{
    if(searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
});

btnNext.addEventListener('click', () =>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);


