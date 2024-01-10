<script setup lang="ts">
    import {useDialog} from "@/components/Composables/dialog";
    import SDialog from "@/components/SDialog/SDialog.vue";
    import SButton from "@/components/VButton.vue";
</script>

<template>
    <SDialog v-model="useDialog().value" :persistent="useDialog().persistent">
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
            <SButton
                :type="action.type || 'text'"
                :color="action.color"
                :key="index"
                v-for="(action, index) in useDialog().actions"
                @click="action.handle()"
            >{{ action.label }}
            </SButton>
        </template>
    </SDialog>
</template>

<style scoped>

</style>
