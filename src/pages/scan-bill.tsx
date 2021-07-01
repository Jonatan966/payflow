import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

import { ScanBillPageContainer } from '../styles/pages/scan-bill-page'

export default function ScanBillPage () {
  return (
    <ScanBillPageContainer>
      <header>
        <Link href='/' passHref>
          <FaArrowLeft size={20} />
        </Link>
        <span>Escaneie o código de barras do boleto</span>
      </header>

      <main>
      </main>

      <footer>
        <h3>Inserir código do boleto</h3>
      </footer>
    </ScanBillPageContainer>
  )
}
