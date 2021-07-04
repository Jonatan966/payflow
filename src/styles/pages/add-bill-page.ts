import styled from 'styled-components'

export const AddBillPageContainer = styled.div`
  min-height: 100vh;
  header {
    padding: 1.5rem;

    h2 {
      text-align: center;
      padding: 1rem;
      color: ${ctx => ctx.theme.colors.heading};
    }    

    svg {
      fill: ${ctx => ctx.theme.colors.placeholder};
      cursor: pointer;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 0 1.5rem;
    gap: 1rem;

    footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
`
