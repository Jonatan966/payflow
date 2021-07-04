import { DefaultTheme } from 'styled-components'

export const darkTheme: Omit<DefaultTheme, 'toggleTheme'> = {
  currentTheme: 'dark',
  colors: {
    primary: '#FF941A',
    gray: '#3c3a45',
    delete: '#E83F5B',

    heading: '#d1d1d6',
    body: '#737380',
    placeholder: '#B1B0B8',

    stroke: '#000000',
    shape: '#FAFAFC',
    background: '#0D0D0D'
  }
}
