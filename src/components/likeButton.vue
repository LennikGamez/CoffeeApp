<script lang="ts" setup>

    const emit = defineEmits(['click']);
</script>


<template>
    <button @click="emit('click')" type="button">
        <img src="../assets/favorite.svg"/>
    </button>
</template>


<style scoped>
    button{
        border-radius: var(--border-radius);
        outline: none;
        border: none;
        padding: 7px;
        aspect-ratio: 1;

        background-color: hsl(12, 50%, 50%, 0.5);

        font-size: larger;
        display: flex;
    }
</style>