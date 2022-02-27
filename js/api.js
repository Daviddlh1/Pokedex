const BASE_URL = 'https://pokeapi.co/api/v2/';

export async function getPokemon(id) {
    try{
        const response = await fetch(`${BASE_URL}pokemon/${id}`);
        const data = await response.json();
        return data;
    }catch(err){
        console.log('Something went wrong', err)
    }
}

export async function getSpecies(id){
    try{
        const response = await fetch(`${BASE_URL}pokemon-species/${id}`);
        const data = await response.json();
        return data;
    }catch(err){
        console.log('Something went wrong', err)
    }
}