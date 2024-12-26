<script setup lang="ts">
import {Loader2, ArrowRight} from 'lucide-vue-next'

definePageMeta({
  layout: 'authentication'
})

const supabase = useSupabaseClient()

const form = reactive({
  email: '',
  password: ''
})
const errorMessage = ref('')
const loading = ref(false)

const signIn = async () => {
  try {
    loading.value = true
    const {error} = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })
    if (error) {
      loading.value = false
      throw error
    }
    navigateTo('/')
  } catch (error) {
    errorMessage.value = 'Login failed'
    console.error(error)
  }
}
</script>

<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="~/assets/images/logo.svg" alt="Logo" class="mx-auto h-12 w-auto">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">{{ $t('sign_in_to_account') }}</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div class="bg-background border px-6 py-12 shadow-[0_10px_50px_-15px] shadow-primary/25 sm:rounded-xl sm:px-12">
      <form class="space-y-6" @submit.prevent="signIn">
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
          <div class="flex items-center justify-between">
            <Label for="password" class="block text-sm font-medium leading-6">Password</Label>
            <Button variant="link" class="h-auto p-0" as-child>
              <NuxtLink to="#">
                Forgot password?
              </NuxtLink>
            </Button>
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

        <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>

      </form>
    </div>

    <p class="mt-10 text-center text-sm text-muted-foreground">
      Don't have an account?
      <Button variant="link" class="h-auto p-0 ml-1" as-child>
        <NuxtLink to="/register">
          Register now
          <ArrowRight class="size-4 ml-1" aria-hidden="true" />
        </NuxtLink>
      </Button>
    </p>
  </div>
</template>

<style scoped>

</style>
