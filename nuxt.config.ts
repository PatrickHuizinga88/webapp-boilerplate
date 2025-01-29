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
    layoutTransition: {
      name: 'fade',
      mode: 'out-in'
    }
  },

  css: ['../assets/css/main.css'],

  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:3000',
      stripeKey: '',
    },
    stripeSecretKey: ''
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    "shadcn-nuxt",
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    'dayjs-nuxt',
  ],

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: [
        '/confirm-registration',
        '/intro',
        '/password-recovery',
        '/register',
        '/update-password',
      ],
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
    strategy: 'no_prefix',
    // detectBrowserLanguage: {
    //   useCookie: false
    // },
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        files: ['en/common', 'en/account', 'en/authentication', 'en/customers', 'en/dashboard', 'en/feedback', 'en/pricing', 'en/settings', 'en/users']
      },
      {
        code: 'nl',
        name: 'Nederlands',
        files: ['nl/common', 'nl/account', 'nl/authentication', 'nl/customers', 'nl/dashboard', 'nl/feedback', 'nl/pricing', 'nl/settings', 'nl/users']
      },
    ],
    // customRoutes: 'config',
    // pages: {
    //   register: {
    //     en: '/register',
    //     nl: '/registreren',
    //   },
    //   'password-recovery': {
    //     en: '/password-recovery',
    //     nl: '/wachtwoord-herstellen',
    //   },
    //   'update-password': {
    //     en: '/update-password',
    //     nl: '/wachtwoord-bijwerken',
    //   },
    //   users: {
    //     en: '/users',
    //     nl: '/gebruikers',
    //   },
    //   'users-create': {
    //     en: '/users/create',
    //     nl: '/gebruikers/aanmaken',
    //   },
    //   'users-id': {
    //     en: '/users/[id]',
    //     nl: '/gebruikers/[id]',
    //   },
    //   'users-id-edit': {
    //     en: '/users/[id]/edit',
    //     nl: '/gebruikers/[id]/bewerken',
    //   },
    //   customers: {
    //     en: '/customers/',
    //     nl: '/klanten/',
    //   },
    //   settings: {
    //     en: '/settings',
    //     nl: '/instellingen',
    //   },
    // },
  },

  dayjs: {
    locales: ['en', 'nl'],
    defaultLocale: 'en',
    plugins: ['relativeTime', 'utc', 'timezone'],
  },

  compatibilityDate: '2024-12-17',
})