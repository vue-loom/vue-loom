<script setup lang="ts">
    import {computed, type ComputedRef, onMounted, ref, type Ref, useSlots} from "vue";
    import {useRipple} from "@/composables/mouse";

    interface Props {
        elevated?: boolean;
        flat?: boolean;
        hover?: boolean;
        tile?: boolean;
        clickable?: boolean;
        disabled?: boolean;
        fillHeight?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        elevated: false,
        flat: false,
        hover: false,
        tile: false,
        clickable: false,
        disabled: false,
        fillHeight: false,
    });

    const validateProps = (): void => {
        if (props.elevated && props.flat) {
            console.warn('Using both the "elevated" and "flat" props this not recommended.')
        }
    };

    onMounted((): void => {
        validateProps();
    });

    const cardClassObject: ComputedRef<object> = computed(() => ({
        'shadow-2xl': props.elevated && !props.flat,
        'shadow-none': props.flat && !props.elevated,
        'shadow-md': !props.elevated && !props.flat,
        'hover:shadow-xl': props.hover,
        'cursor-pointer relative overflow-hidden': props.clickable,
        'h-full': props.fillHeight,
        'rounded-md sm:rounded-lg': !props.tile,
    }));

    const disableDivClassObject: ComputedRef<object> = computed(() => ({
        'absolute bg-white opacity-40 w-full h-full z-30': props.disabled,
        'rounded-md sm:rounded-lg': !props.tile,
    }));

    const slots: string[] = Object.keys(useSlots());

    const hasTitle: ComputedRef<boolean> = computed(() => slots.includes('title'));
    const hasSubtitle: ComputedRef<boolean> = computed(() => slots.includes('subtitle'));
    const hasActions: ComputedRef<boolean> = computed(() => slots.includes('actions'));

    const cardClickable: Ref<HTMLElement | null> = ref(null);

    const createCardRipple = (event: MouseEvent) => {
        useRipple(event, cardClickable);
    };
</script>

<template>
    <div class="w-full" :class="[disabled ? 'relative' : '']">
        <div :class="disableDivClassObject" v-if="disabled"/>
        <div ref="cardClickable"
             class="bg-white flex flex-col pt-4 transition-all duration-300"
             :class="cardClassObject"
             @click="clickable && createCardRipple($event)">
            <div class="text-xl px-4 text-gray-700 shrink font-bold">
                <slot name="title"/>
            </div>
            <div class="px-4 text-gray-500 shrink">
                <slot name="subtitle"/>
            </div>
            <div class="text-gray-500 px-4 grow"
                 :class="[hasTitle || hasSubtitle ? 'mt-4' : '']">
                <slot name="content"/>
            </div>
            <div class="flex flex-nowrap space-x-3 items-center shrink"
                 :class="[hasActions ? 'mt-4 p-4' : 'px-4 pb-4']">
                <slot name="actionsLeft"/>
                <div class="grow"></div>
                <slot name="actions"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
