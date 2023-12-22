<template>
  <header v-if="title" class="mb-10">
    <h1 class="text-3xl font-semibold mb-1">{{ title }}</h1>
    <p v-if="subtitle" class="text-gray-500">{{ subtitle }}</p>
  </header>

  <main>
    <slot/>
  </main>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  subtitle: String,
  breadcrumbs: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>

</style>