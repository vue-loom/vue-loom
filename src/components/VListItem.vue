<script setup lang="ts">
    import {computed, type ComputedRef, ref, type Ref} from "vue";
    import {useRipple} from "@/composables/mouse";
    import {resolveBgHover, resolveText} from "@/partials/colors";

    interface Props {
        item?: object,
        color?: string,
        disabled?: boolean,
        selected?: boolean,
        clickable?: boolean,
        lineClamp?: 1 | 2 | 3 | 4 | 5 | 6 | 'none',
    }

    const props = withDefaults(defineProps<Props>(), {
        color: '',
        disabled: false,
        selected: false,
        clickable: false,
        lineClamp: 'none',
    });

    const listClassObject: ComputedRef<object> = computed(() => ({
        'bg-white': !props.selected,
        'bg-gray-200': props.selected,
        [props.color ? `${resolveBgHover(props.color)} hover:!bg-opacity-20` : 'hover:bg-gray-100']: props.clickable,
        'cursor-pointer': !props.disabled && props.clickable,
    }));

    const subtitleClassObject: ComputedRef<object> = computed(() => ({
        'line-clamp-1': props.lineClamp === 1,
        'line-clamp-2': props.lineClamp === 2,
        'line-clamp-3': props.lineClamp === 3,
        'line-clamp-4': props.lineClamp === 4,
        'line-clamp-5': props.lineClamp === 5,
        'line-clamp-6': props.lineClamp === 6,
        'line-clamp-none': props.lineClamp === 'none',
    }));

    const listItem: Ref<HTMLElement | null> = ref(null);

    const createRipple = (event: MouseEvent): void => {
        if (props.clickable) {
            useRipple(event, listItem);
        }
    }

</script>

<template>
    <div class="w-full" :class="[disabled ? 'relative' : '']">
        <div :class="disabled ? 'absolute bg-white opacity-30 w-full h-full top-0 z-30' : ''"></div>
        <div ref="listItem"
             class="flex w-full relative p-2 overflow-hidden transition-all duration-150"
             :class="listClassObject"
             @click="createRipple($event)"
        >
            <div class="shrink">
                <slot name="prefix"/>
            </div>
            <div class="grow">
                <div class="line-clamp-1 text-start"
                     :class="[color ? resolveText(color) : 'text-gray-700']"
                >
                    <slot name="title"/>
                </div>
                <div class="text-sm text-gray-500 text-start" :class="subtitleClassObject">
                    <slot name="subtitle"/>
                </div>
            </div>
            <div class="shrink">
                <slot name="suffix"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
