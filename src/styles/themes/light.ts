import { DefaultTheme } from 'styled-components'

export const lightTheme: Omit<DefaultTheme, 'toggleTheme'> = {
  currentTheme: 'light',
  colors: {
    primary: '#FF941A',
    gray: '#585666',
    delete: '#E83F5B',

    heading: '#585666',
    body: '#706E7A',
    placeholder: '#B1B0B8',

    stroke: '#E3E3E6',
    shape: '#FAFAFC',
    background: '#FFFFFF'
  }
}
