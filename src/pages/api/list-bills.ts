import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

import { Bill } from '../../interfaces/bill'
import { FaunaQueryResults } from '../../interfaces/fauna-query-result'

import { faunaClient } from '../../services/fauna'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const userSession = await getSession({ req: request })
  const userEmail = userSession?.user?.email

  let { mode = 'all' } = request.query as { mode: 'all' | 'pendents' | 'extract' }

  if (!['all', 'pendents', 'extract'].includes(mode)) {
    mode = 'all'
  }

  if (!userEmail) {
    return response.status(401).end()
  }

  const getUserRef = q.Select('ref',
    q.Get(
      q.Match(
        q.Index('user_by_email'),
        userEmail
      )
    )
  )

  const matchBillsByUser = q.Match(q.Index('bills_by_user'), getUserRef)

  const matchBillsNotPaidYet = q.Match(
    q.Index('bills_by_payment'),
    q.Select('paidIn', q.Get(matchBillsByUser), 'null')
  )

  const matchBillsAlreadyPaid = q.Difference(
    q.Match(q.Index('all_bills')),
    matchBillsNotPaidYet
  )

  const queryModes = {
    all: matchBillsByUser,
    pendents: matchBillsNotPaidYet,
    extract: matchBillsAlreadyPaid
  }

  try {
    const queryResult = await faunaClient.query<FaunaQueryResults<Bill>>(
      q.Map(
        q.Paginate(queryModes[mode]),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    )

    const mappedQueryResult = queryResult.data.map(({ ref, data }) => ({
      id: ref.id,
      amount: data.amount,
      barcode: data.barcode,
      dueDate: data.dueDate,
      name: data.name,
      paidIn: data.paidIn
    }))

    return response.json({
      results: mappedQueryResult
    })
  } catch {
    return response.json({
      results: []
    })
  }
}
