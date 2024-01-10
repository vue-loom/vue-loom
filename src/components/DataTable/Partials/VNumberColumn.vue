<script setup lang="ts">
    interface Props {
        term?: string;
        searchable?: boolean;
    }

    withDefaults(defineProps<Props>(), {
        term: '',
        searchable: false,
    });

    interface Slot {
        default(): {
            children: string;
        }[];
    }

    const slots = defineSlots<Slot>();

    const displayNumber = Math.round((parseFloat(slots.default()[0].children.toString()) + Number.EPSILON) * 100) / 100;
</script>

<template>
    <div class="text-primary/80 font-extrabold"
         v-if="displayNumber"
         v-html="searchable ? displayNumber.toString().highlight(term) : displayNumber.toString()"
    ></div>
    <div v-else>-</div>
</template>

<style scoped>

</style>
