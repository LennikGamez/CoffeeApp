<script lang="ts" setup>

    import Bohne from '../components/BohnenComponent.vue'
    import AddButton from '../components/AddButton.vue';
    import { Bohne as BohnenType } from '../DB-Models';

    const mockDataBohne: Array<BohnenType> = [
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

    ]
</script>


<template>
    <h1>Bohnen</h1>
    <Bohne v-for="(item, index) in mockDataBohne" :key="index"
        :data = "item"
        :editMode="false"
    />

    <AddButton />
</template>


<style>

</style>