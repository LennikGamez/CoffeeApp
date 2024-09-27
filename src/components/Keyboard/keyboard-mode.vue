<script lang='ts' setup>
import { onMounted } from 'vue';

    function toggleKeyboardMode(){
        document.documentElement.classList.toggle('keyboard');
        localStorage.setItem('keyboardMode', document.documentElement.classList.contains('keyboard') ? 'active' : 'notactive');
    }

    onMounted(() => {
        if(localStorage.getItem('keyboardMode') === 'active'){
            document.documentElement.classList.add('keyboard');
        }
    });

</script>


<template>
    <div id="keyboard-mode" @click="toggleKeyboardMode">
        <img src="../../assets/keyboard.svg" id="not-selected"/>
        <img src="../../assets/keyboard-selected.svg" id="selected"/>
    </div>
</template>


<style>
    #keyboard-mode{
        position: absolute;
    }

    html.keyboard #not-selected{
        display: none;
    }
    html:not(.keyboard) #selected{
        display: none;
    }

</style>

