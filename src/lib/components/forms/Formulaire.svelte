<script lang="ts">
    import {Label, Input, NumberInput, Select, GradientButton, Button, Modal} from "flowbite-svelte";
    import {supabase} from "../../../supabaseClient";
    import type {Tables} from "$lib/database.types";
    import {sessionStore} from "$lib/store/sessionStore";
    import {Auth} from "@supabase/auth-ui-svelte";
    import {ThemeSupa} from "@supabase/auth-ui-shared";

    export let name = "Romain"

    let form = {
        age: 23,
        name: name,
        email: "38rom1+test@gmail.com",
        password: "",
        cursus: "tech",
        side_project: "sometimes",
        open_source: "sometimes"
    }

    let cursus = [
        { value: "tech", name: 'Technique' },
        { value: "engineer", name: 'Ingénieur' }
    ];

    let forms_value = [
        { value: "never", name: 'Jamais' },
        { value: "sometimes", name: 'Quelques fois' },
        { value: "occasionally", name: 'Occasionnellement' },
        { value: "lot", name:"Beaucoup"}
    ];

    let submit = async (event) => {
        event.preventDefault();
        await supabase.auth.signUp({
            email: form.email,
            password: form.password
        }).then(async (data) => {
            let new_form = {...form, id: data.data.user.id};
            if(new_form.password){
                delete new_form.password;
            }
            await supabase.from('profiles').insert(new_form);
        }).then(async () => {
            clickOutsideModal = true;
        }).catch(() => {
            email_unvalidated = true;
        });
    }

    let name_change = (event) => {
        name = event.target.value;
    }

    let clickOutsideModal = false;
    let email_unvalidated = false;

</script>


<form class="relative" on:submit={submit}>

    <div class="flex">
        <Label class="p-5 w-8/12">
            Prénom
            <Input class="mt-2" type="text" bind:value={form.name} placeholder="Prénom" required on:input={name_change} />
        </Label>

        <Label class="p-5 w-4/12">
            Renseigner votre age
            <NumberInput class="mt-2" id="number" bind:value={form.age} required />
        </Label>
    </div>

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


    <Label class="p-5">
        Type de cursus
        <Select class="mt-2" items={cursus} bind:value={form.cursus} placeholder="Choissiser votre type de cursus" required />
    </Label>

    <Label class="p-5">
        Réalisez-vous des sides projects ?
        <Select class="mt-2" items={forms_value} bind:value={form.side_project} placeholder="Choissiser la fréquence de réalisation de vos sides-projects" required />
    </Label>

    <Label class="p-5">
        Contribuez-vous à des projets open-source ?
        <Select class="mt-2" items={forms_value} bind:value={form.open_source} placeholder="Choissiser la fréquence de vos contributions à des projets open-source" required />
    </Label>

    <div class="w-full flex flex-row-reverse">
        <GradientButton type="submit" class="m-5" color="purpleToBlue">Analyser</GradientButton>
    </div>



    <Modal title="Information" bind:open={clickOutsideModal} autoclose outsideclose>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Merci d'avoir pris le temps de remplir le formulaire !</p>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Il vous reste une dernière étape pour accèder à votre compte, valider votre addresse email !</p>
        <Button class="w-full" color="alternative">Fermer</Button>
    </Modal>

    <Modal title="Information" bind:open={email_unvalidated} autoclose outsideclose>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Merci de valider votre email</p>
        <Button class="w-full" color="alternative">Fermer</Button>
    </Modal>

</form>

