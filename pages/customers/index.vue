<script setup lang="ts">
import type Customer from '~/types/Customer'
import { PlusCircle, LoaderCircle } from 'lucide-vue-next'

definePageMeta({
  layout: 'default-sidebar',
})

const { data: customers, status } = useFetch<Customer[]>('/api/users')
</script>

<template>
  <LayoutPage :title="$t('customers.customers', 2)">
    <template #actions>
        <Button size="sm" as-child>
          <NuxtLink to="/customers/create">
            <PlusCircle class="size-4" />
            {{$t('common.actions.add', {item: lowercase($t('customers.customers'))})}}
          </NuxtLink>
        </Button>
    </template>
    
    <div v-if="customers?.length" class="flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow-md shadow-black/5 border border-border sm:rounded-2xl">
            <table class="min-w-full divide-y divide-border">
              <thead class="bg-muted">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">{{ $t('common.general.name') }}</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">{{ $t('common.general.email') }}</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">{{ $t('common.actions.edit') }}</span>
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-border bg-card">
              <tr v-for="customer in customers" :key="customer.id">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                  <NuxtLink :to="`/customers/${customer.id}`">{{ customer.name || '-' }}</NuxtLink>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                  <a :href="`mailto:${customer.email}`">{{ customer.email || '-' }}</a>
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <NuxtLink :to="`/customers/${customer.id}/edit`" class="text-primary hover:underline">
                    {{ $t('common.actions.edit') }}<span class="sr-only">, {{ customer.name }}</span>
                  </NuxtLink>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="status === 'pending'" class="flex justify-center">
      <LoaderCircle class="size-8 text-primary animate-spin" />
    </div>
    <div v-else class="w-full text-center">{{ $t('common.no_records_found', {item: $t('customers.customers', 2)}) }}</div>
  </LayoutPage>
</template>
