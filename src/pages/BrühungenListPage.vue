<script lang="ts" setup>
    import { ref } from 'vue';
    import APIConnector from '../util/APIConnector';
    import BrühungComponent from '../components/BrühungComponent.vue';
import { Brühung } from '../DB-Models';


    const brews = ref<Brühung[]>([]);

    function fetchBrews(){
        fetch(APIConnector.endpoint("/brews")).then(resp => resp.json()).then(data => brews.value = data);
    }


    fetchBrews();

    function deleteBrew(id: number){
        APIConnector.removeBrühung(id);
        brews.value = brews.value.filter((brew) => brew.BrühID !== id);
    }
</script>

<template>

    <div id="brews-page">
        <h1>Brühungen</h1>
        <div id="brew-list">
            <BrühungComponent v-for="brew in brews" 
                :data = "brew"
                @delete="deleteBrew"
            />
        </div>
    </div>
</template>


<style>
    #brew-list {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        align-items: start;
        justify-content: center;
        padding-bottom: 32px;
    }
</style>