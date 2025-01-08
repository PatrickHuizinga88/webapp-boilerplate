<script setup lang="ts">
import type Customer from "~/types/Customer";

definePageMeta({
  layout: 'default-sidebar'
})

const { data: customer } = await useFetch<Customer>('/api/users', {
  query: { id: useRoute().params.id }
})
</script>

<template>
  <LayoutPage>
    <FormCustomer v-if="customer" :customer="customer" />
    <p v-else>{{ $t('not_found', {item: $t('customers.customers')}) }}</p>
  </LayoutPage>
</template>
