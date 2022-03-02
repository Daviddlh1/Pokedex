import { setPokemon, setImage } from "./pokedex.js";

const $pokedex = document.querySelector('#pokedex');
const $form = document.querySelector('#form');
const $next = document.querySelector('#next-pokemon');
const $prev = document.querySelector('#prev-pokemon');
const $nextImage = document.querySelector('#next-image');
const $prevImage = document.querySelector('#prev-image')


$form.addEventListener('submit', handleSubmit);
$next.addEventListener('click', handleNextPokemon);
$prev.addEventListener('click', handlePrevPokemon);
$nextImage.addEventListener('click', handleNextImage);
$prevImage.addEventListener('click', handlePrevImage);


let activePokemon = null
async function handleSubmit(e) {
    e.preventDefault()
    $pokedex.classList.add('is-open')
    const form = new FormData($form);
    const id = form.get('id');
    if(id > 898 ||id <= 0){
        console.log('entré')
    }else{
        activePokemon = await setPokemon(id);
    }
}

async function handleNextPokemon() {
    const id = (activePokemon === null || activePokemon.id === 898)? 1 : activePokemon.id + 1;
    activePokemon = await setPokemon(id);
}

async function handlePrevPokemon() {
    const id = (activePokemon === null || activePokemon.id === 1)? 898 : activePokemon.id-1;
    activePokemon = await setPokemon(id);
}

let activeSprite = 0
async function handleNextImage(e){
    if(!activePokemon) return false;
    if(activeSprite === activePokemon.sprites.length-1){
        activeSprite = 0
        console.log('entré', activeSprite)
        setImage(activePokemon.sprites[activeSprite]);
    }
    activeSprite = activeSprite + 1;
    setImage(activePokemon.sprites[activeSprite]);
}

async function handlePrevImage(){
    if(!activePokemon) return false;
}
