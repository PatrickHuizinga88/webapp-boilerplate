<template>
  <!-- <LayoutHeader :customBreadcrumb="customBreadcrumb ? title : undefined" :showBreadcrumbs="breadcrumbs"/> -->

  <LayoutContainer>
    <div v-if="title || $slots.actions" class="min-h-[40px] flex justify-between items-center gap-4 mb-8">
      <header class="shrink overflow-hidden">
        <h1 v-if="title" class="text-3xl font-semibold truncate">{{ title }}</h1>
        <p v-if="subtitle" class="text-muted-foreground mt-1">{{ subtitle }}</p>
      </header>
      <div class="flex gap-4 items-center">
        <slot name="actions" />
      </div>
    </div>

    <main>
      <slot />
    </main>
  </LayoutContainer>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
  customBreadcrumb: Boolean,
  breadcrumbs: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped></style>