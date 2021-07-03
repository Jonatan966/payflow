import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import useSWR from 'swr'

import { BillList } from '../components/bill-list'
import { BillListItem } from '../components/bill-list-item'
import { PageHead } from '../components/page-head'
import { Toolbar } from '../components/toolbar'
import { UserProfileHeader } from '../components/user-profile-header'
import { Bill } from '../interfaces/bill'
import { SpinnerContainer } from '../styles/components/spinner'

import { PanelPageContainer } from '../styles/pages/panel-page'

export default function ExtractsPage () {
  const { data, isValidating } = useSWR<{ results: Bill[] }>('/api/list-bills?mode=extract')

  return (
    <PanelPageContainer>
      <PageHead title='Meu extrato'/>
      <UserProfileHeader>
      </UserProfileHeader>

      <main>
        <BillList
          title='Meu extrato'
          counterLabel={`${data?.results.length || 0} pagos`}
        >
          {!data?.results || isValidating
            ? <SpinnerContainer size={32}/>
            : data.results.map(bill =>
              <BillListItem
                bill={bill}
                key={bill.id}
              />
            )
          }
        </BillList>
      </main>

      <Toolbar />
    </PanelPageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const loggedUserSession = await getSession({ ctx })

  if (!loggedUserSession) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      },
      props: {}
    }
  }

  return {
    props: {}
  }
}
