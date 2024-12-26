<script setup lang="ts">
import { ref } from 'vue'
import { useSupabaseClient } from '@supabase/supabase-js'
import { useRoute, useRouter } from 'vue-router'
import { Loader2 } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

definePageMeta({
  layout: 'authentication'
})

const supabase = useSupabaseClient()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const newPassword = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const loading = ref(false)

const updatePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = t('passwords_dont_match')
    return
  }

  try {
    loading.value = true
    const accessToken = route.query.access_token as string
    const { error } = await supabase.auth.updateUser(accessToken, { password: newPassword.value })
    loading.value = false

    if (error) {
      errorMessage.value = t('password_update_failed')
      console.error(error)
      return
    }

    successMessage.value = t('password_update_success')
    setTimeout(() => {
      router.push('/login')
    }, 3000)
  } catch (error) {
    loading.value = false
    errorMessage.value = t('password_update_failed')
    console.error(error)
  }
}
</script>

<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img src="~/assets/images/logo.svg" alt="Logo" class="mx-auto h-12 w-auto">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">{{ t('reset_your_password') }}</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div class="bg-background border px-6 py-12 shadow-[0_10px_50px_-15px] shadow-primary/25 sm:rounded-xl sm:px-12">
      <form class="space-y-6" @submit.prevent="updatePassword">
        <div>
          <Label for="new-password" class="block text-sm font-medium leading-6">{{ t('new_password') }}</Label>
          <div class="mt-2">
            <Input
                v-model="newPassword"
                id="new-password"
                name="new-password"
                type="password"
                required />
          </div>
        </div>

        <div>
          <Label for="confirm-password" class="block text-sm font-medium leading-6">{{ t('confirm_password') }}</Label>
          <div class="mt-2">
            <Input
                v-model="confirmPassword"
                id="confirm-password"
                name="confirm-password"
                type="password"
                required />
          </div>
        </div>

        <Button type="submit" :disabled="loading" class="w-full">
          <div v-if="loading" role="status" class="mr-2">
            <Loader2 class="size-5 animate-spin"/>
            <span class="sr-only">{{ t('loading') }}...</span>
          </div>
          {{ t('update_password') }}
        </Button>

        <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-sm text-success">{{ successMessage }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>