import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { query as q } from 'faunadb'

import { faunaClient } from '../../services/fauna'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'PATCH') {
    response.setHeader('Allow', 'PATCH')
    return response.status(405).end('Method now allowed')
  }

  const { id } = request.query

  const userSession = await getSession({ req: request })
  const userEmail = userSession?.user?.email

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
  const matchTargetBill = q.Ref(
    q.Collection('bills'),
    q.Select('ref', matchBillsByUser, id)
  )

  const asTargetBillExists = await faunaClient.query(
    q.Exists(matchTargetBill)
  )

  if (!asTargetBillExists) {
    return response.status(400).send({
      message: 'Boleto não encontrado'
    })
  }

  const updateResult = await faunaClient.query(
    q.Update(matchTargetBill, {
      data: {
        paidIn: new Date().toUTCString()
      }
    })
  )

  console.log(updateResult)

  return response.status(200).end()
}
