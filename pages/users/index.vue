<script setup lang="ts">
definePageMeta({
  layout: 'default-sidebar',
})

const { data: users } = await useFetch('/api/users')
</script>

<template>
  <LayoutPage>
    <template #buttons>
      <NuxtLink to="/users/create">
        <UiButton size="sm" class="text-white bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-500">
          Add user
        </UiButton>
      </NuxtLink>
    </template>
    
    <div v-if="users.length" class="flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-xl">
            <table class="min-w-full divide-y divide-gray-300 dark:divide-zinc-700">
              <thead class="bg-gray-100 dark:bg-zinc-800">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6">Name</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">Email</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold">Role</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
              <tr v-for="user in users" :key="user.email">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium sm:pl-6">
                  <NuxtLink :to="`/users/${user.id}`">{{ user.name || '-' }}</NuxtLink>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <a :href="`mailto:${user.email}`">{{ user.email || '-' }}</a>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ user.role || '-' }}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <NuxtLink :to="`/users/${user.id}/edit`" class="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
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
    <div v-else>No users found</div>
  </LayoutPage>
</template>