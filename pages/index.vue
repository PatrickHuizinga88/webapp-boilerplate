<template>
  <LayoutPage title="Welcome, Patrick! 👋">
    <div class="grid grid-cols-1 md:grid-cols-3 overflow-hidden rounded-xl border border-gray-300 dark:border-zinc-700 divide-y md:divide-y-0 md:divide-x divide-gray-300 dark:divide-zinc-700">
      <UiStatCard title="Customers" :stat="123" :difference="12.5" subtitle="compared to last week"/>
      <UiStatCard title="Users" :stat="10"/>
      <UiStatCard title="Last sign in" :stat="'Yesterday'"/>
    </div>
  </LayoutPage>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default-sidebar'
})
</script>