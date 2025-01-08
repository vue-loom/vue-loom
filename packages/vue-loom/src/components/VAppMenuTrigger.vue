<script setup lang="ts">
    import {useAppMenu} from "../composables/useAppMenu";

    const appMenu = useAppMenu();
</script>

<template>
    <div class="w-fit cursor-pointer" v-if="appMenu.isDrawer.value" @click.stop="appMenu.toggle()">
        <slot/>
    </div>
</template>

<style scoped>

</style>