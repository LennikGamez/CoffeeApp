<script lang="ts" setup>

    import { ref, Ref } from 'vue';
    import { Bohne } from '../DB-Models';
    import APIConnector from '../util/APIConnector';

    const props = defineProps<{data: Bohne, editMode: boolean}>();
    const emit = defineEmits(['deleted']);

    let identifier = props.data.Name;
    let data: Bohne = {
        Name: props.data.Name,
        Röster: props.data.Röster,
        Website: props.data.Website,
        Notiz: props.data.Notiz,
        VorhandendeMenge: props.data.VorhandendeMenge
    } as Bohne;

    const editMode: Ref<boolean> = ref(props.editMode);

    function toggleEditMode(){
        editMode.value = !editMode.value

        // updates database if left edit mode
        if (!editMode.value){
            updateData();
        }
    }

    if(props.data.Name == "Neue Bohne"){
        editMode.value = true;
    }

    function updateData(){        
        if (!editMode.value) return;
        APIConnector.updateBohnen(identifier, data).then(()=> identifier = data.Name);
    }

    function deleteBohne(){        
        APIConnector.deleteBohnen(data.Name).then(()=>{
            emit('deleted');
        }).catch((err) => console.log(err));
    }

</script>


<template>
    <div class="bohnen-component">
        <input v-model="data.Name" :readonly="!editMode" @change="updateData"/>
        <input v-model="data.VorhandendeMenge" type="number" :readonly="!editMode"/>
        <input v-model="data.Röster" :readonly="!editMode"/>
        <input v-model="data.Website" v-if="data.Website && editMode"/></input>
        <a v-if="data.Website && !editMode" :href="data.Website">Website</a>
        <textarea v-model="data.Notiz" :readonly="!editMode"/>

        <button @click="toggleEditMode">{{ editMode ? "Save" : "Edit" }}</button>
        <button @click="deleteBohne">Delte</button>
    </div>
</template>


<style scoped>
    .bohnen-component {
        border: 1px solid black;
        padding: 10px;
        display: flex;
        flex-direction: column;

        &>* {
            margin: 5px;
        }
    }

    input, textarea {
        padding: 8px;
        background-color: hsla(0, 0%, 50%, 0.2);
        border: none;
        color: black;
        width: fit-content;
    }
</style>