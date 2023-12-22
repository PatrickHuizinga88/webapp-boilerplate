<template>
  <nav class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
    <div class="-mt-px flex w-0 flex-1 ml-4">
      <button @click="emit('changePage', currentPage - 1)" :disabled="currentPage === 0" class="inline-flex items-center border-t-2 border-transparent pr-1 py-4 text-sm font-medium enabled:text-gray-500 disabled:text-gray-300 enabled:hover:border-gray-300 enabled:hover:text-gray-700">
        <Icon name="ArrowLongLeft" class="mr-3 h-5 w-5" aria-hidden="true" />
        Vorige
      </button>
    </div>
    <div class="hidden md:-mt-px md:flex">
      <button
          v-for="page in pagination"
          @click="emit('changePage', page - 1)"
          :class="[currentPage === page - 1 ? 'border-primary-500 text-primary-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'inline-flex items-center border-t-2 px-4 py-4 text-sm font-medium']"
          aria-current="page">{{ page }}</button>
    </div>
    <div class="-mt-px flex w-0 flex-1 justify-end mr-4">
      <button @click="emit('changePage', currentPage + 1)" :disabled="currentPage === pagination - 1" class="inline-flex items-center border-t-2 border-transparent pl-1 py-4 text-sm font-medium enabled:text-gray-500 disabled:text-gray-300 enabled:hover:border-gray-300 enabled:hover:text-gray-700">
        Volgende
        <Icon name="ArrowLongRight" class="ml-3 h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps({
  pagination: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['changePage'])
</script>

<style scoped>

</style>