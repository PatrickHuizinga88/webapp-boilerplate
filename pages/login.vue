<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img src="~/assets/images/logo.svg" alt="Logo" class="dark:hidden mx-auto h-12 w-auto">
        <img src="~/assets/images/logo-dark.svg" alt="Logo" class="hidden dark:block mx-auto h-12 w-auto">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="bg-white dark:bg-zinc-900 px-6 py-12 shadow-[0_10px_50px_-15px] shadow-primary-400/25 sm:rounded-xl sm:px-12">
            <form class="space-y-6" @submit.prevent="signIn">
                <div>
                    <label for="email" class="block text-sm font-medium leading-6">Email address</label>
                    <div class="mt-2">
                        <input
                            v-model="form.email"
                            id="email" 
                            name="email" 
                            type="email" 
                            autocomplete="email" 
                            required 
                            class="block w-full rounded-md dark:bg-zinc-800 border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6">Password</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-primary-500 dark:text-primary-400 hover:text-primary-400 dark:hover:text-primary-300">Forgot password?</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input
                            v-model="form.password"
                            id="password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            required
                            class="block w-full rounded-md dark:bg-zinc-800 border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <UiButton type="submit" size="sm" :disabled="loading" class="flex justify-center items-center w-full text-white dark:text-zinc-950 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500">
                      <div v-if="loading" role="status" class="mr-2">
                        <svg aria-hidden="true" class="inline w-4 h-4 animate-spin text-primary-200 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
                      Sign in
                    </UiButton>
                </div>
            </form>
        </div>
        
        <p class="mt-10 text-center text-sm text-gray-500">
            Don't have an account?
            {{ ' ' }}
            <a href="#" class="font-semibold leading-6 text-primary-500 dark:text-primary-400 hover:text-primary-400 dark:hover:text-primary-300">Sign up</a>
        </p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'authentication'
})

const supabase = useSupabaseClient()

const form = reactive({
  email: 'patrickhuizinga44@gmail.com',
  password: ''
})
const loading = ref<boolean>(false)

const signIn = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email:    form.email,
      password: form.password
    })
    if (error) throw error;
    navigateTo('/')
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

</style>
