<script setup lang="ts">
    import {useSlots} from "vue";

    interface Props {
        term?: string;
        searchable?: boolean;
    }

    withDefaults(defineProps<Props>(), {
        term: '',
        searchable: false,
    });

    const displayNumber = Math.round((parseFloat(useSlots().default().at(0).children.toString()) + Number.EPSILON) * 100) / 100;
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
