<script lang="ts" setup>

    const emit = defineEmits(['click']);
</script>


<template>
    <button @click="emit('click')">
        🤎
    </button>
</template>


<style scoped>

</style>