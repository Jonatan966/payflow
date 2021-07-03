import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
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
            readOnly
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
