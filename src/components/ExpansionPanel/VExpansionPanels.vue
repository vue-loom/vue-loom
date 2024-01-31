<script setup lang="ts">
    import {type Component, onMounted, type Ref, ref} from "vue";

    interface Props {
        open?: boolean[],
        readonly?: boolean,
        disabled?: boolean,
        type?: 'default' | 'accordion',
        multiple?: boolean,
        flat?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        open: () => ([]),
        readonly: false,
        disabled: false,
        type: 'default',
        multiple: false,
        flat: false,
    });

    interface ExpansionPanel {
        children: {
            title(): Component[];
            subtitle(): Component[];
            content(): Component[];
        };
    }

    interface Slot {
        default(): {
            children: ExpansionPanel[];
        }[] | ExpansionPanel[];
    }

    const slots = defineSlots<Slot>();

    const validateOpenProp = (): void => {
        if (props.open.length > 0 && !props.multiple && props.open.filter((value: boolean) => value).length > 1) {
            console.warn('Passing more that one "true" value in the "open" prop while the "multiple" prop is false, is not recommended.');
        }
    };

    onMounted((): void => {
        validateOpenProp();
    });

    let expansionPanels: ExpansionPanel[];

    if (Array.isArray(slots.default()[0].children)) {
        expansionPanels = slots.default()[0].children as ExpansionPanel[];
    } else {
        expansionPanels = slots.default() as ExpansionPanel[];
    }


    const panelClassObject = (index: number) => ({
        'border-none': innerOpen.value[index] || innerOpen.value[index - 1],
        'shadow-md': !props.flat,
        'rounded-t-lg': index === 0 || innerOpen.value[index - 1] && props.type !== 'accordion',
        'rounded-b-lg': index === expansionPanels.length as number - 1 || innerOpen.value[index + 1] && props.type !== 'accordion',
        'my-4 rounded-lg': innerOpen.value[index] && props.type !== 'accordion',
    });

    const innerOpen: Ref<boolean[]> = ref(expansionPanels.map((_: ExpansionPanel, index: number) => (props.open[index] || false)));

    const togglePanel = (index: number): void => {
        if (props.multiple) {
            innerOpen.value[index] = !innerOpen.value[index];
        } else {
            innerOpen.value.forEach((_, innerIndex) => {
                innerOpen.value[innerIndex] = innerIndex === index ? !innerOpen.value[innerIndex] : false;
            });
        }
    };
</script>

<template>
    <div class="divide-y">
        <component
            class=""
            :is="expansionPanel"
            :open="innerOpen[index]"
            :key="index"
            :class="panelClassObject(index as number)"
            v-for="(expansionPanel, index) in expansionPanels"
            @update:open="togglePanel(index)"
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
