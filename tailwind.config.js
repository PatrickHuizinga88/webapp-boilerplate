/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'components/**/*.{vue,js,ts}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
    'App.{js,ts,vue}',
    'app.{js,ts,vue}',
    'Error.{js,ts,vue}',
    'error.{js,ts,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      // Generate color palettes with https://www.tints.dev
      colors: {
        'primary': {
          50: "#E0FFF1",
          100: "#C2FFE3",
          200: "#80FFC6",
          300: "#42FFAA",
          400: "#00FF8C",
          500: "#00C16A",
          600: "#009954",
          700: "#007541",
          800: "#004D2A",
          900: "#002916",
          950: "#00140B"
        },
      },
      strokeWidth: {
        '3': '3px'
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [
      require('@tailwindcss/forms')
  ],
}

