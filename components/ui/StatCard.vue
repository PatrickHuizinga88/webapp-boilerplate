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
              <div v-if="difference" class="text-green-800 dark:text-green-500 inline-flex items-center text-xs font-medium ml-2.5">
                <div v-if="difference > 0" class="bg-green-100 dark:bg-green-900 text-green-800 inline-flex justify-center rounded-full h-4 w-4 mr-1">
                  <UiIcon name="ArrowUp" class="h-2.5 w-2.5 stroke-3 self-center text-green-700 dark:text-green-300" aria-hidden="true" />
                </div>
                <div v-else class="bg-red-100 dark:bg-red-900 text-red-800 inline-flex justify-center rounded-full h-4 w-4 mr-1">
                  <UiIcon name="ArrowDown" class="h-2.5 w-2.5 stroke-3 self-center text-red-700 dark:text-red-300" aria-hidden="true" />
                </div>
                {{ difference }}%
              </div> 
            </div>
            <span v-if="subtitle" class="text-sm text-gray-400 dark:text-gray-500">
              {{ subtitle }}
            </span>
          </div>
        </div>
      </div>
</template>

<script setup>
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