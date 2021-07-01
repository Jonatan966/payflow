import { FiLoader } from 'react-icons/fi'
import styled, { keyframes } from 'styled-components'

const rotateAnimation = keyframes`
    from{
      -webkit-transform: rotate(0deg);
    }
    to{
      -webkit-transform: rotate(360deg);
    }
`

export const SpinnerContainer = styled(FiLoader)`
  animation: ${rotateAnimation} 1s linear infinite;

  color: ${ctx => ctx.theme.colors.primary};
`
