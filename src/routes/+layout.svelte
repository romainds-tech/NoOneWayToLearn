<script lang="ts">
    import {page} from "$app/stores";
    import Navbaritem from "$lib/components/navigation/Navbaritem.svelte";
</script>
<nav>
    <ul>
        <Navbaritem name="Home" isActive={$page.url.pathname === '/' || $page.url.pathname === '/home' || $page.url.pathname === '/#'} href="" />
        <Navbaritem name="Second" isActive={$page.url.pathname === '/second'} href="/second" />
        <Navbaritem name="Third" isActive={$page.url.pathname === '/third'} href="/third" />
    </ul>
</nav>
<slot></slot>
<style>
    nav {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #dedede;
        color: #fff;
        height: auto;
    }
</style>
