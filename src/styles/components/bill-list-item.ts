import styled from 'styled-components'

export const BillListItemContainer = styled.li`
  .bill-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: ${ctx => ctx.theme.colors.heading};
    font-family: 'Lexend', sans-serif;
    font-weight: 600;
  }

  > span {
    color: ${ctx => ctx.theme.colors.body};
    line-height: 2rem;
  }
`
