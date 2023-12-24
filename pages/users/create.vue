<template>
    <LayoutPage>
      <FormUser :form="form" @submit="submit" />
    </LayoutPage>
  </template>
  
  <script setup lang="ts">
  definePageMeta({
    layout: 'default-sidebar'
  })
  
  const form = reactive({
    name: '',
    email: '',
    role: ''
  })
  
  const submit = () => {
  
  }
  </script>