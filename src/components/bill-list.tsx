import { BillListItem } from './bill-list-item'

import { BillListContainer } from '../styles/components/bill-list'
import { Bill } from '../interfaces/bill'
interface BillListProps {
  title: string;
  counterLabel: string;
  bills: Bill[];
}

export function BillList ({ title, counterLabel, bills } : BillListProps) {
  return (
    <BillListContainer>
      <header>
        <h2>{title}</h2>
        <span>{bills.length} {counterLabel}</span>
      </header>
      <ul>
        {bills.map(bill =>
          <BillListItem key={bill.id} bill={bill} />
        )}
      </ul>
    </BillListContainer>
  )
}
