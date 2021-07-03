import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { useState } from 'react'
import useSWR from 'swr'
import { BillActionsModal } from '../components/bill-actions-modal'

import { BillList } from '../components/bill-list'
import { BillListItem } from '../components/bill-list-item'
import { BillsAmountHeaderInfo } from '../components/bills-amount-header-info'
import { PageHead } from '../components/page-head'
import { Toolbar } from '../components/toolbar'
import { UserProfileHeader } from '../components/user-profile-header'
import { Bill } from '../interfaces/bill'
import { SpinnerContainer } from '../styles/components/spinner'

import { PanelPageContainer } from '../styles/pages/panel-page'

export default function HomePage () {
  const { data, revalidate, isValidating } = useSWR<{ results: Bill[] }>('/api/list-bills?mode=pendents')
  const [isBillActionsModalOpen, setIsBillActionsModalOpen] = useState(false)
  const [selectedBill, setSelectedBill] = useState<Bill>()

  function handleSelectBill (bill: Bill) {
    setSelectedBill(bill)
    setIsBillActionsModalOpen(true)
  }

  return (
    <PanelPageContainer>
      <PageHead title='Meus boletos'/>
      <UserProfileHeader>
        {data && <BillsAmountHeaderInfo amount={data.results.length} />}
      </UserProfileHeader>

      <main>
        {selectedBill && (
          <BillActionsModal
            isOpen={isBillActionsModalOpen}
            onRequestClose={() => setIsBillActionsModalOpen(false)}
            selectedBill={selectedBill}
            onExecuteAction={() => revalidate()}
          />
        )}

        <BillList
          title='Meus boletos'
          counterLabel={`${data?.results.length || 0} no total`}
        >
          {!data?.results || isValidating
            ? <SpinnerContainer size={32}/>
            : data.results.map(bill =>
              <BillListItem
                bill={bill}
                key={bill.id}
                onClick={() => handleSelectBill(bill)}
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
