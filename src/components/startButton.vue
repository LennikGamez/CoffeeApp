<script lang="ts" setup>
import { Brühung } from '../DB-Models';
import APIConnector from '../util/APIConnector';


    function start(formData: FormData) {
        const brühung: Brühung = {
            BrühID: -1,
            BohnenName: formData.get("bohne") as string,
            BrühmethodenName: formData.get("method") as string,
            GetränkeMenge: parseInt(formData.get("getränkemenge") as string),
            Mahlgrad: parseInt(formData.get("mahlgrad") as string),
            BohnenMenge: parseInt(formData.get("bohnenmenge") as string),
            Brühtemperatur: parseInt(formData.get("brühtemperatur") as string),
            zubereitet: 0,
            Notiz: ""
        }
        appendBrühung(brühung);
        reduceBeans(brühung.BohnenName, brühung.BohnenMenge);

        return true;
    }

    function appendBrühung(b: Brühung) {
        APIConnector.doesBrühungExist(b);
    }

    function reduceBeans(name: string, menge: number) {
        APIConnector.reduceBeanCount(name, menge);
    }

    defineExpose({start})
</script>


<template>
    <input type="submit">
    </input>
</template>


<style scoped>
    button {
        border-radius: 50px;
        outline: none;
        border: none;
    }
</style>