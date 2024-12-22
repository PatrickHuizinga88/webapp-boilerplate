<script setup lang="ts">
import type User from '~/types/User'
import { PlusCircle, LoaderCircle } from 'lucide-vue-next'

definePageMeta({
  layout: 'default-sidebar',
})

const { data: users, status } = useFetch<User[]>('/api/users')
</script>

<template>
  <LayoutPage>
    <template #actions>
        <Button as-child>
          <NuxtLink to="/users/create">
            <PlusCircle class="size-5 mr-1.5" />
            Add user
          </NuxtLink>
        </Button>
    </template>
    
    <div v-if="users?.length" class="flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow-md shadow-black/5 border border-border sm:rounded-2xl">
            <table class="min-w-full divide-y divide-border">
              <thead class="bg-muted">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">Name</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">Email</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">Role</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-border bg-card">
              <tr v-for="user in users" :key="user.email">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                  <NuxtLink :to="`/users/${user.id}`">{{ user.name || '-' }}</NuxtLink>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                  <a :href="`mailto:${user.email}`">{{ user.email || '-' }}</a>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">{{ user.role || '-' }}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <NuxtLink :to="`/users/${user.id}/edit`" class="text-primary hover:underline">
                    Edit<span class="sr-only">, {{ user.name }}</span>
                  </NuxtLink>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="status === 'pending'" class="w-full text-center">
      <LoaderCircle class="size-8 text-primary" />
    </div>
    <div class="w-full text-center" v-else>No users found</div>
  </LayoutPage>
</template>