<template>
  <header>
    <h1 class="text-3xl font-semibold mb-4">Nuxt boilerplate</h1>
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
        <FormButton type="submit" class="bg-primary text-white hover:bg-accent mt-2">Submit</FormButton>
      </form>
      <Tooltip :onHover="true">
        <template #button>
          <Icon name="QuestionMarkCircle" class="h-5 w-5 m-1 text-gray-400 stroke-2"/>
        </template>
        Hallo...
      </Tooltip>
    </section>
  </main>
</template>

<script setup lang="ts">
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