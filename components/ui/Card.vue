<template>
  <div class="overflow-hidden rounded-xl shadow-2xl shadow-black/10 dark:bg-zinc-900 dark:border dark:border-zinc-800">

    <div v-if="$slots.header" class="px-4 pt-5 sm:px-6">
      <slot name="header"/>
    </div>

    <div class="px-4 py-5 sm:p-6">
      <slot/>
    </div>

  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>