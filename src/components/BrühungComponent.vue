<script setup lang="ts">
import { ref } from 'vue';
import { Brühung } from '../DB-Models';
import APIConnector from '../util/APIConnector';

    const emit = defineEmits(['delete', 'like']);
    const props = defineProps<{data: Brühung}>()

    const liked = ref(false);

    function handleLikeClick(){
        if(liked.value){
            APIConnector.deleteRecipe(props.data.BrühmethodenName, props.data.BohnenName).then((resp) => {
                if(resp) liked.value = false
            });
        }else{
            setAsRecipe();
        }
    }


    function setAsRecipe(){
        APIConnector.saveAsRecipe(props.data.BrühmethodenName, props.data.BohnenName, props.data.BrühID).then((resp) => {
            if(resp) liked.value = true
        });
    }

    function isLiked(){
        APIConnector.getRezept(props.data.BrühmethodenName, props.data.BohnenName).then((data) => {
            if(data.BrühID == props.data.BrühID) liked.value = true
        })
    }

    isLiked();

</script>


<template>
    <div id="brühung-component">
        <button id="delete-button" @click="emit('delete', props.data.BrühID)">
            <img src="../assets/delete.svg"/>
        </button>

        <button id="like-button" :class="liked ? 'liked' : 'unliked'" @click="handleLikeClick">
            <img class="unliked-icon" src="../assets/favorite.svg"/>
            <img class="liked-icon" src="../assets/favchecked.svg"/>
        </button>

        <h2>{{ props.data.BrühmethodenName }} - {{ props.data.BohnenName }}</h2>
        <div id="mengen">
            <label>
                Bohnenmenge
                <span>{{ props.data.Bohnenmenge + ' g' }}</span>
            </label>
            <label>
                Getränkemenge
                <span>{{ props.data.Getränkemenge + ' g' }}</span>
            </label>
        </div>
        <label>
            Brühtemperatur
            <span>{{ props.data.Brühtemperatur + '°C' }}</span>
        </label>

        <label>
            Mahlgrad
            <span>{{ props.data.Mahlgrad + ' %' }}</span>
        </label>

        <label v-if="props.data.Notiz">
            Notiz
            <span>{{ props.data.Notiz }}</span>
        </label>

        <label>
            Zubereitet
            <span>{{ props.data.zubereitet }}x</span>
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

    #mengen{
        display: flex;
        gap: 16px;
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
        font-weight: 800;
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

    #like-button{
        background-color: transparent;
        border: none;

        position: absolute;
        top: 0;
        left: 0;
        margin: 4px;
        padding: 0;
        display: flex;
    }

    .liked-icon, .unliked-icon{
        display: none;
    }

    #like-button.liked .liked-icon, #like-button.unliked .unliked-icon{
        display: block;
    }

</style>