import styled from 'styled-components'

export const BillsAmountHeaderInfoContainer = styled.div`
  background: ${ctx => ctx.theme.colors.gray};
  color: ${ctx => ctx.theme.colors.shape};

  padding: 1.25rem;
  border-radius: 5px;
  box-shadow: var(--regular-box-shadow);

  display: flex;

  p {
    line-height: 1.5rem;
  }

  .wrapper {
    background: ${ctx => ctx.theme.colors.background};
    opacity: 0.32;
    width: 1px;

    margin: 0 1rem;
  }

  img {
    max-height: .5rem !important;
    max-width: 4rem !important;
  }
`
