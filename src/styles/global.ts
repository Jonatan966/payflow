import { createGlobalStyle } from 'styled-components'
import { lighten } from 'polished'

export const GlobalStyles = createGlobalStyle`
  :root {
    --radial-background: radial-gradient(58.93% 69.94% at 50% 100%, 
      ${ctx => lighten(0.2, ctx.theme.colors.primary)} 0%, 
      ${ctx => ctx.theme.colors.primary} 100%
    );
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%;
    }
  }

  body {
    background: ${ctx => ctx.theme.colors.background};    
  }

  body, input, button, textarea {
    font: 400 1rem 'Inter', sans-serif;
  }
`
