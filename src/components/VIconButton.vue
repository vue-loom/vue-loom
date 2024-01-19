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
    const buttonWidth: Ref<number> = ref(0);
    const buttonHeight: Ref<number> = ref(0);

    const innerDisabled: ComputedRef<boolean> = computed(() => {
        return props.loading || props.disabled;
    });

    const calculateButtonDimensions = (): void => {
        if (button.value) {
            buttonWidth.value = button.value.getBoundingClientRect().width;
            buttonHeight.value = button.value.getBoundingClientRect().height;
        }
    }

    onMounted(() => calculateButtonDimensions());

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

</script>

<template>
    <button ref="button"
            type="button"
            :disabled="innerDisabled"
            class="relative w-fit h-fit hover:bg-opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-default"
            :class="buttonClassObject"
            @click="createRipple($event)"
    >
        <VIcon v-if="!loading" :icon="icon" :size="size" :solid="solid" :color="iconColor"/>
        <div v-else class="flex justify-center items-center"
             :style="{width: `${buttonWidth}px`, height: `${buttonHeight}px`}">
            <VLoader :color="!color ? iconColor : 'default'"/>
        </div>
    </button>
</template>

<style scoped>

</style>