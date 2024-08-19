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
        align-items: center;

        font-family: "Nunito", sans-serif;
        font-weight: 500;
        font-size: 1.5rem;

        padding: 8px;
    }


    .status {
        width: 2rem;
        height: 2rem;
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