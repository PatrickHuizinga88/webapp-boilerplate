<script setup lang="ts">
import {Loader2} from 'lucide-vue-next'

definePageMeta({
  layout: 'authentication'
})

const supabase = useSupabaseClient()

const form = reactive({
  email: 'patrickhuizinga44@gmail.com',
  password: ''
})
const errorMessage = ref<string>('')
const loading = ref<boolean>(false)

const signIn = async () => {
  try {
    loading.value = true
    const {error} = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })
    if (error) {
      loading.value = false
      throw error;
    }
    navigateTo('/')
  } catch (error) {
    errorMessage.value = 'Inloggen mislukt'
    console.error(error)
  }
}
</script>

<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="~/assets/images/logo.svg" alt="Logo" class="mx-auto h-12 w-auto">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div class="bg-background px-6 py-12 shadow-[0_10px_50px_-15px] shadow-primary/25 sm:rounded-xl sm:px-12">
      <form class="space-y-6" @submit.prevent="signIn">
        <div>
          <Label for="email" class="block text-sm font-medium leading-6">Email address</Label>
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
          <div class="flex items-center justify-between">
            <Label for="password" class="block text-sm font-medium leading-6">Password</Label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-primary hover:underline">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <Input
                v-model="form.password"
                id="password"
                name="password"
                type="password"
                required/>
          </div>
        </div>

        <Button type="submit" :disabled="loading" class="w-full">
          <div v-if="loading" role="status" class="mr-2">
            <Loader2 class="size-5 animate-spin"/>
            <span class="sr-only">Loading...</span>
          </div>
          Sign in
        </Button>

        <p v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</p>

      </form>
    </div>

    <p class="mt-10 text-center text-sm text-gray-500">
      Don't have an account?
      {{ ' ' }}
      <a href="#"
         class="font-semibold leading-6 text-primary-500 dark:text-primary-400 hover:text-primary-400 dark:hover:text-primary-300">Sign
        up</a>
    </p>
  </div>
</template>

<style scoped>

</style>
