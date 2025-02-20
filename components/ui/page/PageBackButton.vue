<script setup lang="ts">
import { ArrowLeft } from "lucide-vue-next";

defineProps<{
  to?: string
  label: string
}>()
</script>

<template>
<Button variant="ghost" size="sm" class="-ml-3" as-child>
  <NuxtLink :to="to ?? $router.back()">
    <ArrowLeft/>
    {{ label }}
  </NuxtLink>
</Button>
</template>