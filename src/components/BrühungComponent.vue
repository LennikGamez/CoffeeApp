<script setup lang="ts">
import { Brühung } from '../DB-Models';

    const emit = defineEmits(['delete']);
    const props = defineProps<{data: Brühung}>()

</script>


<template>
    <div id="brühung-component">
        <button id="delete-button" @click="emit('delete', props.data.BrühID)">
            <img src="../assets/delete.svg"/>
        </button>
        <h2>{{ props.data.BrühmethodenName }} - {{ props.data.BohnenName }}</h2>
        <label>
            Bohnenmenge
            <span>{{ props.data.Bohnenmenge + ' g' }}</span>
        </label>
        <label>
            Getränkemenge
            <span>{{ props.data.Getränkemenge + ' g' }}</span>
        </label>
        <label>
            Brühtemperatur
            <span>{{ props.data.Brühtemperatur + '°C' }}</span>
        </label>

    </div>
</template>


<style scoped>
    #brühung-component {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;

        border-radius: var(--border-radius);
        padding: 10px;

        width: 60%;
        max-width: 32rem;
        gap: 4px;
        
        box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.226);

        background-color: hsla(29, 69%, 43%, 0.507);
    }

    label{
        display: flex;
        flex-direction: column;

        font-size: 1.3rem;
        font-weight: 600;
    }

    span{
        color: var(--primary-text-color);
        padding: 8px;
        margin: 4px;
        font-size: .92rem;
        border-radius: var(--border-radius);
        outline: none;
        border: none;

        text-align: center;

        background-color: var(--primary-color);
    }


    #delete-button {
        background-color: transparent;
        border: none;

        position: absolute;
        top: 0;
        right: 0;
        margin: 4px;
        padding: 0;
        display: flex;
    }
</style>