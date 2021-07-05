import styled from 'styled-components'
import { lighten } from 'polished'

export const SignInWithGoogleButtonContainer = styled.button`
  position: relative;

  background: ${ctx => ctx.theme.colors.gray};
  border: 2px solid ${ctx => lighten(0.2, ctx.theme.colors.gray)};
  border-radius: 5px;

  color: ${ctx => ctx.theme.colors.shape};
  cursor: pointer;
  box-shadow: var(--regular-box-shadow);

  display: flex;
  align-items: stretch;
  
  span {
    flex: 1;
    text-align: center;

    margin: auto;
  }

  > div {
    margin: 0.75rem !important;
  }

  strong {
    width: 2px;

    background: ${ctx => lighten(0.2, ctx.theme.colors.gray)};
  }
`
