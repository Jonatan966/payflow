import { Bill } from '../interfaces/bill'
import { BillListItemContainer } from '../styles/components/bill-list-item'
import { numberToReal } from '../utils/numberToReal'

interface BillListItemProps {
  bill: Bill;
  onClick?: () => void;
}

export function BillListItem ({
  bill: {
    name,
    amount,
    dueDate,
    paidIn
  },
  onClick
} : BillListItemProps) {
  const parsedDueDate = new Date(dueDate)
  const parsedPaidIn = (paidIn !== 'null' && !!paidIn) && new Date(paidIn)

  return (
    <BillListItemContainer onClick={onClick}>
      <div className='bill-item-header'>
        <h3>{name}</h3>
        <span>
          {numberToReal(amount)}
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
