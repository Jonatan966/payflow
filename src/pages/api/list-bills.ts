import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

import { Bill } from '../../interfaces/bill'
import { FaunaQueryResults } from '../../interfaces/fauna-query-result'

import { faunaClient } from '../../services/fauna'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const userSession = await getSession({ req: request })
  const userEmail = userSession?.user?.email

  if (!userEmail) {
    return response.status(401).end()
  }

  const queryResult = await faunaClient.query<FaunaQueryResults<Bill>>(
    q.Map(
      q.Paginate(
        q.Match(
          q.Index('bills_by_user'),
          q.Select('ref', q.Get(
            q.Match(q.Index('user_by_email'), userEmail)
          ))
        )
      ),
      q.Lambda('X',
        q.Get(q.Var('X'))
      )
    )
  )

  const mappedQueryResult = queryResult.data.map(({ ref, data }) => ({
    id: ref.id,
    amount: data.amount,
    barcode: data.barcode,
    dueDate: data.dueDate,
    name: data.name
  }))

  return response.json({
    results: mappedQueryResult
  })
}
