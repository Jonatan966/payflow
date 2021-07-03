import Image from 'next/image'

import { BillsAmountHeaderInfoContainer } from '../styles/components/bills-amount-header-info'

interface BillsAmountHeaderInfoProps {
  amount: number;
}

export function BillsAmountHeaderInfo ({ amount }: BillsAmountHeaderInfoProps) {
  return (
    <BillsAmountHeaderInfoContainer>
      <Image width={55} height={35} src='/images/logomini.png' />
      <span className="wrapper"/>
      <p>
        Você tem <strong>{amount} boletos</strong> <br />
        cadastrados para pagar
      </p>
    </BillsAmountHeaderInfoContainer>
  )
}
