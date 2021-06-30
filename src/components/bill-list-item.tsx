import { Bill } from '../interfaces/bill'
import { BillListItemContainer } from '../styles/components/bill-list-item'

interface BillListItemProps {
  bill: Bill;
}

export function BillListItem ({ bill: { name, amount, dueDate, paidIn } } : BillListItemProps) {
  return (
    <BillListItemContainer>
      <div className='bill-item-header'>
        <h3>{name}</h3>
        <span>
          {new Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            style: 'currency'
          }).format(amount)}
        </span>
      </div>
      <span>
        {paidIn
          ? <>Pago em <strong>{paidIn.toLocaleDateString()}</strong></>
          : (new Date().getTime() > dueDate.getTime())
              ? <>Venceu em <strong>{dueDate.toLocaleDateString()}</strong></>
              : <>Vence em <strong>{dueDate.toLocaleDateString()}</strong></>
        }
      </span>
    </BillListItemContainer>
  )
}
