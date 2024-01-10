<script setup lang="ts">
    import {type Component, type Ref, ref} from "vue";

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

    interface ExpansionPanel {
        children: {
            title(): Component[];
            subtitle(): Component[];
            content(): Component[];
        };
    }

    interface Slot {
        default(): ExpansionPanel[];
    }

    const slots = defineSlots<Slot>();
    const expansionPanels: ExpansionPanel[] = slots.default();

    const panelClassObject = (index: number) => ({
        'border-none': innerOpen.value[index] || innerOpen.value[index - 1],
        'rounded-t-lg': index === 0 || innerOpen.value[index - 1] && props.type !== 'accordion',
        'rounded-b-lg': index === expansionPanels.length as number - 1 || innerOpen.value[index + 1] && props.type !== 'accordion',
        'my-4 rounded-lg': innerOpen.value[index] && props.type !== 'accordion',
    });
</script>

<template>
    <div class="divide-y">
        <component
            class="shadow-lg"
            :is="expansionPanel"
            :open="innerOpen[index]"
            :key="index"
            :class="panelClassObject(index as number)"
            v-for="(expansionPanel, index) in expansionPanels"
            @update:open="innerOpen[index] = $event"
        >
            <template #title>
                <component
                    :is="titleSlot"
                    v-for="(titleSlot) in (expansionPanel.children.title())"
                />
            </template>
            <template #subtitle>
                <component
                    :is="subtitleSlot"
                    v-for="(subtitleSlot) in (expansionPanel.children.subtitle())"
                />
            </template>
            <template #content>
                <component
                    :is="contentSlot"
                    v-for="(contentSlot) in (expansionPanel.children.content())"
                />
            </template>
        </component>
    </div>
</template>

<style scoped>

</style>
