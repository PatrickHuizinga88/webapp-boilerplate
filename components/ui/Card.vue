<template>
  <div class="overflow-hidden border border-border rounded-xl shadow shadow-black/10 bg-card">
    <div v-if="$slots.header" class="px-4 pt-5 sm:px-6">
      <slot name="header"/>
    </div>

    <slot/>

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>