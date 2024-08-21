<script setup lang="ts">
  import Navbar from './components/Navbar.vue';
</script>

<template>
    <RouterView class="content"/>
    <Navbar class="navbar"/>
</template>

<style scoped>

  .content{
    flex: 1;
    overflow-y: auto;
  }

</style>
