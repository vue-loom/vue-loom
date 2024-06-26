<script setup lang="ts">
    import VTreeNode from "@/components/Tree/Partials/VTreeNode.vue";
    import {ref, type Ref} from "vue";
    import {computed, type ComputedRef, watch} from "vue";
    import type {TreeItem} from "@/globals/TreeItem";
    import type {TreeNode} from "@/globals/TreeNode";

    interface Props {
        modelValue: number | string | null;
        items: TreeItem[];
        color?: string;
        openAll?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        modelValue: null,
        items: () => [],
        color: 'primary',
        openAll: false,
    });

    const innerModelValue: Ref<number | string | null> = ref(props.modelValue || null);

    interface Open {
        [key: number]: boolean,
    }

    const open: Ref<Open> = ref({});

    const parseTreeNode = (item: TreeItem): TreeNode => {
        const {children, ...remainingItem} = item;

        return {
            id: item.id,
            name: item.name,
            item: remainingItem,
            children: item.children.map((item: TreeItem) => parseTreeNode(item)),
            selected: innerModelValue.value === item.id,
            expanded: open.value[item.id] || props.openAll,
        }
    };

    const parsedNodes: ComputedRef<TreeNode[]> = computed(() => props.items.map((item: TreeItem) => parseTreeNode(item)));

    const toggleNodeOpenState = (node: TreeNode): void => {
        if (node.id in open.value) {
            open.value[node.id] = !open.value[node.id];
        } else {
            open.value[node.id] = true;
        }
    };

    interface Emits {
        (event: 'update:modelValue', data: number | string | null): void;

        (event: 'select:node', data: TreeItem | null): void;
    }

    const emits = defineEmits<Emits>();

    const findItem = (items: TreeItem[], node: TreeNode): TreeItem | null => {
        for (const item of items) {
            if (item.id === node.id) {
                return item;
            }

            if (item.children.length > 0) {
                let result: TreeItem | null = findItem(item.children, node);

                if (result) {
                    return result;
                }
            }
        }

        return null;
    };

    const findItemFromInnerValue = (items: TreeItem[], value: number | string | null): TreeItem | null => {
        for (const item of items) {
            if (item.id === value) {
                return item;
            }

            if (item.children.length > 0) {
                let result: TreeItem | null = findItemFromInnerValue(item.children, value);

                if (result) {
                    return result;
                }
            }
        }

        return null;
    };

    const findSelectedItem = () => {
        if (innerModelValue.value) {
            return findItemFromInnerValue(props.items, innerModelValue.value);
        }

        return null;
    };

    const selectedItem: Ref<TreeItem | null> = ref(findSelectedItem());

    watch(() => props.modelValue, (value: number | string | null) => {
        innerModelValue.value = value;

        selectedItem.value = findSelectedItem();
    });

    const selectItem = (node: TreeNode): void => {
        selectedItem.value = findItem(props.items, node);

        if (selectedItem.value) {
            innerModelValue.value = selectedItem.value.id;
        }

        emits('update:modelValue', innerModelValue.value);
        emits('select:node', selectedItem.value);
    }
</script>

<template>
    <VTreeNode
        :node="node"
        :color="color"
        :key="node.id"
        v-for="(node) in parsedNodes"
        @node:select="selectItem"
        @node:expand="toggleNodeOpenState"
    >
        <template #name="{node: innerNode}">
            <slot name="name" :node="innerNode"/>
        </template>
        <template #suffix="{node: innerNode}">
            <slot name="suffix" :node="innerNode"/>
        </template>
    </VTreeNode>
</template>

<style scoped>

</style>
