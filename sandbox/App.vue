<script setup lang="ts">
    import STextField from '../src/components/STextField.vue'
    import SStepper from "@/components/SStepper/SStepper.vue";
    import SStep from "@/components/SStepper/SStep.vue";
</script>

<template>
    <main>
        <h1>Welcome to your sandbox environment</h1>

<!--        <STextField-->
<!--            class="w-full"-->
<!--            label="This is a very long label for my input"-->
<!--        />-->

        <SStepper class="mt-4" clickable preserve-state elevation>
            <SStep>
                <template #step>
                    <div>Step One</div>
                </template>
                <template #content>
                    The first step is to move to step two!
                </template>
            </SStep>
            <SStep>
                <template #step>
                    Step Two
                </template>
                <template #content>
                    The second step is to move to step three!
                </template>
            </SStep>
            <SStep>
                <template #step>
                    Step Three
                </template>
                <template #content>
                    This is the last step. Weldon!!
                </template>
            </SStep>
        </SStepper>
    </main>
</template>

<style lang="scss" scoped>

</style>