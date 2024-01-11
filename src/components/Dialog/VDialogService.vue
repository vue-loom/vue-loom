<script setup lang="ts">
    import {useDialog} from "@/composables/dialog";
    import VDialog from "@/components/Dialog/VDialog.vue";
    import VButton from "@/components/VButton.vue";
</script>

<template>
    <VDialog v-model="useDialog().value" :persistent="useDialog().persistent">
        <template #title>
            {{ useDialog().title }}
        </template>
        <template #subtitle>
            {{ useDialog().subtitle }}
        </template>
        <template #content>
            {{ useDialog().content }}
        </template>
        <template #actions>
            <VButton
                :type="action.type || 'text'"
                :color="action.color"
                :key="index"
                v-for="(action, index) in useDialog().actions"
                @click="action.handle()"
            >{{ action.label }}
            </VButton>
        </template>
    </VDialog>
</template>

<style scoped>

</style>
