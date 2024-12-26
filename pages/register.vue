<script setup lang="ts">
import {Loader2} from 'lucide-vue-next'

definePageMeta({
  layout: 'authentication'
})

const supabase = useSupabaseClient()
const {t} = useI18n()

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
    errorMessage.value = t('passwords_dont_match')
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
    errorMessage.value = t('sign_up_failed')
    console.error(error)
  }
}
</script>

<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="~/assets/images/logo.svg" alt="Logo" class="mx-auto h-12 w-auto">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">{{$t('create_new_account')}}</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div class="bg-background border px-6 py-12 shadow-[0_10px_50px_-15px] shadow-primary/25 sm:rounded-xl sm:px-12">
      <form v-if="!success" class="space-y-6" @submit.prevent="signUp">
        <div>
          <Label for="email" class="block text-sm font-medium leading-6">{{$t('email')}}</Label>
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
          <Label for="password" class="block text-sm font-medium leading-6">{{$t('password')}}</Label>
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
          <Label for="repeated-password" class="block text-sm font-medium leading-6">{{$t('repeat_password')}}</Label>
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
            <span class="sr-only">{{$t('loading')}}...</span>
          </div>
          {{$t('sign_up')}}
        </Button>

        <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>

      </form>

      <p v-else>
        {{$t('confirmation_email_sent_to')}} {{ form.email }}.
      </p>
    </div>

    <p class="mt-10 text-center text-sm text-muted-foreground">
      {{$t('have_account') + ' '}}
      <Button variant="link" class="h-auto p-0 ml-1" as-child>
        <NuxtLink to="/login">
          {{$t('sign_in')}}
        </NuxtLink>
      </Button>
    </p>
  </div>
</template>
