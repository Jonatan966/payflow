import 'styled-components'

export module 'styled-components' {
  export interface DefaultTheme {
    currentTheme: 'light' | 'dark',

    colors: {
      primary: string,
      gray: string,
      delete: string,

      heading: string,
      body: string,
      placeholder: string,

      stroke: string,
      shape: string,
      background: string
    },

    toggleTheme: () => void
  }
}
