<script lang="ts" setup>
import { onMounted } from 'vue';


    function toggleColorMode(){
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('colorMode', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    }

    onMounted(() => {
        if(localStorage.getItem('colorMode') === 'dark'){
            document.documentElement.classList.add('dark');
        }
    });

</script>


<template>
    <div id="wrapper" @click="toggleColorMode">
        <img src="../assets/color-schemes/lightmode.svg" id="lightmode">
        <img src="../assets/color-schemes/darkmode.svg" id="darkmode">
    </div>
</template>

<style scoped>
    #wrapper{
        user-select: none;
        position: absolute;
        top: 0;
        right: 0;
        font-size: 5rem;
        aspect-ratio: 1;
    }

    #wrapper:hover{
        cursor: pointer;
    }

    #lightmode, #darkmode{
        width: 100%;
        height: 100%;
        display: block;

        transition: transform 0.4s;
    }

    #wrapper:hover #lightmode, #wrapper:hover #darkmode{
        transform: rotate(360deg);
    }

    html.dark #lightmode{
        display: none;
    }
    html:not(.dark) #darkmode{
        display: none;
    }
</style>