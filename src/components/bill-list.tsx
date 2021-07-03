import { BillListItem } from './bill-list-item'

import { BillListContainer } from '../styles/components/bill-list'
import { Bill } from '../interfaces/bill'
import { useState } from 'react'
import { BillActionsModal } from './bill-actions-modal'
interface BillListProps {
  title: string;
  counterLabel: string;
  bills: Bill[];
  readOnly?: boolean;
  onExecuteAction?: () => void;
}

export function BillList ({
  title,
  counterLabel,
  bills,
  readOnly = false,
  onExecuteAction = () => null
} : BillListProps) {
  const [isBillActionsModalOpen, setIsBillActionsModalOpen] = useState(false)
  const [selectedBill, setSelectedBill] = useState<Bill>()

  function handleSelectBill (bill: Bill) {
    setSelectedBill(bill)
    setIsBillActionsModalOpen(true)
  }

  return (
    <BillListContainer>
      {selectedBill && (
        <BillActionsModal
          isOpen={isBillActionsModalOpen}
          onRequestClose={() => setIsBillActionsModalOpen(false)}
          selectedBill={selectedBill}
          onExecuteAction={onExecuteAction}
        />
      )}

      <header>
        <h2>{title}</h2>
        <span>{bills.length} {counterLabel}</span>
      </header>
      <ul>
        {bills.map(bill =>
          <BillListItem
            key={bill.id}
            bill={bill}
            onClick={!readOnly ? () => handleSelectBill(bill) : () => null}
          />
        )}
      </ul>
    </BillListContainer>
  )
}
