<script setup lang="ts">
    import {computed, type ComputedRef} from "vue";
    import {resolveBg} from "@/partials/colors";

    interface Props {
        color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger',
        rounded?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        color: 'secondary',
        rounded: false,
    })

    const tagClassObject: ComputedRef<object> = computed(() => ({
        [`${resolveBg(props.color)}`]: props.color,
        'rounded-full': props.rounded,
        'rounded-md': !props.rounded,
    }));
</script>

<template>
    <div>
        <div class="flex justify-center items-center text-white text-xs font-bold px-1 min-h-[22px] min-w-[22px]"
             :class="tagClassObject">
            <slot name="content"/>
        </div>
    </div>
</template>

<style scoped>

</style>

