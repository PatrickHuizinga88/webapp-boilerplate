<template>
  <select
      :id="field.id"
      :value="modelValue"
      @change="emit('update:modelValue', $event.target.value)"
      :required="field.required"
      :class="[invalid ? 'ring-red-500' : 'ring-gray-300', 'block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-primary-500 sm:leading-6 sm:text-sm']"
      v-bind="$attrs"
  >
    <option v-if="placeholder" value="" hidden>{{ placeholder }}</option>
    <option v-for="option in options" class="text-inherit" :value="option.value ?? option">{{ option.label ?? option }}</option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  placeholder: String,
  invalid: Boolean,
  modelValue: [String, Number]
})

const field = inject("field", props)

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>

</style>