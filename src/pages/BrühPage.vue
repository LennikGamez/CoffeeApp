<script lang="ts" setup>

</script>


<template>
    <div id="brüh-page">
        <div id="selection-area">
            <select>
                <option value="Espresso">Espresso</option>
                <option value="Doppelter Espresso">Doppelter Espresso</option>
                <option value="Cafe Crema">Cafe Crema</option>
            </select>

            <select>
                <option value="Bohne1">Bohne1</option>
                <option value="Bohne2">Bohne2</option>
                <option value="Bohne3">Bohne3</option>
            </select>
        </div>
        <div id="recipe">
            <h2>What poppin</h2>
        </div>
    </div>
</template>


<style scoped>
    #brüh-page{
        display: flex;
        flex-direction: column;
        height: 100%;

        justify-content: space-around;
        align-items: center;
    }

    #brüh-page > *{
        margin: 0;
        width: 100%;
        height: 100%;
    }

    select{
        color: black;
        font-size: 1rem;
        font-weight: bold;
        background-color: hsl(0, 10%, 75%);    
        border: none;

        border-radius: 4px;
        padding: 8px 16px;
    }
</style>