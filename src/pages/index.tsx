import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import useSWR from 'swr'

import { BillList } from '../components/bill-list'
import { BillsAmountHeaderInfo } from '../components/bills-amount-header-info'
import { PageHead } from '../components/page-head'
import { Toolbar } from '../components/toolbar'
import { UserProfileHeader } from '../components/user-profile-header'
import { SpinnerContainer } from '../styles/components/spinner'

import { PanelPageContainer } from '../styles/pages/panel-page'

export default function HomePage () {
  const { data, revalidate, isValidating } = useSWR('/api/list-bills?mode=pendents')

  return (
    <PanelPageContainer>
      <PageHead title='Meus boletos'/>
      <UserProfileHeader>
        {data && <BillsAmountHeaderInfo amount={data.results.length} />}
      </UserProfileHeader>

      <main>
        {!data || isValidating
          ? <SpinnerContainer size={32} />
          : (
          <BillList
            title='Meus boletos'
            counterLabel='no total'
            bills={data?.results || []}
            onExecuteAction={() => revalidate()}
          />
            )}
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
        destination: '/',
        permanent: false
      },
      props: {}
    }
  }

  return {
    props: {}
  }
}
