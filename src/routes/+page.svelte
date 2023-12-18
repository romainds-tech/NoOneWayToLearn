<script lang="ts">
    /*
    import { onMount } from 'svelte';
    import {supabase} from "../supabaseClient";
    import type {Tables} from "$lib/database.types";

    let items: Tables<'test'>[] = []
    onMount(async () => {
        const response = await supabase.from('test').select().returns<Tables<'test'>[]>();
        if (response.data !== null){
                items = response.data
        } else{
            console.log("error", response)
        }
    })

    {#each items as item}
            <div>{item.created_at}</div>
        {/each}

     */

    import {sessionStore} from "$lib/store/sessionStore";
    import {onMount} from "svelte";
    import {supabase} from "../supabaseClient";
    import type {Tables} from "$lib/database.types";
    import {get} from "svelte/store";
    import {Card, GradientButton} from "flowbite-svelte";
    import ChartLearning from "$lib/components/ChartLearning.svelte";
    import Learn from "$lib/Learn.svelte";
    import Undraw from "$lib/Undraw.svelte";

    let profile: Tables<"profiles">

    onMount(async () => {
        const response = await supabase.from('profiles').select().eq("id", get(sessionStore).user.id).returns<Tables<'profiles'>>();
        if (response.data !== null){
            profile = response.data[0]
        } else{
            console.log("error", response)
        }
    })

    let data: []

    let predict = () => {
        let url = `http://localhost:5050/predict?age=${profile.age}&cursus=${profile.cursus}&side_project=${profile.side_project}&open_source=${profile.open_source}`

        fetch(url)
            .then(response => response.json())
            .then(res => {
                data = res[1].map((x: number) => x*100)
            })
    }


</script>

<div>
    <div class="z-10 relative">
        <p class="text-xl">
            Bonjour {profile?.name || ""} ! Bienvenue sur ton dashboard. <br>
            Découvre ton type d'apprentissage informel
        </p>

        <GradientButton type="button" class="mt-5" color="purpleToBlue" on:click={predict}>Prédire</GradientButton>

        <div class="flex">
            {#if data}
                <ChartLearning bind:serie={data}></ChartLearning>
            {/if}

            <Card class="mt-10 rounded-3xl m-5 h-fit" href="/exercice">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">S'exercer !</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
                    Réaliser les projets mis à disposition est la clé de la réussite !
                    L'exercice régulier vous permettra de développer vos compétences et de maîtriser de nouvelles techniques.
                    Que vous soyez un débutant cherchant à apprendre ou un expert cherchant à se perfectionner,
                    l'exercice est essentiel pour progresser dans votre domaine. Prenez du temps chaque jour pour pratiquer
                    et vous verrez des résultats remarquables !
                </p>
            </Card>

        </div>
    </div>


    <Learn></Learn>
    <Undraw></Undraw>
</div>