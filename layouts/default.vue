<template>
  <header class="bg-white border-b shadow">
    <div class="container">
      <nav class="flex justify-between items-center">
        <NuxtLink to="/">
<!--          <img src="../public/favicon.ico" alt="">-->
        </NuxtLink>
        <ul class="flex gap-8">
          <li v-for="item in navItems">
            <NuxtLink :to="item.url" activeClass="text-primary font-medium" class="inline-block px-2 py-4 hover:text-accent duration-150">{{ item.name }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <div class="py-10">
    <div class="container">
      <slot/>
    </div>
  </div>

  <NotificationList :notifications="notificationStore.notifications"/>

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