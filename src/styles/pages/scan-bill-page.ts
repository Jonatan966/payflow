import styled from 'styled-components'

export const ScanBillPageContainer = styled.div`
  position: relative;

  header {
    display: flex;
    align-items: center;
    padding: 1rem;

    z-index: 10;

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
      cursor: pointer;
    }
  }

  main {
    width: 100%;
    height: 100vh;

    display: flex;

    &:after, &:before {
      content: '';
      width: 100%;
      height: 20%;

      position: absolute;

      background: rgba(0,0,0,.60);
      z-index: 5;
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
      background: transparent;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
`
