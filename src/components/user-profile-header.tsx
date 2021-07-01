import Image from 'next/image'
import { ReactNode } from 'react'

import { useAuth } from '../hooks/use-auth'

import { UserProfileHeaderContainer } from '../styles/components/user-profile-header'

interface UserProfileHeaderProps {
  children?: ReactNode;
}

export function UserProfileHeader ({ children }: UserProfileHeaderProps) {
  const { user } = useAuth()

  return (
    <UserProfileHeaderContainer className={children ? 'has-footer' : ''}>
      <div className="profile">
        <div className='main-info'>
          <span>Olá, <strong>{user?.name}</strong></span>
          <p>Mantenha suas contas em dia</p>
        </div>

        <Image width={48} height={48} src={user?.image ?? '/images/profile.jpg'} className='profile-image' />
      </div>

      <div className="header-footer">
        {children}
      </div>
    </UserProfileHeaderContainer>
  )
}
