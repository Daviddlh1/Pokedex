import { getPokemon, getSpecies } from "./api.js";

const $image = document.querySelector('#image');
function setImage(image) {
    $image.src = image
}

const $description = document.querySelector('#description');
function setDescription(description) {
    $description.textContent = description;
}

const $screen = document.querySelector('#screen');
function Loader(isLoading = false) {
    const img = isLoading? 'url(../images/loading.gif)':'';
    $screen.style.backgroundImage = img;
}

async function findPokemon(id) {
    const pokemon = await getPokemon(id);
    const species = await getSpecies(id);
    const description = species.flavor_text_entries.find((flavor)=> flavor.language.name === 'en');
    return {
        sprites: pokemon.sprites.front_default,
        description: description.flavor_text,
    }
}

export async function setPokemon(id) {
    Loader(true);
    const pokemon = await findPokemon(id);
    Loader(false)
    console.log(pokemon)
    setImage(pokemon.sprites);
    setDescription(pokemon.description);
}
