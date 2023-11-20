<template>
  <header class="mb-10">
    <h1 class="text-3xl font-semibold mb-1">Dashboard</h1>
    <p class="text-gray-500">This is a subtitle</p>
  </header>
  <main>
    <section class="h-screen">
      <form @submit.prevent="submit" class="space-y-4">
        <FormField
            id="email"
            label="Email"
            required
            :error="errors.email"
        >
          <FormInput
              v-model="email"
              type="text"
              :invalid="!!errors.email"
          />
        </FormField>
        <FormField
            id="role"
            label="Role"
            :error="errors.role"
        >
          <FormSelect
              v-model="form.role"
              :options="['Front-end', 'Back-end', 'Full-stack']"
          />
        </FormField>
        <FormButton type="submit" class="bg-primary-500 hover:bg-primary-600 text-white hover:bg-accent mt-2">Submit</FormButton>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default-sidebar'
})

const email = ref<string>('')

const errors = reactive({
  email: '',
  role: ''
})

const form = reactive({
  email: '',
  password: '',
  role: ''
})

const submit = () => {
  errors.email = 'Email not found'
}
</script>