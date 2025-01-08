<script setup lang="ts">
definePageMeta({
  layout: 'default-sidebar'
})
</script>

<template>
  <LayoutPage :title="$t('common.general.new', {item: lowercase($t('customers.customers'))})">
    <FormCustomer />
  </LayoutPage>
</template>