import useSWR from 'swr'

import { BillList } from '../components/bill-list'
import { Toolbar } from '../components/toolbar'
import { UserProfileHeader } from '../components/user-profile-header'
import { SpinnerContainer } from '../styles/components/spinner'

import { PanelPageContainer } from '../styles/pages/panel-page'

export default function ExtractsPage () {
  const { data } = useSWR('/api/list-bills?mode=extract')

  return (
    <PanelPageContainer>
      <UserProfileHeader>
      </UserProfileHeader>

      <main>
      {!data
        ? <SpinnerContainer size={32} />
        : (
          <BillList
            title='Meu extrato'
            counterLabel='pagos'
            bills={data?.results || []}
          />
          )}
      </main>

      <Toolbar />
    </PanelPageContainer>
  )
}
