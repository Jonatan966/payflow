import styled from 'styled-components'
import { AppModalContainer } from './app-modal'

export const ActionsListModalContainer = styled(AppModalContainer)`
  button {
    display: flex;

    align-items: center;
    justify-content: center;

    span {
      flex: 1;
    }

    svg {
      fill: ${ctx => ctx.theme.colors.primary};
    }
  }

  .cancel {
    color: ${ctx => ctx.theme.colors.delete};
    font-weight: bold;

    border-top: 1px solid ${ctx => ctx.theme.colors.stroke};
    padding: 1rem;
  }
`
