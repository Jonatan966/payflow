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
        className={imSelected('/')}
        onClick={() => router.push('/')}
      >
        <FaHome size={32} />
      </button>
      <button
        className='add-bill'
        onClick={() => router.push('/add-bill')}
      >
        <RiAddBoxLine size={30} />
      </button>
      <button
        className={imSelected('/extracts')}
        onClick={() => router.push('/extracts')}
      >
        <RiFileList2Line size={32} />
      </button>
    </ToolbarContainer>
  )
}
