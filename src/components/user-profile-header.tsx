import Image from 'next/image'
import { useState, ReactNode } from 'react'

import { useAuth } from '../hooks/use-auth'

import { UserProfileHeaderContainer } from '../styles/components/user-profile-header'
import { AppOptionsModal } from './app-options-modal'

interface UserProfileHeaderProps {
  children?: ReactNode;
}

export function UserProfileHeader ({ children }: UserProfileHeaderProps) {
  const { user } = useAuth()
  const [isAppOptionsModalOpen, setIsAppOptionsModalOpen] = useState(false)

  return (
    <>
      <AppOptionsModal
        isOpen={isAppOptionsModalOpen}
        onRequestClose={() => setIsAppOptionsModalOpen(false)}
      />
      <UserProfileHeaderContainer className={children ? 'has-footer' : ''}>
        <div className="profile">
          <div className='main-info'>
            <span>Olá, <strong>{user?.name}</strong></span>
            <p>Mantenha suas contas em dia</p>
          </div>

          <Image
            width={48}
            height={48}
            src={user?.image ?? '/images/profile.jpg'}
            className='profile-image hovered'
            title='Opções'
            onClick={() => setIsAppOptionsModalOpen(true)}
          />
        </div>

        <div className="header-footer">
          {children}
        </div>
      </UserProfileHeaderContainer>
    </>
  )
}
