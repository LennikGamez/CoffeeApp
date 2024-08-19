<script lang="ts" setup>
import { Brühung } from '../DB-Models';
import APIConnector from '../util/APIConnector';


    function start() {

        appendBrühung();
        reduceBeans();
    }

    function appendBrühung() {
        APIConnector.addBrühung({} as Brühung);
    }

    function reduceBeans(){

    }
</script>


<template>
    <button @click="start">
        Starte Bezug
    </button>
</template>


<style scoped>
    button {
        border-radius: 50px;
        outline: none;
        border: none;
    }
</style>