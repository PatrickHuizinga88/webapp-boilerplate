<template>
  <LayoutPage>
    <FormUser :user="user" @submit="submit" />
  </LayoutPage>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default-sidebar'
})

const { data: user } = await useFetch('/api/users', {
  query: { id: useRoute().params.id }
})

const submit = (form) => {
  console.log(form);
}
</script>