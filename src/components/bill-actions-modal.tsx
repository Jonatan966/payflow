import { FiTrash } from 'react-icons/fi'

import { useBillsManager } from '../hooks/use-bills-manager'
import { Bill } from '../interfaces/bill'
import { BillActionsModalContainer } from '../styles/components/bill-actions-modal'
import { numberToReal } from '../utils/numberToReal'

interface BillActionsModalProps {
  selectedBill: Bill;
  isOpen: boolean;
  onRequestClose: () => void;
  onExecuteAction: () => void;
}

export function BillActionsModal ({
  selectedBill,
  isOpen,
  onRequestClose,
  onExecuteAction
}: BillActionsModalProps) {
  const { removeBill, markBillAsPaid } = useBillsManager()

  async function handleRemoveBill () {
    if (!await removeBill(selectedBill._id)) {
      return
    }

    onExecuteAction()
    onRequestClose()
  }

  async function handleMarkBillAsPaid () {
    if (!await markBillAsPaid(selectedBill._id)) {
      return
    }

    onExecuteAction()
    onRequestClose()
  }

  return (
    <BillActionsModalContainer
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <p>
      O boleto <strong>{selectedBill.name}</strong> {' '}
      no valor de <strong>R$ {numberToReal(selectedBill.amount)}</strong> {' '}
      foi pago ?
      </p>

      <div className="main-action-buttons">
        <button className='hovered' onClick={onRequestClose}>Ainda não</button>
        <button className='hovered' onClick={handleMarkBillAsPaid}>Sim</button>
      </div>

      <button className='delete-bill hovered' onClick={handleRemoveBill}>
        <FiTrash size={20} /> Deletar boleto
      </button>
    </BillActionsModalContainer>
  )
}
