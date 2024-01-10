<template>
    <main>
        <h1 class="bg-blue-600 text-9xl">Welcome to your your sandbox environment</h1>

        <div class="w-10 h-10 bg-red-500"></div>

        <h1 class="text-3xl font-bold underline">
            Hello world!
        </h1>

        <SCard color="red-500">
            <template #title>
                Page Title
            </template>
            <template #subtitle>
                This is my subtitle
            </template>
            <template #content>
                <STextField
                    class="w-full"
                    label="This is a very long label for my input"
                />
            </template>
        </SCard>
    </main>
</template>

<script setup lang="ts">
    import SCard from '../src/components/SCard.vue'
    import STextField from '../src/components/STextField.vue'
</script>

<style lang="scss" scoped></style>