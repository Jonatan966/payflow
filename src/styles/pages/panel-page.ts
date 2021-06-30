import styled from 'styled-components'
import { UserProfileHeaderContainer } from '../components/user-profile-header'

export const PanelPageContainer = styled.div`
  min-height: 100vh;
  position: relative;

  > main {
    padding: 0 1.5rem 1.5rem;

    margin-bottom: 3rem;

    display: flex;
    flex-direction: column;
    align-items: center;

    > * {
      max-width: 1120px;
      width: 100%;
    }
  }

  ${UserProfileHeaderContainer} {
    position: sticky;
    top: 0;
  }
`
