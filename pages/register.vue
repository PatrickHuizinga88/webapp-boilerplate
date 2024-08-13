<script setup lang="ts">
import {Loader2} from 'lucide-vue-next'

definePageMeta({
  layout: 'authentication'
})

const supabase = useSupabaseClient()

const form = reactive({
  email: '',
  password: '',
  repeatedPassword: ''
})
const errorMessage = ref('')
const success = ref(false)
const loading = ref(false)

const signUp = async () => {
	if (form.password !== form.repeatedPassword) {
    errorMessage.value = "Passwords don't match"
    return
  }

  try {
    loading.value = true

    const {error} = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    })
    if (error) {
      loading.value = false
      throw error
    }

    success.value = true
  } catch (error) {
    errorMessage.value = 'Registration failed'
    console.error(error)
  }
}
</script>

<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="~/assets/images/logo.svg" alt="Logo" class="mx-auto h-12 w-auto">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Create your new account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div class="bg-background px-6 py-12 shadow-[0_10px_50px_-15px] shadow-primary/25 sm:rounded-xl sm:px-12">
      <form v-if="!success" class="space-y-6" @submit.prevent="signUp">
        <div>
          <Label for="email" class="block text-sm font-medium leading-6">Email</Label>
          <div class="mt-2">
            <Input
                v-model="form.email"
                id="email"
                name="email"
                type="email"
                required />
          </div>
        </div>

        <div>
          <Label for="password" class="block text-sm font-medium leading-6">Password</Label>
          <div class="mt-2">
            <Input
                v-model="form.password"
                id="password"
                name="password"
                type="password"
                required/>
          </div>
        </div>

				<div>
          <Label for="repeated-password" class="block text-sm font-medium leading-6">Repeat password</Label>
          <div class="mt-2">
            <Input
                v-model="form.repeatedPassword"
                id="repeated-password"
                name="repeated-password"
                type="password"
                required/>
          </div>
        </div>

        <Button type="submit" :disabled="loading" class="w-full">
          <div v-if="loading" role="status" class="mr-2">
            <Loader2 class="size-5 animate-spin"/>
            <span class="sr-only">Loading...</span>
          </div>
          Sign up
        </Button>

        <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>

      </form>

      <p v-else>
        Thank you! A confirmation email had been sent to {{ form.email }}.
      </p>
    </div>

    <p class="mt-10 text-center text-sm text-muted-foreground">
      Already have an account?
      {{ ' ' }}
      <Button variant="link" class="h-auto p-0 ml-1" as-child>
        <NuxtLink to="/login">
          Log in
        </NuxtLink>
      </Button>
    </p>
  </div>
</template>

<style scoped>

</style>
