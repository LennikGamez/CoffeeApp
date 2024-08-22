<script lang="ts" setup>
    import { ref } from 'vue';
    import APIConnector from '../util/APIConnector';
    import BrühungComponent from '../components/BrühungComponent.vue';


    const brews = ref([]);

    function fetchBrews(){
        fetch(APIConnector.endpoint("/brews")).then(resp => resp.json()).then(data => brews.value = data);
    }


    fetchBrews();
</script>

<template>

    <div id="brews-page">
        <h1>Brühungen</h1>
        <BrühungComponent v-for="brew in brews" 
            :data = "brew"
        />
    </div>
</template>