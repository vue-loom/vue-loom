<script setup lang="ts">
    import VIcon from "../VIcon.vue";

    interface Props {
        value: number | string;
        label: string;
        icon?: string | null;
    }

    withDefaults(defineProps<Props>(), {
        icon: null,
    });

    interface Emits {
        (event: 'select:step', data: number | string): void
    }

    defineEmits<Emits>();
</script>

<template>
    <div class="flex space-x-1" @click="$emit('select:step', value)">
        <VIcon :icon="icon" v-if="icon"/>
        <div>{{ label }}</div>
    </div>
</template>

<style scoped>

</style>