<script setup lang="ts">
import { Trash, Pencil } from 'lucide-vue-next'
import { useNotificationStore } from "~/stores/notificationStore";
import Card from "~/components/ui/Card.vue";

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
      title: `Deleted ${ user.value.name }`
    })
    navigateTo('/users')
  } catch (error) {
    throw error
  }
}
</script>

<template>
  <LayoutPage :title="user.name">
    <template #actions>
      <Button
          variant="outline"
          size="sm"
          @click="openModal"
      >
        <Trash class="size-4 mr-2" aria-hidden="true"/>
        Delete
      </Button>
      <Button
          size="sm"
          @click="navigateTo(`/users/${user.id}/edit`)"
      >
        <Pencil class="size-4 mr-2" aria-hidden="true"/>
        Edit
      </Button>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="col-span-2">
        <Card>
          <template #header>
            <h3 class="font-medium">
              General information
            </h3>
          </template>
          <div class="mt-5 border-t border-border">
            <dl class="divide-y divide-border">
              <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium leading-6">Full name</dt>
                <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{ user.name || '-' }}</dd>
              </div>
              <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium leading-6">Email</dt>
                <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{ user.email || '-' }}</dd>
              </div>
              <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium leading-6">Role</dt>
                <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{ user.role || '-' }}</dd>
              </div>
            </dl>
          </div>
        </Card>
      </div>
      <div>
        
      </div>
    </div>

  </LayoutPage>

<!--  <UiConfirmationModal-->
<!--      :title="`Delete ${user.name}`"-->
<!--      message="Are you sure you want to delete this user? All of your data will be permanently removed."-->
<!--      ref="modal">-->
<!--    <template #buttons>-->
<!--      <div class="flex justify-end gap-2">-->
<!--        <UiButton-->
<!--            class="text-gray-700 dark:text-gray-400 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-zinc-900"-->
<!--            size="sm"-->
<!--        >Cancel</UiButton>-->
<!--        <UiButton-->
<!--            class="text-white bg-red-600 hover:bg-red-500"-->
<!--            size="sm"-->
<!--            @click="deleteUser"-->
<!--        >Delete</UiButton>-->
<!--      </div>-->
<!--    </template>-->
<!--  </UiConfirmationModal>-->
</template>

<style scoped>

</style>