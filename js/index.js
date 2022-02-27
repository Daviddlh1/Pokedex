import { setPokemon } from "./pokedex.js";

const $form = document.querySelector('#form');
$form.addEventListener('submit', handleSubmit)

async function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData($form);
    const id = form.get('id');
    setPokemon(id);
} 
