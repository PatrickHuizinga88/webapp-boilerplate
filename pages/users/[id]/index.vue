<template>
  <LayoutPage :title="user.name">
    <template #buttons>
      <UiButton
          class="text-white bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-500"
          size="sm"
          @click="navigateTo(`/users/${user.id}/edit`)"
      >
        Delete
      </UiButton>
      <UiButton
          class="text-white bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-500"
          size="sm"
          @click="navigateTo(`/users/${user.id}/edit`)"
      >
        Edit
      </UiButton>
    </template>
  </LayoutPage>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default-sidebar',
})

const { data: user } = await useFetch('/api/users', {
  query: {
    id: useRoute().params.id
  }
})
</script>

<style scoped>

</style>