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

    let profile: Tables<"profiles">

    onMount(async () => {
        const response = await supabase.from('profiles').select().eq("id", get(sessionStore).user.id).returns<Tables<'profiles'>>();
        if (response.data !== null){
            console.log(response.data[0])
            profile = response.data[0]
        } else{
            console.log("error", response)
        }
    })

</script>

Bonjour  {profile?.name || ""} ! Bienvenue sur ton dashboard.