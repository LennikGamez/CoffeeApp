<script setup lang="ts">
import { Brühung } from '../DB-Models';


    const props = defineProps<{data: Brühung}>()

</script>


<template>
    <div id="brühung-component">
        {{ props.data }}
        <h2>{{ props.data.BrühmethodenName }} - {{ props.data.BohnenName }}</h2>
        <span>{{ props.data.Bohnenmenge }}</span>
        <span>{{ props.data.Getränkemenge }}</span>

    </div>
</template>


<style>

</style>