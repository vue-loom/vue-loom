<script setup lang="ts">
    import {computed, type ComputedRef, ref, type Ref, useSlots} from "vue";
    import {useRipple} from "@/composables/mouse";

    interface Props {
        elevated?: boolean;
        hover?: boolean;
        clickable?: boolean;
        disabled?: boolean;
        fillHeight?: boolean;
    }

    withDefaults(defineProps<Props>(), {
        elevated: false,
        hover: false,
        clickable: false,
        disabled: false,
        fillHeight: false,
    });

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
        <div :class="disabled ? 'absolute bg-white opacity-30 rounded-lg w-full h-full z-50' : ''"></div>
        <div ref="cardClickable"
             class="bg-white shadow-md rounded-md sm:rounded-lg flex flex-col pt-4 transition-all duration-300"
             :class="[
                 elevated ? `shadow-2xl` : ``,
                 hover ? `hover:shadow-xl` : ``,
                 clickable ? `cursor-pointer relative overflow-hidden` : ``,
                 fillHeight ? 'h-full' : '',
             ]"
             @click="clickable && createCardRipple($event)">
            <h1 class="text-xl px-4 text-gray-700 shrink font-bold">
                <slot name="title"/>
            </h1>
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
