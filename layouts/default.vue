<script setup lang="ts">
import { Settings, LogOut } from 'lucide-vue-next'

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

const mainNavItems = [
  { name: 'Dashboard', url: '/' },
  { name: 'Users', url: '/users' },
]

const userNavItems = [
  { name: 'Settings', url: '/settings', icon: Settings },
  { name: 'Logout', url: '/logout', icon: LogOut },
]
</script>

<template>
  <NuxtLoadingIndicator color="#505084"/>
  <header class="bg-background border-b border-border shadow">
    <div class="container">
      <nav class="flex justify-between items-center">
        <div class="flex gap-8 items-center">
          <NuxtLink to="/">
            <img src="../assets/images/logo.svg" alt="Logo" class="h-9">
          </NuxtLink>
          <ul class="flex gap-6">
            <li v-for="item in mainNavItems">
              <NuxtLink :to="item.url" activeClass="text-primary font-medium" class="inline-block px-2 py-4 text-sm hover:text-accent duration-150">{{ item.name }}</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <ul class="flex gap-4">
            <li v-for="item in userNavItems">
              <NuxtLink :to="item.url" class="inline-block p-2 duration-150">
                <component :is="item.icon" class="size-5"/>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>

  <div class="py-10">
    <div class="container">
      <slot/>
    </div>
  </div>

<!--  <Toaster />-->

</template>