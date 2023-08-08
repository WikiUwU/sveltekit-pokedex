<script lang="ts">
    import { page } from "$app/stores";
    import { caughtPokemons } from "$lib/stores";
</script>




<nav class="navbar">
    <a href="/" class:active={$page.url.pathname === "/"}>Home</a>
    <a href="/my-pokemons" class:active={$page.url.pathname === "/my-pokemons"}>My Pokemons ({$caughtPokemons.length})</a>
</nav>

<div class="content-wrapper">
    <slot />
</div>




<style>
    .navbar {
        display: flex;
        justify-content: space-between;
        background-color: #333;
        padding: 10px;
    }

    .navbar a {
        color: #fff;
        text-decoration: none;
        padding: 5px 10px;
    }

    .navbar a:hover {
        color: #bbb;
    }

    .navbar a.active {
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .content-wrapper {
        max-width: 90%;
        margin: 0 auto;
        width: 1200px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    /* override standard 8px margin of html body */
    :global(body) {
        margin: 0;
    }
</style>