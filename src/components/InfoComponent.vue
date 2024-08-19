<script lang="ts" setup>

    const props = defineProps<{
        message: string,
         status: 'warning' | 'error' | 'success'
        }>();
</script>


<template>
    <div id="info-component" :class="props.status">
        <div class="status"></div>
        <span id="message">{{ props.message }}</span>
    </div>
</template>


<style scoped>

    #info-component {
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: "Nunito", sans-serif;
        font-weight: 500;
        font-size: 1.1rem;

        margin: 16px;

        padding: 8px;

        width: 75vw;
        max-width: fit-content;

        border-radius: 16px;
    }


    .status {
        width: 2rem;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        background-color: brown;
    }

    #message {
        margin-left: 10px;
    }

    .warning {
        display: flex;
        background-color: var(--warning-color);
    }

    .error {
        display: flex;
        background-color: var(--error-color);
    }

    .success {
        display: flex;
        background-color: var(--success-color);
    }
</style>