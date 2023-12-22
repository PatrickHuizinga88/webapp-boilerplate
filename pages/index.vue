<template>
  <LayoutPage>
    <section>
      <UiCard>
        <template #header>
          <h3 class="text-base font-semibold leading-6">
            Form
          </h3>
        </template>
        <form @submit.prevent="submit" class="space-y-6">
          <UiFormField
              id="email"
              label="Email"
              required
              :error="errors.email"
          >
            <UiFormInput
                v-model="email"
                type="text"
                :invalid="!!errors.email"
            />
          </UiFormField>
          <UiFormField
              id="role"
              label="Role"
              :error="errors.role"
          >
            <UiFormSelect
                v-model="form.role"
                :options="['Front-end', 'Back-end', 'Full-stack']"
            />
          </UiFormField>
          <UiButton type="submit" class="bg-primary-500 hover:bg-primary-600 text-white hover:bg-accent">Submit</UiButton>
        </form>
      </UiCard>
    </section>
  </LayoutPage>
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