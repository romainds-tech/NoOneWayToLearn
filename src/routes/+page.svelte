<script lang="ts">
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
</script>
<h1>Real World Problems</h1>
{#each items as item}
    <div>{item.created_at}</div>
{/each}


