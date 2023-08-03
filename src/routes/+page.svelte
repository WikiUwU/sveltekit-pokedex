<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    import { generations } from './generations'
    import { goto } from '$app/navigation';

    export let data: PageData;

    function capitalize(string: string) {
        const stringChars: string[] = string.split("");
        stringChars[0] = stringChars[0].toUpperCase();
        return stringChars.join("");
    }

    $: pokemonID = $page.url.searchParams.get("pokemonID") || ""; // || "" means simply "or null/empty string, requieremnt for Typescript types"
    $: pokemon = data.pokemons.find(pokemon => pokemon.id === pokemonID);

    $: pokemonID2 = $page.url.searchParams.get("pokemonID2") || "";
    $: pokemon2 = data.pokemons.find(pokemon => pokemon.id === pokemonID2);

    // function pokemonClick(pokemon: IndexPokemon) {
    //     pokemonID = pokemon.id;
    //     goto(`?pokemonID=${pokemonID}`);
    // }

    function updateSearchParams(key: string, value: string) {
        const searchParams = new URLSearchParams($page.url.searchParams);
        searchParams.set(key, value);
        goto(`?${searchParams.toString()}`, {
            noScroll: true
        });
    };

</script>



<div class="layout">

    <h1>{pokemonID}</h1>
    <h2>{pokemon?.name}</h2>

    <h1>{pokemonID2}</h1>
    <h2>{pokemon2?.name}</h2>

    <div class="generations">
        {#each generations as generation (generation.id)}
            <button class="generation">{generation.main_region}</button>
        {/each}
    </div>

    

    <div class="pokemons">

        {#each data.pokemons as pokemon}

            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="pokemon">
                <div on:click={() => updateSearchParams("pokemonID", pokemon.id)}>
                    <div class="pokemon-content">
                        <img src={pokemon.image} alt="Pokemon image of {capitalize(pokemon.name)}">
                        <p>{capitalize(pokemon.name)}</p>
                    </div>
                    
                    <div class="monster-id">
                        {pokemon.id}
                    </div>
                </div>
                <div on:click={() => updateSearchParams('pokemonID2', pokemon.id)}>Add 2. pokemon</div>
            </div>

        {/each}

    </div>

    

</div>



<style>
    .layout {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .generations {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .generation {
        margin: 10px;
        padding: 5px 10px;
        border: 1px solid #888;
        border-radius: 5px;
        background-color: #f9f9f9;
        color: #333;
    }

    .generation:hover {
        background-color: #e8e8e8;
    }

    .pokemons {
        width: 80%;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .pokemon {
        position: relative;
        text-align: center;
        width: 100px;
        margin: 10px;
        padding: 10px;
        background-color: rgb(255, 235, 205);
        border-radius: 5px;
    }

    .pokemon:hover {
        background-color: rgb(240, 220, 190);
    }

    .monster-id {
        position: absolute;
        top: 8px;
        left: 8px;
        font-size: 0.8rem;
        color: #888;
    }

    .pokemon-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }

    .pokemon-content p {
        margin: 0;
    }
    
</style>

