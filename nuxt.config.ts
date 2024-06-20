// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    vite: {
        optimizeDeps: {
            exclude: ['vee-validate']
        }
    },
    app: {
        head: {
            title: 'Nuxt boilerplate',
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ],
        },
    },
    css: ['../assets/css/main.css'],
    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        '@nuxtjs/supabase',
        "shadcn-nuxt",
        '@vueuse/nuxt',
    ],
    shadcn: {
        prefix: '',
        componentDir: './components/ui'
    }
})