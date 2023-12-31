<script setup lang="ts">
    import SListItem from "@/components/SListItem.vue";
    import {ChevronDownIcon} from "@heroicons/vue/24/outline";
    import {type Ref, ref} from "vue";

    interface Props {
        readonly?: boolean;
        disabled?: boolean;
        open?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        readonly: false,
        disabled: false,
        open: false,
    });

    const focused: Ref<boolean> = ref(props.open);
    const panel: Ref<HTMLElement | null> = ref(null);

    interface Emits {
        (event: 'update:open', data: boolean);
    }

    const emits = defineEmits<Emits>();

    const arrowClicked = () => {
        focused.value = !focused.value;

        emits('update:open', focused.value);
    }
</script>

<template>
    <div class="overflow-hidden transition-all duration-150">
        <SListItem
            class="select-none cursor-pointer"
            :disabled="disabled"
            @click="!readonly && !disabled ? arrowClicked() : ''"
        >
            <template #title>
                <slot name="title"/>
            </template>
            <template #subtitle>
                <slot name="subtitle"/>
            </template>
            <template #suffix>
                <div class="flex justify-center items-center h-full pr-2">
                    <ChevronDownIcon
                        class="w-5 h-5 text-gray-500 transition-all duration-150"
                        aria-disabled="true"
                        :class="[focused ? `rotate-180` : '']"
                    />
                </div>
            </template>
        </SListItem>

        <div ref="panel"
             class="bg-white transition-all duration-150 text-gray-700"
             :class="[focused ? 'border-t' : '']"
             :style="{height: !focused ? '0px' : `${panel.scrollHeight}px`}"
        >
            <slot name="content"/>
        </div>
    </div>
</template>

<style scoped>

</style>
