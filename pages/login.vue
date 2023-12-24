<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">

        <img class="mx-auto h-12 w-auto" src="~/assets/images/logo.svg" alt="Logo" />
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
                            <a href="#" class="font-semibold text-primary-500 hover:text-primary-400">Forgot password?</a>
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
                    <button type="submit" class="flex w-full justify-center rounded-md text-white dark:text-zinc-950 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-500 dark:bg-primary-400 dark:hover:bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">Sign in</button>
                </div>
            </form>
        </div>
        
        <p class="mt-10 text-center text-sm text-gray-500">
            Don't have an account?
            {{ ' ' }}
            <a href="#" class="font-semibold leading-6 text-primary-500 hover:text-primary-400">Sign up</a>
        </p>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'authentication'
})

const form = ref({
  email: 'test@gmail.com',
  password: 'test123'
})

const signIn = () => {
  navigateTo('/')
}
</script>

<style scoped>

</style>
