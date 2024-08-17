<script lang="ts" setup>

    import Bohne from '../components/BohnenComponent.vue'
    import AddButton from '../components/AddButton.vue';
    import { Bohne as BohnenType } from '../DB-Models';
    import { Ref, ref } from 'vue';

    const mockDataBohne: Ref<BohnenType[]> = ref([
        {
            Name: "Espresso Koffeinfrei",
            Röster: "Kaffeemann umme Ecke",
            Website: "https://www.kaffeemann.de/",
            Notiz: "Espresso Koffeinfrei. Originale Zutaten. Keine Sonderbehandlungen.",
            VorhandendeMenge: 0
        },

        {
            Name: "II Fortunato",
            Röster: "Kaffeemann umme Ecke",
            Website: "https://www.kaffeemann.de/",
            Notiz: "Fortunato. Originale Zutaten. Keine Sonderbehandlungen.",
            VorhandendeMenge: 0
        }

    ])


    function addBohnenData(data: BohnenType) {
        
        mockDataBohne.value.push(data);
        console.log(mockDataBohne);
    }
</script>


<template>
    <h1>Bohnen</h1>
    <Bohne v-for="(item, index) in mockDataBohne" :key="index"
        :data = "item"
        :editMode="false"
    />

    <AddButton @click="addBohnenData({Name: 'Neue Bohne', Röster: 'Röster', Website: 'Website', Notiz: 'Notiz', VorhandendeMenge: 0} as BohnenType)" />
</template>


<style>

</style>