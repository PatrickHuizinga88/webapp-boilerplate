// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},

  vite: {
    optimizeDeps: {
      exclude: ['vee-validate']
    }
  },

  app: {
    // TODO - Setup: Change meta tags and add favicon
    head: {
      title: 'Webapp boilerplate',
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {name: 'og:title', content: 'Webapp boilerplate'},
        {name: 'description', content: 'Kickstart your Nuxt app.'},
        {name: 'og:description', content: 'Kickstart your Nuxt app.'},
        {name: 'msapplication-TileColor', content: '#ffffff'},
        {name: 'theme-color', content: '#ffffff'},
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/logo.svg'},

        // Generate using https://realfavicongenerator.net/
        // {rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png'},
        // {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png'},
        // {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png'},
        // {rel: 'manifest', href: '/favicon/site.webmanifest'},
        // {rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#ffffff'},
      ],
    },
  },

  css: ['../assets/css/main.css'],

  runtimeConfig: {
    public: {
      baseUrl: 'localhost:3000'
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    "shadcn-nuxt",
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@unlok-co/nuxt-stripe',
    '@nuxtjs/i18n',
  ],

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/register', '/password-recovery', '/update-password'],
    }
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },

  colorMode: {
    classSuffix: '',
  },

  i18n: {
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', name: 'English', files: ['en/common', 'en/authentication', 'en/settings', 'en/users'] },
      { code: 'nl', name: 'Nederlands', files: ['nl/common', 'nl/authentication', 'nl/settings', 'nl/users'] },
    ],
    defaultLocale: 'en',
  },

  stripe: {
    server: {
      key: process.env.STRIPE_SECRET_KEY,
    },
  },

  compatibilityDate: '2024-12-17',
})