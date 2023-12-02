<script lang="ts">
    import "../app.pcss";
    import {page} from "$app/stores";
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
    $: activeUrl = $page.url.pathname
</script>
<Navbar>
    <NavBrand href="/">
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">NoOneWayToLearn</span>
    </NavBrand>
    <NavHamburger/>
    <NavUl {activeUrl} >
        <NavLi href="/">Home</NavLi>
        <NavLi href="/second">Second</NavLi>
        <NavLi href="/third">Third</NavLi>
    </NavUl>
</Navbar>
<slot></slot>