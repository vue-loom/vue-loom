<script setup lang="ts">
    import {DataTableColumn} from "../data-table/interface";

    interface Props {
        column: DataTableColumn;
        value: any;
    }

    defineProps<Props>();
</script>

<template>
    <div v-if="column.dataType === 'text'">
        {{ value || '-' }}
    </div>
    <div class="text-primary font-semibold" v-else-if="column.dataType === 'number'">
        {{ value || '-' }}
    </div>
    <div class="w-fit border rounded text-xs uppercase leading-none px-1 pt-[3px] pb-0.5"
         :class="[!!value || (value || '').toString().toLowerCase() === 'yes' ? 'bg-emerald-500/5 border-emerald-600 text-emerald-600' : 'bg-destructive/5 border-destructive text-destructive']"
         v-else-if="column.dataType === 'boolean'">
        {{ !!value || (value || '').toString().toLowerCase() === 'yes' ? 'Yes' : 'No' }}
    </div>
    <div
        class="w-fit border rounded bg-neutral-300/5 border-neutral-400 text-neutral-600 text-xs uppercase leading-none px-1 pt-[3px] pb-0.5"
        v-else-if="column.dataType === 'enum'">
        {{ value }}
    </div>
    <div v-else-if="column.dataType === 'date'">
        {{ value ? new Date(value).toDateString() : '-' }}
    </div>
</template>

<style scoped>

</style>