<template>
    <LayoutPage>
      <FormUser @submit="submit" />
    </LayoutPage>
  </template>
  
  <script setup lang="ts">
  definePageMeta({
    layout: 'default-sidebar'
  })
  
  const submit = () => {
  
  }
  </script>