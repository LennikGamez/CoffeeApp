<script lang="ts" setup>
    import { ref } from 'vue';
    import APIConnector from '../util/APIConnector';


    const brews = ref([]);

    function fetchBrews(){
        fetch(APIConnector.endpoint("/brews")).then(resp => resp.json()).then(data => brews.value = data);
    }


    fetchBrews();
</script>

<template>

    <div id="brews-page">
        <h1>Brühungen</h1>
        <h4 v-for="brew in brews">{{ brew }}</h4>
    </div>
</template>