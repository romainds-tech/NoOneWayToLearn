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
    import {GradientButton} from "flowbite-svelte";
    import ChartLearning from "$lib/components/ChartLearning.svelte";

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
        // fetch http://localhost:5050/predict?age=31&cursus=2&side_project=3&open_source=4
        // with profile values

        console.log("Profile : ", profile)

        let url = `http://localhost:5050/predict?age=${profile.age}&cursus=${profile.cursus}&side_project=${profile.side_project}&open_source=${profile.open_source}`
        fetch(url)
            .then(response => response.json())
            .then(res => {
                data = res[1].map((x: number) => x*100)
            })
    }


</script>

<div>
    Bonjour  {profile?.name || ""} ! Bienvenue sur ton dashboard. <br>

    Découvrir ton type d'apprentissage informel
    <GradientButton type="button" class="right-4 absolute" color="purpleToBlue" on:click={predict}>Découvrir</GradientButton>

    {#if data}
        <ChartLearning bind:serie={data}></ChartLearning>
    {/if}
</div>