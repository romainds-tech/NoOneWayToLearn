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
    let exerc = false

    onMount(async () => {
        const response = await supabase.from('profiles').select().eq("id", get(sessionStore).user.id).returns<Tables<'profiles'>>();
        if (response.data !== null){
            profile = response.data[0]

            let exercices = await supabase.from('exercice').select().eq("profile_id", profile.id).returns<Tables<'exercice'>>();
            console.log('exercices : ', exercices)
            // si longueur de exercices = 0 alors on génère les exercices
            if (exercices.data.length > 0){
                console.log('OK')
                exerc = true
            }
        } else{
            console.log("error", response)
        }
    })


    let data: []


    let predict = () => {

        let cursus_equivalent = {
            "tech": "technique",
            "engineer": "ingénieur"
        }

        let appinfo_equivalent = ['Expérience pro', 'Side Project', 'Open Source', 'Mentorat']

        let url_prediction = `http://localhost:5050/predict?age=${profile.age}&cursus=${profile.cursus}&side_project=${profile.side_project}&open_source=${profile.open_source}`

        console.log("PROFILE :", profile)

        fetch(url_prediction)
            .then(response => response.json())
            .then(res => {
                data = res[1].map((x: number) => x*100)
                console.log("DATA :", data)

                if(exerc){
                    return
                }

                let highestIndex = data.indexOf(Math.max(...data));
                let url_generate_exercice = `http://localhost:5050/generate_exercices?exp=${profile.age-20}&cursus=${cursus_equivalent[profile.cursus]}&appinf=${appinfo_equivalent[highestIndex]}&temoi=${profile.temoignage}`

                fetch(url_generate_exercice)
                    .then(response => response.json())
                    .then(async res => {
                        console.log("EXERCICE : ", res)
                        let all_exercices = res.map(exe => ({
                            exercice_content: exe,
                            profile_id: profile.id
                        }));

                        console.log("ALL EXERCICES : ", all_exercices)

                        await supabase.from('exercice').insert(all_exercices).then(() =>{
                            exerc = true
                            console.log("INSERTED")
                        })

                    })

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
                {#if exerc}
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
                {/if}




        </div>
    </div>


    <Learn></Learn>
    <Undraw></Undraw>
</div>