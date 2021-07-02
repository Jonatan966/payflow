import styled from 'styled-components'

export const ScanBillPageContainer = styled.div`
  position: relative;

  header {
    display: flex;
    align-items: center;
    padding: 1rem;

    z-index: 1;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    span {
      flex: 1;
      text-align: center;
      color: ${ctx => ctx.theme.colors.background};
    }

    svg {
      fill: ${ctx => ctx.theme.colors.background};
    }
  }

  main {
    width: 100%;
    height: 100vh;

    display: flex;

    &:after, &:before {
      content: '';
      width: 100%;
      height: 8rem;

      position: absolute;

      background: rgba(0,0,0,.60);
    }

    &:before {
      bottom: 0;
    }

    video {
      background: #1F1F1F;
      width: 100%;
      object-fit: fill;
    }

    canvas {
      display: none;
    }
  }

  footer {
    text-align: center;
    padding: 1rem;
    color: ${ctx => ctx.theme.colors.heading};
    background: ${ctx => ctx.theme.colors.background};

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
`
