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
        VorhandendeMenge: props.data.VorhandendeMenge,
        Röstgrad: props.data.Röstgrad
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
        <label>
            Name
            <input v-model="data.Name" :readonly="!editMode" @change="updateData"/>
        </label>
        <label>
            Menge in g
            <input v-model="data.VorhandendeMenge" type="number" :readonly="!editMode"/>
        </label>
        <label>
            Röster
            <input v-model="data.Röster" :readonly="!editMode"/>
        </label>
        <label>
            Röstgrad
            <input v-model="data.Röstgrad" type="number" :readonly="!editMode"/>
        </label>
        <label v-if="editMode">
            Website
            <input v-model="data.Website"/></input>
        </label>
        <a v-if="data.Website && !editMode" :href="data.Website">Website</a>
        <label>
            Notiz
            <textarea v-model="data.Notiz" :readonly="!editMode"/>
        </label>

        <button @click="toggleEditMode">{{ editMode ? "Save" : "Edit" }}</button>
        <button @click="deleteBohne" id="delete">Delete</button>
    </div>
</template>


<style scoped>
    .bohnen-component {
        background-color: hsla(29, 69%, 43%, 0.507);
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
        font-weight: 800;

        cursor: pointer;
    }

    a{
        color: white;
        font-weight: 800;
    }

    #delete{
        background-color: red;
    }

    label{
        display: flex;
        flex-direction: column;
        font-size: larger;
        font-weight: 800;
    }
</style>