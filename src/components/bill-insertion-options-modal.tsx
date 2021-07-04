import { BiScan } from 'react-icons/bi'
import { FaKeyboard } from 'react-icons/fa'
import Router from 'next/router'

import { ActionsListModalContainer } from '../styles/components/actions-list-modal'
import { AppModalProps } from './app-modal'

export function BillInsertionOptionsModal ({ isOpen, onRequestClose }: AppModalProps) {
  async function handleRedirect (targetPage: string) {
    onRequestClose()
    await Router.push(targetPage)
  }

  async function handleOpenScanBillPage () {
    try {
      await document.documentElement.requestFullscreen()
      await screen.orientation.lock('landscape')
    } catch {} finally {
      await handleRedirect('/scan-bill')
    }
  }

  return (
    <ActionsListModalContainer isOpen={isOpen} onRequestClose={onRequestClose}>
      <button className='hovered' onClick={handleOpenScanBillPage}>
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
