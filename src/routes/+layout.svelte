<script lang="ts">
    import "../app.pcss";
    import {page} from "$app/stores";
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
        Label,
        Input,
        GradientButton,
        ButtonGroup, Button
    } from 'flowbite-svelte';
    import {onMount} from "svelte";
    import {supabase} from "../supabaseClient";
    import {sessionStore} from "$lib/store/sessionStore";
    import Formulaire from "$lib/components/forms/Formulaire.svelte";
    import Undraw from "$lib/Undraw.svelte";
    import Learn from "$lib/Learn.svelte";

    let state = true
    let name:string = ''
    let form = {
        email: '38rom1+test@gmail.com',
        password: ''
    }

    $: activeUrl = $page.url.pathname

    let login = async () => {
        await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password
        })
    }

    let logout = async () => {
        await supabase.auth.signOut()
    }

    onMount(() => {
        supabase.auth.getSession().then(({ data }) => {
            sessionStore.set(data.session);
        });
        supabase.auth.onAuthStateChange((_event, _session) => {
            sessionStore.set(_session);
        });
    });

</script>
<Navbar>
    <NavBrand href="/">
        <span class="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">No One Way To Learn</span>
    </NavBrand>
    <NavHamburger/>
    <NavUl {activeUrl} ulClass="flex items-center h-20 p-10 ">
        {#if $sessionStore}
            <NavLi class="m-5" href="/">Accueil</NavLi>
            <Button class="m-5 active" color="alternative"  pill on:click={logout} >Déconnexion</Button>
        {/if}
    </NavUl>
</Navbar>

{#if !$sessionStore}
    <div class="w-full bg-slate-100 h-full pt-20">
        <div class=" w-8/12 m-auto p-10 bg-white rounded-2xl z-10 relative">

            {#if state}
                <span class="text-xl font-semibold">Bonjour {name} ! No One Way To Learn vous aide à déterminer le mode d'apprentissage informel le plus efficace pour vous.</span>
                <p>Grâce à l'IA et ces quelques questions nous allons déterminer le type d'apprentissage informel le plus efficace selon votre profil</p>
            {/if}

            <ButtonGroup class="w-6/12 m-auto flex mt-10 mb-5" >
                <Button checked={state ? true : false} on:click={() => state = !state} class="w-full">Inscription</Button>
                <Button checked={state ? false : true} on:click={() => state = !state} class="w-full">Connexion</Button>
            </ButtonGroup>

            {#if state}
                <Formulaire bind:name></Formulaire>
            {:else}
                <form class="relative" on:submit={login}>
                    <span class="text-xl font-semibold block p-5 mt-10">Vous avez déjà un compte ?</span>

                    <div class="flex">
                        <Label class="p-5 w-full">
                            Email
                            <Input class="mt-2" type="email" bind:value={form.email} placeholder="email@domain.com" required />
                        </Label>
                        <Label class="p-5 w-full">
                            Mot de passe
                            <Input class="mt-2" type="password" bind:value={form.password} required />
                        </Label>
                    </div>

                    <div class="w-full flex flex-row-reverse">
                        <GradientButton type="submit" class="m-5" color="purpleToBlue">Connexion</GradientButton>
                    </div>

                </form>
            {/if}
        </div>

        <Learn></Learn>
        <Undraw></Undraw>
    </div>

{:else}
    <div class="w-full bg-slate-100 h-fit">
        <div class="w-8/12 m-auto pt-20">
            <slot></slot>
        </div>
    </div>
{/if}

<style>
    @import url('https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,600;1,400&display=swap');

    :global(.active:hover){
        color:red !important;
    }

    :global(.index){
        z-index: 1;
    }
</style>
