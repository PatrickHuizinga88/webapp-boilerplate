<template>
  <Popover v-slot="{ open, close }" class="relative inline">
    <PopoverButton class="leading-none focus-visible:outline-none"
                   @mouseover="show = true"
                   @mouseleave="show = false">
      <slot name="button"/>
    </PopoverButton>
    <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
    >
      <div v-if="show">
        <PopoverPanel
            static
            class="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm dark:bg-gray-700" :class="[checkPosition, 'left-1/2 -translate-x-1/2 bottom-10']">
          <slot/>
          <div :class="`tooltip-arrow tooltip-arrow--${position} absolute rounded-sm bg-inherit h-3 w-3`"></div>
        </PopoverPanel>
      </div>
    </transition>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

const props = defineProps({
  position: {
    type: String,
    default: 'top'
  },
  onHover: {
    type: Boolean,
    default: false
  },
  dark: Boolean
})

const show = ref<boolean>(false)
const popoverTimeout = ref(null)

const hoverPopover = () => {
  // show.value = true
  // if (!open) e.target.click()
}

// const closePopover = () => {
//   popoverHover.value = false
//   if (popoverTimeout.value) clearTimeout(popoverHover.value)
//   popoverTimeout.value = setTimeout(() => {
//     if (!popoverHover.value) close()
//   }, 100)
// }

const checkPosition = computed(() => {
  switch (props.position) {
    case 'top':
      return 'left-1/2 -translate-x-1/2 bottom-8'
    case 'bottom':
      return 'left-1/2 -translate-x-1/2 top-8'
    case 'right':
      return 'sm:left-8 sm:bottom-auto sm:-translate-x-0 sm:top-1/2 sm:-translate-y-1/2'
    case 'left':
      return 'sm:right-8 sm:top-1/2 sm:-translate-y-1/2'
  }
})
</script>

<style scoped>
.tooltip-arrow--top {
  top: calc(100% - 2px);
  right: 50%;
  transform: translate(50%, -50%) rotate(45deg);
  box-shadow: rgba(0, 0, 0, .05) 1px 1px 0;
}

.tooltip-arrow--bottom {
  bottom: calc(100% - 2px);
  right: 50%;
  transform: translate(50%, 50%) rotate(45deg);
  box-shadow: rgba(0, 0, 0, .05) -1px -1px 0;
}

.tooltip-arrow--right {
  top: 50%;
  right: calc(100% - 2px);
  transform: translate(50%, -50%) rotate(45deg);
  box-shadow: rgba(0, 0, 0, .05) -1px 1px 0;
}

.tooltip-arrow--left {
  top: 50%;
  left: calc(100% - 2px);
  transform: translate(-50%, -50%) rotate(45deg);
  box-shadow: rgba(0, 0, 0, .05) 1px -1px 0;
}

@media (max-width: 639px) {
  .tooltip-arrow:not(.tooltip-arrow-top) {
    top: calc(100% - 2px);
    right: 50%;
    transform: translate(50%, -50%) rotate(45deg);
    box-shadow: rgba(0, 0, 0, .05) 1px 1px 0;
  }
}
</style>