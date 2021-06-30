import { BillList } from '../components/bill-list'
import { BillsAmountHeaderInfo } from '../components/bills-amount-header-info'
import { Toolbar } from '../components/toolbar'
import { UserProfileHeader } from '../components/user-profile-header'

import { PanelPageContainer } from '../styles/pages/panel-page'

export default function HomePage () {
  return (
    <PanelPageContainer>
      <UserProfileHeader>
        <BillsAmountHeaderInfo/>
      </UserProfileHeader>

      <main>
        <BillList
          title='Meus boletos'
          counterLabel='no total'
          bills={[
            {
              name: 'Tia maria',
              amount: 250,
              barcode: '123123',
              dueDate: new Date('2021-07-16'),
              id: '132122132'
            }
          ]}
        />
      </main>

      <Toolbar />
    </PanelPageContainer>
  )
}
