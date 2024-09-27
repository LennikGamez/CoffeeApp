<script lang="ts" setup>
import KeyboardMode from './components/Keyboard/keyboard-mode.vue';
import Keyboard from './components/Keyboard/keyboard.vue';
import Navbar from './components/Navbar.vue';
import ColorScheme from './components/color-scheme.vue';
import { ref } from 'vue';

const keyboard = ref<typeof Keyboard | null>(null);

  window.addEventListener("focusin", (event: Event)=>{
    if(!document.documentElement.classList.contains("keyboard")) return;
    if((event.target as HTMLElement).tagName === "INPUT"){
      // add visible clsas
      keyboard.value?.show()
    }
  })

  window.addEventListener("focusout", (event: Event)=>{
    if((event.target as HTMLElement).tagName === "INPUT"){
      // remove visible class
      keyboard.value?.hide()
    }
  })
</script>

<template>
    <Keyboard ref="keyboard"/>
    <RouterView class="content"/>
    <Navbar class="navbar"/>
    <ColorScheme/>
    <KeyboardMode/>
</template>

<style scoped>

  .content{
    flex: 1;
    overflow-y: auto;
  }

</style>
