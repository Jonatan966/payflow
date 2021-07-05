import { DefaultTheme } from 'styled-components'

export const darkTheme: Omit<DefaultTheme, 'toggleTheme'> = {
  currentTheme: 'dark',
  colors: {
    primary: '#FF941A',
    gray: '#3c3a45',
    delete: '#E83F5B',

    heading: '#d1d1d6',
    body: '#B1B0B8',
    placeholder: '#737380',

    stroke: '#727280',
    shape: '#FAFAFC',
    background: '#0D0D0D'
  }
}
