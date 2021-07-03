import useSWR from 'swr'

import { BillList } from '../components/bill-list'
import { BillsAmountHeaderInfo } from '../components/bills-amount-header-info'
import { Toolbar } from '../components/toolbar'
import { UserProfileHeader } from '../components/user-profile-header'
import { SpinnerContainer } from '../styles/components/spinner'

import { PanelPageContainer } from '../styles/pages/panel-page'

export default function HomePage () {
  const { data } = useSWR('/api/list-bills?mode=bills')

  return (
    <PanelPageContainer>
      <UserProfileHeader>
        {data && <BillsAmountHeaderInfo amount={data.results.length} />}
      </UserProfileHeader>

      <main>
        {!data
          ? <SpinnerContainer size={32} />
          : (
          <BillList
            title='Meus boletos'
            counterLabel='no total'
            bills={data?.results || []}
          />
            )}
      </main>

      <Toolbar />
    </PanelPageContainer>
  )
}
