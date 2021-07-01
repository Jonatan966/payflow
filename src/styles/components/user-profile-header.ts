import styled from 'styled-components'

export const UserProfileHeaderContainer = styled.header`
  background: var(--radial-background);
  color: ${ctx => ctx.theme.colors.background};

  padding: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  
  .profile, .header-footer {
    max-width: 1120px;
    margin: 0 auto;
  }

  .profile {
    display: flex;
    justify-content: space-between;

    .main-info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      span {
        font-size: 1.25rem;
      }
    }

    .profile-image {
      border-radius: 5px;
    }
  }

  &.has-footer {
    padding-bottom: 5rem;
    margin-bottom: 5rem;
  }

  .header-footer {
    position: absolute;
    left: 1.5rem;
    right: 1.5rem;
    transform: translateY(35%);
  }
`
