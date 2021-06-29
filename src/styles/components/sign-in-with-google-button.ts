import styled from 'styled-components'

export const SignInWithGoogleButtonContainer = styled.button`
  position: relative;

  background: ${ctx => ctx.theme.colors.shape};
  border: 1px solid ${ctx => ctx.theme.colors.stroke};
  border-radius: 5px;

  color: ${ctx => ctx.theme.colors.heading};
  cursor: pointer;
  transition: filter 0.2s;

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
    width: 1px;

    background: ${ctx => ctx.theme.colors.stroke};
  }

  &:hover {
    filter: brightness(0.9);
  }
`
