<script setup lang="ts">
import type {HTMLAttributes} from "vue";

interface CardProps {
  title?: string
  description?: string
  bodyPadding?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<CardProps>(), {
  bodyPadding: true
})
</script>

<template>
  <div :class="cn('overflow-hidden border border-border rounded-2xl shadow shadow-black/5 bg-card', props.class)">
    <div class="flex items-start justify-between gap-4 px-4 py-5 sm:px-6">
      <slot name="header"/>
      <div v-if="!$slots.header">
        <h3 v-if="title" class="h4 mb-0.5">
          {{ title }}
        </h3>
        <p class="text-sm text-muted-foreground">{{ description }}</p>
      </div>
      <div v-if="$slots.action" class="-mt-1.5 -mr-3">
        <slot name="action"/>
      </div>
    </div>

    <div :class="{'px-4 sm:px-6 pb-5': bodyPadding}">
      <slot/>
    </div>

  </div>
</template>