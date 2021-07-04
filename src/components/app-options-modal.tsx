import { GiExitDoor } from 'react-icons/gi'
import { FaMoon, FaSun } from 'react-icons/fa'

import { AppModalProps } from './app-modal'
import { useAuth } from '../hooks/use-auth'
import { useTheme } from 'styled-components'

import { ActionsListModalContainer } from '../styles/components/actions-list-modal'

export function AppOptionsModal ({ isOpen, onRequestClose }: AppModalProps) {
  const { handleSignOut } = useAuth()
  const { currentTheme, toggleTheme } = useTheme()

  return (
    <ActionsListModalContainer isOpen={isOpen} onRequestClose={onRequestClose}>
      <button className='hovered' onClick={toggleTheme}>
        {currentTheme === 'light' ? <FaMoon size={25} /> : <FaSun size={25} />}
        <span>Trocar para tema {currentTheme === 'dark' ? 'claro' : 'escuro'}</span>
      </button>
      <button className='hovered' onClick={handleSignOut}>
        <GiExitDoor size={25} />
        <span>Sair da conta</span>
      </button>
      <button className='cancel hovered' onClick={onRequestClose}>
        Fechar
      </button>
    </ActionsListModalContainer>
  )
}
