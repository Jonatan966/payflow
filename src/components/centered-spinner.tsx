import { CenteredSpinnerContainer } from '../styles/components/centered-spinner'
import { SpinnerContainer } from '../styles/components/spinner'

export function CenteredSpinner () {
  return (
    <CenteredSpinnerContainer>
      <SpinnerContainer size={40} />
    </CenteredSpinnerContainer>
  )
}
