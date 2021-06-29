import { ReactNode, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { darkTheme } from '../styles/themes/dark'
import { lightTheme } from '../styles/themes/light'

const colorThemes = {
  dark: darkTheme,
  light: lightTheme
}

type CurrentThemeProps = 'dark' | 'light'

interface AppThemeProviderProps {
  children: ReactNode;
}

export function AppThemeProvider ({ children }: AppThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<CurrentThemeProps>('light')

  useEffect(() => {
    let storagedCurrentTheme = window.localStorage.getItem('@payflow:theme')

    if (!['dark', 'light'].includes(storagedCurrentTheme || '')) {
      storagedCurrentTheme = 'light'
    }

    setCurrentTheme(storagedCurrentTheme as CurrentThemeProps)
  }, [])

  function toggleTheme () {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'

    setCurrentTheme(newTheme)
    localStorage.setItem('@payflow:theme', newTheme)
  }

  return (
    <ThemeProvider theme={{
      ...colorThemes[currentTheme],
      toggleTheme
    }}>
      {children}
    </ThemeProvider>
  )
}
