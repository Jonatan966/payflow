import Image from 'next/image'

import { BillsAmountHeaderInfoContainer } from '../styles/components/bills-amount-header-info'

export function BillsAmountHeaderInfo () {
  return (
    <BillsAmountHeaderInfoContainer>
      <Image width={55} height={35} src='/images/logomini.png' />
      <span className="wrapper"/>
      <p>
        Você tem <strong>14 boletos</strong> <br />
        cadastrados para pagar
      </p>
    </BillsAmountHeaderInfoContainer>
  )
}
