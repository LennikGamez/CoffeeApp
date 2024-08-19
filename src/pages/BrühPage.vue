<script lang="ts" setup>
    import { ref } from 'vue';
import SelectComponent from '../components/selectComponent.vue';
import StartButton from '../components/startButton.vue';
    import APIConnector from '../util/APIConnector';

    const form = ref<HTMLFormElement | null>(null);
    const startButton = ref<typeof StartButton | null>(null);

    function appendBrühung(e: Event){
        e.preventDefault();
        if (!form.value) return;
        const formData = new FormData(form.value);
        startButton.value?.start(formData);
    }
</script>


<template>
    <form id="brüh-page" ref="form" @submit="appendBrühung($event)">
        <div id="selection-area" class="section-wrapper">
            <h1>Brühung</h1>
            <div class="flex-div">
                <SelectComponent name="method" :fetch-function="()=>{return APIConnector.getMethods();}" />
                <SelectComponent name="bohne" :fetch-function="()=>{return APIConnector.getBohnenNames();}"/>
            </div>

        </div>
        <div id="recipe" class="section-wrapper">
            <h1>
                Rezept
            </h1>
            <div id="recipe-inputs" class="flex-div">
                <input required name="bohnenmenge" placeholder="Bohnenmenge"/>
                <input required name="mahlgrad" placeholder="Mahlgrad"/>
                <input required name="getränkemenge" placeholder="Getränkemenge"/>
                <input required name= "brühtemperatur" placeholder="Brühtemperatur"/>
            </div>
            <StartButton ref="startButton"/>
        </div>
    </form>
</template>


<style scoped>

    h1{
        text-align: center;
    }

    #brüh-page{
        display: flex;
        flex-direction: column;
        height: 100%;

        justify-content: center;
        align-items: center;
    }

    #brüh-page > *{
        margin: 0;
        width: 100%;
    }

    #selection-area{
        position: relative;

        border-bottom: 1px solid var(--secondary-text-color);

        padding-bottom: 16px;
    }

    .flex-div{
        position: relative;
        display: flex;
        gap: 2rem;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .section-wrapper{
        display: flex;
        flex-direction: column;
        gap: 2.8rem;
        justify-content: start;
    }

    input,
    select{
        font-family: "Nunito", sans-serif;
        border: none;
        border-radius: var(--border-radius);

        padding: 8px 16px;
    }

    input{
        background-color: var(--secondary-color);
        color: var(--primary-text-color);
    }

    select{
        color: var(--primary-text-color);
        font-size: 1rem;
        font-weight: bold;
        background-color: var(--primary-color);    

    }
</style>