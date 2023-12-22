<template>
  <UiBreadcrumbs v-if="breadcrumbs" class="mb-4"/>

  <header class="mb-10">
    <h1 class="text-3xl font-semibold mb-1">{{ pageTitle }}</h1>
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

const pageTitle = computed(() => {
  const title = props.title || (useRoute().name === 'index' ? 'Dashboard' : useRoute().name)
  return capitalize(title)
})
</script>

<style scoped>

</style>