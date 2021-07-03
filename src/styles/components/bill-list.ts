import styled from 'styled-components'

export const BillListContainer = styled.section`
  text-align: center;

  ul li {
    list-style: none;
    text-align: initial;
  }

  li + li {
    margin: 1rem 0;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid ${ctx => ctx.theme.colors.stroke};
  }
`
