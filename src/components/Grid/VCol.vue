<script setup lang="ts">
    import {computed, type ComputedRef} from "vue";

    interface Props {
        grow?: boolean;
        shrink?: boolean;
        cols?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | null;
        sm?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | null;
        md?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | null;
        lg?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | null;
        xl?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | null;
    }

    const props = withDefaults(defineProps<Props>(), {
        grow: false,
        shrink: false,
        cols: null,
        sm: null,
        md: null,
        lg: null,
        xl: null,
    });

    const colsFlexBasis: ComputedRef<string> = computed(() => {
        switch (props.cols) {
            case '1':
                return 'basis-1/12';
            case '2':
                return 'basis-2/12';
            case '3':
                return 'basis-3/12';
            case '4':
                return 'basis-4/12';
            case '5':
                return 'basis-5/12';
            case '6':
                return 'basis-6/12';
            case '7':
                return 'basis-7/12';
            case '8':
                return 'basis-8/12';
            case '9':
                return 'basis-9/12';
            case '10':
                return 'basis-10/12';
            case '11':
                return 'basis-11/12';
            case '12':
                return 'basis-full';
            default:
                return '';
        }
    });

    const smFlexBasis: ComputedRef<string> = computed(() => {
        switch (props.sm) {
            case '1':
                return 'sm:basis-1/12';
            case '2':
                return 'sm:basis-2/12';
            case '3':
                return 'sm:basis-3/12';
            case '4':
                return 'sm:basis-4/12';
            case '5':
                return 'sm:basis-5/12';
            case '6':
                return 'sm:basis-6/12';
            case '7':
                return 'sm:basis-7/12';
            case '8':
                return 'sm:basis-8/12';
            case '9':
                return 'sm:basis-9/12';
            case '10':
                return 'sm:basis-10/12';
            case '11':
                return 'sm:basis-11/12';
            case '12':
                return 'sm:basis-full';
            default:
                return '';
        }
    });

    const mdFlexBasis: ComputedRef<string> = computed(() => {
        switch (props.md) {
            case '1':
                return 'md:basis-1/12';
            case '2':
                return 'md:basis-2/12';
            case '3':
                return 'md:basis-3/12';
            case '4':
                return 'md:basis-4/12';
            case '5':
                return 'md:basis-5/12';
            case '6':
                return 'md:basis-6/12';
            case '7':
                return 'md:basis-7/12';
            case '8':
                return 'md:basis-8/12';
            case '9':
                return 'md:basis-9/12';
            case '10':
                return 'md:basis-10/12';
            case '11':
                return 'md:basis-11/12';
            case '12':
                return 'md:basis-full';
            default:
                return '';
        }
    });

    const lgFlexBasis: ComputedRef<string> = computed(() => {
        switch (props.lg) {
            case '1':
                return 'lg:basis-1/12';
            case '2':
                return 'lg:basis-2/12';
            case '3':
                return 'lg:basis-3/12';
            case '4':
                return 'lg:basis-4/12';
            case '5':
                return 'lg:basis-5/12';
            case '6':
                return 'lg:basis-6/12';
            case '7':
                return 'lg:basis-7/12';
            case '8':
                return 'lg:basis-8/12';
            case '9':
                return 'lg:basis-9/12';
            case '10':
                return 'lg:basis-10/12';
            case '11':
                return 'lg:basis-11/12';
            case '12':
                return 'lg:basis-full';
            default:
                return '';
        }
    });

    const xlFlexBasis: ComputedRef<string> = computed(() => {
        switch (props.xl) {
            case '1':
                return 'xl:basis-1/12';
            case '2':
                return 'xl:basis-2/12';
            case '3':
                return 'xl:basis-3/12';
            case '4':
                return 'xl:basis-4/12';
            case '5':
                return 'xl:basis-5/12';
            case '6':
                return 'xl:basis-6/12';
            case '7':
                return 'xl:basis-7/12';
            case '8':
                return 'xl:basis-8/12';
            case '9':
                return 'xl:basis-9/12';
            case '10':
                return 'xl:basis-10/12';
            case '11':
                return 'xl:basis-11/12';
            case '12':
                return 'xl:basis-full';
            default:
                return '';
        }
    });

    const colClassObject: ComputedRef<object> = computed(() => ({
        [colsFlexBasis.value]: props.cols && !props.grow && !props.shrink,
        [smFlexBasis.value]: props.sm && !props.grow && !props.shrink,
        [mdFlexBasis.value]: props.md && !props.grow && !props.shrink,
        [lgFlexBasis.value]: props.lg && !props.grow && !props.shrink,
        [xlFlexBasis.value]: props.xl && !props.grow && !props.shrink,
        'grow shrink-0': props.grow,
        'shrink grow-0': props.shrink,
    }));
</script>

<template>
    <div :class="colClassObject">
        <slot></slot>
    </div>
</template>

<style scoped>

</style>