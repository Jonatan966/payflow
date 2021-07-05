import styled from 'styled-components'

export const TextInputContainer = styled.label`
  display: flex;
  flex-direction: column;

  .input-content {
    display: flex;
    align-items: stretch;

    &:not(.read-only) {
      border-bottom: 1px solid ${ctx => ctx.theme.colors.stroke};

      input {
        border-left: 1px solid ${ctx => ctx.theme.colors.stroke};
      }
    }

    &.error, &.error input {
      border-color: ${ctx => ctx.theme.colors.delete};
      color: ${ctx => ctx.theme.colors.delete};
    }

    input {
      flex: 1;
      padding: 0.75rem;
      min-width: 0;

      border: none;
      background:  ${ctx => ctx.theme.colors.background};

      color: ${ctx => ctx.theme.colors.body};

      &::placeholder {
        color: ${ctx => ctx.theme.colors.placeholder};
      }
    }

    > svg {
      color: ${ctx => ctx.theme.colors.background};
    }

    svg {
      margin: 0.75rem;
      fill: ${ctx => ctx.theme.colors.primary};
    }

    button {
      background: none;
      border: none;
      font-size: 0;
    }
  }

  span {
    padding: 0.25rem 0;
    color: ${ctx => ctx.theme.colors.delete};
  }
`
