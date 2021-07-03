import { query } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'

import { Bill } from '../../interfaces/bill'
import { faunaClient } from '../../services/fauna'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).end('Method now allowed')
  }

  const { name, amount, barcode, dueDate } = request.body as Omit<Bill, 'id' | 'paidIn'>
  const userSession = await getSession({ req: request })

  const userEmail = userSession?.user?.email

  if (!userEmail) {
    return response.status(401).end()
  }

  const userRef = await faunaClient.query(
    query.Select('ref', query.Get(
      query.Match(
        query.Index('user_by_email'),
        userEmail
      )
    ))
  )

  const insertResult = await faunaClient.query(
    query.Create(
      query.Collection('bills'),
      {
        data: {
          owner: userRef,
          name,
          amount,
          barcode,
          dueDate,
          paidIn: 'null'
        }
      }
    )
  ) as any

  return response.status(201).json(insertResult.data)
}
