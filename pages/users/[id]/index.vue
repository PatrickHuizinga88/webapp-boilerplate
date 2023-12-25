<template>
  <LayoutPage :title="user.name">
    <template #buttons>
      <UiButton
          class="flex items-center border bg-white dark:bg-black dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white"
          size="sm"
          @click="openModal"
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

  <UiConfirmationModal
      :title="`Delete ${user.name}`"
      message="Are you sure you want to delete this user? All of your data will be permanently removed."
      ref="modal">
    <template #buttons>
      <div class="flex justify-end gap-2">
        <UiButton
            class="text-gray-700 dark:text-gray-400 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-zinc-900"
            size="sm"
        >Cancel</UiButton>
        <UiButton
            class="text-white bg-red-600 hover:bg-red-500"
            size="sm"
            @click="deleteUser"
        >Delete</UiButton>
      </div>
    </template>
  </UiConfirmationModal>
</template>

<script setup lang="ts">
import { useNotificationStore } from "~/stores/notificationStore";

definePageMeta({
  layout: 'default-sidebar',
})

const notificationStore = useNotificationStore()

const modal = ref(null)

const { data: user } = await useFetch('/api/users', {
  query: {
    id: useRoute().params.id
  }
})

const openModal = () => {
  modal.value.toggle()
}

const deleteUser = async () => {
  try {
    console.log('delete user')
    modal.value.toggle()
    notificationStore.createNotification({
      type: 'success',
      icon: 'CheckCircle',
      title: `Deleted ${ user.value.name }`
    })
    navigateTo('/users')
  } catch (error) {
    throw error
  }
}
</script>

<style scoped>

</style>