<script setup>
import { ArrowUp, ArrowDown } from 'lucide-vue-next'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  stat: {
    type: [String, Number],
    required: true
  },
  difference: [String, Number],
  subtitle: String
})
</script>

<template>
    <div class="p-6">
        <h3 class="font-semibold mb-4">
          {{ title }}
        </h3>
        <div class="flex items-end">
          <div class="mt-4">
            <div class="flex items-center">
              <span class="text-2xl font-semibold">
                {{ stat }}
              </span>
              <div v-if="difference" class="text-success inline-flex items-center text-xs font-medium ml-2.5">
                <div v-if="difference > 0" class="bg-success/10 text-success inline-flex justify-center rounded-full size-4 mr-1">
                  <ArrowUp class="size-2.5 self-center text-success" aria-hidden="true" />
                </div>
                <div v-else class="bg-destructive/10 text-destructive inline-flex justify-center rounded-full size-4 mr-1">
                  <ArrowDown class="size-2.5 self-center text-destructive" aria-hidden="true" />
                </div>
                {{ difference }}%
              </div> 
            </div>
            <span v-if="subtitle" class="text-sm text-muted-foreground">
              {{ subtitle }}
            </span>
          </div>
        </div>
      </div>
</template>