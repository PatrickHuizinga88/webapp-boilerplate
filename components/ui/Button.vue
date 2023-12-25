<template>
  <button
      :class="[size, 'rounded-md font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500']"
      v-bind="$attrs">
    <slot/>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  size: String
})

const size = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'text-sm px-3 py-2'
    case 'md':
      return 'text-sm px-3.5 py-2.5'
    case 'lg':
      return 'text-base px-4 py-3'
    default:
      return 'text-sm px-3.5 py-2.5'
  }
})
</script>

<style scoped>

</style>