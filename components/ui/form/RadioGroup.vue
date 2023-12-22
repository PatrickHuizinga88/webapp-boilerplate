<template>
  <fieldset class="mt-2">
<!--    <legend class="sr-only">...</legend>-->
    <div class="space-y-2">
      <div v-for="option in options" :key="option.id" class="flex items-center">
        <input
            :id="option.value"
            name="..."
            type="radio"
            @input="emit( 'update:modelValue', option.value)"
            class="h-4 w-4 border-gray-300 text-primary focus:ring-primary" />
        <label :for="option.value" class="ml-3 block text-sm font-medium leading-6">{{ option.title }}</label>
      </div>
    </div>
  </fieldset>
</template>

<script setup>
const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  invalid: Boolean,
  modelValue: [String, Number]
})

const field = inject("field", props)

const emit = defineEmits(['update:modelValue'])
</script>