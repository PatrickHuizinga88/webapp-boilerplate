<script setup lang="ts">
import {Trash, Pencil} from 'lucide-vue-next'
import {useNotificationStore} from "~/stores/notificationStore";
import {Card} from "~/components/ui/card";
import type Customer from "~/types/Customer";

definePageMeta({
  layout: 'default-sidebar',
})

const notificationStore = useNotificationStore()
const {t} = useI18n()

const dialogOpen = ref(false)

// TODO: Get customer from Supabase
const {data: customer} = await useFetch<Customer>('/api/users', {
  query: {
    id: useRoute().params.id
  }
})

const deleteCustomer = async () => {
  try {

    // TODO: Delete customer

    notificationStore.createNotification({
      type: 'success',
      action: 'delete',
      item: customer.value?.name || t('customers.customers'),
    })
    navigateTo('/customers')
  } catch (error) {
    notificationStore.createNotification({
      type: 'destructive',
      action: 'delete',
      item: customer.value?.name || t('customers.customers'),
    })
    console.error(error)
  }
}
</script>

<template>
  <LayoutPage :title="customer?.name || $t('customers.customers')" :customBreadcrumb="true">
    <template #actions>
      <Dialog v-model:open="dialogOpen">
        <DialogTrigger as-child>
          <Button
            variant="outline"
            size="sm"
          >
            <Trash class="size-4" aria-hidden="true"/>
            {{ $t('common.actions.delete') }}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{{ $t('common.actions.delete', {item: customer.name || $t('customers.customers')}) }}</DialogTitle>
            <DialogDescription>
              {{ $t('common.actions.delete_confirmation', {item: $t('customers.customers')}) }}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              @click="dialogOpen = false"
            >
              {{ $t('common.actions.cancel') }}
            </Button>
            <Button
              variant="destructive"
              @click="deleteCustomer"
            >
              {{ $t('common.actions.delete') }}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        size="sm"
        asChild
      >
        <NuxtLink :to="`/customers/${customer.id}/edit`">
          <Pencil class="size-4" aria-hidden="true"/>
          {{ $t('common.actions.edit') }}
        </NuxtLink>
      </Button>
    </template>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="col-span-1">
        <Card :title="$t('customers.general_information')">
          <dl class="space-y-4">
            <div class="sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium leading-6">{{ $t('common.general.name') }}</dt>
              <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{ customer.name || '-' }}</dd>
            </div>
            <div class="sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="text-sm font-medium leading-6">{{ $t('common.general.email') }}</dt>
              <dd class="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">{{
                  customer.email || '-'
                }}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
      <div>

      </div>
    </div>

  </LayoutPage>
</template>
