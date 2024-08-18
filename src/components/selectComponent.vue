<script lang="ts" setup>
    import { onMounted, ref } from 'vue';


    const props = defineProps({
            fetchFunction: Function
        });

    let data = ref([]);

    onMounted(async () => {
        if (!props.fetchFunction) return;        
        data.value = await props.fetchFunction();
    });

</script>


<template>
    <select>
        <option v-for="option in data" :value="option">{{ option }}</option>
    </select>
</template>


<style scoped>

</style>