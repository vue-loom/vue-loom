<script setup lang="ts">
    import {type Component, type Ref, ref, useSlots} from "vue";
    import {type VNodeNormalizedChildren} from "@vue/runtime-core";

    interface Open {
        [key: number]: boolean;
    }

    interface Props {
        open?: Open;
        readonly?: boolean;
        disabled?: boolean;
        type?: 'default' | 'accordion';
        multiple?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        open: () => ({}),
        readonly: false,
        disabled: false,
        type: 'default',
        multiple: false,
    });

    const innerOpen: Ref<Open> = ref(props.open);
    const expansionPanels: VNodeNormalizedChildren = useSlots().default().at(0).children;

    const panelClassObject = (index: number) => ({
        'border-none': innerOpen.value[index] || innerOpen.value[index - 1],
        'rounded-t-lg': index === 0 || innerOpen.value[index - 1] && props.type !== 'accordion',
        'rounded-b-lg': index === expansionPanels.length as number - 1 || innerOpen.value[index + 1] && props.type !== 'accordion',
        'my-4 rounded-lg': innerOpen.value[index] && props.type !== 'accordion',
    });

    interface PanelChild {
        title: () => Component;
        subtitle: () => Component;
        content: () => Component;
    }

    interface Panel {
        children: PanelChild;
    }
</script>

<template>
    <div class="divide-y">
        <component
            class="shadow-lg"
            :is="panelSlot"
            :open="innerOpen[index]"
            :key="index"
            :class="panelClassObject(index as number)"
            v-for="(panelSlot, index) in expansionPanels"
            @update:open="innerOpen[index] = $event"
        >
            <template #title>
                <component
                    :is="titleSlot"
                    v-for="(titleSlot) in ((panelSlot as Panel).children.title() as PanelChild)"
                />
            </template>
            <template #subtitle>
                <component
                    :is="titleSlot"
                    v-for="(titleSlot) in ((panelSlot as Panel).children.subtitle() as PanelChild)"
                />
            </template>
            <template #content>
                <component
                    :is="contentSlot"
                    v-for="(contentSlot) in ((panelSlot as Panel).children.content() as PanelChild)"
                />
            </template>
        </component>
    </div>
</template>

<style scoped>

</style>
