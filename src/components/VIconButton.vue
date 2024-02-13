<script setup lang="ts">
    import VIcon from "@/components/VIcon.vue";
    import {resolveBg} from "@/partials/colors";
    import {computed, ComputedRef, onMounted, ref, Ref} from "vue";
    import {useRipple} from "@/composables/mouse";
    import VLoader from "@/components/VLoader.vue";

    interface Props {
        icon: string,
        size?: number | string | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
        solid?: boolean,
        color?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
        iconColor?: string | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
        rounded?: boolean,
        elevation?: boolean,
        disabled?: boolean,
        loading?: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        icon: '',
        size: 'sm',
        solid: false,
        color: '',
        iconColor: 'primary',
        rounded: false,
        elevation: false,
        disabled: false,
        loading: false,
    });

    const button: Ref<HTMLElement | null> = ref(null);

    const innerDisabled: ComputedRef<boolean> = computed(() => {
        return props.loading || props.disabled;
    });

    const createRipple = (event: MouseEvent) => {
        useRipple(event, button);
    }

    const buttonClassObject: ComputedRef<object> = computed(() => ({
        [resolveBg(props.color)]: props.color,
        'rounded-full': props.rounded,
        'rounded-lg': !props.rounded,
        'shadow-md': props.elevation,
        'hover:bg-gray-200 p-1': !props.color,
    }));

    const loaderClassObject: ComputedRef<object> = computed(() => ({
        [resolveBg(props.color)]: props.color,
        'rounded-full': props.rounded,
        'rounded-lg': !props.rounded,
        'shadow-md': props.elevation,
        'hover:bg-gray-200 p-1 bg-white': !props.color,
    }));

</script>

<template>
    <button ref="button"
            type="button"
            :disabled="innerDisabled"
            class="relative w-fit h-fit hover:bg-opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-default flex justify-center items-center"
            :class="buttonClassObject"
            @click="createRipple($event)"
    >
        <VIcon :icon="icon" :size="size" :solid="solid" :color="iconColor"/>
        <div v-if="loading"
             class="absolute flex justify-center items-center w-full h-full"
             :class="loaderClassObject"
        >
            <VLoader :color="!color ? iconColor : 'default'"/>
        </div>
    </button>
</template>

<style scoped>

</style>