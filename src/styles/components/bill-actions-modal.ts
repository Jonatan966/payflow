import styled from 'styled-components'
import Modal from 'react-modal'

export const BillActionsModalContainer = styled(Modal)`
  background: ${ctx => ctx.theme.colors.background};

  width: 100%;
  /* padding: 1rem; */

  p {
    text-align: center;
    font-size: 1.25rem;

    max-width: 13rem;

    margin: 2rem auto 1rem;
  }

  display: flex;
  flex-direction: column;
  align-items: stretch;

  button {
    background: none;
    border: none;

    padding: 1.25rem;

    font-size: 0.95rem;
    cursor: pointer;
  }

  .main-action-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    width: 100%;

    padding: 1rem;
    border-bottom: 1px solid ${ctx => ctx.theme.colors.stroke};

    button {
      border-radius: 5px;
    }

    button:first-child {
      background: ${ctx => ctx.theme.colors.shape};
      border: 2px solid ${ctx => ctx.theme.colors.stroke};
      color: ${ctx => ctx.theme.colors.body};
    }

    button:last-child {
      background: ${ctx => ctx.theme.colors.primary};
      color: ${ctx => ctx.theme.colors.background};
    }
  }

  .delete-bill {
    padding: 1rem;

    color: ${ctx => ctx.theme.colors.delete};

    display: flex;
    align-items: center;
    justify-content: center;
  }
`
