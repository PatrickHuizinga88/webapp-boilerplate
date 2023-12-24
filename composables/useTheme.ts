export default function useTheme() {
    type Theme = 'light' | 'dark' | ''

    const theme = useState<Theme>('theme', () => '')
  
    onMounted(()=>{
      theme.value = localStorage.getItem("theme") as Theme
    })
    
    const toggleTheme = () => {
        localStorage.setItem("theme", theme.value)
        setTheme()
    }
  
    function setTheme() {
      const theme = localStorage.getItem("theme")
      if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  
    return {
      theme,
      toggleTheme,
      setTheme,
    }
  }