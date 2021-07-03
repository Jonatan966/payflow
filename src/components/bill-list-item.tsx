import { Bill } from '../interfaces/bill'
import { BillListItemContainer } from '../styles/components/bill-list-item'

interface BillListItemProps {
  bill: Bill;
}

export function BillListItem ({ bill: { name, amount, dueDate, paidIn } } : BillListItemProps) {
  const parsedDueDate = new Date(dueDate)
  const parsedPaidIn = (paidIn !== 'null' && !!paidIn) && new Date(paidIn)

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
        {parsedPaidIn
          ? <>Pago em <strong>{parsedPaidIn.toLocaleDateString()}</strong></>
          : (new Date().getTime() > parsedDueDate.getTime())
              ? <>Venceu em <strong>{parsedDueDate.toLocaleDateString()}</strong></>
              : <>Vence em <strong>{parsedDueDate.toLocaleDateString()}</strong></>
        }
      </span>
    </BillListItemContainer>
  )
}
