<template>

  <NuxtLoadingIndicator color="#2E994A"/>

  <LayoutSidebar ref="sidebar"/>

  <div class="lg:pl-72">
    <header class="py-7">
      <LayoutContainer>
        <div class="flex justify-between items-center">
          <UiBreadcrumbs/>
          <div class="flex">
            <div class="hidden sm:block">
              <UiFormIconInput type="search" class="!w-64" placeholder="Search...">
              <UiIcon name="MagnifyingGlass" class="h-5 w-5 stroke-2" aria-hidden="true"/>
            </UiFormIconInput>
            </div>
            <button>
              <UiIcon name="MagnifyingGlass" class="sm:hidden h-6 w-6 stroke-2"/>
            </button>
          </div>
        </div>
      </LayoutContainer>
    </header>

    <div class="pt-4 pb-6">
      <slot/>
    </div>
  </div>

  <UiNotificationList :notifications="notificationStore.notifications"/>

</template>

<script setup lang="ts">
import { useNotificationStore } from "~/stores/notificationStore";

const notificationStore = useNotificationStore()

useHead({
  script: [{
    children:
        `if (localStorage.theme === 'dark' || localStorage.theme === '' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }`
  }]
})


const navItems = [
  { name: 'Home', url: '/' },
  { name: 'About us', url: '' },
  { name: 'Contact', url: '' },
]
</script>