<script lang="ts" setup>

</script>


<template>
    <div id="brüh-page">
        <div id="selection-area" class="section-wrapper">
            <h1>Brühung</h1>
            <div class="flex-div">
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

        </div>
        <div id="recipe" class="section-wrapper">
            <h1>
                Rezept
            </h1>
            <div id="recipe-inputs" class="flex-div">
                <input placeholder="Bohnenmenge"/>
                <input placeholder="Mahlgrad"/>
                <input placeholder="Getränkemenge"/>
                <input placeholder="Brühtemperatur"/>
            </div>
        </div>
    </div>
</template>


<style scoped>

    h1{
        text-align: center;
    }

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

    #selection-area{
        position: relative;
        flex: .5;

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