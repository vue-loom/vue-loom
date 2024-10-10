<script setup lang="ts">
import {VButton, VCard, VCardContent, VToast} from "@vue-loom/vue-loom";

const click = () => {
  console.log('Clicked!');
}
</script>

<template>
  <VButton @click="click">Click me</VButton>

  <VCard>
    <VCardContent></VCardContent>
  </VCard>

  <VToast></VToast>
</template>

<style scoped>

</style>