import { getPokemon, getSpecies } from "./api.js";

const $form = document.querySelector('#form');
$form.addEventListener('submit', (e) =>{
    e.preventDefault()
    const form = new FormData($form);
    const id = form.get('id');
    const pokemon = await getPokemon(id);
    const species = await getSpecies(id);
    console.log(pokemon, species);
})