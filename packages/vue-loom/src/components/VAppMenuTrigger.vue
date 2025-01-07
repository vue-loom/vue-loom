<script setup lang="ts">
    import {useAppMenu} from "../composables/useAppMenu.ts";

    const appMenu = useAppMenu();
</script>

<template>
    <div @click.stop="appMenu.toggle()">
        <slot/>
    </div>
</template>

<style scoped>

</style>