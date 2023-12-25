<template>
  <NuxtLoadingIndicator color="#505084"/>
  <header class="bg-white dark:bg-zinc-950 border-b dark:border-zinc-700 shadow">
    <div class="container">
      <nav class="flex justify-between items-center">
        <NuxtLink to="/">
          <img src="../public/favicon.ico" alt="Logo">
        </NuxtLink>
        <ul class="flex gap-8">
          <li v-for="item in navItems">
            <NuxtLink :to="item.url" activeClass="text-primary-500 font-medium" class="inline-block px-2 py-4 hover:text-accent duration-150">{{ item.name }}</NuxtLink>
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
  { name: 'Dashboard', url: '/' },
  { name: 'Users', url: '/users' },
  { name: 'Settings', url: '/settings' },
]

</script>