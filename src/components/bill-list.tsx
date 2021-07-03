import { BillListContainer } from '../styles/components/bill-list'
import { ReactNode } from 'react'
interface BillListProps {
  title: string;
  counterLabel: string;
  children?: ReactNode;
}

export function BillList ({
  title,
  counterLabel,
  children
} : BillListProps) {
  return (
    <BillListContainer>
      <header>
        <h2>{title}</h2>
        <span>{counterLabel}</span>
      </header>
      <ul>
        {children}
      </ul>
    </BillListContainer>
  )
}
