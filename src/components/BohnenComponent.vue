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
        if (editMode.value == null) return;
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
        <input v-model="data.Website" v-if="editMode"/></input>
        <a v-if="data.Website && !editMode" :href="data.Website">Website</a>
        <textarea v-model="data.Notiz" :readonly="!editMode"/>

        <button @click="toggleEditMode">{{ editMode ? "Save" : "Edit" }}</button>
        <button @click="deleteBohne" id="delete">Delete</button>
    </div>
</template>


<style scoped>
    .bohnen-component {
        border: 1px solid rgba(0, 0, 0, 0.24);
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        width: fit-content;

        border-radius: var(--border-radius);

        box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.226);
        &>* {
            margin: 5px;
        }
    }

    input, textarea {
        padding: 8px;
        background-color: var(--primary-color);
        border: none;
        color: var(--primary-text-color);
        width: fit-content;
        font-size: larger;
        border-radius: var(--border-radius);
    }

    button{
        background-color: var(--contrast-color);
        width: fit-content;
        align-self: center;
        padding: 8px 32px;
        border: none;
        outline: none;
        border-radius: var(--border-radius);
    }

    #delete{
        background-color: red;
    }
</style>