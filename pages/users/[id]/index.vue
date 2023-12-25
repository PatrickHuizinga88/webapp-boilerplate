<template>
  <LayoutPage :title="user.name">
    <template #buttons>
      <UiButton
          class="flex items-center border bg-white dark:bg-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white"
          size="sm"
          @click="deleteUser"
      >
        <UiIcon name="Trash" class="h-4 w-4 stroke-2 mr-2" aria-hidden="true"/>
        Delete
      </UiButton>
      <UiButton
          class="flex items-center text-white bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-500"
          size="sm"
          @click="navigateTo(`/users/${user.id}/edit`)"
      >
        <UiIcon name="Pencil" class="h-4 w-4 stroke-2 mr-2" aria-hidden="true"/>
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

const deleteUser = () => {
  console.log('delete user')
}
</script>

<style scoped>

</style>