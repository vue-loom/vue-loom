<script setup lang="ts">
    import STextField from '@/components/VTextField.vue'
    import SStepper from "@/components/SStepper/SStepper.vue";
    import SStep from "@/components/SStepper/SStep.vue";
    import STab from "@/components/STab/STab.vue";
    import STabs from "@/components/STab/STabs.vue";
    import SButton from "@/components/VButton.vue";
    import SIcon from "@/components/VIcon.vue";

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

        <STabs class="mt-4" grow-tabs elevation>
            <STab>
                <template #tab>Tab One</template>
                <template #content>
                    <div>
                        This is the content of tab one
                        <SButton>Text</SButton>
                    </div>
                </template>
            </STab>
            <STab>
                <template #tab>
                    Tab two
                </template>
                <template #content>
                    <div>
                        <div>This is the second tab content with element div</div>
                        <div>This is the second tab content with element div</div>
                        <div>This is the second tab content with element div</div>
                        <div>This is the second tab content with element div</div>
                        <div>This is the second tab content with element div</div>
                        <div>This is the second tab content with element div</div>
                    </div>
                </template>
            </STab>
            <STab>
                <template #tab>
                    Tab three
                </template>
                <template #content>
                    <div>
                        <div>This is the third tab content with element div</div>
                        <div>This is the third tab content with element div</div>
                        <div>This is the third tab content with element div</div>
                        <div>This is the third tab content with element div</div>
                    </div>
                </template>
            </STab>
            <STab>
                <template #tab>
                    Tab four
                </template>
                <template #content>
                    <div>
                        <div>This is the fourth tab content with element div</div>
                    </div>
                </template>
            </STab>
            <STab>
                <template #tab>
                    Tab five
                </template>
                <template #content>
                    <SButton>This works</SButton>
                </template>
            </STab>
        </STabs>

        <SIcon icon="plus"/>
    </main>
</template>

<style lang="scss" scoped>

</style>