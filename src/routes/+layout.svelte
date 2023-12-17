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
    import type {Tables} from "$lib/database.types";
    import {get} from "svelte/store";
    import Formulaire from "$lib/components/forms/Formulaire.svelte";

    $: activeUrl = $page.url.pathname

    let name:string = ''

    let form = {
        email: '38rom1+test@gmail.com',
        password: ''
    }

    onMount(() => {
        supabase.auth.getSession().then(({ data }) => {
            sessionStore.set(data.session);
        });

        supabase.auth.onAuthStateChange((_event, _session) => {
            sessionStore.set(_session);
        });

        if(get(sessionStore)){
            supabase.from('profiles').select(get(sessionStore)?.user).returns<Tables<'profiles'>>().then(({ data }) => {
                console.log("DATA :", data)
            })
        }
    });

    let login = async () => {
        await supabase.auth.signInWithPassword({
            email: form.email,
            password: form.password
        })
    }

    let state = true

</script>
<Navbar>
    <NavBrand href="/">
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">No One Way To Learn</span>
    </NavBrand>
    <NavHamburger/>
    <NavUl {activeUrl} >
        <NavLi href="/">Home</NavLi>
    </NavUl>
</Navbar>

<div class="w-full">
    <div class="relative w-10/12 m-auto">
        {#if !$sessionStore}
            <span class="text-xl font-semibold">Bonjour {name} ! No One Way To Learn vous aide à déterminer le mode d'apprentissage informel le plus efficace pour vous.</span>
            <p>Grâce à l'IA et ces quelques questions nous allons déterminer le type d'apprentissage informel le plus efficace selon votre profil</p>

            <ButtonGroup class="w-6/12 m-auto flex mt-10 mb-5" >
                <Button checked={state ? true : false} on:click={() => state = !state} class="w-full">Inscription</Button>
                <Button checked={state ? false : true} on:click={() => state = !state} class="w-full">Connexion</Button>
            </ButtonGroup>

            {#if state}
                <Formulaire bind:name={name}></Formulaire>
            {:else}
                <form class="mb-6 relative" on:submit={login}>
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
                    <GradientButton type="submit" class="right-5 absolute" color="purpleToBlue">Connexion</GradientButton>
                </form>
            {/if}

        {:else}
            <slot></slot>
        {/if}
    </div>
</div>