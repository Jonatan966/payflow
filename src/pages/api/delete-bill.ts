import { NextApiRequest, NextApiResponse } from 'next'
import { query as q } from 'faunadb'
import { getSession } from 'next-auth/client'
import { faunaClient } from '../../services/fauna'

export default async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method !== 'DELETE') {
    response.setHeader('Allow', 'DELETE')
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

  await faunaClient.query(
    q.Delete(matchTargetBill)
  )

  return response.status(200).end()
}
