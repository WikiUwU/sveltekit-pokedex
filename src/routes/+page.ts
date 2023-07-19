import type { PageLoad } from "./$types";

type IndexPokemon = {
    name: string,
    url: string
}

type PokemonList = [
    {
        name: string,
        url: string,
        id: string,
        image: string
    }
]

export const load = (async ({ fetch }) => {

    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    const jsonData = await response.json();
    const pokemons: PokemonList = jsonData.results.map((pokemon: IndexPokemon) => {

        //get pokemon id from the url like "https://pokeapi.co/api/v2/pokemon/25/"
        const splitURL = pokemon.url.split("/");
        // e.g   [ "https:", "", "pokeapi.co", "api", "v2", "pokemon", "25", "" ]
        const id: string = splitURL[splitURL.length - 2];

        return {
            name: pokemon.name,
            url: pokemon.url,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }
    })

    return {
        pokemons
    }
}) satisfies PageLoad