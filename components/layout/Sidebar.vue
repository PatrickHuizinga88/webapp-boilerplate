<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-zinc-900/80" />
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" class="flex -m-2.5 p-2.5" @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <Icon name="XMark" class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>

            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-zinc-950 px-6 pb-4">
              <div class="flex h-16 shrink-0 items-center">
                <NuxtLink to="/">
                  <img src="~/assets/images/logo.svg" alt="Logo">
                </NuxtLink>
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li v-for="category in navigation" :key="category.name">
                        <div class="text-xs font-medium leading-6 text-gray-400 uppercase">{{ category.name }}</div>
                        <ul role="list" class="-mx-2 mt-2 space-y-1">
                          <li v-for="link in category.links" :key="link.name">
                            <NuxtLink :href="link.url" @click="sidebarOpen = false" active-class="bg-gray-100 dark:bg-white/10" class="hover:bg-gray-100 dark:hover:bg-white/10 flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                              <Icon :name="link.icon" class="h-5 w-5 shrink-0" aria-hidden="true" solid/>
                              {{ link.name }}
                            </NuxtLink>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <div class="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
    <div class="flex grow flex-col overflow-y-auto border-r border-gray-200 dark:border-zinc-800 px-6 pb-4">
      <div class="flex shrink-0 items-center pt-8 pb-12">
        <NuxtLink to="/">
          <img src="~/assets/images/logo.svg" alt="Logo">
        </NuxtLink>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col divide-y divide-gray-200">
          <li v-for="category in navigation" :key="category.name" class="py-7 first:pt-0">
            <div class="text-xs leading-6 text-gray-500">{{ category.name }}</div>
            <ul role="list" class="-mx-2 mt-4 space-y-1">
              <li v-for="link in category.links" :key="link.name">
                <NuxtLink :href="link.url" active-class="bg-gray-900/10 dark:bg-white/10" class="hover:bg-gray-900/10 dark:hover:bg-white/10 flex items-center gap-x-3 rounded-md p-2 text-sm leading-6 font-medium" disabled>
                  <Icon :name="link.icon" class="h-5 w-5 shrink-0 stroke-2" aria-hidden="true"/>
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <div class="sticky top-0 z-40 bg-white dark:bg-black py-4 shadow-sm dark:border-b dark:border-zinc-800 lg:hidden">
    <LayoutContainer>
      <div class="flex items-center gap-x-6">
        <button type="button" class="-m-2.5 p-2.5 text-gray-700 dark:text-gray-400 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Icon name="Bars3" class="h-6 w-6 stroke-2" aria-hidden="true" />
        </button>
      </div>
    </LayoutContainer>
  </div>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import Icon from "~/components/ui/Icon.vue";

const sidebarOpen = ref<boolean>(false)

const navigation = [
  {
    name: 'General',
    links: [
      { name: 'Dashboard', url: '/', icon: 'Home' },
      { name: 'Users', url: '/users', icon: 'Users' },
      { name: 'Settings', url: '/settings', icon: 'Cog6Tooth' },
    ]
  }
]

defineExpose({ sidebarOpen })
</script>

<style scoped>

</style>