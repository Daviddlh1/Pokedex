import { getPokemon, getSpecies } from "./api.js";
import { createChart } from "./charts.js";

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

const $light = document.querySelector('#light');
function speech(text){
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang= 'en';
    speechSynthesis.speak(utterance);
    $light.classList.add("is-animated");

    utterance.addEventListener('end',()=> $light.classList.remove('is-animated'));
}

async function findPokemon(id) {
    const pokemon = await getPokemon(id);
    const species = await getSpecies(id);
    const stats = pokemon.stats.map(stat=> stat.base_stat)
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
        id: pokemon.id,
        name: pokemon.name,
        stats: stats,
    }
}

let activeChart= null;
export async function setPokemon(id) {
    Loader(true);
    const pokemon = await findPokemon(id);
    Loader(false)
    setImage(pokemon.sprites[0]);
    setDescription(pokemon.description);
    speech(`${pokemon.name}. ${pokemon.description}`);
    if(activeChart instanceof Chart){
        activeChart.destroy()
    }
    activeChart = createChart(pokemon.stats)
    return pokemon
}
