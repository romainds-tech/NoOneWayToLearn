<script lang="ts">
    import {get} from "svelte/store";
    import {sessionStore} from "$lib/store/sessionStore";
    import {supabase} from "../../supabaseClient";
    import type {Tables} from "$lib/database.types";
    import {onMount} from "svelte";

    let profile: Tables<"profiles">

    onMount(async () => {
        const response = await supabase.from('profiles').select().eq("id", get(sessionStore).user.id).returns<Tables<'profiles'>>();
        if (response.data !== null){
            profile = response.data[0]
        } else{
            console.log("error", response)
        }
    })
</script>

<span class="text-xl font-semibold">{profile?.name || ""}, la page d'exercice est encore en construction ! Elle sera bientôt disponible</span>
<p>Tu retrouvera ici tous les exercices adapté à ton type d'apprentissage</p>