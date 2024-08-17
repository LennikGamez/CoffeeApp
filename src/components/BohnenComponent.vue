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
            Name: props.Name,
            Röster: props.Röster,
            Website: props.Website,
            Notiz: props.Notiz,
            VorhandendeMenge: props.VorhandendeMenge
        }
    });
    const editMode: Ref<boolean> = ref(props.editMode);

    function toggleEditMode(){
        editMode.value = !editMode.value
    }

</script>


<template>
    <div class="bohnen-component">
        <h2>{{ data.Name }}</h2>
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