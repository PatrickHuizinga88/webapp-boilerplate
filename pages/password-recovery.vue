<script setup lang="ts">
import {Loader2} from 'lucide-vue-next'

definePageMeta({
  layout: 'authentication'
})

const supabase = useSupabaseClient()
const email = ref('')
const errorMessage = ref('')
const success = ref(false)
const loading = ref(false)

const resetPassword = async () => {
  try {
    const {baseUrl} = useRuntimeConfig()
    loading.value = true
    const {error} = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo: `${baseUrl}/update-password`
    })
    loading.value = false

    if (error) {
      errorMessage.value = 'Password reset failed'
      console.error(error)
      return
    }

    success.value = true
  } catch (error) {
    loading.value = false
    errorMessage.value = 'Password reset failed'
    console.error(error)
  }
}
</script>

<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="~/assets/images/logo.svg" alt="Logo" class="mx-auto h-12 w-auto">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">{{ $t('reset_your_password') }}</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div class="bg-background border px-6 py-12 shadow-[0_10px_50px_-15px] shadow-primary/25 sm:rounded-xl sm:px-12">
      <form v-if="!success" class="space-y-6" @submit.prevent="resetPassword">
        <div>
          <Label for="email" class="block text-sm font-medium leading-6">{{ $t('email') }}</Label>
          <div class="mt-2">
            <Input
                v-model="email"
                id="email"
                name="email"
                type="email"
                required/>
          </div>
        </div>

        <Button type="submit" :disabled="loading" class="w-full">
          <div v-if="loading" role="status" class="mr-2">
            <Loader2 class="size-5 animate-spin"/>
            <span class="sr-only">{{ $t('loading') }}...</span>
          </div>
          {{ $t('reset_password') }}
        </Button>

        <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>
      </form>

      <p v-else class="text-center">
        {{ $t('password_reset_email_sent') }} {{ email }}.
      </p>
    </div>

    <div class="flex justify-center mt-10">
      <Button variant="link" class=" p-0" as-child>
        <NuxtLink to="/login">
          {{ $t('back_to_sign_in') }}
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>