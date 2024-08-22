<script lang="ts" setup>
    import {  RouterLink } from 'vue-router';
</script>


<template>
    <nav>
        <RouterLink to="/" class="route">
            <img src="../assets/navbar/coffeemug.svg"/>
        </RouterLink>
        <RouterLink to="/beans" class="route">
            <img src="../assets/navbar/beans.svg"/>
        </RouterLink>
        <RouterLink to="/brews" class="route">
            <img src="../assets/navbar/history.svg"/>
        </RouterLink>
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
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .route:hover{
        background-color: hsla(30, 100%, 19%, 0.45);
    }

    .route:last-child{
        border-right: none;
    }
    
</style>