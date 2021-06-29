import { BillListItemContainer } from '../styles/components/bill-list-item'

export function BillListItem () {
  return (
    <BillListItemContainer>
      <div className='bill-item-header'>
        <h3>Tia maria</h3>
        <span>
          R$ <strong>2.131,33</strong>
        </span>
      </div>
      <span>
        Vence em <strong>16/03/21</strong>
      </span>
    </BillListItemContainer>
  )
}
