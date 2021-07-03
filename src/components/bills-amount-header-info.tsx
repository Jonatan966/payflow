import Image from 'next/image'

import { BillsAmountHeaderInfoContainer } from '../styles/components/bills-amount-header-info'

interface BillsAmountHeaderInfoProps {
  amount: number;
}

export function BillsAmountHeaderInfo ({ amount }: BillsAmountHeaderInfoProps) {
  return (
    <BillsAmountHeaderInfoContainer>
      <Image width={60} height={5} src='/images/logomini.png' />
      <span className="wrapper"/>
      <p>
        Você tem <strong>{amount} boletos</strong> <br />
        cadastrados para pagar
      </p>
    </BillsAmountHeaderInfoContainer>
  )
}
