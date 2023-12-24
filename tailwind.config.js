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
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      // Generate color palettes with https://www.tints.dev
      colors: {
        primary: {
          50: "#EBF9EF",
          100: "#D4F2DC",
          200: "#9DE2AF",
          300: "#56CD76",
          400: "#32A852",
          500: "#2E994A",
          600: "#2A8D45",
          700: "#247A3B",
          800: "#1E6632",
          900: "#154722",
          950: "#0D2B15"
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

