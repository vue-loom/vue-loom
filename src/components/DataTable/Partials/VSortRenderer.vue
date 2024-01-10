<script setup lang="ts">
    import SIcon from "@/components/VIcon.vue";
    import {computed, type ComputedRef} from "vue";

    interface Props {
        sort: DataTableSort;
        column: DataTableColumn;
    }

    const props = withDefaults(defineProps<Props>(), {
        sort: () => ({}),
    });

    const direction: ComputedRef<string | null> = computed(() => props.sort[props.column.alias] || null);
    const icon: ComputedRef<'arrow-up' | 'arrow-down'> = computed(() => {
        if (!direction.value) {
            return 'arrow-up';
        } else if (direction.value === 'asc') {
            return 'arrow-up';
        } else if (direction.value === 'desc') {
            return 'arrow-down';
        }

        return 'arrow-down';
    });

    interface Emits {
        (event: 'update:direction', data: 'asc' | 'desc' | null): void;
    }

    const emits = defineEmits<Emits>();

    const updateDirection = (): void => {
        if (direction.value === 'asc') {
            emits('update:direction', 'desc');
        } else if (direction.value === 'desc') {
            emits('update:direction', null);
        } else {
            emits('update:direction', 'asc');
        }
    };
</script>

<template>
    <div
        class="cursor-pointer hover:bg-gray-50 p-1 rounded border border-primary/50"
        @click="updateDirection"
    >
        <SIcon size="xs" color="primary" :icon="icon"/>
    </div>
</template>

<style scoped>

</style>
