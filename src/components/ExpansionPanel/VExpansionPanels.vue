<script setup lang="ts">
    import {type Component, computed, ComputedRef, onMounted, type Ref, ref} from "vue";

    interface Props {
        open?: boolean[],
        readonly?: boolean,
        disabled?: boolean,
        type?: 'default' | 'accordion',
        multiple?: boolean,
        flat?: boolean,
        rounded?: boolean | 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
    }

    const props = withDefaults(defineProps<Props>(), {
        open: () => ([]),
        readonly: false,
        disabled: false,
        type: 'default',
        multiple: false,
        flat: false,
        rounded: 'lg',
    });

    const innerRounding: ComputedRef<string> = computed(() => {
        switch (props.rounded) {
            case true:
                return 'rounded';
            case 'none':
                return 'rounded-none';
            case 'sm':
                return 'rounded-sm';
            case 'md':
                return 'rounded-md';
            case 'lg':
                return 'rounded-lg';
            case 'xl':
                return 'rounded-xl';
            case '2xl':
                return 'rounded-2xl';
            case '3xl':
                return 'rounded-3xl';
            case 'full':
                return 'rounded-full';
            default:
                return '';
        }
    });

    const innerTopRounding: ComputedRef<string> = computed(() => {
        switch (props.rounded) {
            case true:
                return 'rounded-t';
            case 'none':
                return 'rounded-t-none';
            case 'sm':
                return 'rounded-t-sm';
            case 'md':
                return 'rounded-t-md';
            case 'lg':
                return 'rounded-t-lg';
            case 'xl':
                return 'rounded-t-xl';
            case '2xl':
                return 'rounded-t-2xl';
            case '3xl':
                return 'rounded-t-3xl';
            case 'full':
                return 'rounded-t-full';
            default:
                return '';
        }
    });

    const innerBottomRounding: ComputedRef<string> = computed(() => {
        switch (props.rounded) {
            case true:
                return 'rounded-b';
            case 'none':
                return 'rounded-b-none';
            case 'sm':
                return 'rounded-b-sm';
            case 'md':
                return 'rounded-b-md';
            case 'lg':
                return 'rounded-b-lg';
            case 'xl':
                return 'rounded-b-xl';
            case '2xl':
                return 'rounded-b-2xl';
            case '3xl':
                return 'rounded-b-3xl';
            case 'full':
                return 'rounded-b-full';
            default:
                return '';
        }
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
        [innerTopRounding.value]: index === 0 || innerOpen.value[index - 1] && props.type !== 'accordion',
        [innerBottomRounding.value]: index === expansionPanels.length as number - 1 || innerOpen.value[index + 1] && props.type !== 'accordion',
        [`my-4 ${innerRounding.value}`]: innerOpen.value[index] && props.type !== 'accordion',
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
