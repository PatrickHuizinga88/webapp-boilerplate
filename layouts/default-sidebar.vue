<template>

  <NuxtLoadingIndicator color="#505084"/>

  <LayoutSidebar ref="sidebar"/>

  <div class="lg:pl-72">
<!--    <header class="bg-white border-b shadow">-->
<!--      <div class="px-6 sm:px-8 lg:px-10">-->
<!--        &lt;!&ndash; Nav menu content &ndash;&gt;-->
<!--      </div>-->
<!--    </header>-->

    <div class="py-12">
      <div class="px-6 sm:px-8 lg:px-10">
        <slot/>
      </div>
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