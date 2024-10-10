<script setup lang="ts">
import {VButton, VCard, VCardContent} from "@vue-loom/vue-loom";

const click = () => {
  console.log('Clicked!');
}
</script>

<template>
  <VButton @click="click">Click me</VButton>

  <VCard>
    <VCardContent></VCardContent>
  </VCard>
</template>

<style scoped>

</style>