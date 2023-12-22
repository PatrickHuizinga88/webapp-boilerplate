<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                <div class="flex justify-between items-center border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
                  <DialogTitle as="h3" class="text-xl font-semibold leading-6">
                    <slot v-if="!loading" name="header"/>
                    <template v-else>
                      <div class="h-2 w-32 bg-slate-200 rounded animate-pulse"></div>
                    </template>
                  </DialogTitle>
                  <button @click="toggle" class="flex p-2 rounded-full hover:bg-gray-100">
                    <Icon name="XMark" class="h-5 w-5"/>
                  </button>
                </div>
                <div class="p-6">
                  <slot/>
                </div>
              <div class="bg-gray-100 px-4 py-3 sm:flex justify-end gap-x-4 sm:px-6">
                <slot name="footer"/>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";

defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const open = ref(false)

const toggle = () => {
  open.value = !open.value
}

defineExpose({toggle})
</script>

<style scoped>

</style>