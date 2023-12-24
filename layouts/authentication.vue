<template>
    <div class="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8">
        <slot/>
    </div>
  
    <UiNotificationList :notifications="notificationStore.notifications"/>
  
</template>
  
<script setup lang="ts">
import { useNotificationStore } from "~/stores/notificationStore";

const notificationStore = useNotificationStore()

useHead({
script: [{ 
    children:
    `if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }`
}]
})
</script>

<style type="postcss">

</style>