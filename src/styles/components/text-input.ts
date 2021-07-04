import styled from 'styled-components'

export const TextInputContainer = styled.label`
  display: flex;
  align-items: stretch;

  border-bottom: 1px solid ${ctx => ctx.theme.colors.stroke};

  input {
    flex: 1;
    padding: 0.75rem;

    border: none;
    border-left: 1px solid ${ctx => ctx.theme.colors.stroke};
    background:  ${ctx => ctx.theme.colors.background};

    color: ${ctx => ctx.theme.colors.body};

    &::placeholder {
      color: ${ctx => ctx.theme.colors.placeholder};
    }
  }

  svg {
    margin: 0.75rem;
    fill: ${ctx => ctx.theme.colors.primary};
    color: ${ctx => ctx.theme.colors.background};
  }

`
