<template>

  <NuxtLoadingIndicator color="#505084"/>

  <LayoutSidebar ref="sidebar"/>

  <div class="lg:pl-72">
    <header class="py-8">
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

    <div class="py-4">
      <slot/>
    </div>
  </div>

  <UiNotificationList :notifications="notificationStore.notifications"/>

</template>

<script setup lang="ts">
import { useNotificationStore } from "~/stores/notificationStore";

const notificationStore = useNotificationStore()

const navItems = [
  { name: 'Home', url: '/' },
  { name: 'About us', url: '' },
  { name: 'Contact', url: '' },
]
</script>