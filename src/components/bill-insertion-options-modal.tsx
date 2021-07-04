import { BiScan } from 'react-icons/bi'
import { FaKeyboard } from 'react-icons/fa'
import Router from 'next/router'

import { ActionsListModalContainer } from '../styles/components/actions-list-modal'
import { AppModalProps } from './app-modal'

export function BillInsertionOptionsModal ({ isOpen, onRequestClose }: AppModalProps) {
  function handleRedirect (targetPage: string) {
    onRequestClose()
    Router.push(targetPage)
  }

  return (
    <ActionsListModalContainer isOpen={isOpen} onRequestClose={onRequestClose}>
      <button className='hovered' onClick={() => handleRedirect('/scan-bill')}>
        <BiScan size={25} />
        <span>Escanear boleto</span>
      </button>

      <button className='hovered' onClick={() => handleRedirect('/add-bill')}>
        <FaKeyboard size={25} />
        <span>Digitar código do boleto manualmente</span>
      </button>

      <button className='cancel hovered' onClick={onRequestClose}>
        Cancelar
      </button>
    </ActionsListModalContainer>
  )
}
