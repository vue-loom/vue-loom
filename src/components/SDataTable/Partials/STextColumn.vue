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

    const displayText: string = useSlots().default().at(0).children.toString();
</script>

<template>
    <div class="text-gray-700"
         v-if="displayText"
         v-html="searchable ? displayText.highlight(term) : displayText"
    ></div>
    <div v-else>-</div>
</template>

<style scoped>

</style>
