<template>
  <div v-if="title || $slots.buttons" class="flex justify-between items-center mb-10">
    <header>
      <h1 v-if="title" class="text-2xl font-semibold">{{ title }}</h1>
      <p v-if="subtitle" class="text-gray-500 mt-1">{{ subtitle }}</p>
    </header>
    <div class="flex gap-4 items-center">
      <slot name="buttons"/>
    </div>
  </div>

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