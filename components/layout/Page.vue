<script setup lang="ts">
defineProps({
  title: String,
  subtitle: String,
  // customBreadcrumb: Boolean,
  // breadcrumbs: {
  //   type: Boolean,
  //   default: true
  // }
})

</script>

<template>
  <LayoutHeader :pageTitle="title" :pageSubtitle="subtitle"/>

  <div v-if="$slots.actions" :class="cn('flex justify-end items-center gap-4 mb-6')">
    <div class="flex gap-4 items-center">
      <slot name="actions"/>
    </div>
  </div>

  <main>
    <slot/>
  </main>
</template>