<script lang="ts">
    import {page} from "$app/stores";
    export let name:string
    export let isActive:boolean
    export let href:string

</script>
<a href={$page.url.origin}{href}>
    <div class='navbaritem {isActive ? "navbaritemActive" : "navbaritemNonActive"}'>
        {name}
    </div>
</a>
<style>
    a{
        text-decoration: none;
    }

    .navbaritem{
        width: auto;
        height: 30px;
        line-height: 30px;
        color: black;
        display: inline-block;
        border-radius: 10px 10px 0px 0px;
        padding: 10px 15px 10px 15px;
        transition-duration: 0.5s;
    }

    .navbaritem:hover{
        background-color: #fff;
        cursor: pointer;
        animation: 0.5s;
    }

    .navbaritemNonActive{
        background-color: #dedede;
    }
    .navbaritemActive{
        background-color: #fff;
    }
</style>