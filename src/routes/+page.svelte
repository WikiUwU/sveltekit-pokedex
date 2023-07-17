<script lang="ts">
    import { generations } from './generations'

    console.log(generations)
</script>

{#each generations as generation (generation.id)}
    <div>
        <h1>{generation.name}</h1>
        <p>Main region: {generation.main_region}</p>
        <p>Games: {generation.games.join(', ')}</p>

    </div>
{/each}

<style>
</style>