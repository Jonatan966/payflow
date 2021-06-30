import styled from 'styled-components'

export const ToolbarContainer = styled.footer`
  position: fixed;
  
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;

  button {
    font-size: 0;

    cursor: pointer;

    background: ${ctx => ctx.theme.colors.background};
    border: none;
    border-radius: 5px;
  }
  
  button:not(.add-bill) {
    flex: 1;

    padding: 1rem;

    svg {
      fill: ${ctx => ctx.theme.colors.body};
    }

    &.selected svg {
      fill: ${ctx => ctx.theme.colors.primary};
    }
  }

  .add-bill {
    position: absolute;
    margin: auto;

    left: 0;
    right: 0;

    padding: 1rem;

    transform: translateY(-35%);

    background: ${ctx => ctx.theme.colors.primary};

    svg {
      fill: ${ctx => ctx.theme.colors.background};
    }
  }
`
