<script setup lang="ts">
    interface Slot {
        default(): {
            children: string;
        }[];
    }

    const slots = defineSlots<Slot>();

    const value: string = slots.default()[0].children.toString().split('_').join(' ');
</script>

<template>
    <div class="font-bold uppercase text-sm" v-if="value" v-text="value"></div>
    <div v-else>-</div>
</template>

<style scoped>

</style>
