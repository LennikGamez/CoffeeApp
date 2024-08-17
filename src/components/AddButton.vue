<script lang="ts" setup>

    const emit = defineEmits(['click']);
</script>


<template>
    <button @click="emit('click')">
        +
    </button>
</template>


<style scoped>
    button {
        border-radius: 50px;
        outline: none;
        border: none;

        padding: 4px 8px;
    }
</style>