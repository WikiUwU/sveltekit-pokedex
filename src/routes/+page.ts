import type { PageLoad } from "./$types";

type APIPokemon = {
    name: string,
    url: string
}

export type IndexPokemon = APIPokemon & {
    id: string,
    image: string
}

export const load = (async ({ fetch, url }) => {
    const generationID = url.searchParams.get("generation_id") || "all";

    let pokemonList = [];

    if (generationID === "all") {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20000')
        const jsonData = await response.json();
        pokemonList = jsonData.results;
    }else {
        const generationResponse = await fetch(`https://pokeapi.co/api/v2/generation/${generationID}`);
        const generationJSON = await generationResponse.json();
        pokemonList = generationJSON.pokemon_species;
    }

    const pokemons: IndexPokemon[] = pokemonList.map((pokemon: APIPokemon) => {

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
    });

    

    return {
        pokemons
    }
}) satisfies PageLoad