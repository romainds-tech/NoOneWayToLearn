<script lang="ts">
    import {Button, Card} from "flowbite-svelte";
export let content: string;
export let state: any;

</script>

{#if typeof state === "undefined"}
    <Card>
        <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">{content}</p>
        <div class="flex justify-between mt-3">
            <Button color="red">Refuser</Button>
            <Button color="green">Valider</Button>
        </div>
    </Card>
{/if}
