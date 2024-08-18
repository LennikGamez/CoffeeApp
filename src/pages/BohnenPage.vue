<script lang="ts" setup>

    import Bohne from '../components/BohnenComponent.vue'
    import AddButton from '../components/AddButton.vue';
    import { Bohne as BohnenType } from '../DB-Models';
    import { Ref, ref } from 'vue';
    import APIConnector from '../util/APIConnector';

    const bohnenDataRef: Ref<BohnenType[]> = ref([] as BohnenType[]);
    
    
    function addBohnenData(data: BohnenType) {      
        bohnenDataRef.value.push(data);
    }

    function fetchData() {
        APIConnector.getBohnen().then((data) => bohnenDataRef.value = data);
    }

    fetchData();

</script>


<template>
    <h1>Bohnen</h1>
    <Bohne v-for="(item, index) in bohnenDataRef" :key="index"
        :data = "item"
        :editMode="false"
    />

    <AddButton @click="addBohnenData({Name: 'Neue Bohne', Röster: 'Röster', Website: 'Website', Notiz: 'Notiz', VorhandendeMenge: 0} as BohnenType)" />
</template>


<style>

</style>