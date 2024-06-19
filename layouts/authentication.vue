<script setup lang="ts">
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
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8">
    <slot/>
  </div>

  <Toaster/>

</template>

<style>

</style>