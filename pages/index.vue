<template>
  <LayoutPage title="Welcome, Patrick! 👋">
    <div class="grid grid-cols-1 md:grid-cols-3 overflow-hidden rounded-xl border border-gray-300 dark:border-zinc-700 divide-y md:divide-y-0 md:divide-x divide-gray-300 dark:divide-zinc-700">
      <div class="p-6">
        <h3 class="font-semibold mb-4">
          Customers
        </h3>
        <div class="flex items-end">
          <div class="mt-4">
            <div class="flex items-center">
              <span class="text-2xl font-semibold">123</span>
              <div class="text-green-800 dark:text-green-500 inline-flex items-center text-xs font-medium ml-2.5">
                <div class="bg-green-100 dark:bg-green-800 text-green-800 inline-flex justify-center rounded-full h-3.5 w-3.5 mr-1">
                  <UiIcon name="ArrowUp" class="h-2.5 w-2.5 stroke-3 self-center text-green-700 dark:text-green-300" aria-hidden="true" />
                </div>
                <span class="sr-only">Increased by </span>
                {{ '12.5%'}}
              </div>
            </div>
            <span class="text-sm text-gray-400 dark:text-gray-500">
              compared to last week
            </span>
          </div>
        </div>
      </div>
      <div class="p-6">Test</div>
      <div class="p-6">Last sign in</div>
    </div>
  </LayoutPage>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default-sidebar'
})
</script>