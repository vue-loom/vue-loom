<script setup lang="ts">
    import {computed, type ComputedRef} from "vue";
    import {resolveBg} from "@/partials/colors";

    interface Props {
        color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger',
        type?: 'default' | 'floating' | 'inline',
        position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
        dot?: boolean,
        show?: boolean,
        dense?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        color: 'secondary',
        type: 'default',
        position: 'top-right',
        dot: false,
        show: true,
        dense: false,
    });

    const badgeClassObject: ComputedRef<object> = computed(() => ({
        [`${resolveBg(props.color)}`]: props.color,
        'w-2 h-2': props.dot,
        'min-h-[22px] min-w-[22px]': !props.dot && !props.dense,
        'min-h-4 min-w-4': !props.dot && props.dense,
        'w-fit h-fit': props.type === 'inline',
        'absolute': props.type !== 'inline',
        'px-2 font-bold': !props.dense,
        'px-1.5 py-px': props.dense,

        '-right-2 -top-2': props.position === 'top-right' && props.type === 'default' && !props.dot,
        '-left-2 -top-2': props.position === 'top-left' && props.type === 'default' && !props.dot,
        '-left-2 -bottom-2': props.position === 'bottom-left' && props.type === 'default' && !props.dot,
        '-right-2 -bottom-2': props.position === 'bottom-right' && props.type === 'default' && !props.dot,

        '-right-0.5 -top-0.5': props.position === 'top-right' && props.type === 'default' && props.dot,
        '-left-0.5 -top-0.5': props.position === 'top-left' && props.type === 'default' && props.dot,
        '-left-0.5 -bottom-0.5': props.position === 'bottom-left' && props.type === 'default' && props.dot,
        '-right-0.5 -bottom-0.5': props.position === 'bottom-right' && props.type === 'default' && props.dot,

        '-right-5 -top-5': props.position === 'top-right' && props.type === 'floating' && !props.dot,
        '-left-5 -top-5': props.position === 'top-left' && props.type === 'floating' && !props.dot,
        '-left-5 -bottom-5': props.position === 'bottom-left' && props.type === 'floating' && !props.dot,
        '-right-5 -bottom-5': props.position === 'bottom-right' && props.type === 'floating' && !props.dot,

        '-right-1.5 -top-1.5': props.position === 'top-right' && props.type === 'floating' && props.dot,
        '-left-1.5 -top-1.5': props.position === 'top-left' && props.type === 'floating' && props.dot,
        '-left-1.5 -bottom-1.5': props.position === 'bottom-left' && props.type === 'floating' && props.dot,
        '-right-1.5 -bottom-1.5': props.position === 'bottom-right' && props.type === 'floating' && props.dot,
    }));
</script>

<template>
    <div class="relative" :class="type === 'inline' ? 'flex items-center space-x-2' : ''">
        <div>
            <slot name="component"/>
        </div>
        <transition
            enter-active-class="transition-all duration-150"
            enter-from-class="scale-0"
            enter-to-class="scale-100"
            leave-active-class="transition-all duration-150"
            leave-from-class="scale-100"
            leave-to-class="scale-0"
        >
            <div v-if="show"
                 class="flex justify-center items-center text-white text-xs rounded-full"
                 :class="badgeClassObject">
                <slot name="content" v-if="!dot"/>
            </div>
        </transition>
    </div>
</template>

<style scoped>

</style>
