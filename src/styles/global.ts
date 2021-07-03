import { createGlobalStyle } from 'styled-components'
import { lighten } from 'polished'

export const GlobalStyles = createGlobalStyle`
  :root {
    --radial-background: radial-gradient(58.93% 69.94% at 50% 100%, 
      ${ctx => lighten(0.2, ctx.theme.colors.primary)} 0%, 
      ${ctx => ctx.theme.colors.primary} 100%
    );

    --regular-box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
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

  .hovered {
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: flex-end;
    justify-content: center;

    z-index: 999;
  }

  .modal-enter-anim {
    animation: fade-in .5s forwards;

    > div {
      animation: move-in .5s forwards;
    }
  }

  .modal-out-anim {
    animation:  fade-out .5s forwards;

    > div {
      animation: move-out .5s forwards;
    }
  }

  @keyframes move-in {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0%);
    }
  }
  @keyframes move-out {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(100%);
    }
  }

  @keyframes fade-in {
    from {
      background: rgba(0,0,0,0);
    }

    to {
      background: rgba(0,0,0,0.8);
    }
  }
  @keyframes fade-out {
    from {
      background: rgba(0,0,0,0.8);
    }

    to {
      background: rgba(0,0,0,0);
    }
  }

`
