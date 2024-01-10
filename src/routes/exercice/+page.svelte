<script lang="ts">
    import {get} from "svelte/store";
    import {sessionStore} from "$lib/store/sessionStore";
    import {supabase} from "../../supabaseClient";
    import type {Tables} from "$lib/database.types";
    import {onMount} from "svelte";
    import Proposal from "$lib/components/exercice/Proposal.svelte";

    import {Table, TableBody, TableBodyCell, TableBodyRow} from "flowbite-svelte"

    let profile: Tables<"profiles">
    let exercices: Tables<"exercice">[] = []

    onMount(async () => {
        const response = await supabase.from('profiles').select().eq("id", get(sessionStore).user.id).returns<Tables<'profiles'>>();
        if (response.data !== null){
            profile = response.data[0]
            let resp = await supabase.from('exercice').select().eq("profile_id", profile.id).returns<Tables<'exercice'>[]>();
            exercices = resp.data
            console.log(exercices)
        } else{
            console.log("error", response)
        }
    })
</script>

<span class="text-xl font-semibold">{profile?.name || ""}, bienvenue sur la page d'exercice</span>
<p>Tu trouvera ici tous les exercices adapté à ton type d'apprentissage informel</p>



<div class="mt-5 pb-5">
    <div class="text-xl font-semibold mb-5">Liste des exercices disponibles</div>
    <Table hoverable={true}>
        <TableBody>
            {#each exercices as exercice}
                {#if exercice.exercice_validation === true}
                    <TableBodyRow>
                        <TableBodyCell tdClass="pl-5">{exercice.exercice_content}</TableBodyCell>
                        <TableBodyCell>
                            <a href="/tables" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Accéder</a>
                        </TableBodyCell>
                    </TableBodyRow>
                {/if}
            {/each}
        </TableBody>
    </Table>
</div>

<div class="grid grid-cols-2 gap-4 mt-5">
    {#each exercices as exercice}
        <Proposal content={exercice.exercice_content} state={exercice.validation}/>
    {/each}
</div>




