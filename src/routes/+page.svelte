<script lang="ts">
    import type { PageData } from './$types';
    import { generations } from './generations'

    export let data: PageData;

    function capitalize(string: string) {
        const stringChars: string[] = string.split("");
        stringChars[0] = stringChars[0].toUpperCase();
        return stringChars.join("");
    }

</script>

{#each data.pokemons as pokemon}
    <div>
        <h1>{pokemon.id}. {capitalize(pokemon.name)}</h1>
        <a href={pokemon.url}>{pokemon.url}</a>
    </div>
{/each}

{#each generations as generation (generation.id)}
    <div>
        <h1>{generation.name}</h1>
        <p>Main region: {generation.main_region}</p>
        <p>Games: {generation.games.join(', ')}</p>

    </div>
{/each}

<style>
</style>

