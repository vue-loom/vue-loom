<script setup lang="ts">
    import VIcon from "@/components/VIcon.vue";
    import {computed, type ComputedRef, ref, type Ref} from "vue";
    import type {DataTableColumn} from "@/component-types/DataTableColumn";
    import type {DataTableSort} from "@/component-types/DataTableSort";

    interface Props {
        sort: DataTableSort;
        column: DataTableColumn;
    }

    const props = withDefaults(defineProps<Props>(), {
        sort: () => ({}),
    });

    const direction: Ref<'asc' | 'desc' | ''> = ref(props.sort[props.column.alias] || '');
    const iconRotation: ComputedRef<'rotate-0' | 'rotate-180'> = computed(() => {
        if (!direction.value) {
            return 'rotate-0';
        } else if (direction.value === 'asc') {
            return 'rotate-180';
        } else if (direction.value === 'desc') {
            return 'rotate-0';
        }

        return 'rotate-0';
    });

    interface Emits {
        (event: 'update:direction', data: 'asc' | 'desc' | ''): void;
    }

    const emits = defineEmits<Emits>();

    const updateDirection = (): void => {
        if (!direction.value) {
            direction.value = 'desc';
        } else if (direction.value === 'desc') {
            direction.value = 'asc';
        } else {
            direction.value = '';
        }

        emits('update:direction', direction.value);
    };
</script>

<template>
    <div
        class="cursor-pointer p-1 rounded border border-primary/50 transition-all duration-150"
        :class="[direction ? 'bg-white' : 'hover:bg-gray-50']"
        @click="updateDirection"
    >
        <VIcon class="transition-all duration-150"
               size="xs"
               color="primary"
               icon="arrow-down"
               :class="[iconRotation]"
        />
    </div>
</template>

<style scoped>

</style>
