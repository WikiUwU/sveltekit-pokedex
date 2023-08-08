<script lang="ts">
    import { caughtPokemons } from "$lib/stores";
    import PokemonComponent from "../PokemonComponent.svelte";

    
</script>

<h1>My Pokemons</h1>


<div class="pokemons">

    {#each $caughtPokemons as pokemon}
        <PokemonComponent pokemon={pokemon}/>
    {/each}

</div>


<style>
    .pokemons {
        width: 80%;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>
