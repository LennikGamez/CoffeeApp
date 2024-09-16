<script lang="ts" setup>
import { Brühung } from '../DB-Models';
import APIConnector from '../util/APIConnector';


    function start(formData: FormData) {
        const brühung: Brühung = {
            BrühID: -1,
            BohnenName: formData.get("bohne") as string,
            BrühmethodenName: formData.get("method") as string,
            Getränkemenge: parseFloat(formData.get("Getränkemenge") as string),
            Mahlgrad: parseFloat(formData.get("mahlgrad") as string),
            Bohnenmenge: parseFloat(formData.get("Bohnenmenge") as string),
            Brühtemperatur: parseFloat(formData.get("brühtemperatur") as string),
            zubereitet: 0,
            Notiz: ""
        }
        appendBrühung(brühung);
        reduceBeans(brühung.BohnenName, brühung.Bohnenmenge);

        return true;
    }

    async function appendBrühung(b: Brühung) {
        const data = await APIConnector.doesBrühungExist(b);
        // Wenn eine Brühung dieser Art existiert wird das zubereitet Feld um 1 erhöht
        if (data) {
            APIConnector.addToBrühung(data);
            return true;
        }else{
            // ansonsten neue Brühung anlegen
            b.zubereitet = 1;
            APIConnector.addBrühung(b);
            return false;
        }
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
