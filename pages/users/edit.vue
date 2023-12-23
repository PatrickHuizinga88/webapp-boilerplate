<template>
  <LayoutPage>
    <form @submit.prevent="submit" class="space-y-6">
      <UiFormField
        id="name"
        label="Name"
      >
        <UiFormInput v-model="form.name" type="text" />
      </UiFormField>

      <UiFormField
        id="email"
        label="Email"
      >
        <UiFormInput v-model="form.email" type="email" />
      </UiFormField>

      <UiFormField
        id="role"
        label="Role"
      >
        <UiFormSelect v-model="form.role" :options="['Admin', 'Subscriber']" />
      </UiFormField>

      <UiButton type="submit" class="bg-primary-500 hover:bg-primary-600 text-white hover:bg-accent mt-2">Save</UiButton>
    </form>
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