<template>
  <div class="overflow-hidden border border-gray-200 dark:border-zinc-800 rounded-xl shadow shadow-black/10 bg-white dark:bg-zinc-900 ">
  <!-- <div class="overflow-hidden rounded-xl border border-gray-300 bg-white dark:bg-zinc-900 dark:border dark:border-zinc-800"> -->

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