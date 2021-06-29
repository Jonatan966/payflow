import styled from 'styled-components'
import { transparentize } from 'polished'

export const LoginPageContainer = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;

  header {
    background: var(--radial-background);

    display: flex;
    justify-content: center;
    align-items: flex-end;

    height: 18rem;

    position: relative;


    > div {
      transform: translateY(7.75rem);
      position: relative;
    }

    .shadow {
      position: absolute;
      bottom: 0;

      height: 92px;
      width: 185px;
      
      transform: translateY(8rem);
      background: linear-gradient(180deg, 
        ${ctx => transparentize(1, ctx.theme.colors.background)} 0%, 
        ${ctx => transparentize(0.2, ctx.theme.colors.background)} 56.25%, 
        ${ctx => transparentize(0.057038, ctx.theme.colors.background)} 77.08%,
        ${ctx => ctx.theme.colors.background} 100%
      );
    }
  }

  main {
    margin-top: 9rem;
    padding: 0 2.5rem 2.5rem;

    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    text-align: center;

    h1 {
      color: ${ctx => ctx.theme.colors.heading};
      max-width: 15rem;
    }

    button {
      width: 100%;
    }
  }
`
