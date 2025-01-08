<script setup lang="ts">
    import {useAppMenu} from "../composables/useAppMenu.ts";

    const appMenu = useAppMenu();
</script>

<template>
    <div v-if="appMenu.isDrawer.value" class="w-fit" @click.stop="appMenu.toggle()">
        <slot/>
    </div>
</template>

<style scoped>

</style>