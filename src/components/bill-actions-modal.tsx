import toast from 'react-hot-toast'
import { FiTrash } from 'react-icons/fi'
import { Bill } from '../interfaces/bill'
import { api } from '../services/api'
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
  async function handleRemoveBill () {
    try {
      await toast.promise(
        api.delete(`/delete-bill?id=${selectedBill._id}`),
        {
          error: 'Não foi possível excluir esse boleto',
          loading: 'Excluindo boleto. . .',
          success: 'Boleto excluído com sucesso'
        }
      )
    } catch {} finally {
      onExecuteAction()
      onRequestClose()
    }
  }

  async function handleMarkBillAsPaid () {
    try {
      await toast.promise(
        api.patch(`/pay-bill?id=${selectedBill._id}`),
        {
          error: 'Não foi possível marcar esse boleto como pago',
          loading: 'Marcando boleto como pago . . .',
          success: 'Boleto marcado como pago!'
        }
      )
    } catch {} finally {
      onExecuteAction()
      onRequestClose()
    }
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
