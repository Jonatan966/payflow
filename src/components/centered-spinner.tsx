import { CenteredSpinnerContainer } from '../styles/components/centered-spinner'
import { SpinnerContainer } from '../styles/components/spinner'
import { PageHead } from './page-head'

export function CenteredSpinner () {
  return (
    <CenteredSpinnerContainer>
      <PageHead title='Carregando' />
      <SpinnerContainer size={40} />
    </CenteredSpinnerContainer>
  )
}
