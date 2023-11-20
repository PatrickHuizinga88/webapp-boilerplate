<template>
  <div class="relative rounded-md shadow-sm">
    <input
        :id="field.id"
        :value="props.modelValue"
        @input="emit( 'update:modelValue', $event.target.value)"
        :required="field.required"
        :class="[invalid ? 'ring-red-500' : 'ring-gray-300', 'block w-full rounded-md border-0 py-1.5 pr-10 pl-3 ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:leading-6 sm:text-sm']"
        v-bind="$attrs"/>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      <slot aria-hidden="true"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  invalid: Boolean,
  modelValue: [String, Number]
})

defineOptions({
  inheritAttrs: false
})

const field = inject("field", props)

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>

</style>