<script setup lang="ts">
    import dayjs from "dayjs";

    interface Slot {
        default(): {
            children: string;
        }[];
    }

    const slots = defineSlots<Slot>();

    const value: string = slots.default()[0].children.toString();
</script>

<template>
    <div class="text-gray-700" v-if="value">
        {{ dayjs(value).format('D MMMM YYYY') }}
    </div>
    <div v-else>-</div>
</template>

<style scoped>

</style>
