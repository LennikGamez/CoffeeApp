<script lang="ts" setup>

    const emit = defineEmits(['click']);
</script>


<template>
    <button @click="emit('click')" type="button">
        🤎
    </button>
</template>


<style scoped>
    button{
        border-radius: 50px;
        outline: none;
        border: none;
        padding: 12px;
        aspect-ratio: 1;

        background-color: hsl(12, 50%, 50%, 0.5);

        font-size: larger;
    }
</style>