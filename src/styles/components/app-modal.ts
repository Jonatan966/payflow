import styled from 'styled-components'
import { AppModal } from '../../components/app-modal'

export const AppModalContainer = styled(AppModal)`
  background: ${ctx => ctx.theme.colors.background};

  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  button {
    padding: 1.25rem;

    font-size: 0.95rem;
    cursor: pointer;
  }
`
