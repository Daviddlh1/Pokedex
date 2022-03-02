import { getPokemon, getSpecies } from "./api.js";

const $image = document.querySelector('#image');
export function setImage(image) {
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
    let sprites = [pokemon.sprites.front_default];
    for(const item in pokemon.sprites){
        if(item !== 'front_default'  && item!== 'other' && item !== 'versions' && pokemon.sprites[item]){
            sprites.push(pokemon.sprites[item])
        }
    }
    return {
        sprites,
        description: description.flavor_text,
        id:pokemon.id,
    }
}

export async function setPokemon(id) {
    Loader(true);
    const pokemon = await findPokemon(id);
    Loader(false)
    setImage(pokemon.sprites[0]);
    setDescription(pokemon.description);
    return pokemon
}
