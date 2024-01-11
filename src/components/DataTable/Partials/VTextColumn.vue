<script setup lang="ts">
    import { highlight } from '@/partials/prototypes';

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

    const displayText: string = slots.default()[0].children.toString();
</script>

<template>
    <div class="text-gray-700"
         v-if="displayText"
         v-html="searchable ? highlight(displayText, term) : displayText"
    ></div>
    <div v-else>-</div>
</template>

<style scoped>

</style>
