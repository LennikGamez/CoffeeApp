<script lang="ts" setup>
    import { Ref, ref } from 'vue';
    import SelectComponent from '../components/selectComponent.vue';
    import StartButton from '../components/startButton.vue';
    import APIConnector from '../util/APIConnector';
    import InfoComponent from '../components/InfoComponent.vue';
    import LikeButton from '../components/likeButton.vue';
    import { Brühung } from '../DB-Models';

    const form = ref<HTMLFormElement | null>(null);
    const startButton = ref<typeof StartButton | null>(null);

    const info: Ref<{warnings: {
        [key: string]: string
    }, errors: {
        [key: string]: string
    }, success: {
        [key: string]: string
    }}> = ref({
        warnings:  {},
        errors: {},
        success: {},
    });


    function warn(name: string, msg: string){
        info.value.warnings[name] = msg;
    }
    function throwError(name: string, msg: string){
        info.value.errors[name] = msg;

    }
    function success(name: string, msg: string){
        info.value.success[name] = msg;
    }

    function release(type: 'warnings' | 'errors' | 'success', name: string){
        delete info.value[type][name];
    }

    function appendBrühung(e: Event){
        e.preventDefault();
        if (!form.value) return;
        const formData = new FormData(form.value);
        const succ = startButton.value?.start(formData);
        if(succ){
            success("erfolgreich", "Brühung erfolgreich hinzugefügt!");
            setTimeout(() => {
                release("success", "erfolgreich");
            }, 2000)
        }
    }

    function checkBeanCount(event: Event){
        if (!form.value) return;
        const formData = new FormData(form.value);
        const beansToBeUsed = parseInt(formData.get("bohnenmenge") as string);

        APIConnector.getBohnenCount(formData.get("bohne") as string)
        .then((data) => {
            if (data - beansToBeUsed < 0) {
                throwError("beans-low", "Nicht genug Bohnen. Es sind nur " + data + " Bohnen vorhanden.");
                event.preventDefault();
            }
            else if (data - beansToBeUsed >= 0 && data-beansToBeUsed <= 20) {
                warn("beans-low", " Es werden nur noch " + (data- beansToBeUsed) + " Bohnen vorhanden sein. Es gibt nur noch " + data + " Bohnen.");
            }
            else{
                release("warnings", "beans-low");
                release("errors", "beans-low");
            }
        })

    }


    function getRecipe(){
        if (!form.value) return;
        const formData = new FormData(form.value);
        APIConnector.getRezept(formData.get("method") as string, formData.get("bohne") as string)
        .then((data) => {
            // if empty object: no recipe found reset input fields
            if (Object.keys(data).length == 0){
                (form.value?.querySelector('input[name="bohnenmenge"]') as HTMLInputElement).value = '';
                (form.value?.querySelector('input[name="mahlgrad"]') as HTMLInputElement).value = '';
                (form.value?.querySelector('input[name="getränkemenge"]') as HTMLInputElement).value = '';
                (form.value?.querySelector('input[name="brühtemperatur"]') as HTMLInputElement).value = '';
                return;
            };
            (form.value?.querySelector('input[name="bohnenmenge"]') as HTMLInputElement).value = data.BohnenMenge.toString();
            (form.value?.querySelector('input[name="mahlgrad"]') as HTMLInputElement).value = data.Mahlgrad.toString();
            (form.value?.querySelector('input[name="getränkemenge"]') as HTMLInputElement).value = data.GetränkeMenge.toString();
            (form.value?.querySelector('input[name="brühtemperatur"]') as HTMLInputElement).value = data.Brühtemperatur.toString();
        });
        

    }

    async function saveAsRecipe(){
        if (!form.value) return;
        const formData = new FormData(form.value);
        const formBrühung: Brühung = {
            BohnenMenge: parseInt(formData.get("bohnenmenge") as string),
            GetränkeMenge: parseInt(formData.get("getränkemenge") as string),
            Mahlgrad: parseInt(formData.get("mahlgrad") as string),
            Brühtemperatur: parseInt(formData.get("brühtemperatur") as string),
            BrühmethodenName: formData.get("method") as string,
            BohnenName: formData.get("bohne") as string,
        } as Brühung;
        // get the BrühID of current data state or create a new one
        const brühung = await APIConnector.doesBrühungExist(formBrühung);
        let ID = -1;

        if (!brühung) {
            formBrühung.zubereitet = 0;
            formBrühung.Notiz = "";
            const resp = await APIConnector.addBrühung(formBrühung)
            if (resp) {
                ID = resp.id;                 
            }
        }else{
            ID = brühung.BrühID;
        }        
        APIConnector.saveAsRecipe(formData.get("method") as string, formData.get("bohne") as string, ID)
    }

</script>


<template>
    <form id="brüh-page" ref="form" @submit="appendBrühung($event)">
        <div id="selection-area" class="section-wrapper">
            <h1>Brühung</h1>
            <div class="flex-div">
                <SelectComponent 
                    @selected="getRecipe" name="method" 
                    :fetch-function="()=>{return APIConnector.getMethods();}" />
                <SelectComponent 
                    @selected="getRecipe" name="bohne" 
                    :fetch-function="()=>{return APIConnector.getBohnenNames();}"/>
            </div>

        </div>
        <div id="recipe" class="section-wrapper">
            <h1>
                Rezept
            </h1>
            <div id="recipe-inputs" class="flex-div">
                <input ref="bohnenmenge" required name="bohnenmenge" placeholder="Bohnenmenge" @input="checkBeanCount"/>
                <input ref="mahlgrad" required name="mahlgrad" placeholder="Mahlgrad"/>
                <input ref="getränkemenge" required name="getränkemenge" placeholder="Getränkemenge"/>
                <input ref="brühtemperatur" required name= "brühtemperatur" placeholder="Brühtemperatur"/>
            </div>
            <StartButton ref="startButton"/>
            <LikeButton @click="saveAsRecipe"/>
        </div>
        <div id="info-center">
            <InfoComponent v-for="(item, index) in info.success" :key="index" :message="item" status="success" />
            <InfoComponent v-for="(item, index) in info.warnings" :key="index" :message="item" status="warning" />
            <InfoComponent v-for="(item, index) in info.errors" :key="index" :message="item" status="error" />
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

    #info-center{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
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
        align-items: center;
    }

    input,
    select{
        font-family: "Nunito", sans-serif;
        border: none;
        border-radius: var(--border-radius);

        padding: 8px 16px;
    }

    input{
        background-color: var(--primary-color);
        color: var(--primary-text-color);
    }

    input:hover{
        background-color: var(--secondary-color);
        cursor: pointer;
    }

    select{
        color: var(--primary-text-color);
        font-size: 1rem;
        font-weight: bold;
        background-color: var(--primary-color);    

    }
</style>