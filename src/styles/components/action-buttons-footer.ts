import styled from 'styled-components'
import { SpinnerContainer } from './spinner'

export const ActionButtonFooterContainer = styled.footer`
  display: grid;
  grid-template-columns: 1fr 1fr;

  button {
    background: ${ctx => ctx.theme.colors.background};
    border: none;
    outline: 1px solid ${ctx => ctx.theme.colors.stroke};

    color: ${ctx => ctx.theme.colors.body};
    padding: 1.25rem;

    &.main {
      color: ${ctx => ctx.theme.colors.primary};
    }
  }

  ${SpinnerContainer} {
    margin: 0.75rem auto;
    grid-column-start: 1;
    grid-column-end: 3;
  }
`
