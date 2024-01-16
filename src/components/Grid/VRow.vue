<script setup lang="ts">
    import {computed, type ComputedRef} from "vue";

    interface Props {
        justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'stretch';
        align?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'baseline' | 'stretch';
        reverse?: boolean;
        noWrap?: boolean;
        column?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        justify: 'start',
        align: 'start',
        reverse: false,
        noWrap: false,
        column: false,
    });

    const justification: ComputedRef<string> = computed(() => {
        switch (props.justify) {
            case 'start':
                return 'justify-start';
            case 'center':
                return 'justify-center';
            case 'end':
                return 'justify-end';
            case 'between':
                return 'justify-between';
            case 'around':
                return 'justify-around';
            case 'evenly':
                return 'justify-evenly';
            case 'stretch':
                return 'justify-stretch';
        }
    });

    const alignment: ComputedRef<string> = computed(() => {
        switch (props.align) {
            case 'start':
                return 'items-start';
            case 'center':
                return 'items-center';
            case 'end':
                return 'items-end';
            case 'between':
                return 'items-between';
            case 'around':
                return 'items-around';
            case 'evenly':
                return 'items-evenly';
            case 'baseline':
                return 'items-baseline';
            case 'stretch':
                return 'items-stretch';
        }
    });

    const rowClassObject: ComputedRef<object> = computed(() => ({
        'flex-row-reverse': props.reverse && !props.column,
        'flex-col-reverse': props.reverse && props.column,
        'flex-col': props.column,
        'flex-nowrap': props.noWrap,
        [`${justification.value} ${alignment.value}`]: true,
    }));
</script>

<template>
    <div class="w-full flex" :class="rowClassObject">
        <slot></slot>
    </div>
</template>

<style scoped>

</style>