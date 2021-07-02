import { useRouter } from 'next/router'
import { FaHome } from 'react-icons/fa'
import { RiFileList2Line, RiAddBoxLine } from 'react-icons/ri'

import { ToolbarContainer } from '../styles/components/toolbar'

export function Toolbar () {
  const router = useRouter()
  const imSelected = (routeName: string) => (() => router.pathname === routeName ? 'selected' : '')()

  return (
    <ToolbarContainer>
      <button
        className={imSelected('/') + ' hovered'}
        onClick={() => router.push('/')}
        title='Meus boletos'
      >
        <FaHome size={32} />
      </button>
      <button
        className='add-bill hovered'
        onClick={() => router.push('/scan-bill')}
        title='Adicionar boleto'
      >
        <RiAddBoxLine size={30} />
      </button>
      <button
        className={imSelected('/extracts') + ' hovered'}
        onClick={() => router.push('/extracts')}
        title='Meu extrato'
      >
        <RiFileList2Line size={32} />
      </button>
    </ToolbarContainer>
  )
}
