<script lang="ts" setup>
    import { onMounted, ref } from 'vue';


    const props = defineProps({
            name: String,
            fetchFunction: Function
        });

    const emit = defineEmits(['selected']);

    let data = ref([]);

    onMounted(async () => {
        if (!props.fetchFunction) return;        
        data.value = await props.fetchFunction();
    });

</script>


<template>
    <select required :name="props.name" @input="emit('selected')">
        <option v-for="option in data" :value="option">{{ option }}</option>
    </select>
</template>


<style scoped>

</style>