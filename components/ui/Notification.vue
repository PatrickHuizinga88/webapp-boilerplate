<template>
  <div v-if="show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5">
    <div class="p-4">
      <div class="flex items-start">
        <div v-if="icon" class="flex-shrink-0">
          <UiIcon v-if="type === 'success'" :name="icon" class="h-6 w-6 text-green-400" aria-hidden="true" />
          <UiIcon v-else-if="type === 'warning'" :name="icon" class="h-6 w-6 text-amber-400" aria-hidden="true" />
          <UiIcon v-else-if="type === 'danger'" :name="icon" class="h-6 w-6 text-red-500" aria-hidden="true" />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium">{{ title }}</p>
          <p v-if="$slots.default" class="mt-1 text-sm text-gray-500"><slot/></p>
        </div>
        <div class="ml-4 flex flex-shrink-0">
          <button type="button" @click="show = false" class="inline-flex rounded-md bg-white dark:bg-zinc-800 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            <span class="sr-only">Close</span>
            <UiIcon name="XMark" class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: String,
  icon: String,
  title: String
})
const show = ref(true)
</script>

<style scoped>

</style>