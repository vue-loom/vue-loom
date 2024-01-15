<script setup lang="ts">
    import {type Ref, ref} from "vue";
    // import {useRipple} from "@/composables/mouse";

    const toolbarAction: Ref<HTMLElement | null> = ref(null);

    // interface Emits {
    //     (event: 'click'): void;
    // }

    // const emits = defineEmits<Emits>();
    //
    // const clickAction = (event: MouseEvent): void => {
    //     if (toolbarAction.value) {
    //         useRipple(event, toolbarAction, '#fff');
    //     }
    //
    //     emits('click');
    // };
</script>

<template>
    <!--    @click="clickAction"-->
    <div
        class="h-16 w-fit relative overflow-hidden text-white px-3 flex items-center space-x-1 bg-white/0 hover:bg-white/10 active:bg-white/20 cursor-pointer transition-all duration-150"
        ref="toolbarAction"

    >
        <slot></slot>
    </div>
</template>

<style scoped>

</style>