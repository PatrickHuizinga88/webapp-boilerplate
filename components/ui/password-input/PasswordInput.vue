<script setup lang="ts">
import {useVModel} from "@vueuse/core";
import type {HTMLAttributes} from "vue";
import {Eye} from 'lucide-vue-next'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const showPassword = ref(false)

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <div class="relative rounded-md shadow-sm">
    <Input
        :value="modelValue"
        :class="cn('pr-10', props.class)"
        :type="!showPassword ? 'password' : 'text'"
        v-bind="$attrs"/>
    <button variant="ghost" size="icon" class="absolute inset-y-0 right-0 flex items-center">
      <Eye class="size-5"/>
    </button>
  </div>
</template>