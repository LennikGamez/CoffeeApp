<script lang="ts" setup>
    import {  RouterLink } from 'vue-router';
</script>


<template>
    <nav>
        <RouterLink to="/" class="route">Bezug</RouterLink>
        <RouterLink to="/add" class="route">Bohnen</RouterLink>
    </nav>
</template>


<style scoped>

    nav {
        display: flex;
        justify-content: space-around;
        

        width: 100%;
        border-top: 1px solid var(--secondary-text-color);
    }

    .route{
        text-decoration: none;
        color: inherit;
        width: 100%;
        text-align: center;
        border-right: 1px solid var(--secondary-text-color);

        transition: background-color 0.3s;
        padding: 16px;
    }

    .route:hover{
        background-color: hsla(30, 100%, 19%, 0.45);
    }

    .route:last-child{
        border-right: none;
    }
    
</style>