<script lang="ts">
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    import { generations } from './generations'
    import { goto } from '$app/navigation';
    import PokemonComponent from './PokemonComponent.svelte';

    // function capitalize(string: string) {
    //     const stringChars: string[] = string.split("");
    //     stringChars[0] = stringChars[0].toUpperCase();
    //     return stringChars.join("");
    // }


    export let data: PageData;
    
    let form = {
        searchString: ""
    }
    let searchString: string = "";
    $: selectedPokemons = data.pokemons.filter(pokemon => {
        if ( pokemon.name.includes(searchString.toLowerCase()) ) {
            return pokemon
        }
    })



    $: selectedGenerationID = $page.url.searchParams.get("generation_id") || "";

    function updateSearchParams(key: string, value: string) {
        const searchParams = new URLSearchParams($page.url.searchParams);
        searchParams.set(key, value);
        goto(`?${searchParams.toString()}`, {
            noScroll: true
        });
    };

    function sumbitSearch() {
        searchString = form.searchString;
    }
</script>




<!-- <div class="layout"> -->
    


    <div class="generations">
        <button 
            class="generation"
            class:active={selectedGenerationID === "all"} 
            on:click={() => updateSearchParams("generation_id", "all")}
            >
                All
        </button>
        {#each generations as generation (generation.id)}
            <button 
                class="generation"
                class:active={selectedGenerationID === generation.id.toString()} 
                on:click={() => updateSearchParams("generation_id", generation.id.toString())}
            >
                {generation.main_region}
            </button>
        {/each}
    </div>

    <form on:submit|preventDefault={sumbitSearch} class="search-form">
        <input type="text" bind:value={form.searchString} placeholder="Pokemon Name"> 
        <input type="submit" value="Search">
    </form>
    

    <div class="pokemons">

        {#each selectedPokemons as pokemon (pokemon.id)} 

            <PokemonComponent 
                pokemon={pokemon} 
            />

        {/each}

    </div>

    

<!-- </div> -->




<style>
    /* .layout {
        max-width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    } */

    .generations {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .generation {
        margin: 10px;
        padding: 5px 10px;
        border: 2px solid #333;
        border-radius: 5px;
        background-color: #f9f9f9;
        color: #333;
        cursor: pointer;
    }

    .generation:hover {
        background-color: #e8e8e8;
    }

    .generation.active {
        background-color: #333;
        color: #fff;
    }

    .generation.active:hover {
        background-color: #444;
    }

    

    .search-form {
        margin: 20px 0;
    }

    .search-form input[type="text"] {
        padding: 5px 10px;
        border: 1px solid #888;
        border-radius: 5px;
        width: 200px;
    }

    .search-form input[type="submit"] {
        padding: 4px 12px; 
        border: 1px solid #888;
        border-radius: 5px;
        background-color: #333;
        color: #fff;
        cursor: pointer;
    }

    .pokemons {
        width: 80%;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>

