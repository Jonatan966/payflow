import { BillListContainer } from '../styles/components/bill-list'
import { BillListItem } from './bill-list-item'

export function BillList () {
  return (
    <BillListContainer>
      <header>
        <h2>Meus boletos</h2>
        <span>13 no total</span>
      </header>
      <ul>
        <BillListItem />
        <BillListItem />
        <BillListItem />
        <BillListItem />
      </ul>
    </BillListContainer>
  )
}
