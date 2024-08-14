<script setup lang="ts">
import { Trash, Pencil } from 'lucide-vue-next'
import { useNotificationStore } from "~/stores/notificationStore";
import Card from "~/components/ui/Card.vue";
import type User from "~/types/User";

definePageMeta({
  layout: 'default-sidebar',
})

const notificationStore = useNotificationStore()

const dialogOpen = ref(false)

const { data: user } = await useFetch<User>('/api/users', {
  query: {
    id: useRoute().params.id
  }
})

const deleteUser = async () => {
  try {

    // Delete user

    notificationStore.createNotification({
      type: 'success',
      title: `Deleted ${ user.value?.name || 'user'}`
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
      <Dialog v-model:open="dialogOpen">
        <DialogTrigger as-child>
          <Button
              variant="outline"
              size="sm"
          >
            <Trash class="size-4 mr-2" aria-hidden="true"/>
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete {{ user.name }}</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? It will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
                variant="outline"
                @click="dialogOpen = false"
            >
              Cancel
            </Button>
            <Button
                variant="destructive"
                @click="deleteUser"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
          size="sm"
          @click="navigateTo(`/users/${user.id}/edit`)"
      >
        <Pencil class="size-4 mr-2" aria-hidden="true"/>
        Edit
      </Button>
    </template>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="col-span-1">
        <Card title="General information">
          <dl class="space-y-4">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium leading-6">Full name</dt>
              <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{ user.name || '-' }}</dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium leading-6">Email</dt>
              <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{ user.email || '-' }}</dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium leading-6">Role</dt>
              <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{ user.role || '-' }}</dd>
            </div>
          </dl>
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