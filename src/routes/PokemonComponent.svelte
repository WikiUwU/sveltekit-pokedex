<script lang="ts">
    import type { IndexPokemon } from "./+page";

    export let pokemon: IndexPokemon;

    function capitalize(string: string) {
        const stringChars: string[] = string.split("");
        stringChars[0] = stringChars[0].toUpperCase();
        return stringChars.join("");
    }

    function catchPokemon(pokemon_id: string) {
        console.log(pokemon_id);
    }
</script>



<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="pokemon">
    
    <div on:click={() => catchPokemon(pokemon.id)}>
        <div class="pokemon-content">
            <img src={pokemon.image} alt="Pokemon image of {capitalize(pokemon.name)}">
            <p>{capitalize(pokemon.name)}</p>
        </div>
        
        <div class="pokemon-id">
            {pokemon.id}
        </div>
    </div>

</div> 




<style>
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

    .pokemon-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }

    .pokemon-content p {
        margin: 0;
    }

    .pokemon-id {
        position: absolute;
        top: 8px;
        left: 8px;
        font-size: 0.8rem;
        color: #888;
    }
</style>
