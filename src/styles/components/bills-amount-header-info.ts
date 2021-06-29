import styled from 'styled-components'

export const BillsAmountHeaderInfoContainer = styled.div`
  background: ${ctx => ctx.theme.colors.gray};

  padding: 1.5rem;
  border-radius: 5px;

  display: flex;

  p {
    line-height: 1.5rem;
  }

  .wrapper {
    background: ${ctx => ctx.theme.colors.background};
    opacity: 0.32;
    width: 1px;

    margin: 0 1.5rem;
  }
`
