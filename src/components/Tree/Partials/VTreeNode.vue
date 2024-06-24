<script setup lang="ts">
    import {resolveBg, resolveBgHover, resolveText} from "@/partials/colors";
    import {type ComputedRef} from "vue";
    import {computed} from "vue";
    import VIcon from "@/components/VIcon.vue";
    import type {TreeNode} from "@/globals/TreeNode";

    interface Props {
        node: TreeNode;
        color?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        node: () => ({
            id: 0,
            name: '',
            children: [],
            selected: false,
            expanded: false,
        }),
        color: 'primary',
    });

    const nodeClassObject: ComputedRef<object> = computed(() => ({
        [`${resolveText(props.color)} ${resolveBg(props.color)} bg-opacity-20 hover:bg-opacity-30`]: props.node.selected,
        [`bg-white ${resolveBgHover(props.color)} hover:bg-opacity-10`]: !props.node.selected,
    }));

    const getNodeHeight = (node: TreeNode): number => {
        let height = node.expanded ? node.children.length * 36 : 0;

        if (node.expanded && node.children.length > 0) {
            node.children.forEach((child: TreeNode) => height += (child.expanded ? getNodeHeight(child) : 0));
        }

        return height;
    };

    interface Emits {
        (event: 'node:select', node: TreeNode): void;

        (event: 'node:expand', node: TreeNode): void;
    }

    defineEmits<Emits>();
</script>

<template>
    <div class="w-full">
        <div class="w-full px-2 flex justify-between select-none cursor-pointer transition-all duration-75"
             :class="nodeClassObject"
        >
            <div class="grow h-9 flex space-x-1 items-center">
                <div class="w-4 h-full flex items-center" @click="$emit('node:expand', node)">
                    <VIcon icon="chevron-down"
                           class="transition-all duration-150"
                           :color="node.expanded ? color : ''"
                           :class="{'rotate-180': node.expanded}"
                           v-show="node.children.length > 0"
                    />
                </div>

                <div class="grow h-9 flex items-center" @click="$emit('node:select', node)">
                    <slot name="name" :node="node">{{ node.name }}</slot>
                </div>
            </div>

            <div class="shrink flex items-center h-9">
                <slot name="suffix" :node="node"/>
            </div>
        </div>

        <div class="pl-5 w-full overflow-hidden transition-all duration-150"
             :style="{height: `${getNodeHeight(node)}px`}">
            <VTreeNode
                :node="child"
                :color="color"
                :key="child.id"
                v-for="(child) in node.children"
                @node:select="$emit('node:select', $event || child)"
                @node:expand="$emit('node:expand', $event || child)"
            >
                <template #name="{node: innerNode}">
                    <slot name="name" :node="innerNode"/>
                </template>
                <template #suffix="{node: innerNode}">
                    <slot name="suffix" :node="innerNode"/>
                </template>
            </VTreeNode>
        </div>
    </div>
</template>

<style scoped>

</style>
