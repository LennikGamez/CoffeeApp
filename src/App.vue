<script setup lang="ts">
  import Navbar from './components/Navbar.vue';
  import ColorScheme from './components/color-scheme.vue';
</script>

<template>
    <RouterView class="content"/>
    <Navbar class="navbar"/>
    <ColorScheme/>
</template>

<style scoped>

  .content{
    flex: 1;
    overflow-y: auto;
  }

</style>
