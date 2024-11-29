<script setup lang="ts">
    withDefaults(defineProps<{ value: string }>(), {
        value: '',
    });
</script>

<template>
    <div>
        {{ value ? new Date(value).toDateString() : '-' }}
    </div>
</template>

<style scoped>

</style>