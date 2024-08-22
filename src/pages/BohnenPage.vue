<script lang="ts" setup>

    import Bohne from '../components/BohnenComponent.vue'
    import AddButton from '../components/AddButton.vue';
    import { Bohne as BohnenType } from '../DB-Models';
    import { Ref, ref } from 'vue';
    import APIConnector from '../util/APIConnector';

    const bohnenDataRef: Ref<BohnenType[]> = ref([] as BohnenType[]);
    
    
    function addBohnenData(data: BohnenType) {      
        bohnenDataRef.value.push(data);

        APIConnector.addBohnen(data).then(() => fetchData());
    }

    function fetchData() {
        APIConnector.getBohnen().then((data) => bohnenDataRef.value = data);
    }

    function deleteBohne(data: BohnenType) {
        bohnenDataRef.value = bohnenDataRef.value.filter((bohne) => data !== bohne);
    }

    fetchData();

</script>


<template>
    <div id="bohnen-page">
        <h1>Bohnen</h1>
        <div id="bohnen-list">
            <Bohne v-for="(item, index) in bohnenDataRef" :key="index"
                :data = "item"
                :editMode="false"
                @deleted="deleteBohne(item)"
            />
        </div>

        <AddButton id="add" @click="addBohnenData({Name: 'Neue Bohne', Röster: '', Website: '', Notiz: '', VorhandendeMenge: null} as BohnenType)" />
    </div>
</template>


<style scoped>
    #bohnen-page{
        display: flex;
        flex-direction: column;
    }
    #bohnen-list{
        display: flex;
        flex-wrap: wrap;
        gap: 32px;
        align-items: center;
        justify-content: center;
        
    }

    #add{
        align-self: center;

        width: fit-content;
        padding: 16px;
        aspect-ratio: 1;

        background-color: var(--secondary-color);
        margin: 16px;
    }
</style>