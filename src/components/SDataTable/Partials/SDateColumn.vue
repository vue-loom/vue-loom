<script setup lang="ts">
    import {useSlots} from "vue";
    import dayjs from "dayjs";

    const value: string = useSlots().default().at(0).children.toString();
</script>

<template>
    <div class="text-gray-700" v-if="value">
        {{ dayjs(value).format('D MMMM YYYY') }}
    </div>
    <div v-else>-</div>
</template>

<style scoped>

</style>
