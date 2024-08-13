<template>
  <LayoutPage title="Welcome, Patrick! 👋">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Customers" :stat="123" :difference="12.5" subtitle="compared to last week"/>
      <StatCard title="Users" :stat="10"/>
      <StatCard title="Last sign in" :stat="'Yesterday'"/>
    </div>
  </LayoutPage>
</template>

<script setup lang="ts">
import StatCard from "~/components/ui/StatCard.vue";

definePageMeta({
  layout: 'default-sidebar'
})
</script>