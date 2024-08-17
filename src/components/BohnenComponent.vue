<script lang="ts" setup>

    import { ref, Ref, watch } from 'vue';
    import { Bohne } from '../DB-Models';

    const props = defineProps<{data: Bohne, editMode: boolean}>();

    let data: Bohne = {
        Name: props.data.Name,
        Röster: props.data.Röster,
        Website: props.data.Website,
        Notiz: props.data.Notiz,
        VorhandendeMenge: props.data.VorhandendeMenge
    } as Bohne;

    watch(() => props, ()=> {
        data = {
            Name: props.data.Name,
            Röster: props.data.Röster,
            Website: props.data.Website,
            Notiz: props.data.Notiz,
            VorhandendeMenge: props.data.VorhandendeMenge
        }
    });
    const editMode: Ref<boolean> = ref(props.editMode);

    function toggleEditMode(){
        editMode.value = !editMode.value
    }

    if(props.data.Name == "Neue Bohne"){
        editMode.value = true;
    }

</script>


<template>
    <div class="bohnen-component">
        <input v-model="data.Name" :readonly="!editMode"/>
        <input v-model="data.VorhandendeMenge" type="number" :readonly="!editMode"/>
        <input v-model="data.Röster" :readonly="!editMode"/>
        <input v-model="data.Website" v-if="data.Website && editMode"/></input>
        <a v-if="data.Website && !editMode" :href="data.Website">Website</a>
        <input v-model="data.Notiz" :readonly="!editMode"/>

        <button @click="toggleEditMode">{{ editMode ? "Save" : "Edit" }}</button>
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

    input {
        background-color: transparent;
        border: none;
        color: black;
        width: fit-content;
    }
</style>