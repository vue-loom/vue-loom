<script setup lang="ts">
    import {DataTableColumn} from "../data-table/interface";
    import VDataTableTextColumn from "./VDataTableTextColumn.vue";
    import VDataTableNumberColumn from "./VDataTableNumberColumn.vue";
    import VDataTableBooleanColumn from "./VDataTableBooleanColumn.vue";
    import VDataTableEnumColumn from "./VDataTableEnumColumn.vue";
    import VDataTableDateColumn from "./VDataTableDateColumn.vue";

    interface Props {
        column: DataTableColumn;
        value: any;
    }

    defineProps<Props>();
</script>

<template>
    <VDataTableTextColumn :value="value" v-if="column.dataType === 'text'"/>
    <VDataTableNumberColumn :value="value" v-else-if="column.dataType === 'number'"/>
    <VDataTableBooleanColumn :value="value" v-else-if="column.dataType === 'boolean'"/>
    <VDataTableEnumColumn :value="value" v-else-if="column.dataType === 'enum'"/>
    <VDataTableDateColumn :value="value" v-else-if="column.dataType === 'date'"/>
</template>

<style scoped>

</style>