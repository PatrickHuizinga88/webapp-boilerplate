<script setup lang="ts">
import type User from "~/types/User";

definePageMeta({
  layout: 'default-sidebar'
})

const { data: user } = await useFetch<User>('/api/users', {
  query: { id: useRoute().params.id }
})
</script>

<template>
  <LayoutPage>
    <FormUser v-if="user" :user="user" />
    <p v-else>User not found</p>
  </LayoutPage>
</template>